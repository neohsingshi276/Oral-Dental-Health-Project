const express = require('express');
const router = express.Router();
const { saveScore, getLeaderboard, getCrosswordLeaderboard, getFinalLeaderboard } = require('../controllers/cp3.controller');

router.post('/score', saveScore);
router.get('/leaderboard/:session_id', getLeaderboard);
router.get('/crossword-leaderboard/:session_id', getCrosswordLeaderboard);
router.get('/final/:session_id', getFinalLeaderboard);

module.exports = router;
