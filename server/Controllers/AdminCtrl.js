const database = require('../Config/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


exports.signupadmin = (req, res) =>{
    console.log(req.body);

    const insertAdmin = 'INSERT INTO admin(username, email, password_admin, telephone) VALUES (?,?,?,?)';

    const {username, email, password, telephone} = req.body;
    if (!username || !email || !password || !telephone) {
        return res.status(401).json({ error: "Tous les champs sont obligatoires"});
    }

    bcrypt.hash(password, 5)
        .then((hash) => {
            database.query(insertAdmin, [username, email, hash, telephone], (error, result)=>{
                if (error) {
                    return res.status(500).json({ error: "Erreur lors de l'insertion de l'admin", details: error.message});
                }
                res.status(201).json({ message: "Admin créé avec succès", id: result.insertId });
            });
        })
        .catch((error) => {
            res.status(500).json({ error: "Erreur lors du hachage du mot de passe", details: error.message });
        });
}


exports.loginadmin = (req, res) => {
    console.log(req.body);

    const selectadminQuery = 'select * from admin where username = ?';
    database.query(selectadminQuery, [req.body.nom], (error, result)=>{
        if(error){
            return res.status(501).json({ error: error.message});
        }
        if (result.length > 0) {
            bcrypt.compare(req.body.password, result[0].password_admin)
            .then((valid) =>{
                if (valid) {
                    let accessToken = jwt.sign(
                        {id_admin: result[0].id_admin},
                        '12345678', // Remplacer par une clé secrète sécurisée
                        { expiresIn: '1h'}
                    );
                    res.status(201).json({ accessToken });
                } else{
                    res.status(401).json({ error: "Mot de passe incorect"});
                }
            })
            .catch((error) =>{
                res.status(501).json({ error: "erreur de comparaison", details: error.message });
            });
        } else {
            res.status(404).json({ error: "Admin not found"});
        }
    });
       
}