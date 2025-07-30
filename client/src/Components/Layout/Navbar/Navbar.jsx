import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { FaUserTie, FaBriefcase, FaHome, FaCogs, FaInfoCircle } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const location = useLocation();

  useEffect(() => {
    const name = localStorage.getItem("username");
    if (name) setUsername(name);
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Affiche le username freelance sur /projectList, "client" sur /projetListClient, sinon "Se connecter"
  let showUsername = "Se connecter";
  if (location.pathname.includes("/projectList") && username) {
    showUsername = username;
  } else if (location.pathname.includes("/projetListClient")) {
    showUsername = "client";
  }

  return (
    <div>
      <header className={styles.navbar}>
        <div className={styles.logo}>
          <span></span>
          <span className={styles.blue}>freelance</span>
          <span className={styles.bold}>Hub</span>
        </div>
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <FaHome className={styles.icon} /> Acceuil
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            <FaCogs className={styles.icon} /> Services
          </Link>
          <Link to="/savoirPlus" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle className={styles.icon} /> À propos
          </Link>
        </nav>

        <div className={styles.actions}>
          <button className={styles.connexion}>
            <Link to="/bienvenue" className={styles.link}>
              <FaUserTie className={styles.icon2} />{" "}
              {showUsername}
            </Link>
          </button>
          <div className={styles.lang}>
            <img src="https://flagcdn.com/tg.svg" alt="FR" />
          </div>
        </div>
      </header>

      <Outlet />
    </div>
  );
};

export default Navbar;