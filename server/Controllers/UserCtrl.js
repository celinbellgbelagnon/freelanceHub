const database = require('../Config/mysql'); 
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');

// Configuration de multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/cv/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, true);
    else cb(new Error('Seuls les fichiers PDF sont autorisés !'), false);
  }
});

// Inscription utilisateur (freelance ou client)

exports.signupUser =  (req, res) => {
  try {
    const { username, email, password, telephone, specialite, profil } = req.body;

    // Vérifier si tous les champs obligatoires sont fournis
    if (!username || !email || !password || !profil) {
      return res.status(400).json({ message: "Veuillez remplir tous les champs obligatoires." });
    }

    // Si profil = freelance, CV obligatoire
    let cvPath = null;
    if (profil === "freelance") {
      if (!req.file) {
        return res.status(400).json({ message: "Le CV est obligatoire pour un profil freelance." });
      }
      cvPath = req.file.filename; // on enregistre seulement le nom du fichier
    }

    // Vérifier si l'email existe déjà
    database.query("SELECT * FROM user WHERE email = ?", [email], async (err, result) => {
      if (err) return res.status(500).json({ message: "Erreur serveur", error: err });

      if (result.length > 0) {
        return res.status(400).json({ message: "Cet email est déjà utilisé." });
      }

      // Hasher le mot de passe
      const hashedPassword = await bcrypt.hash(password, 10);

      // Insérer dans la base
      const sql = `
        INSERT INTO user 
        (username, email, password, telephone, specialite, date_inscription, profil, cv_pdf) 
        VALUES (?, ?, ?, ?, ?, NOW(), ?, ?)
      `;

      database.query(
        sql,
        [username, email, hashedPassword, telephone || null, specialite || null, profil, cvPath],
        (err, result) => {
          if (err) return res.status(500).json({ message: "Erreur d'insertion", error: err });

          res.status(201).json({ message: "Utilisateur créé avec succès", id: result.insertId });
        }
      );
    });

  } catch (error) {
    res.status(500).json({ message: "Erreur serveur", error });
  }
};


// Connexion utilisateur
exports.loginUser = (req, res) => {
    const { nom, password } = req.body;
    let selectUserQuery = 'SELECT * FROM user WHERE username = ?';
    database.query(selectUserQuery, [nom], (error, result) => {
        if (error) {
            return res.status(501).json({ error: error.message });
        }
        if (result.length > 0) {
            bcrypt.compare(password, result[0].password)
                .then((valid) => {
                    if (valid) {
                        let accessToken = jwt.sign(
                            {
                                id_user: result[0].id_user,
                                profil: result[0].profil,
                                username: result[0].username // ✅ ajout du username
                            },
                            '12345678', // ⚠️ Mets une clé secrète forte
                            { expiresIn: '24h' }
                        );
                        res.status(201).json({ accessToken });
                    } else {
                        res.status(401).json({ error: "Mot de passe incorrect" });
                    }
                })
                .catch((error) => {
                    res.status(501).json({ error: "Erreur de comparaison", details: error.message });
                });
        } else {
            res.status(404).json({ error: "Utilisateur non trouvé" });
        }
    });
};

// Comptage des freelances
exports.countFreelances = (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM user where profil = 'freelance'";
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors du comptage des freelances" });
    }
    res.json({ total: result[0].total });
  });
};


//comtage de tous les users
exports.countUsers = (req, res) => {
  const query = "SELECT COUNT(*) AS total FROM user";
  database.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Erreur lors du comptage des users" });
    }
    res.json({ total: result[0].total });
  });
};

// Récupérer infos user
exports.getUserById = (req, res) => {
  const { id } = req.params;
  const query = "SELECT * FROM user WHERE id_user = ?";
  database.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.length === 0) return res.status(404).json({ error: "Utilisateur non trouvé" });
    res.json(result[0]);
  });
};


const storagePhoto = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/photos/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const uploadPhoto = multer({ storage: storagePhoto });

exports.uploadPhotoMiddleware = uploadPhoto.single("photo");

exports.uploadPhoto = (req, res) => {
  const { id } = req.params;
  if (!req.file) return res.status(400).json({ error: "Aucune photo envoyée" });

  const photoPath = "uploads/photos/" + req.file.filename;
  const query = "UPDATE user SET photo = ? WHERE id_user = ?";
  database.query(query, [photoPath, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Photo mise à jour", photo: photoPath });
  });
};


exports.uploadCv = upload.single('cv_pdf');