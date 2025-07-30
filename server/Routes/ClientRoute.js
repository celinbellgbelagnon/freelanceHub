const express = require('express');
const router = express.Router();
const clientController = require("../Controllers/ClientCtrl");

router.get("/select", clientController.getClients);
router.post("/contact", clientController.addContactMessage);
router.get("/messages/select", clientController.getContactMessages);

module.exports = router;

