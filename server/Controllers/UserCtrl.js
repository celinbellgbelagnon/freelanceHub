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

exports.signupUser = (req, res) => {
    const { username, email, password, telephone, specialite, profil, date } = req.body;
    const cv_pdf = req.file ? req.file.path : null;

    // Vérification des champs obligatoires
    if (!username || !email || !password || !profil || !date) {
        return res.status(400).json({ error: 'Tous les champs obligatoires doivent être remplis' });
    }

    // Validation renforcée de l'adresse e-mail
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|org|net|edu|info|io|co|sn|tg|cm|biz)$/i;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ error: "L'adresse e-mail est invalide. Elle doit se terminer par .com, .fr, etc." });
    }

    // CV obligatoire pour les freelances
    if (profil === 'freelance' && !cv_pdf) {
        return res.status(400).json({ error: 'Le CV PDF est obligatoire pour les freelances.' });
    }

    bcrypt.hash(password, 5)
        .then((hash) => {
            const insertUser = 'INSERT INTO user(username, email, password, telephone, specialite, date_inscription, profil, cv_pdf) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
            database.query(
                insertUser,
                [username, email, hash, telephone, specialite, date, profil, cv_pdf],
                (error, result) => {
                    if (error) {
                        return res.status(500).json({ error: "Erreur lors de l'insertion de l'utilisateur", details: error.message });
                    }
                    res.status(201).json({ message: "Utilisateur créé avec succès", id: result.insertId });
                }
            );
        })
        .catch((error) => {
            res.status(500).json({ error: "Erreur lors du hachage du mot de passe", details: error.message });
        });
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
                            { id_user: result[0].id_user, profil: result[0].profil },
                            '12345678', // Remplacer par une clé secrète sécurisée
                            { expiresIn: '1h' }
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

exports.uploadCv = upload.single('cv_pdf');