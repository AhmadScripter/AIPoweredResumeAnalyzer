const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getMyAnalysis } = require('../controllers/analysisController');

router.get('/history', protect, getMyAnalysis);

module.exports = router;