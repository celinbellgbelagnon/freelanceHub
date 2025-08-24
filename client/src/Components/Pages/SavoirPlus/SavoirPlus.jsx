import React, { useEffect, useState } from 'react';
import styles from './SavoirPlus.module.css';
import AOS from 'aos';
import 'aos/dist/aos.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  FaLaptopCode, FaPaintBrush, FaBullhorn, FaMobileAlt,
  FaChartLine, FaServer, FaCameraRetro, FaSearch,
  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaCheckCircle
} from "react-icons/fa";


const services = [
  { icon: <FaLaptopCode />, title: "Développement Web & Mobile", description: "Nos freelances conçoivent des sites web dynamiques, des applications mobiles modernes, des plateformes e-commerce performantes, et des solutions back-end sécurisées." },
  { icon: <FaPaintBrush />, title: "Design Graphique & UI/UX", description: "De la création de logos aux maquettes interactives, nos graphistes vous accompagnent dans l’identité visuelle de votre projet pour un rendu professionnel et attrayant." },
  { icon: <FaBullhorn />, title: "Marketing Digital", description: "Optimisation SEO, campagnes publicitaires, gestion de réseaux sociaux… Nos experts boostent votre visibilité et votre notoriété en ligne." },
  { icon: <FaMobileAlt />, title: "Community Management", description: "Nous vous aidons à bâtir une communauté engagée grâce à des publications régulières, une interaction fluide et une image de marque forte." },
  { icon: <FaChartLine />, title: "Stratégie de croissance", description: "Nous analysons vos données, testons vos campagnes et pilotons votre croissance avec une vision orientée résultats." },
  { icon: <FaServer />, title: "Hébergement & Sécurité", description: "Nos experts garantissent un hébergement fiable, des sauvegardes régulières et la sécurité de vos données 24h/24." },
  { icon: <FaCameraRetro />, title: "Photographie & Visuels", description: "Nos photographes freelances réalisent des clichés professionnels pour vos produits, événements ou branding." },
  { icon: <FaSearch />, title: "Audit & Référencement SEO", description: "Nous réalisons des audits techniques de votre site pour améliorer son classement sur les moteurs de recherche." }
];

const SavoirPlus = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ nom: '', email: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.nom || !formData.email || !formData.message) {
      alert("Tous les champs sont obligatoires.");
      return;
    }

    axios.post('http://localhost:5000/client/contact', formData)
      .then(() => {
        setShowSuccess(true);
        setFormData({ nom: '', email: '', message: '' });
      })
      .catch(error => {
        alert("Erreur lors de l’envoi.");
        console.error(error);
      });
  };

  const handleOkClick = () => {
    window.location.reload(); // ou window.location.reload();
  };

  return (
    <div className={styles.container}>
      {showSuccess && (
        <div className={styles.successOverlay}>
          <div className={styles.successPopup}>
            <FaCheckCircle className={styles.successIcon} />
            <h2>Message envoyé avec succès !</h2>
            <button onClick={handleOkClick}>OK</button>
          </div>
        </div>
      )}

      <h1 className={styles.title} data-aos="fade-down">Ce que vous trouverez sur notre plateforme</h1>
      <p className={styles.intro} data-aos="fade-up">
        Notre plateforme connecte les professionnels du numérique avec les clients en quête de solutions modernes et efficaces.
        Voici un aperçu des services proposés par nos prestataires digitaux.
      </p>

      <div className={styles.cards}>
        {services.map((service, index) => (
          <div className={styles.card} key={index} data-aos="zoom-in">
            <div className={styles.icon}>{service.icon}</div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>

      <div className={styles.contactSection}>
        <h2 data-aos="fade-up">Contactez-nous</h2>
        <div className={styles.contactGrid}>
          <div className={styles.contactInfo} data-aos="fade-right">
  <h3>Informations de contact</h3>
  <p><FaMapMarkerAlt className={styles.contactIcon} /> Adresse : Lomé, Togo - Ave. des Évolués</p>
  <p><FaPhoneAlt className={styles.contactIcon} /> Téléphone : +228 90 12 34 56</p>
  <p><FaEnvelope className={styles.contactIcon} /> Email : contact@freelancehub.com</p>

  {/* Ajout de la carte Google Maps */}
  <div className={styles.mapContainer}>
    <iframe
      title="Adresse ESIG"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3979.599145702325!2d1.2542241!3d6.1578252!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1023e3d09382df23%3A0x7dd858a4f0707ca9!2sESIG%20Global%20Success!5e0!3m2!1sfr!2stg!4v1722241594959!5m2!1sfr!2stg"
      width="100%"
      height="250"
      style={{ border: 0, borderRadius: "10px", marginTop: "20px" }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</div>

          <div>
            <h2>Donnez votre avis sur notre site</h2>

            <form className={styles.contactForm} data-aos="fade-left" onSubmit={handleSubmit}>
            <label>Nom</label>
            <input type="text" name="nom" value={formData.nom} onChange={handleChange} placeholder="Votre nom" required />

            <label>Email</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Votre email" required />

            <label>Votre avis</label>
            <textarea name="message" value={formData.message} onChange={handleChange} placeholder="Écrivez votre retour ici..." rows="5" required />

            <button type="submit">Envoyer</button>
          </form>
          </div>          
        </div>
      </div>
    </div>
  );
};

export default SavoirPlus;
