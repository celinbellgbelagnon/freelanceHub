import React from "react";
import { Link, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaUserTie, FaBriefcase, /* FaSignInAlt, */ FaUserPlus } from "react-icons/fa";

const Navbar = () => {
  return (
    <div>
        <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">FreelanceHub</Link>
      </div>
      <ul className={styles.navLinks}>
        <li>
          <Link to="/login">
            <FaUserTie className={styles.icon} /> Freelancers
          </Link>
        </li>
        <li>
          <Link to="/bienvenue">
            <FaBriefcase className={styles.icon} /> Clients
          </Link>
        </li>
        {/* <li>
          <Link to="/login">
            <FaSignInAlt className={styles.icon} /> Connexion
          </Link>
        </li> */}
        <li>
          <Link to="/optionconnect">
            <FaUserPlus className={styles.icon} /> Inscription
          </Link>
        </li>
      </ul>
      
        </nav>
        <Outlet/>
    </div>
    
  );
};

export default Navbar;
