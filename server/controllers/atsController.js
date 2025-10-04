// controllers/atsController.js
const fs = require("fs");
const axios = require("axios");
const Resume = require("../models/Resume"); // MongoDB model

exports.parseResume = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: "No file uploaded" });

    const filePath = req.file.path;

    // Example: Call ATS API (replace with actual API)
    const atsResponse = await axios.post(
      "https://api.apideck.com/ats/resume/parse",
      fs.createReadStream(filePath),
      {
        headers: {
          Authorization: `Bearer ${process.env.ATS_API_KEY}`,
          "Content-Type": "application/pdf",
        },
      }
    );

    // Save parsed data to DB
    const resume = new Resume({
      fileUrl: filePath,
      atsData: atsResponse.data,
      userId: req.user.id, // if auth is implemented
    });
    await resume.save();

    res.json({ message: "Resume parsed successfully", data: atsResponse.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to parse resume" });
  }
};
