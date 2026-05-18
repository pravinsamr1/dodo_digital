const mongoose = require('mongoose');

const SchoolSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    location: { type: String, required: true },
    city: { type: String, required: true },
    latitude: { type: String },
    longitude: { type: String },
    type: { type: String, enum: ['Boarding', 'Day School', 'Day Cum Boarding'], default: 'Boarding' },
    gender: { type: String, enum: ['Co-Ed', 'Boys', 'Girls'], default: 'Co-Ed' },
    board: { type: String },
    grade: { type: String },
    ratio: { type: String },
    languages: { type: String },
    admissionStatus: { type: String },
    documents: { type: String },
    interaction: { type: String },
    smartClasses: { type: String },
    labs: { type: String },
    library: { type: String },
    sports: { type: String },
    transport: { type: String },
    medical: { type: String },
    performingArts: { type: String },
    clubs: { type: String },
    sportsTraining: { type: String },
    outdoorTrips: { type: String },
    competitions: { type: String },
    dayFee: { type: String },
    boardingFee: { type: String },
    rating: { type: String },
    votes: { type: String },
    imagePath: { type: String }, // Path to stored main image (actual storage handling omitted for brevity)
    galleryPaths: [{ type: String }], // Paths to gallery images
    about: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('School', SchoolSchema);
