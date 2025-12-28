const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware');
const { analyzeJD } = require('../controllers/jdController');

router.post('/analyze', protect, analyzeJD);

module.exports = router;