import React, { useState, useEffect } from "react";
import styles from "./ProjectList.module.css";
import axios from "axios";
import { FaSun, FaMoon } from "react-icons/fa";


const ProjetList = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [interets, setInterets] = useState([]);

  const freelanceName = localStorage.getItem("name");

  // Charger les intérêts depuis localStorage (rapide, avant le backend)
  useEffect(() => {
    const savedInterets = localStorage.getItem("interets");
    if (savedInterets) {
      setInterets(JSON.parse(savedInterets));
    }
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projet/select/all")
      .then((response) => {
        setProjets(
          response.data.Projet.map((projet_sub) => ({
            ...projet_sub,
            date_soumission: new Date(projet_sub.date_soumission).toLocaleDateString("fr-FR"),
          }))
        );
        setLoading(false);

        // Récupérer les intérêts du backend
        axios
          .get(`http://localhost:5000/projet/interets/freelance/${freelanceName}`)
          .then((res) => {
            setInterets(res.data.projetsInteresses);
            localStorage.setItem("interets", JSON.stringify(res.data.projetsInteresses));
          })
          .catch(() => {
            setInterets([]);
            localStorage.removeItem("interets");
          });
      })
      .catch(() => {
        setErreur("Erreur lors du chargement des projets");
        setLoading(false);
      });
  }, [freelanceName]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleInteret = (projetId) => {
    const projet = projets.find((p) => p.id === projetId);

    axios
      .post("http://localhost:5000/projet/update/interet", {
        projetId,
        freelanceName,
      })
      .then(() => {
        const updated = [...interets, projetId];
        setInterets(updated);
        localStorage.setItem("interets", JSON.stringify(updated));
        alert("Votre intérêt a été enregistré !");

        axios
          .post("http://localhost:5000/send-email", {
            freelanceName,
            projetTitre: projet.titre_projet,
          })
          .then(() => console.log("Email envoyé"))
          .catch(() => alert("L’intérêt est enregistré, mais l’email n’a pas été envoyé."));
      })
      .catch(() => {
        alert("Erreur lors de l'enregistrement de votre intérêt.");
      });
  };

  const handleSupprimerInteret = (projetId) => {
    axios
      .post("http://localhost:5000/projet/delete/interet", {
        projetId,
        freelanceName,
      })
      .then(() => {
        const updated = interets.filter((id) => id !== projetId);
        setInterets(updated);
        localStorage.setItem("interets", JSON.stringify(updated));
        alert("Votre intérêt a été supprimé !");
      })
      .catch(() => {
        alert("Erreur lors de la suppression de votre intérêt.");
      });
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      <button className={styles.toggleButton} onClick={toggleDarkMode}>
        {darkMode ? (
        <>
          <FaSun style={{ marginRight: "8px" }} /> Mode clair
        </>
        ) : (
        <>
          <FaMoon style={{ marginRight: "8px" }} /> Mode sombre
        </>
        )}
      </button>

      <h2>Liste des Projets Soumis</h2>

      {loading ? (
        <p>Chargement des projets...</p>
      ) : erreur ? (
        <p className={styles.erreur}>{erreur}</p>
      ) : projets.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Client</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Description</th>
              <th>Budget (€)</th>
              <th>Date de Soumission</th>
              <th>Intéressé ?</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet, index) => (
              <tr key={index}>
                <td>{projet.titre_projet}</td>
                <td>{projet.nom_client}</td>
                <td>{projet.email_client}</td>
                <td>{projet.telephone_client}</td>
                <td>{projet.description_projet}</td>
                <td>{projet.budget} €</td>
                <td>{projet.date_soumission}</td>
                <td>
                  {interets.includes(projet.id) ? (
                    <button
                      onClick={() => handleSupprimerInteret(projet.id)}
                      className={styles.interetButton}
                      style={{ backgroundColor: "#e74c3c", color: "#fff" }}
                    >
                      Vous êtes intéressé<br />Supprimer ?
                    </button>
                  ) : (
                    <button
                      onClick={() => handleInteret(projet.id)}
                      className={styles.interetButton}
                    >
                      Je suis intéressé
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun projet soumis pour le moment.</p>
      )}
    </div>
  );
};

export default ProjetList;
