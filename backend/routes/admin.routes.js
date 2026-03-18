const express = require('express');
const router = express.Router();
const { getPlayers, downloadCSV, getAnalytics, getAllAdmins, addAdmin, deleteAdmin, updateProfile, changePassword } = require('../controllers/admin.controller');
const verifyToken = require('../middleware/verifyToken');

router.get('/players', verifyToken, getPlayers);
router.get('/download-csv', verifyToken, downloadCSV);
router.get('/analytics', verifyToken, getAnalytics);
router.get('/admins', verifyToken, getAllAdmins);
router.post('/admins', verifyToken, addAdmin);
router.delete('/admins/:id', verifyToken, deleteAdmin);
router.put('/profile', verifyToken, updateProfile);
router.put('/password', verifyToken, changePassword);

module.exports = router;
