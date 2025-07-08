const express = require('express');
const router = express.Router();
const ProjetSubctrl = require('../Controllers/ProjetSubCtrl');

router.post('/update/add', ProjetSubctrl.addnewProjet);
router.get('/select/all', ProjetSubctrl.getProjet);
router.get('/select/interet/:projetId', ProjetSubctrl.getInteressesParProjet);
router.post('/update/interet', ProjetSubctrl.ajouterInteret);
router.post('/delete/interet', ProjetSubctrl.supprimerInteret); // déjà défini
router.get('/interets/freelance/:freelanceName', ProjetSubctrl.getProjetsInteressesParFreelance); // 🆕

module.exports = router;
