const express = require('express');
const router = express.Router();
const ProjetSubctrl = require('../Controllers/ProjetSubCtrl');

router.post('/update/add', ProjetSubctrl.addnewProjet);
router.get('/select/all', ProjetSubctrl.getProjet);
router.get('/select/interet/:projetId', ProjetSubctrl.getInteressesParProjet);
router.post('/update/interet', ProjetSubctrl.ajouterInteret);
router.post('/delete/interet', ProjetSubctrl.supprimerInteret); 
router.get('/interets/freelance/:id', ProjetSubctrl.getInteretsByFreelance);
router.post('/signaler/:projetId', ProjetSubctrl.signalerProjet);
router.get('/projets/servis', ProjetSubctrl.getProjetsServis);
router.get('/projet/select/user/:userId', ProjetSubctrl.getProjetParClient); // 🆕
router.get('/count', ProjetSubctrl.countProjets);
router.get('/select/:id', ProjetSubctrl.getProjetById); 




module.exports = router;