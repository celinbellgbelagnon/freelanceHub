import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMailBulk, FaInstagram, FaGithub, FaYoutube, FaWhatsapp, FaShareAlt } from 'react-icons/fa';

const Footer = () => {
  const [open, setOpen] = useState(false);

  const toggleIcons = () => {
    setOpen(!open);
  };


  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.logoSection}>
          <h1 className={styles.logo}>
            Freelance<span>Hub</span>
          </h1>
          <p className={styles.tagline}>
            Mettez en relation les meilleurs talents avec les meilleurs projets.
          </p>
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
          <button className={styles.toggleButton} onClick={toggleIcons}>
            <FaShareAlt />
          </button>
          <div className={`${styles.socialIcons} ${open ? styles.open : ""}`}>
            <Link
              to="https://wa.me/22892508173"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaWhatsapp />
            </Link>
            <Link to="https://x.com/celinbell195">
              <FaTwitter />
            </Link>
            <Link to="mailto:celinbell195@gmail.com?subject=Contact%20via%20FreelanceHub&body=Bonjour%2C%20je%20souhaite%20vous%20contacter%20concernant%20votre%20profil%20Freelance.">
              <FaMailBulk />
            </Link>
            <Link to="https://www.facebook.com/antoine.gbelagnon.2025">
              <FaFacebookF />
            </Link>
            <Link to="https://www.linkedin.com/in/mawouko-antoine-gbelagnon-969b0a309/">
              <FaLinkedinIn />
            </Link>
            <Link to="https://www.instagram.com/celinbell195">
              <FaInstagram />
            </Link>
            <Link to="https://github.com/celinbellgbelagnon">
              <FaGithub />
            </Link>
            <Link to="https://www.youtube.com/@bellcelin">
              <FaYoutube />
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <p>
          &copy; {new Date().getFullYear()} FreelanceConnect. Tous droits
          réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;