const express = require('express');
const router = express.Router();
const freelaceController = require('../Controllers/FreelanceCtrl');

router.post('/signup', freelaceController.signupFreelance);
router.post('/login', freelaceController.loginfreelance);



module.exports = router;