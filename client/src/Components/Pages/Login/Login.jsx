import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // Ajout de l'état pour l'erreur
  const [loading, setLoading] = useState(false); // Ajout de l'état pour le chargement

  // Gérer l'envoi du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Démarrer le chargement

    // Préparer les données à envoyer
    const loginData = {
      nom: username,
      password: password,
    };

    // Envoi de la requête
    axios
      .post("http://localhost:5000/freelace/login", loginData)
      .then((response) => {
        setLoading(false); // Arrêter le chargement
        console.log(response.data);
        window.localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("name", username);
        window.location.href = "/projectList"; // Rediriger vers une autre page
      })
      .catch((error) => {
        setLoading(false); // Arrêter le chargement en cas d'erreur
        console.log(error);
        setError("Nom d'utilisateur ou mot de passe incorrect"); // Afficher une erreur
      });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <form className={styles.left} onSubmit={handleSubmit}>
          <h2>Login</h2>
          <p>Or use your name & password</p>

          <input
            type="text"
            placeholder="Username"
            className={styles.input}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          {error && <p className={styles.error}>{error}</p>} {/* Affichage d'erreurs */}

          <button className={styles.button} type="submit" disabled={loading}>
            {loading ? "Loading..." : "SIGN IN"}
          </button>
        </form>
        <div className={styles.right}>
          <h2 className={styles.welcome}>Hello, Friend!</h2>
          <p>Register with your personal details to use all of the site features</p>
          <Link to="/signup" className={styles.button2}>
            SIGN UP
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
