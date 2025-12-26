const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');
const { uploadResume, getMyResume } = require('../controllers/resumeController');

router.post('/upload', protect, upload.single('resume'), uploadResume);
router.get('/my', protect, getMyResume);

module.exports = router;