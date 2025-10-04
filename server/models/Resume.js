// models/Resume.js
const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  fileUrl: String,
  atsData: Object,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Resume", ResumeSchema);
