const express = require('express');
const authController = require('../controller/authController');
const userController = require('../controller/userController');
const authMiddleware = require('../middleware/auth');
const router = express.Router();

router.post('/login', authController.login);    
router.post('/register', authController.register);
router.get('/users', authMiddleware.authenticationToken, authMiddleware.authorization, userController.getAllUsers);
// router.get('/users', userController.getAllUsers);

module.exports = router;