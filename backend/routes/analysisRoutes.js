const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { getMyAnalysis, getAnalysisById } = require('../controllers/analysisController');

router.get('/history', protect, getMyAnalysis);
router.get('/:id', protect, getAnalysisById);

module.exports = router;