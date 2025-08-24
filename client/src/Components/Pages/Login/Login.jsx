import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { FaUser, FaLock } from "react-icons/fa";


const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData = {
      nom: username,
      password: password
    };


    axios
      .post("http://localhost:5000/user/login", loginData)
      .then((response) => {
        setLoading(false);

        // ✅ Récupère le token depuis la réponse
        const token = response.data.accessToken;

        if (!token) {
          setError("Aucun token reçu du serveur.");
          return;
        }

        // ✅ Stocke le token
        localStorage.setItem("token", token);

        try {
          const decoded = jwtDecode(token);
          console.log("Token décodé ➤", decoded);

          const profil = decoded.profil?.toLowerCase();
          const userId = decoded.id_user;

          if (userId) {
            localStorage.setItem("userId", userId);
          }

          // ✅ Stockage du username
          const nameToStore =
            decoded.username || decoded.nom || decoded.name || "";
          localStorage.setItem("username", nameToStore);

          // ✅ Stockage du profil (client/freelance)
          if (profil) {
            localStorage.setItem("profil", profil);
          }

          // ✅ Redirection selon le profil
          if (profil === "freelance") {
            window.location.href = "/projectList";
          } else if (profil === "client") {
            window.location.href = "/projetListClient";
          } else {
            window.location.href = "/";
          }
        } catch (decodeError) {
          console.error("Erreur lors du décodage du token :", decodeError);
          setError("Erreur lors de la connexion. Veuillez réessayer.");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Identifiants incorrects ou problème serveur.");
        console.error("Erreur login :", err);
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <form className={styles.left} onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          <p>Utilisez votre nom d'utilisateur et votre mot de passe</p>

          <div className={styles.inputGroup}>
  <FaUser className={styles.inputIcon} />
  <input
    type="text"
    placeholder="Nom d'utilisateur"
    className={styles.input}
    value={username}
    onChange={(e) => setUsername(e.target.value)}
  />
</div>

<div className={styles.inputGroup}>
  <FaLock className={styles.inputIcon} />
  <input
    type="password"
    placeholder="Mot de passe"
    className={styles.input}
    value={password}
    onChange={(e) => setPassword(e.target.value)}
  />
</div>


          {error && <p className={styles.error}>{error}</p>}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Chargement..." : "SE CONNECTER"}
          </button>
        </form>

        <p className={styles.textBottom}>
          Vous n'avez pas encore de compte ?{" "}
          <Link to="/signup" className={styles.link}>
            Inscrivez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
