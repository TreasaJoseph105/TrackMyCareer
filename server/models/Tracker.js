const mongoose = require("mongoose");

const trackerSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  company: { type: String, required: true },
  role: { type: String, required: true },
  status: { type: String, enum: ["Applied", "Interview", "Offer", "Rejected"], default: "Applied" },
  deadline: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("Tracker", trackerSchema);
