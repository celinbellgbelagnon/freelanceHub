const database = require('../Config/mysql');


exports.getClients = (req, res) => {
  const sql = "SELECT id_user, username, email, telephone, specialite, date_inscription FROM user WHERE profil = 'client'";
  database.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des clients:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    res.status(200).json({ clients: result });
  });
};


//Message pour donner un avis
exports.addContactMessage = (req, res) => {
  const { nom, email, message } = req.body;

  if (!nom || !email || !message) {
    return res.status(400).json({ error: 'Tous les champs sont requis.' });
  }

  const query = `
    INSERT INTO contact_messages (nom, email, message)
    VALUES (?, ?, ?) 
  `;

  database.query(query, [nom, email, message], (err, result) => {
    if (err) {
  console.error('Erreur MySQL :', err.sqlMessage || err.message);
  return res.status(500).json({ error: err.sqlMessage || "Erreur serveur." });
}


    res.status(201).json({ message: "Message envoyé avec succès !" });
  });
};

// Récupérer les messages de contact
exports.getContactMessages = (req, res) => {
  const query = 'SELECT * FROM contact_messages ORDER BY date_envoi DESC';

  database.query(query, (err, results) => {
    if (err) {
      console.error('Erreur MySQL :', err.sqlMessage || err.message);
      return res.status(500).json({ error: err.sqlMessage || "Erreur serveur." });
    }
    res.status(200).json(results);
  });
};
