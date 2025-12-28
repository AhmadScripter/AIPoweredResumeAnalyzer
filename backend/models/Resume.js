const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    originalName: {
        type: String,
        require: true
    },
    fileName: {
        type: String,
        require: true
    },
    filePath: {
        type: String,
        required: true
    },

    fileType: {
        type: String,
        required: true
    },

    fileSize: {
        type: Number,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        default: []
    }
},
    { timestamps: true }
)

module.exports = mongoose.model('Resume', resumeSchema);