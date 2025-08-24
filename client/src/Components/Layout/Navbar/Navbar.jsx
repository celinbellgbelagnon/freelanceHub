import React, { useState, useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { FaUserTie, FaHome, FaCogs, FaInfoCircle, FaProjectDiagram } from "react-icons/fa";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [profil, setProfil] = useState(""); // 👈 on stocke le rôle (client/freelance)
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const name = localStorage.getItem("username");
    const role = localStorage.getItem("profil"); // 👈 récupéré au login
    if (name) setUsername(name);
    if (role) setProfil(role);
  }, [location]); // maj à chaque navigation

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    localStorage.removeItem("profil");
    setUsername("");
    setProfil("");
    navigate("/login"); 
  };

  return (
    <div>
      <header className={styles.navbar}>
        {/* Logo */}
        <div className={styles.logo}>
          <span></span>
          <span className={styles.blue}>freelance</span>
          <span className={styles.bold}>Hub</span>
        </div>

        {/* Menu burger */}
        <div className={styles.hamburger} onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Liens */}
        <nav className={`${styles.links} ${menuOpen ? styles.active : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <FaHome className={styles.icon} /> Accueil
          </Link>
          <Link to="/services" onClick={() => setMenuOpen(false)}>
            <FaCogs className={styles.icon} /> Services
          </Link>
          <Link to="/savoirPlus" onClick={() => setMenuOpen(false)}>
            <FaInfoCircle className={styles.icon} /> À propos
          </Link>

          {/* 👇 Liens conditionnels selon le rôle */}
          {profil === "client" && (
            <Link to="/projetListClient" onClick={() => setMenuOpen(false)}>
              <FaProjectDiagram className={styles.icon} /> Mes projets
            </Link>
          )}

          {profil === "freelance" && (
            <Link to="/projectList" onClick={() => setMenuOpen(false)}>
              <FaProjectDiagram className={styles.icon} /> Projets disponibles
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className={styles.actions}>
          {username ? (
            <>
              <button
                className={styles.connexion}
                onClick={() => navigate("/profilUser")}
              >
                <FaUserTie className={styles.icon2} /> {username}
              </button>
              <button className={styles.logout} onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <button className={styles.connexion}>
                <Link to="/bienvenue" className={styles.link}>
                  <FaUserTie className={styles.icon2} /> S'inscrire
                </Link>
              </button>
              <button className={styles.connexion}>
                <Link to="/login" className={styles.link}>
                  Se connecter
                </Link>
              </button>
            </>
          )}
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
