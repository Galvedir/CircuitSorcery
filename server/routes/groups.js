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

// Invite a user to a group
router.post('/invite', groupController.inviteUser);

// List all invites for a user
router.get('/invites', groupController.listInvites);

// Accept an invite to a group
router.post('/accept-invite', groupController.acceptInvite);

// Deny an invite to a group
router.post('/deny-invite', groupController.denyInvite);

module.exports = router;