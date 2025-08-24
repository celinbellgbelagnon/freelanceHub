import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ProjetRegister.module.css";
import { Sun } from "lucide-react";
import axios from "axios";

const ProjetRegister = () => {
  const [titreProjet, setTitreProjet] = useState('');
  const [descriptionProjet, setDescriptionProjet] = useState('');
  const [budget, setBudget] = useState('');
  const [dateSoumission, setDateSoumission] = useState(new Date().toISOString().slice(0, 10));
  const [erreur, setErreur] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

   const navigate = useNavigate();
  const todayString = new Date().toISOString().slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!titreProjet || !descriptionProjet || !budget || !dateSoumission) {
      setErreur("Tous les champs obligatoires doivent être remplis !");
      return;
    }

    setErreur("");

    // 🔹 Récupérer userId depuis localStorage
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErreur("Utilisateur non connecté !");
      return;
    }

    const projetSub = {
      titreProjet,
      descriptionProjet,
      budget,
      dateSoumission,
      userId
    };

    axios.post("http://localhost:5000/projet/update/add", projetSub)
      .then(() => {
        setConfirmationMessage("Projet enregistré avec succès !");
        setShowConfirmation(true);

        // Réinitialisation
        setTitreProjet("");
        setDescriptionProjet("");
        setBudget("");
        setDateSoumission(todayString);

        setTimeout(() => {
          setShowConfirmation(false);
          navigate("/projetListClient");
        }, 2000);
      })
      .catch((error) => {
        console.error("Erreur ajout projet :", error);
        setErreur("Impossible d'enregistrer le projet.");
      });
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
              placeholder="Budget (FCFA)"
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
