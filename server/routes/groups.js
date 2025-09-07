const express = require('express');
const router = express.Router();
const groupController = require('../controllers/groupController');

// Create a group
router.post('/', groupController.createGroup);

// List all groups
router.get('/', groupController.listGroups);

// Join a group
router.post('/join', groupController.joinGroup);

// Leave a group
router.post('/leave', groupController.leaveGroup);

// Get user's group
router.get('/me/:userId', groupController.getUserGroup);

module.exports = router;