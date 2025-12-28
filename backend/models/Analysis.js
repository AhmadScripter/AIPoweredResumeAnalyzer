const mongoose = require('mongoose');

const analysisSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    resume: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true
    },

    jobDescription: {
        type: String,
        required: true
    },

    matchedSkills: {
        type: [String],
        default: []
    },

    missingSkills: {
        type: [String],
        default: []
    },

    matchPercentage: {
        type: Number,
        required: true
    }

}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);