const express = require('express');
const router = express.Router();
const userController = require('../Controllers/UserCtrl'); 

router.post('/signup', userController.signupUser); 
router.post('/login', userController.loginUser);
router.get('/count/freelances', userController.countFreelances);
router.get('/count', userController.countUsers);   

module.exports = router; 