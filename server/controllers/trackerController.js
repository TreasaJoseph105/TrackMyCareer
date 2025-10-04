const Tracker = require("../models/Tracker");

// Get all jobs for a user
const getJobs = async (req, res) => {
  try {
    const userId = req.userId || req.query.userId || req.body.userId || "demoUser";
    const jobs = await Tracker.find({ userId }).sort({ deadline: 1 });
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching jobs", error });
  }
};

// Add a job
const addJob = async (req, res) => {
  try {
    const userId = req.userId || req.body.userId || "demoUser";
    const job = new Tracker({ ...req.body, userId });
    await job.save();
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: "Error adding job", error });
  }
};

// Update a job
const updateJob = async (req, res) => {
  try {
    const updatedJob = await Tracker.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedJob);
  } catch (error) {
    res.status(500).json({ message: "Error updating job", error });
  }
};

// Delete a job
const deleteJob = async (req, res) => {
  try {
    await Tracker.findByIdAndDelete(req.params.id);
    res.json({ message: "Job deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting job", error });
  }
};

module.exports = { getJobs, addJob, updateJob, deleteJob };
