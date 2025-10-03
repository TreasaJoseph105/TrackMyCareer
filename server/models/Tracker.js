const mongoose = require('mongoose');

const trackerSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    company: String,
    role: String,
    status: { type: String, enum: ['Applied','Interview','Rejected','Hired'], default: 'Applied' },
    deadline: Date,
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Tracker', trackerSchema);
