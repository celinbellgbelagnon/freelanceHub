import React, { useState, useEffect } from "react";
import styles from "./ProjetListClient.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa"; // ⬅️ Import des icônes

const ProjetListClient = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [interesses, setInteresses] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/projet/select/all")
      .then((response) => {
        const projetsData = response.data.Projet.map((projet_sub) => ({
          ...projet_sub,
          dateSoumissionFormatted: new Date(projet_sub.date_soumission).toLocaleDateString("fr-FR"),
        }));
        setProjets(projetsData);
        setLoading(false);

        projetsData.forEach((projet) => {
          axios
            .get(`http://localhost:5000/projet/select/interet/${projet.id}`)
            .then((res) => {
              setInteresses((prev) => ({
                ...prev,
                [projet.id]: res.data.interesses,
              }));
            })
            .catch(() => {
              setInteresses((prev) => ({
                ...prev,
                [projet.id]: [],
              }));
            });
        });
      })
      .catch(() => {
        setErreur("Erreur lors du chargement des projets");
        setLoading(false);
      });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const handleAjouterProjet = () => {
    navigate("/enregistrer-projet");
  };

  return (
    <div className={`${styles.container} ${darkMode ? styles.dark : styles.light}`}>
      <button className={styles.toggleButton} onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />} {darkMode ? "Mode clair" : "Mode sombre"}
      </button>

      <h2>Liste des Projets Soumis</h2>

      <button className={styles.addButton} onClick={handleAjouterProjet}>
        + Ajouter un projet
      </button>

      {loading ? (
        <p>Chargement des projets...</p>
      ) : erreur ? (
        <p className={styles.erreur}>{erreur}</p>
      ) : projets.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Titre</th>
              <th>Description</th>
              <th>Budget (€)</th>
              <th>Deadline</th>
              <th>Freelances intéressés</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet, index) => (
              <tr key={index}>
                <td data-label="Titre">{projet.titre_projet}</td>
                <td data-label="Description">{projet.description_projet}</td>
                <td data-label="Budget">{projet.budget} €</td>
                <td data-label="Deadline">{projet.dateSoumissionFormatted}</td>
                <td data-label="Freelances intéressés">
                  {interesses[projet.id] && interesses[projet.id].length > 0 ? (
                    <ul>
                      {interesses[projet.id].map((f, idx) => (
                        <li key={idx}>
                          {f.username}
                          {f.cv_pdf && (
                            <>
                              {" "}-{" "}
                              <a
                                href={`http://localhost:5000/${f.cv_pdf.replace(/\\/g, "/")}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{ color: "#007bff", textDecoration: "underline" }}
                              >
                                Voir le CV
                              </a>
                            </>
                          )}
                          {f.email && <> - {f.email}</>}
                          {f.specialite && <> - {f.specialite}</>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <span>Aucun</span>
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

export default ProjetListClient;
