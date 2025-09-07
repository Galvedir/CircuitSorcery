const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/profile', auth, userController.getProfile);
router.put('/profile', auth, userController.updateProfile);

// Get user by ID (for refreshUser)
router.get('/:id', userController.getUserById);

// List all users
router.get('/', userController.listUsers);

// Update user by ID
router.put('/:id', userController.updateUserById);

// ...other user routes...

module.exports = router;