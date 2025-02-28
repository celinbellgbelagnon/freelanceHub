import React from "react";
import styles from "./ConditionsUtilisation.module.css";

const ConditionsUtilisation = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1>Conditions d'utilisation</h1>
        <p>Bienvenue sur FreelanceHub ! En utilisant notre plateforme, vous acceptez les conditions suivantes :</p>

        <ul className={styles.list}>
          <li><strong>1. Acceptation :</strong> En accédant à notre service, vous acceptez ces conditions.</li>
          <li><strong>2. Compte utilisateur :</strong> Vous êtes responsable de la confidentialité de votre compte.</li>
          <li><strong>3. Utilisation autorisée :</strong> L'utilisation du site est réservée à des fins légales.</li>
          <li><strong>4. Paiements :</strong> Toutes les transactions doivent être effectuées via nos moyens sécurisés.</li>
          <li><strong>5. Contenu :</strong> Vous ne devez pas publier de contenu illégal ou inapproprié.</li>
          <li><strong>6. Modification :</strong> Nous nous réservons le droit de modifier ces conditions à tout moment.</li>
        </ul>

        <p className={styles.note}>
          Pour toute question, contactez-nous à <strong>support@freelancehub.com</strong>.
        </p>
      </div>
    </div>
  );
};

export default ConditionsUtilisation;
