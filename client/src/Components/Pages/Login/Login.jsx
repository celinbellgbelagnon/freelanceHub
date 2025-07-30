import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

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
      password: password,
    };

    axios
      .post("http://localhost:5000/user/login", loginData)
      .then((response) => {
        setLoading(false);
        const token = response.data.accessToken;
        localStorage.setItem("token", token);

        try {
          const decoded = jwtDecode(token);
          console.log("Token décodé ➤", decoded); // Optionnel pour debug

          const profil = decoded.profil?.toLowerCase();
          const userId = decoded.id_user; // ✅ Utiliser le bon nom

          if (userId) {
            localStorage.setItem("userId", userId); // ✅ Stockage correct
          } else {
            console.warn("ID utilisateur introuvable dans le token.");
          }

          localStorage.setItem("username", decoded.username);

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
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <form className={styles.left} onSubmit={handleSubmit}>
          <h2>Connexion</h2>
          <p>Utilisez votre nom d'utilisateur et votre mot de passe</p>

          <input
            type="text"
            placeholder="Nom d'utilisateur"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

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
