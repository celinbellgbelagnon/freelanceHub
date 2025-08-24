const database = require('../Config/mysql');
const nodemailer = require("nodemailer");
require("dotenv").config();

// Ajouter un nouveau projet
exports.addnewProjet = (req, res) => {
  const { titreProjet, descriptionProjet, budget, userId } = req.body;

  if (!titreProjet || !userId) {
    return res.status(400).json({ message: "Titre du projet et ID utilisateur sont obligatoires" });
  }

  const dateSoumission = new Date();

  const insertQuery = `
    INSERT INTO projet_sub
    (titre_projet, description_projet, budget, date_soumission, id_user)
    VALUES (?, ?, ?, ?, ?)
  `;

  const values = [
    titreProjet,
    descriptionProjet || null,
    budget || null,
    dateSoumission,
    userId
  ];

  database.query(insertQuery, values, (error, result) => {
    if (error) return res.status(500).json({ message: "Erreur lors de l’ajout du projet", error });
    res.status(201).json({ message: "Projet ajouté avec succès", id: result.insertId });
  });
};


// Récupérer tous les projets
exports.getProjet = (req, res) => {
  const query = `
    SELECT p.id, p.titre_projet, p.description_projet, p.budget, p.date_soumission, 
           u.username AS nom_client, u.email AS email_client
    FROM projet_sub p
    JOIN user u ON p.id_user = u.id_user
    ORDER BY p.date_soumission ASC
  `;

  database.query(query, (error, result) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors de la récupération des projets", error });
    }
    res.status(200).json({ Projet: result });
  });
};


// Récupérer un projet par son ID
exports.getProjetById = (req, res) => {
  const { id } = req.params;

  database.query("SELECT * FROM projet_sub WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Erreur SQL :", err);
      return res.status(500).json({ error: err.message });
    }

    if (result.length === 0) {
      return res.status(404).json({ error: "Projet non trouvé" });
    }

    res.json({ projet: result[0] });
  });
};


// Récupérer les projets d'un client spécifique
exports.getProjetParClient = (req, res) => {
  const userId = req.params.userId;
  const query = 'SELECT * FROM projet_sub WHERE id_user = ?';
  database.query(query, [userId], (error, result) => {
    if (error) {
      return res.status(500).json({ message: 'Erreur lors de la récupération des projets du client' });
    }
    res.status(200).json({ Projet: result });
  });
};


// Ajouter un intérêt pour un projet
exports.ajouterInteret = (req, res) => {
  const { projetId, freelanceId } = req.body;

  if (!projetId || !freelanceId) {
    return res.status(400).json({ message: "projetId ou freelanceId manquant" });
  }

  // Récupérer les infos du freelance
  const getFreelanceQuery = `SELECT * FROM user WHERE id_user = ? AND profil = 'freelance'`;

  database.query(getFreelanceQuery, [freelanceId], (err, freelanceResults) => {
    if (err || freelanceResults.length === 0) {
      return res.status(400).json({ message: "Freelance introuvable" });
    }

    const freelance = freelanceResults[0];

    // Enregistrer l’intérêt
    const insertQuery = 'INSERT INTO interet_projet (id_projet, id_freelance) VALUES (?, ?)';
    database.query(insertQuery, [projetId, freelanceId], (insertErr) => {
      if (insertErr) {
        return res.status(500).json({ message: "Erreur lors de l'enregistrement de l'intérêt" });
      }

      // Récupérer les infos du projet
      const getProjetQuery = `
  SELECT p.*, u.username AS nom_client, u.email AS email_client, u.telephone AS telephone_client
  FROM projet_sub p
  JOIN user u ON p.id_user = u.id_user
  WHERE p.id = ?
`;

      database.query(getProjetQuery, [projetId], (errProjet, projetResults) => {
        if (errProjet || projetResults.length === 0) {
          return res.status(500).json({ message: "Projet introuvable pour l'e-mail" });
        }

        const projet = projetResults[0];

        // Préparer et envoyer l'e-mail
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
exports.getInteretsByFreelance = (req, res) => {
  const { id } = req.params;

  const query = "SELECT id_projet FROM interet_projet WHERE id_freelance = ?";
  database.query(query, [id], (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors de la récupération des intérêts", err });
    }

    res.status(200).json({ projetsInteresses: results });
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

// Récupérer les freelances intéressés par un projet
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


//signaler un projet ayant trouvé un freelance
exports.signalerProjet = (req, res) => {
  const projetId = req.params.projetId;

  const checkQuery = "SELECT est_signale FROM projet_sub WHERE id = ?";
  database.query(checkQuery, [projetId], (checkErr, result) => {
    if (checkErr || result.length === 0) {
      return res.status(400).json({ message: "Projet introuvable" });
    }

    if (result[0].est_signale === 1) {
      return res.status(409).json({ message: "Ce projet a déjà été signalé." });
    }

    const updateQuery = "UPDATE projet_sub SET est_signale = 1 WHERE id = ?";
    database.query(updateQuery, [projetId], (error) => {
      if (error) {
        return res.status(500).json({ message: "Erreur lors du signalement" });
      }

      res.status(200).json({ message: "Projet signalé avec succès" });
    });
  });
};


// Récupérer tous les projets signalés comme servis
exports.getProjetsServis = (req, res) => {
  const query = "SELECT * FROM projet_sub WHERE est_signale = 1 OR projet_servi = 1";

  database.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors de la récupération des projets servis" });
    }

    res.status(200).json({ projetsServis: results });
  });
};


// Comptage des projets
exports.countProjets = (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM projet_sub";

  database.query(query, (error, results) => {
    if (error) {
      return res.status(500).json({ message: "Erreur lors du comptage des projets" });
    }

    res.status(200).json({ total: results[0].total });
  });
};