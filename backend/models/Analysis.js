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
    jobTitle: { type: String },
    company: { type: String },

    matchedSkills: [{ type: String }],
    missingSkills: [
        {
            skill: { type: String, required: true },
            type: { type: String, enum: ['core', 'optional'], required: true }
        }
    ],

    matchPercentage: {
        type: Number,
        required: true
    },
    experienceLevel: { type: String },
    aiSummary: { type: String },
    aiSuggestions: {
        type: [String],
        default: []
    }

}, { timestamps: true });

module.exports = mongoose.model('Analysis', analysisSchema);