import React from 'react';
import styles from './Footer.module.css';
import { FaFacebook, FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>Freelance<span>Hub</span></h1>
          <p className={styles.tagline}>Mettez en relation les meilleurs talents avec les meilleurs projets.</p>
        </div>

        <div className={styles.linksSection}>
          <div>
            <h4>Freelancers</h4>
            <ul>
              <li>Créer un profil</li>
              <li>Parcourir les offres</li>
              <li>Mes contrats</li>
            </ul>
          </div>
          <div>
            <h4>Clients</h4>
            <ul>
              <li>Poster un projet</li>
              <li>Parcourir les freelances</li>
              <li>Mes commandes</li>
            </ul>
          </div>
          <div>
            <h4>Support</h4>
            <ul>
              <li>FAQ</li>
              <li>Contact</li>
              <li>Conditions</li>
            </ul>
          </div>
        </div>

        <div className={styles.socialSection}>
          <h4>Suivez-nous</h4>
          <div className={styles.socialIcons}>
            <FaFacebook />
            <FaTwitter />
            <FaLinkedin />
            <FaGithub />
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>&copy; {new Date().getFullYear()} FreelanceConnect. Tous droits réservés.</p>
      </div>
    </footer>
  );
};

export default Footer;
