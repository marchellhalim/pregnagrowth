const express = require('express');
const router = express.Router();
const ProfileController = require('../controller/profileController');

router.get('/', ProfileController.getAllProfiles);
router.get('/:id', ProfileController.getProfileById);
router.post('/', ProfileController.createProfile);
router.put('/:id', ProfileController.updateProfile);

module.exports = router;