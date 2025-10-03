const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    version: { type: String, required: true },
    fileUrl: { type: String, required: true },
    atsScore: { type: Number },
    feedback: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);
