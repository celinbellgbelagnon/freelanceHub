import { Link } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from 'axios';

const Signup = () => {
  const [username, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [telephone, setTelephone] = useState('');
  const [specialite, setSpecialite] = useState('');
  const [date, setDate] = useState('');
  const [profil, setProfil] = useState('');
  const [cvFile, setCvFile] = useState(null);

  const today = new Date();
  const todayString = today.toISOString().slice(0, 10);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Regex stricte pour emails finissant par des extensions valides
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|org|net|edu|info|io|co|sn|tg|cm|biz)$/i;
    if (!emailRegex.test(email)) {
      alert("Adresse e-mail invalide. Elle doit se terminer par .com, .fr, .org, etc.");
      return;
    }

    if (password !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas.');
      return;
    }

    if (!username || !email || !password || !profil || !date) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    const formData = new FormData();
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('telephone', telephone);
    formData.append('specialite', specialite);
    formData.append('date', date);
    formData.append('profil', profil);
    if (cvFile) formData.append('cv_pdf', cvFile);

    axios.post('http://localhost:5000/user/signup', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      window.location.href = "/login";
    })
    .catch((error) => {
      alert(error.response?.data?.error || "Erreur lors de l'inscription.");
      console.error(error.response?.data);
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <form
          className={styles.left}
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <h2>Créer un compte</h2>
          <p className={styles.p2}>Utilisez votre e-mail pour vous inscrire</p>
          <div className={styles.inputbox}>
            <div className={styles.leftbox}>
              <input
                type="text"
                placeholder="Nom d'utilisateur"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
                className={styles.input}
              />
              <input
                type="email"
                placeholder="E-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|fr|org|net|edu|info|io|co|sn|tg|cm|biz)$"
                title="L'adresse doit se terminer par .com, .fr, .org, etc."
                required
              />
              <input
                type="password"
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="password"
                placeholder="Confirmer le mot de passe"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={styles.input}
              />
              <input
                type="tel"
                placeholder="Téléphone"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                className={styles.input}
              />
            </div>
            <div className={styles.rightbox}>
              <input
                type="text"
                placeholder="Spécialité"
                value={specialite}
                onChange={(e) => setSpecialite(e.target.value)}
                className={styles.input}
              />
              <input
                type="date"
                placeholder="Date d'inscription"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
                max={todayString}
              />
              <select
                value={profil}
                onChange={(e) => setProfil(e.target.value)}
                className={styles.input}
                required
              >
                <option value="">Profil</option>
                <option value="freelance">Freelance</option>
                <option value="client">Client</option>
              </select>

              {profil === "freelance" && (
                <>
                  <label className={styles.label}>
                    Téléversez votre CV (PDF uniquement)
                  </label>
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={(e) => setCvFile(e.target.files[0])}
                    className={styles.input}
                    required
                  />
                </>
              )}
            </div>
          </div>
          <button type="submit" className={styles.button}>
            S'inscrire
          </button>
        </form>

        <p className={styles.footnote}>
          Avez-vous déjà un compte ?{" "}
          <Link to="/login" className={styles.link}>
            Connectez-vous
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
