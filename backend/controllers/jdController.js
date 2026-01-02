const JobDescription = require('../models/JobDescription');
const Resume = require('../models/Resume');
const Analysis = require('../models/Analysis');
const extractSkills = require('../utils/extractSkills');

const analyzeJD = async (req, res) => {
    try {
        const { jdText, resumeId, jobTitle, company } = req.body;

        if (!jdText || !resumeId) {
            return res.status(400).json({ message: 'JD text and resume required' });
        }

        const resume = await Resume.findOne({
            _id: resumeId,
            user: req.user._id
        });

        if (!resume) {
            return res.status(404).json({ message: 'Resume not found' });
        }

        const jdSkills = extractSkills(jdText);

        const matchedSkills = jdSkills.filter(skill =>
            resume.skills.includes(skill)
        );

        const missingSkills = jdSkills.filter(skill =>
            !resume.skills.includes(skill)
        );

        const matchScore = jdSkills.length === 0
            ? 0
            : Math.round((matchedSkills.length / jdSkills.length) * 100);

        const jdAnalysis = await JobDescription.create({
            user: req.user._id,
            resume: resume._id,
            jdText,
            jobTitle,
            company,
            jdSkills,
            matchedSkills,
            missingSkills,
            matchScore
        });

        const newAnalysis = await Analysis.create({
            user: req.user._id,
            resume: resume._id,
            jobDescription: jdText,
            jobTitle,
            company,
            matchedSkills,
            missingSkills,
            matchPercentage: matchScore
        });

        res.status(200).json({
            message: 'JD analyzed successfully',
            analysisId: newAnalysis._id,
            matchScore,
            matchedSkills,
            missingSkills
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { analyzeJD };