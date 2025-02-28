const database = require('../Config/mysql');

exports.getfreelancer = (req, res) =>{
    const getFreelancerQuery = 'SELECT username, email, telephone, specialite, date_inscription FROM freelance ORDER BY date_inscription DESC';
    database.query(getFreelancerQuery, (error, result) =>{
        if (error) {
            //Envoi d'un message d'erreur avec le code de statut 500
            return res.status(500).json({message: "Erreur lors de la recupearation des Freelancers"});
        }
        res.status(200).json({ Freelancers: result});
    });
}