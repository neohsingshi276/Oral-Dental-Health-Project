// ============================================
// auth.routes.js — Auth Endpoints
// ============================================

const express = require('express');
const router = express.Router();
const { register, login, getMe } = require('../controllers/auth.controller');
const verifyToken = require('../middleware/verifyToken');

// POST /api/auth/register — create new admin
router.post('/register', register);

// POST /api/auth/login — admin login
router.post('/login', login);

// GET /api/auth/me — get current logged in admin (protected)
router.get('/me', verifyToken, getMe);

module.exports = router;
