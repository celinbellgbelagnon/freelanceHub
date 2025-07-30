const database = require('../Config/mysql');

exports.getAllFreelances = (req, res) => {
  const sql = "SELECT id_user, username, email, telephone, specialite, date_inscription FROM user WHERE profil = 'freelance'";

  database.query(sql, (err, result) => {
    if (err) {
      console.error("Erreur lors de la récupération des freelances:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }

    res.status(200).json({ Freelancers: result });
  });
};