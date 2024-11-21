const express = require('express');
const { register, login, getProfile, updateProfile, deleteAccount } = require('../controllers/userController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// User registration route
router.post('/register', register);

// User login route
router.post('/login', login);

// Get user profile (requires authentication)
router.get('/profile', authenticateToken, getProfile);

// Update user profile (requires authentication)
router.put('/profile', authenticateToken, updateProfile);

// Delete user account (requires authentication)
router.delete('/delete', authenticateToken, deleteAccount);

module.exports = router;
