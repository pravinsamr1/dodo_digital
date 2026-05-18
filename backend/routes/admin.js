const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads', 'schools'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Simple in-memory storage for rate-limiting (production should use Redis or express-rate-limit)
const { isRateLimited } = require('../middleware/rateLimiter');
const registrationAttempts = new Map();
const loginAttempts = new Map();

// Import shared token verification middleware
const verifyAdmin = require('../middleware/verifyAdmin');


/**
 * @route   POST /api/admin/register
 * @desc    Register the Master Admin (Strict Singleton: Only ONE admin allowed in entire system)
 * @access  Private (Requires REGISTRATION_SECRET header)
 */
router.post("/register", async (req, res) => {
  const clientIp = req.ip;

  // 1. Rate Limit Check
  if (isRateLimited(clientIp, registrationAttempts, 3, 10 * 60 * 1000)) {
    return res.status(429).json({
      error: "Too many registration attempts. Please try again after 10 minutes.",
    });
  }

  const registrationSecret = req.headers["x-registration-secret"]?.trim();
  const expectedSecret = process.env.REGISTRATION_SECRET?.trim();

  if (!expectedSecret || registrationSecret !== expectedSecret) {
    // Audit-style generic denial to confuse attackers
    return res.status(403).json({ error: "Access Denied: Invalid registration token." });
  }

  try {
    // 3. Database Check (Singleton Lock #1)
    const existingAdmin = await Admin.findOne({});
    if (existingAdmin) {
      return res.status(403).json({
        error: "Access Denied: Master Admin is already registered. Registration is locked.",
      });
    }

    const { username, password } = req.body;

    // 4. Strict Input Validation
    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Allow either basic alphanumeric/underscore username (4-20 chars) OR a valid email address
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernameRegex = /^[a-zA-Z0-9_]{4,20}$/;
    if (!usernameRegex.test(username) && !emailRegex.test(username)) {
      return res.status(400).json({
        error: "Username must be a valid email address or 4-20 characters long containing only letters, numbers, and underscores.",
      });
    }

    // High security password strength check
    // At least 8 chars, 1 uppercase, 1 lowercase, 1 digit, 1 special character
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        error: "Password must be at least 8 characters long, contain an uppercase letter, a lowercase letter, a digit, and a special character.",
      });
    }

    // 5. Create Master Admin (Singleton Lock #2 - Hardcoded DB _id guarantees database-level singleton)
    const newAdmin = new Admin({
      _id: "65b000000000000000000001", // Hardcoded Singleton ID
      username,
      password,
    });

    await newAdmin.save();

    return res.status(201).json({
      message: "Master Admin registered successfully. Registration is now permanently locked.",
    });
  } catch (error) {
    // Handle database-level duplicate keys gracefully
    if (error.code === 11000 || error.message.includes("duplicate key")) {
      return res.status(403).json({
        error: "Access Denied: Master Admin already exists. Registration is locked.",
      });
    }
    console.error("Registration Error:", error);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

/**
 * @route   POST /api/admin/login
 * @desc    Master Admin Login & Secure Cookie Issuance
 * @access  Public
 */
router.post("/login", async (req, res) => {
  const clientIp = req.ip;

  // 1. Rate Limit Check to prevent Brute Force Attacks
  if (isRateLimited(clientIp, loginAttempts, 5, 15 * 60 * 1000)) {
    return res.status(429).json({
      error: "Too many login attempts. Please try again after 15 minutes.",
    });
  }

  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ error: "Username and password are required." });
    }

    // Find the Master Admin
    const admin = await Admin.findOne({ username: username.toLowerCase().trim() });
    if (!admin) {
      // Use generic error message to prevent username harvesting
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Compare Hash
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid username or password." });
    }

    // Reset login attempts upon successful login
    loginAttempts.delete(clientIp);

    // Enforce single-device login: if a valid active token exists, reject new login
    if (admin.activeToken) {
      try {
        // Verify the stored token; if it is still valid, another session is active
        jwt.verify(admin.activeToken, process.env.JWT_Secret);
        return res
          .status(403)
          .json({ error: "Another session is already active for this admin. Please log out first." });
      } catch (e) {
        // Token is invalid or expired – clear it and allow new login
        admin.activeToken = null;
        await admin.save();
      }
    }

    // Generate Secure JWT
    const token = jwt.sign(
      { id: admin._id, role: admin.role },
      process.env.JWT_Secret,
      { expiresIn: "8h" }
    );

    // Store the token in the admin record to enforce single-device login
    admin.activeToken = token;
    await admin.save();

    // Set secure HttpOnly cookie to mitigate XSS & CSRF
    res.cookie("admin_token", token, {
      httpOnly: true, // Absolutely protects token from document.cookie access
      secure: process.env.NODE_ENV === "production", // Enable secure in production
      sameSite: "strict", // Robust CSRF protection
      maxAge: 8 * 60 * 60 * 1000, // 8 hours
    });

    return res.status(200).json({
      message: "Login successful.",
      admin: {
        id: admin._id,
        username: admin.username,
        role: admin.role,
      },
    });

  } catch (error) {
    console.error("Login Error:", error);
    return res.status(500).json({ error: "An internal server error occurred." });
  }
});

/**
 * @route   POST /api/admin/logout
 * @desc    Master Admin Logout & Cookie Clear
 * @access  Public
 */
router.post("/logout", async (req, res) => {
  const token = req.cookies.admin_token;
  if (!token) {
    return res.status(400).json({ error: "No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    await Admin.findByIdAndUpdate(decoded.id, { activeToken: null });
  } catch (err) {
    console.error("Logout token verification error:", err);
    // Proceed to clear cookie even if token invalid
  }

  res.clearCookie("admin_token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });
  return res.status(200).json({ message: "Logout successful." });
});




module.exports = router;
