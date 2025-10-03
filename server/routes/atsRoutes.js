const express = require('express');
const router = express.Router();
const { uploadResume, getResumes } = require('../controllers/atsController');

router.post('/upload', uploadResume);
router.get('/:userId', getResumes);

module.exports = router;
