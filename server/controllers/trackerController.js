const Tracker = require('../models/Tracker');

const addTracker = async (req, res) => {
    try {
        const tracker = new Tracker(req.body);
        await tracker.save();
        res.status(200).json(tracker);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getTrackers = async (req, res) => {
    try {
        const trackers = await Tracker.find({ userId: req.params.userId });
        res.status(200).json(trackers);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { addTracker, getTrackers };
