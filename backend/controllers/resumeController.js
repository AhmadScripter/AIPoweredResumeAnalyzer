const Resume = require('../models/Resume');

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'Resume file required' });
        }

        const resume = await Resume.create({
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size
        });
        res.status(201).json({
            resume
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const getMyResume = async (req, res) => {
    try {
        const resumes = await Resume.find({ user: req.user._id }).sort({ createdAt: -1 });
        res.status(200).json({ message: 'resume fetched successfully', resumes })
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { uploadResume, getMyResume };