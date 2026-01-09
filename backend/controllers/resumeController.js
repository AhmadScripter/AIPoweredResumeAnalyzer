const Resume = require('../models/Resume');
const fs = require('fs');
const pdfParse = require('pdf-parse');

const uploadResume = async (req, res) => {
    try {
        const filePath = req.file.path;

        const dataBuffer = fs.readFileSync(filePath);
        const pdfData = await pdfParse(dataBuffer);

        const resume = await Resume.create({
            user: req.user._id,
            originalName: req.file.originalname,
            fileName: req.file.filename,
            filePath: req.file.path,
            fileType: req.file.mimetype,
            fileSize: req.file.size,
            extractedText: pdfData.text
        });

        res.json(resume);
    } catch (error) {
        console.log(error);
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