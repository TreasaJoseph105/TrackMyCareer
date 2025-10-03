const express = require('express');
const router = express.Router();
const { addTracker, getTrackers } = require('../controllers/trackerController');

router.post('/', addTracker);
router.get('/:userId', getTrackers);

module.exports = router;
