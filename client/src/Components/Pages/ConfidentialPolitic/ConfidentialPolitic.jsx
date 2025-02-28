import React from "react";
import styles from "./PolitiqueConfidentialite.module.css";

const PolitiqueConfidentialite = () => {
  return (
    <div className={styles.container}>
      <h1>Politique de Confidentialité</h1>
      <p>Nous accordons une grande importance à la protection de vos données personnelles.</p>

      <ul className={styles.list}>
        <li><strong>1. Collecte des données :</strong> Nous collectons uniquement les données nécessaires pour offrir nos services.</li>
        <li><strong>2. Utilisation des données :</strong> Vos informations sont utilisées pour améliorer votre expérience et vous fournir des services adaptés.</li>
        <li><strong>3. Partage des données :</strong> Nous ne vendons ni ne partageons vos données personnelles avec des tiers sans votre consentement.</li>
        <li><strong>4. Sécurité :</strong> Nous mettons en place des mesures de sécurité pour protéger vos informations.</li>
        <li><strong>5. Vos droits :</strong> Vous avez le droit d'accéder, de modifier ou de supprimer vos données à tout moment.</li>
        <li><strong>6. Cookies :</strong> Notre site utilise des cookies pour améliorer votre expérience utilisateur.</li>
      </ul>

      <p className={styles.note}>
        Pour toute demande, contactez-nous à <strong>privacy@freelancehub.com</strong>.
      </p>
    </div>
  );
};

export default PolitiqueConfidentialite;
