import React from "react";
import { Link } from "react-router-dom";
import styles from "./OptionConnect.module.css";

const OptionConnect = () => {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Connectez-vous comme un freelance ou un client</h2>
      <div className={styles.options}>
        <div className={styles.card}>
          <h3>Client</h3>
          <p>Accédez à des services de freelances et passez des commandes.</p>
          <div className={styles.buttons}>
            <Link to="/login" className={styles.button}>Se connecter</Link>
            {/* <Link to="/register-client" className={styles.secondaryButton}>S'inscrire</Link> */}
          </div>
        </div>
        <div className={styles.card}>
          <h3>Freelance</h3>
          <p>Rejoignez la communauté et proposez vos services.</p>
          <div className={styles.buttons}>
            <Link to="/login" className={styles.button}>Se connecter</Link>
            {/* <Link to="/register-freelance" className={styles.secondaryButton}>S'inscrire</Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptionConnect;
