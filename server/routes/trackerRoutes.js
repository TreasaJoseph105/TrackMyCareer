const express = require("express");
const { getJobs, addJob, updateJob, deleteJob } = require("../controllers/trackerController");

const router = express.Router();

router.get("/", getJobs);
router.post("/", addJob);
router.put("/:id", updateJob);
router.delete("/:id", deleteJob);

module.exports = router;
