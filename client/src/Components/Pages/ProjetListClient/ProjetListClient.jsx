import React, { useState, useEffect } from "react";
import styles from "./ProjetListClient.module.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

const ProjetListClient = () => {
  const [projets, setProjets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erreur, setErreur] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [interesses, setInteresses] = useState({});
  const [showRemerciement, setShowRemerciement] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    // 🔐 Si l'utilisateur n'est pas connecté, rediriger vers la page de login
    if (!userId) {
      alert("Veuillez vous connecter pour accéder à vos projets.");
      navigate("/login");
      return;
    }

    axios
      .get(`http://localhost:5000/projet/projet/select/user/${userId}`)
      .then((response) => {
        const projetsData = response.data.Projet.map((projet) => ({
          ...projet,
          dateSoumissionFormatted: new Date(projet.date_soumission).toLocaleDateString("fr-FR"),
        }));

        setProjets(projetsData);
        setLoading(false);

        // Récupérer les freelances intéressés pour chaque projet
        projetsData.forEach((projet) => {
          axios
            .get(`http://localhost:5000/projet/select/interet/${projet.id}`)
            .then((res) => {
              setInteresses((prev) => ({
                ...prev,
                [projet.id]: res.data.interesses || [],
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
      .catch((err) => {
        console.error("Erreur lors du chargement des projets:", err);
        setErreur("Erreur lors du chargement des projets");
        setLoading(false);
      });
  }, [navigate]);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const handleAjouterProjet = () => navigate("/enregistrer-projet");

  const handleSignaler = (projetId) => {
    if (window.confirm("Confirmez-vous que vous avez trouvé un freelance ?")) {
      axios
        .post(`http://localhost:5000/projet/signaler/${projetId}`)
        .then(() => {
          setProjets((prev) => prev.filter((p) => p.id !== projetId));
          setShowRemerciement(true);
        })
        .catch(() => {
          alert("Erreur lors du signalement.");
        });
    }
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
              <th>J'ai trouvé un freelance</th>
            </tr>
          </thead>
          <tbody>
            {projets.map((projet) => (
              <tr key={projet.id}>
                <td>{projet.titre_projet}</td>
                <td>{projet.description_projet}</td>
                <td>{projet.budget} €</td>
                <td>{projet.dateSoumissionFormatted}</td>
                <td>
                  {interesses[projet.id]?.length > 0 ? (
                    <ul className={styles.freelanceList}>
  {interesses[projet.id].map((f, idx) => (
    <li key={idx} className={styles.freelanceItem}>
      <strong>{f.username}</strong><br />
      📧 Email : {f.email}<br />
      📞 Téléphone : {f.telephone}<br />
      🛠️ Spécialité : {f.specialite}<br />
      📅 Date d’intérêt : {new Date(f.date_interet).toLocaleDateString("fr-FR")}<br />
      {f.cv_pdf && (
        <a
          href={`http://localhost:5000/${f.cv_pdf.replace(/\\/g, "/")}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.cvLink}
        >
          📄 Voir le CV
        </a>
      )}
    </li>
  ))}
</ul>

                  ) : (
                    <span>Aucun</span>
                  )}
                </td>
                <td>
                  {interesses[projet.id]?.length > 0 ? (
                    <button
                      onClick={() => handleSignaler(projet.id)}
                      className={styles.signalButton}
                    >
                      J'ai trouvé un freelance
                    </button>
                  ) : null}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Aucun projet soumis pour le moment.</p>
      )}

      {showRemerciement && (
        <div className={styles.remerciementBox}>
          <div className={styles.remerciementContent}>
            <h3>Merci pour votre confiance !</h3>
            <p>Nous sommes ravis que vous ayez trouvé un freelance grâce à notre plateforme.</p>
            <button onClick={() => setShowRemerciement(false)} className={styles.okButton}>
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjetListClient;
