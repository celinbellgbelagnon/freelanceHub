import React, { useState } from "react";
import axios from "axios";
import  jwtDecode  from "jwt-decode";
import { Link } from "react-router-dom";
import styles from "./Auth.module.css";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Login states
  const [usernameLogin, setUsernameLogin] = useState("");
  const [passwordLogin, setPasswordLogin] = useState("");

  // Signup states
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [date, setDate] = useState("");
  const [profil, setProfil] = useState("");
  const [cvFile, setCvFile] = useState(null);

  const today = new Date().toISOString().slice(0, 10);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const loginData = {
      nom: usernameLogin,
      password: passwordLogin,
    };

    axios
      .post("http://localhost:5000/user/login", loginData)
      .then((response) => {
        const token = response.data.accessToken;
        localStorage.setItem("token", token);
        const decoded = jwtDecode(token);
        localStorage.setItem("username", decoded.username);

        const profil = decoded.profil?.toLowerCase();
        const userId = decoded.id_user;
        if (userId) localStorage.setItem("userId", userId);

        if (profil === "freelance") {
          window.location.href = "/projectList";
        } else if (profil === "client") {
          window.location.href = "/projetListClient";
        } else {
          window.location.href = "/";
        }
      })
      .catch(() => {
        setError("Nom d'utilisateur ou mot de passe invalide.");
        setLoading(false);
      });
  };

  const handleSignup = (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|org|net|edu|info|io|co|sn|tg|cm|biz)$/i;
    if (!emailRegex.test(email)) {
      alert("Adresse e-mail invalide.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas.");
      return;
    }

    if (!username || !email || !password || !profil || !date) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("telephone", telephone);
    formData.append("specialite", specialite);
    formData.append("date", date);
    formData.append("profil", profil);
    if (cvFile) formData.append("cv_pdf", cvFile);

    axios
      .post("http://localhost:5000/user/signup", formData)
      .then(() => window.location.href = "/login")
      .catch((error) => alert(error.response?.data?.error || "Erreur lors de l'inscription."));
  };

  return (
    <div className={`${styles.container} ${isSignUp ? styles.rightPanelActive : ""}`}>
      {/* Sign Up */}
      <div className={`${styles.formContainer} ${styles.signUpContainer}`}>
        <form onSubmit={handleSignup} encType="multipart/form-data">
          <h1>Créer un compte</h1>
          <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUserName(e.target.value)} />
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <input type="password" placeholder="Confirmer le mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <input type="tel" placeholder="Téléphone" value={telephone} onChange={(e) => setTelephone(e.target.value)} />
          <input type="text" placeholder="Spécialité" value={specialite} onChange={(e) => setSpecialite(e.target.value)} />
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} max={today} />
          <select value={profil} onChange={(e) => setProfil(e.target.value)} required>
            <option value="">Profil</option>
            <option value="freelance">Freelance</option>
            <option value="client">Client</option>
          </select>
          {profil === "freelance" && (
            <>
              <label>Téléverser votre CV</label>
              <input type="file" accept="application/pdf" onChange={(e) => setCvFile(e.target.files[0])} required />
            </>
          )}
          <div className={styles.buttonGroup}>
            <button type="submit">S'inscrire</button>
            <button type="button" className="ghost" onClick={() => setIsSignUp(false)}>Se connecter</button>
          </div>
        </form>
      </div>

      {/* Sign In */}
      <div className={`${styles.formContainer} ${styles.signInContainer}`}>
        <form onSubmit={handleLogin}>
          <h1>Connexion</h1>
          <input type="text" placeholder="Nom d'utilisateur" value={usernameLogin} onChange={(e) => setUsernameLogin(e.target.value)} />
          <input type="password" placeholder="Mot de passe" value={passwordLogin} onChange={(e) => setPasswordLogin(e.target.value)} />
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.buttonGroup}>
            <button type="submit" disabled={loading}>{loading ? "Chargement..." : "Se connecter"}</button>
            <button type="button" className="ghost" onClick={() => setIsSignUp(true)}>Créer un compte</button>
          </div>
        </form>
      </div>

      {/* Overlay */}
      <div className={styles.overlayContainer}>
        <div className={styles.overlay}>
          <div className={`${styles.overlayPanel} ${styles.overlayLeft}`}>
            <h1>Bienvenue !</h1>
            <p>Connectez-vous avec votre compte existant</p>
          </div>
          <div className={`${styles.overlayPanel} ${styles.overlayRight}`}>
            <h1>Bonjour !</h1>
            <p>Entrez vos informations pour créer un compte</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
