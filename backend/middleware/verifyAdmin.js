const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

/**
 * Middleware to enforce a single active session per admin.
 * Checks the JWT from the httpOnly cookie against the stored activeToken.
 * If the token does not match, the request is rejected.
 */
const verifyAdmin = async (req, res, next) => {
  const token = req.cookies.admin_token;
  if (!token) return res.status(401).json({ error: 'Authentication required.' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_Secret);
    const admin = await Admin.findById(decoded.id);
    if (!admin || admin.activeToken !== token) {
      return res
        .status(401)
        .json({ error: 'Session invalid or logged in from another device.' });
    }
    req.admin = admin;
    next();
  } catch (err) {
    console.error('Token verification error:', err);
    return res.status(401).json({ error: 'Invalid authentication token.' });
  }
};

module.exports = verifyAdmin;
