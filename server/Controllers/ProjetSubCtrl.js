const database = require('../Config/mysql');

exports.addnewProjet = (req, res) =>{
    const addNewquery = 'INSERT INTO projet_sub (nom_client, email_client, telephone_client, titre_projet, description_projet, budget, date_soumission) VALUES (?,?,?,?,?,?,?)';

    database.query(
        addNewquery,
        [
            req.body.clientNom,
            req.body.clientEmail,
            req.body.clientNumero,
            req.body.titreProjet, 
            req.body.descriptionProjet,
            req.body.budget,
            req.body.dateSoumission
        ],
        (error, result) =>{
            if (error) throw error;
            res.status(201).json({message: 'Projet ajouter avec succes'})
        }
    )
}

exports.getProjet = (req, res) =>{
    const getProjetQuery = 'SELECT * FROM projet_sub';
    database.query(getProjetQuery, (error, result) => {
        if (error) {
            // Envoi d'un message d'erreur avec le code de statut 500
            return res.status(500).json({ message: 'Erreur lors de la récupération des projets' });
        }
        res.status(200).json({ Projet: result });
    });
} 