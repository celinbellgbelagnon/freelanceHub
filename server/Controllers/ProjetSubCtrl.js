const database = require('../Config/mysql');
const nodemailer = require("nodemailer");
require("dotenv").config();

// Ajouter un nouveau projet
exports.addnewProjet = (req, res) => {
  const query = 'INSERT INTO projet_sub (nom_client, email_client, telephone_client, titre_projet, description_projet, budget, date_soumission) VALUES (?, ?, ?, ?, ?, ?, ?)';

  const values = [
    req.body.clientNom,
    req.body.clientEmail,
    req.body.clientNumero,
    req.body.titreProjet,
    req.body.descriptionProjet,
    req.body.budget,
    req.body.dateSoumission
  ];

  database.query(query, values, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de l’ajout du projet' });
    }
    res.status(201).json({ message: 'Projet ajouté avec succès' });
  });
};

// Récupérer tous les projets
exports.getProjet = (req, res) => {
  const query = 'SELECT * FROM projet_sub';

  database.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
    }
    res.status(200).json({ Projet: result });
  });
};

// Ajouter un intérêt pour un projet
exports.ajouterInteret = (req, res) => {
  const { projetId, freelanceName } = req.body;

  // 1. Récupérer les infos du freelance
  const getFreelanceQuery = `
    SELECT * FROM user 
    WHERE username = ? AND profil = 'freelance'
  `;

  database.query(getFreelanceQuery, [freelanceName], (err, freelanceResults) => {
    if (err || freelanceResults.length === 0) {
      return res.status(400).json({ message: "Freelance introuvable" });
    }

    const freelance = freelanceResults[0];

    // 2. Enregistrer l’intérêt
    const insertQuery = 'INSERT INTO interet_projet (id_projet, id_freelance) VALUES (?, ?)';
    database.query(insertQuery, [projetId, freelance.id_user], (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'intérêt" });
      }

      // 3. Récupérer les infos du projet
      const getProjetQuery = "SELECT * FROM projet_sub WHERE id = ?";
      database.query(getProjetQuery, [projetId], (errProjet, projetResults) => {
        if (errProjet || projetResults.length === 0) {
          return res.status(500).json({ message: "Projet introuvable pour l'e-mail" });
        }

        const projet = projetResults[0];

        // 4. Préparer et envoyer l'e-mail
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS,
          },
        });

        const mailOptions = {
          from: process.env.MAIL_USER,
          to: "bellgbelagnon@gmail.com",
          subject: `Un freelance s'intéresse au projet "${projet.titre_projet}"`,
          html: `
            <h3>Un freelance s'est intéressé à un projet</h3>
            <p><strong>Nom d'utilisateur :</strong> ${freelance.username}</p>
            <p><strong>Email :</strong> ${freelance.email}</p>
            <p><strong>Téléphone :</strong> ${freelance.telephone}</p>
            <p><strong>Spécialité :</strong> ${freelance.specialite}</p>
            <p><strong>CV :</strong> <a href="http://localhost:5000/${freelance.cv_pdf.replace(/\\/g, '/')}" target="_blank">Télécharger le CV</a></p>

            <hr />
            <h4>Détails du projet :</h4>
            <ul>
              <li><strong>Titre :</strong> ${projet.titre_projet}</li>
              <li><strong>Description :</strong> ${projet.description_projet}</li>
              <li><strong>Client :</strong> ${projet.nom_client}</li>
              <li><strong>Email :</strong> ${projet.email_client}</li>
              <li><strong>Téléphone :</strong> ${projet.telephone_client}</li>
              <li><strong>Budget :</strong> ${projet.budget} €</li>
              <li><strong>Date de soumission :</strong> ${new Date(projet.date_soumission).toLocaleDateString("fr-FR")}</li>
            </ul>
          `,
        };

        transporter.sendMail(mailOptions, (mailErr, info) => {
          if (mailErr) {
            console.error("Erreur email :", mailErr);
          } else {
            console.log("Email envoyé :", info.response);
          }
        });

        res.status(201).json({ message: "Intérêt enregistré et email envoyé avec succès." });
      });
    });
  });
};


// Supprimer un intérêt
exports.supprimerInteret = (req, res) => {
  const { projetId, freelanceName } = req.body;

  const getUserIdQuery = "SELECT id_user FROM user WHERE username = ? AND profil = 'freelance'";
  database.query(getUserIdQuery, [freelanceName], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(400).json({ message: "Freelance introuvable" });
    }

    const id_user = userResults[0].id_user;
    const deleteQuery = 'DELETE FROM interet_projet WHERE id_projet = ? AND id_freelance = ?';

    database.query(deleteQuery, [projetId, id_user], (error) => {
      if (error) {
        return res.status(500).json({ message: "Erreur lors de la suppression de l’intérêt" });
      }

      res.status(200).json({ message: "Intérêt supprimé avec succès" });
    });
  });
};

// Récupérer les projets intéressés par un freelance
exports.getProjetsInteressesParFreelance = (req, res) => {
  const freelanceName = req.params.freelanceName;

  const getUserIdQuery = "SELECT id_user FROM user WHERE username = ? AND profil = 'freelance'";
  database.query(getUserIdQuery, [freelanceName], (err, userResults) => {
    if (err || userResults.length === 0) {
      return res.status(400).json({ message: "Freelance introuvable" });
    }

    const id_user = userResults[0].id_user;

    const getProjetsQuery = "SELECT id_projet FROM interet_projet WHERE id_freelance = ?";
    database.query(getProjetsQuery, [id_user], (error, results) => {
      if (error) {
        return res.status(500).json({ message: "Erreur lors de la récupération des projets intéressés" });
      }

      const projetsInteresses = results.map((r) => r.id_projet);
      res.status(200).json({ projetsInteresses });
    });
  });
};

exports.getInteressesParProjet = (req, res) => {
  const projetId = req.params.projetId;
  const query = `
    SELECT u.username, u.email, u.telephone, u.specialite, u.cv_pdf, i.date_interet
    FROM interet_projet i
    JOIN user u ON i.id_freelance = u.id_user
    WHERE i.id_projet = ? AND u.profil = 'freelance'
  `;
  database.query(query, [projetId], (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors de la récupération des freelances intéressés" });
    }
    res.status(200).json({ interesses: results });
  });
};