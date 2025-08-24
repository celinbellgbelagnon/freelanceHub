import React, { useRef, useEffect } from 'react';
import styles from "./About.module.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import bcg1 from "../../../Assets/bcg1.jpg";
import bcg2 from "../../../Assets/bcg2.jpg";
import bcg3 from "../../../Assets/bcg3.jpg";
import bcg4 from "../../../Assets/bcg4.jpg";
import bcg5 from "../../../Assets/bcg5.jpg";
import bcg6 from "../../../Assets/bcgimg1.jpg";

const slides = [
  { src: bcg1, title: 'Trouvez un Expert', description: 'Accédez rapidement à des freelances qualifiés dans tous les domaines numériques.' },
  { src: bcg2, title: 'Devenez Freelance', description: 'Créez votre profil, publiez vos compétences et commencez à gagner votre vie.' },
  { src: bcg3, title: 'Collaboration Simplifiée', description: 'Chat en temps réel, contrats sécurisés et paiement à l’étape garantissent un projet fluide.' },
  { src: bcg4, title: 'Gérez Vos Projets', description: 'Un tableau de bord puissant pour suivre l’avancement, les livrables et la facturation.' },
  { src: bcg5, title: 'Des Talents à Portée de Main', description: 'Design, développement, marketing... choisissez le bon freelance pour votre mission.' },
  { src: bcg6, title: 'Sécurité & Confiance', description: 'Plateforme fiable, profils vérifiés, et assistance dédiée pour une expérience sereine.' },
];

const About = () => {
  const slideRef = useRef(null);

  const nextSlide = () => {
    const slide = slideRef.current;
    slide.appendChild(slide.children[0]);
  };

  const prevSlide = () => {
    const slide = slideRef.current;
    slide.prepend(slide.children[slide.children.length - 1]);
  };

  // 🔥 Défilement auto toutes les 4s
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.slide} ref={slideRef}>
        {slides.map((item, index) => (
          <div
            className={styles.item}
            key={index}
            style={{ backgroundImage: `url(${item.src})` }}  
          >
            <div className={styles.content}>
              <div className={styles.name}>{item.title}</div>
              <div className={styles.des}>{item.description}</div>
              <button>En savoir plus</button>
            </div>
          </div>
        ))}
      </div>

      <div className={styles.button}>
        <button className={styles.prev} onClick={prevSlide}>
          <FaArrowLeft />
        </button>
        <button className={styles.next} onClick={nextSlide}>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default About;