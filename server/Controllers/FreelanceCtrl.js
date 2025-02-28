const database = require('../Config/mysql')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


//Inscription
exports.signupFreelance = (req, res) => {
    console.log(req.body);
    
    const insertFreelance = 'INSERT INTO freelance(username, email, password_freelance, telephone, specialite, date_inscription) VALUES (?, ?, ?, ?, ?, ?)';

    // Vérifier si tous les champs sont bien envoyés
    const { username, email, password, telephone, specialite, date } = req.body;
    if (!username || !email || !password || !telephone || !specialite || !date) {
        return res.status(400).json({ error: 'Tous les champs sont obligatoires' });
    }

    bcrypt.hash(password, 5)
        .then((hash) => {
            database.query(insertFreelance, [username, email, hash, telephone, specialite, date], (error, result) => {
                if (error) {
                    return res.status(500).json({ error: "Erreur lors de l'insertion du freelance", details: error.message });
                }
                res.status(201).json({ message: "Freelance créé avec succès", id: result.insertId });
            });
        })
        .catch((error) => {
            res.status(500).json({ error: "Erreur lors du hachage du mot de passe", details: error.message });
        });
};


//connexion d4un freelance
exports.loginfreelance = (req, res)=>{
    console.log(req.body);

    let selectfreelanceQuery = 'select * FROM freelance where username = ?';
    database.query(selectfreelanceQuery, [req.body.nom], (error, result) => {
        if (error) {
            return res.status(501).json({ error: error.message });
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password_freelance)
                .then((valid) =>{
                    if (valid) {
                        let accessToken = jwt.sign(
                            { id_admin: result[0].id_admin},
                            '12345678', // Remplacer par une clé secrète sécurisée
                            { expiresIn: '1h'}
                        );
                        res.status(201).json({ accessToken });
                    } else {
                        res.status(401).json({ error: "Mot de passe incoresct"});
                    }
                })
                .catch((error) =>{
                    res,status(501).json({ error: "erreur de comparaison", details: error.message });
                });
        } else{
            res.status(404).json({ error: "Freelance not found"});    
        }
    })
}