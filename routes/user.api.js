const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const authController = require('../controller/authController');
router.post('/',userController.signup);
router.post('/login',userController.login);
router.get('/me',authController.authenticate,userController.getUser);

module.exports = router;