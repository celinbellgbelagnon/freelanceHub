import React, { useState, useEffect } from "react";
import styles from "./ProjectList.module.css";
import axios from "axios";

const ProjetList = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:5000/projet/select/all")
      .then((response) => {
        setProjets(
          response.data.Projet.map((projet_sub) => ({
            ...projet_sub,
            dateSoumission: new Date(projet_sub.dateSoumission).toLocaleDateString("fr-FR"),
          }))
        );
        setLoading(false);
      })
      .catch((error) => {
        setErreur("Erreur lors du chargement des projets");
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      <button className={styles.toggleButton} onClick={toggleDarkMode}>
        {darkMode ? "Mode clair" : "Mode sombre"}
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
