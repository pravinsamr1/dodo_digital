const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middleware/verifyAdmin');
const path = require('path');
const multer = require('multer');

// Multer storage configuration (same as in admin.js)
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

// POST /api/admin/add-school
router.post('/', verifyAdmin, upload.fields([
  { name: 'image', maxCount: 1 },
  { name: 'gallery', maxCount: 10 }
]), async (req, res) => {
  try {
    const data = req.body;
    const School = require('../models/School');
    const school = new School({
      name: data.name,
      location: data.location,
      city: data.city,
      latitude: data.latitude,
      longitude: data.longitude,
      type: data.type,
      gender: data.gender,
      board: data.board,
      grade: data.grade,
      ratio: data.ratio,
      languages: data.languages,
      admissionStatus: data.admissionStatus,
      documents: data.documents,
      interaction: data.interaction,
      smartClasses: data.smartClasses,
      labs: data.labs,
      library: data.library,
      sports: data.sports,
      transport: data.transport,
      medical: data.medical,
      performingArts: data.performingArts,
      clubs: data.clubs,
      sportsTraining: data.sportsTraining,
      outdoorTrips: data.outdoorTrips,
      competitions: data.competitions,
      dayFee: data.dayFee,
      boardingFee: data.boardingFee,
      rating: data.rating,
      votes: data.votes,
      about: data.about,
      imagePath: req.files['image'] ? req.files['image'][0].path : null,
      galleryPaths: req.files['gallery'] ? req.files['gallery'].map(f => f.path) : []
    });
    await school.save();
    res.status(201).json({ message: 'School added successfully', school });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error while adding school' });
  }
});

module.exports = router;
