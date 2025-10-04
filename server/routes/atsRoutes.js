// routes/atsRoutes.js
const express = require("express");
const multer = require("multer");
const { parseResume } = require("../controllers/atsController");
const auth = require("../middleware/auth"); // your auth middleware
const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Protected ATS resume upload route
router.post("/upload", auth, upload.single("resume"), parseResume);

module.exports = router;
