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

module.exports = { getMyAnalysis };