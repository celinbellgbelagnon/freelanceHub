import React, { useState } from "react";
import styles from "./ProjetRegister.module.css";
import axios from 'axios';

const EnregistrerProjet = () => {
    let [clientNom, setClientNom] = useState('');
    let [clientEmail, setClientEmail] = useState('');
    let [clientNumero, setClientNumero] = useState('');
    let [titreProjet, setTitreProjet] = useState('');
    let [descriptionProjet, setDescriptionProjet] = useState('');
    let [budget, setBudget] = useState('');
    let [dateSoumission, setDateSoumission] = useState(new Date().toISOString().slice(0, 19).replace("T", " "));
    let [erreur, setErreur] = useState('');
    let [confirmationMessage, setConfirmationMessage] = useState('');
    let [showConfirmation, setShowConfirmation] = useState(false); // État pour afficher la page de confirmation

    let today = new Date();
    let todayString = today.toISOString().slice(0, 16);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!clientNom || !clientEmail || !clientNumero || !titreProjet || !descriptionProjet || !budget || !dateSoumission) {
            setErreur("Tous les champs obligatoires doivent être remplis !");
            return;
        }
        setErreur('');

        let projetSub = {
            clientNom,
            clientEmail,
            clientNumero,
            titreProjet,
            descriptionProjet,
            budget,
            dateSoumission
        };

        axios.post('http://localhost:5000/projet/update/add', projetSub)
            .then(() => {
                setConfirmationMessage('Projet enregistré avec succès !');
                setShowConfirmation(true); // Afficher la page de confirmation

                // Réinitialiser le formulaire
                setClientNom('');
                setClientEmail('');
                setClientNumero('');
                setTitreProjet('');
                setDescriptionProjet('');
                setBudget('');
                setDateSoumission(todayString);

                // Masquer la confirmation après 2 secondes
                setTimeout(() => {
                    setShowConfirmation(false);
                }, 2000);
            })
            .catch((error) => console.log(error));
    }

    return (
        <div className={styles.container}>
            {showConfirmation && confirmationMessage && (
                <div className={styles.confirmationPage}>
                    <h2>{confirmationMessage}</h2>
                </div>
            )}
            {!showConfirmation && (
                <>
                    <h2>Enregistrer un Projet</h2>
                    {erreur && <p className={styles.erreur}>{erreur}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Nom du client"
                            value={clientNom}
                            onChange={(e) => setClientNom(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email du client"
                            value={clientEmail}
                            onChange={(e) => setClientEmail(e.target.value)}
                            required
                        />
                        <input
                            type="tel"
                            placeholder="Téléphone du client"
                            value={clientNumero}
                            onChange={(e) => setClientNumero(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Titre du projet"
                            value={titreProjet}
                            onChange={(e) => setTitreProjet(e.target.value)}
                            required
                        />
                        <textarea
                            placeholder="Description du projet"
                            value={descriptionProjet}
                            onChange={(e) => setDescriptionProjet(e.target.value)}
                            required
                        />
                        <input
                            type="number"
                            placeholder="Budget (€)"
                            value={budget}
                            onChange={(e) => setBudget(e.target.value)}
                            required
                        />
                        <input
                            type="datetime-local"
                            value={dateSoumission}
                            onChange={(e) => setDateSoumission(e.target.value)}
                            min={todayString}
                        />
                        <button type="submit">Soumettre</button>
                    </form>
                </>
            )}
        </div>
    );
}

export default EnregistrerProjet;
