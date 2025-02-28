const express = require('express');
const router = express.Router();
const ProjetSubctrl = require('../Controllers/ProjetSubCtrl');

router.post('/update/add', ProjetSubctrl.addnewProjet);
router.get('/select/all', ProjetSubctrl.getProjet);
 
module.exports = router;