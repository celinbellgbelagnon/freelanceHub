const express = require('express');
const router =  express.Router();
const adminCtrl = require('../Controllers/AdminCtrl');

router.post('/signup', adminCtrl.signupadmin);
router.post('/login', adminCtrl.loginadmin);

module.exports = router;