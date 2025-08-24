import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styles from "./Profiluser.module.css";

const ProfilUser = () => {
  const [user, setUser] = useState(null);
  const userId = localStorage.getItem("userId");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (userId) {
      // Vérifier d'abord s'il y a une photo stockée en local
      const localPhoto = localStorage.getItem(`photo_${userId}`);

      axios
        .get(`http://localhost:5000/user/${userId}`)
        .then((res) => {
          const userData = res.data;

          // Si une photo est en localStorage, on la met en priorité
          if (localPhoto) {
            setUser({ ...userData, photoPreview: localPhoto });
          } else {
            setUser(userData);
          }
        })
        .catch((err) => console.error("Erreur récupération user :", err));
    }
  }, [userId]);

  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    if (selectedPhoto) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64Image = event.target.result;

        // Sauvegarde dans localStorage
        localStorage.setItem(`photo_${userId}`, base64Image);

        // Mettre à jour l'aperçu directement
        setUser((prev) => ({
          ...prev,
          photoPreview: base64Image,
        }));
      };
      reader.readAsDataURL(selectedPhoto);

      // Upload vers le serveur (optionnel, si backend doit avoir la photo)
      const formData = new FormData();
      formData.append("photo", selectedPhoto);

      axios
        .post(`http://localhost:5000/user/${userId}/uploadPhoto`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          console.log("Photo uploadée avec succès :", res.data);
          setUser((prev) => ({
            ...prev,
            photo: res.data.photo, // nom du fichier côté serveur
          }));
        })
        .catch((err) => console.error("Erreur upload photo :", err));
    }
  };

  const handleClickPhoto = () => {
    fileInputRef.current.click(); // ouvre le sélecteur de fichiers
  };

  if (!user) return <p>Chargement...</p>;

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h2>Mon Profil</h2>

        {/* Zone cliquable photo */}
        <div className={styles.photoWrapper} onClick={handleClickPhoto}>
          {user.photoPreview ? (
            <img
              src={user.photoPreview}
              alt="Aperçu"
              className={styles.photo}
            />
          ) : user.photo ? (
            <img
              src={`http://localhost:5000/${user.photo}`}
              alt="Profil"
              className={styles.photo}
            />
          ) : (
            <div className={styles.noPhoto}>Cliquez pour ajouter</div>
          )}
        </div>

        {/* Input fichier caché */}
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handlePhotoChange}
        />

        <div className={styles.info}>
          <p><strong>Nom :</strong> {user.username}</p>
          <p><strong>Email :</strong> {user.email}</p>
          <p><strong>Téléphone :</strong> {user.telephone}</p>
          <p><strong>Spécialité :</strong> {user.specialite}</p>
          <p><strong>Profil :</strong> {user.profil}</p>
          <p><strong>Date inscription :</strong> {new Date(user.date_inscription).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilUser;
