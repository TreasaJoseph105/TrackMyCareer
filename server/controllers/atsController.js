const Resume = require('../models/Resume');
const { getATSScores } = require('../utils/atsAPI');

const uploadResume = async (req, res) => {
    try {
        const { userId, version, fileUrl } = req.body;
        const atsResult = await getATSScores(fileUrl);
        const resume = new Resume({
            userId, version, fileUrl, atsScore: atsResult.score, feedback: atsResult.feedback
        });
        await resume.save();
        res.status(200).json(resume);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

const getResumes = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.params.userId });
        res.status(200).json(resumes);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

module.exports = { uploadResume, getResumes };
