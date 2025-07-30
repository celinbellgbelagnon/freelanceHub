import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjetRegister.module.css";
import { Sun } from "lucide-react"; // Icône de soleil
import axios from "axios";

const ProjetRegister = () => {
  const [clientNom, setClientNom] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientNumero, setClientNumero] = useState('+22890112233');
  const [titreProjet, setTitreProjet] = useState('');
  const [descriptionProjet, setDescriptionProjet] = useState('');
  const [budget, setBudget] = useState('');
  const [dateSoumission, setDateSoumission] = useState(new Date().toISOString().slice(0, 10));
  const [erreur, setErreur] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // 👈 dark mode ajouté

  const navigate = useNavigate();
  const todayString = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e) => {
  e.preventDefault();
  if (!clientNom || !clientEmail || !clientNumero || !titreProjet || !descriptionProjet || !budget || !dateSoumission) {
    setErreur("Tous les champs obligatoires doivent être remplis !");
    return;
  }

  setErreur('');

  const userId = localStorage.getItem("userId");

  const projetSub = {
    clientNom,
    clientEmail,
    clientNumero,
    titreProjet,
    descriptionProjet,
    budget,
    dateSoumission,
    userId // 🟢 ici on l'ajoute
  };

  axios.post('http://localhost:5000/projet/update/add', projetSub)
    .then(() => {
      setConfirmationMessage('Projet enregistré avec succès !');
      setShowConfirmation(true);

      // Réinitialisation
      setClientNom('');
      setClientEmail('');
      setClientNumero('');
      setTitreProjet('');
      setDescriptionProjet('');
      setBudget('');
      setDateSoumission(todayString);

      setTimeout(() => {
        setShowConfirmation(false);
        navigate('/projetListClient');
      }, 2000);
    })
    .catch((error) => console.log(error));
};


  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : ""}`}>
      <button
        className={styles.toggleButton}
        onClick={() => setDarkMode(!darkMode)}
        title="Changer le thème"
      >
        <Sun size={18} /> {darkMode ? "Mode clair" : "Mode sombre"}
      </button>

      {showConfirmation && confirmationMessage ? (
        <div className={styles.confirmationPage}>
          <h2>{confirmationMessage}</h2>
        </div>
      ) : (
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
              required
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
            <label htmlFor="deadline" className={styles.label}>
              Deadline du projet
            </label>
            <input
              type="date"
              value={dateSoumission}
              onChange={(e) => setDateSoumission(e.target.value)}
              min={todayString}
              required
            />
            <button type="submit">Soumettre</button>
          </form>
        </>
      )}
    </div>
  );
};

export default ProjetRegister;
