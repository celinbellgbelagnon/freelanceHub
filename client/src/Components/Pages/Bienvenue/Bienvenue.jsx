import React from "react";
import { Link } from "react-router-dom";
import styles from "./Bienvenue.module.css";

const Bienvenue = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>Bienvenue sur <span>FreelanceHub</span> !</h1>
        <p className={styles.subtitle}>
          Trouvez le freelance idéal pour réaliser vos projets ou soumettez votre propre projet.
        </p>

        {/* Conditions & Politique */}
        <div className={styles.legal}>
          <h2>📜 Conditions & Confidentialité</h2>
          <p>
            En utilisant notre plateforme, vous acceptez nos{" "}
            <Link to="/conditionUtilisation" className={styles.link}>
              Conditions d'utilisation
            </Link>{" "}
            et notre{" "}
            <Link to="/politiqueConfidentialite" className={styles.link}>
              Politique de confidentialité
            </Link>.
          </p>
        </div>

        {/* Bouton déplacé après la section légale */}
        <Link to="/signup" className={styles.button}>
          Oui j'accepte les conditions d'utilisations et la politique de confidentialité
        </Link>
      </div>
    </div>
  );
};

export default Bienvenue;
