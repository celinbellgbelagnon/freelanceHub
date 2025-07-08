const express = require('express');
const router = express.Router();
const freelaceController = require('../Controllers/FreelanceCtrl');

router.post('/signup', freelaceController.uploadCv, freelaceController.signupUser);
router.post('/login', freelaceController.loginUser);



module.exports = router; 