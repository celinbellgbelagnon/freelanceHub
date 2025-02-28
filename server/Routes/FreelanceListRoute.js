const express = require('express');
const router = express.Router();
const FreelanceListCtrl = require('../Controllers/FreelanceListCtrl');

router.get('/select/freelance', FreelanceListCtrl.getfreelancer);

module.exports = router;