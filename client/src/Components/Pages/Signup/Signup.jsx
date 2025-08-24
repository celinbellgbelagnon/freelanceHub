import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import styles from "./Signup.module.css";
import axios from "axios";
import { FaUser, FaEnvelope, FaLock, FaPhone, FaBriefcase, FaFileUpload } from "react-icons/fa";

const Signup = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [specialite, setSpecialite] = useState("");
  const [profil, setProfil] = useState("");
  const [cvFile, setCvFile] = useState(null);
  const [cvError, setCvError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  const handleCvChange = (e) => {
    const file = e.target.files[0];
    if (file && file.size > 5 * 1024 * 1024) {
      setCvError("Le fichier CV ne doit pas dépasser 5 Mo.");
      setCvFile(null);
      return;
    }
    setCvFile(file);
    setCvError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");
    setSuccessMsg("");

    if (!username || !email || !password || !confirmPassword || !profil) {
      setErrorMsg("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMsg("Les mots de passe ne correspondent pas.");
      return;
    }

    if (profil === "freelance" && !cvFile) {
      setErrorMsg("Le CV est obligatoire pour un profil freelance.");
      return;
    }

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("telephone", telephone || "");
    formData.append("specialite", specialite || "");
    formData.append("profil", profil);
    if (profil === "freelance") formData.append("cv", cvFile);

    try {
      await axios.post("http://localhost:5000/user/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setSuccessMsg("✅ Inscription réussie !");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setErrorMsg(err.response?.data?.message || "Erreur serveur.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.signupBox}>
        <form className={styles.formGrid} onSubmit={handleSubmit} encType="multipart/form-data">
          <h2 className={styles.title}>Créer un compte</h2>
          <p className={styles.subtitle}>Utilisez votre e-mail pour vous inscrire</p>

          <div className={styles.grid}>
            {/* Colonne gauche */}
            <div>
              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <FaEnvelope className={styles.inputIcon} />
                <input
                  type="email"
                  placeholder="E-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <FaLock className={styles.inputIcon} />
                <input
                  type="password"
                  placeholder="Confirmer le mot de passe"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className={styles.input}
                />
              </div>
            </div>

            {/* Colonne droite */}
            <div>
              <div className={styles.inputGroup}>
                <FaPhone className={styles.inputIcon} />
                <input
                  type="tel"
                  placeholder="Téléphone"
                  value={telephone}
                  onChange={(e) => setTelephone(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <FaBriefcase className={styles.inputIcon} />
                <input
                  type="text"
                  placeholder="Spécialité"
                  value={specialite}
                  onChange={(e) => setSpecialite(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.inputGroup}>
                <FaUser className={styles.inputIcon} />
                <select
                  value={profil}
                  onChange={(e) => setProfil(e.target.value)}
                  className={styles.selectInput}
                  required
                >
                  <option value="">-- Sélectionnez un profil --</option>
                  <option value="freelance">Freelance</option>
                  <option value="client">Client</option>
                </select>
              </div>

              {profil === "freelance" && (
  <div className={styles.cvContainer}>
    <label className={styles.label}>Téléversez votre CV (PDF, max 5 Mo)</label>
    <div className={styles.fileUploadWrapper}>
      <button
        type="button"
        className={styles.fileUploadBtn}
        onClick={() => document.getElementById("cvUpload").click()}
      >
        <FaFileUpload /> Choisir un fichier
      </button>
      <span className={styles.fileName}>
        {cvFile ? cvFile.name : "Aucun fichier choisi"}
      </span>
    </div>
    <input
      id="cvUpload"
      type="file"
      accept="application/pdf"
      style={{ display: "none" }}
      onChange={handleCvChange}
    />
    {cvError && <span className={styles.error}>{cvError}</span>}
  </div>
)}

            </div>
          </div>

          {/* Messages */}
          {errorMsg && <p className={styles.error}>{errorMsg}</p>}
          {successMsg && <p className={styles.success}>{successMsg}</p>}

          <button type="submit" className={styles.submitBtn}>
            S'inscrire
          </button>

          <p className={styles.footnote}>
            Vous avez déjà un compte ?{" "}
            <Link to="/login" className={styles.link}>
              Connectez-vous
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
