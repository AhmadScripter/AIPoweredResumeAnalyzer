const Analysis = require('../models/Analysis');

const getMyAnalysis = async (req, res) => {
    try {
        const analysis = await Analysis.find({ user: req.user._id })
            .populate('resume', 'originalName createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json({
            message: 'Analysis history fetched',
            analysis
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const getAnalysisById = async (req, res) => {
    try {
        const analysis = await Analysis.findOne({
            _id: req.params.id,
            user: req.user._id
        }).populate('resume');

        if (!analysis) {
            return res.status(404).json({ message: 'Analysis not found' });
        }

        res.json(analysis);

    } catch (error) {
        res.status(500).json({ message: 'Server error' })
    }
}

module.exports = { getMyAnalysis, getAnalysisById };