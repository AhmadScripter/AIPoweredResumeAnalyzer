const mongoose = require('mongoose');

const jdSchema = new mongoose.Schema({
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
    jdText: {
        type: String,
        required: true
    },
    jdSkills: {
        type: [String],
        default: []
    },
    matchedSkills: {
        type: [String],
        default: []
    },
    missingSkills: {
        type: [String],
        default: []
    },
    matchScore: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

module.exports = mongoose.model('JobDescription', jdSchema);