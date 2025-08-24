import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Profil.module.css';

import profilImage1 from '../../../Assets/profil.jpg';
import profilImage2 from '../../../Assets/talent2.jpg';
import profilImage3 from '../../../Assets/freelancer2.jpg';
import profilImage4 from '../../../Assets/steph.jpg';
import profilImage5 from '../../../Assets/aristide.jpg';
import profilImage6 from '../../../Assets/daniel.jpg';


const Profil = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cards = [
    {
      title: "Antoine Bell",
      description: "Développeur Full Stack spécialisé en React et Node.js.",
      testimonial: {
        author: "freelance: Antoine Bell",
        quote: "Antoine a su transformer nos idées en une application web performante et intuitive. Il est très professionnel et réactif.",
      },
      bgImg: profilImage1
    },
    {
      title: "Roméo Carlos",
      description: "Consultant en stratégie digitale avec 10 ans d'expérience.",
      testimonial: {
        author: "Client : Claire Dupont",
        quote: "Claire a trouvé les meilleurs profils pour accélérer notre croissance."
      },
      bgImg: profilImage2
    },
    {
      title: "Valentin Kinkaid",
      description: "Designer UX/UI passionné par l’expérience utilisateur.",
      testimonial: {
        author: "Client : Agence Z",
        quote: "Karim a transformé notre application en un outil intuitif et moderne."
      },
      bgImg: profilImage3
    },
    {
      title: "Phanio Dev",
      description: "Spécialiste en marketing digital et réseaux sociaux.",
      testimonial: {
        author: "Client : PME Afrique",
        quote: "Fatou a boosté notre visibilité et notre engagement sur les réseaux."
      },
      bgImg: profilImage4
    },
    {
      title: "Aristide Conombo",
      description: "Chef de projet Agile certifié Scrum Master.",
      testimonial: {
        author: "Client : Groupe international",
        quote: "Lucas a piloté notre transformation digitale avec efficacité et pédagogie."
      },
      bgImg: profilImage5
    },
    {
      title: "Daniel Rodrigue",
      description: "Data Analyste avec une expertise en Big Data et IA.",
      testimonial: {
        author: "Client : Startup Tech",
        quote: "Sophie a analyser nos données et nous a fourni des insights clairs."
      },
      bgImg: profilImage6
    }
  ];

  return (
    <section className={styles.descriptionSection}>
      <div className={styles.intro}>
        <h2>Nos Talents en Vedette</h2>
        <p>
          Découvrez quelques-uns de nos freelances les plus talentueux.
        </p>
      </div>

      <ul className={styles.cardContainer}>
        {cards.map((card, index) => (
          <li key={index} className={styles.cardItem}>
            <img src={card.bgImg} alt={card.title} />
            <div className={styles.content}>
              <span>
                <h2>{card.title}</h2>
                <p>{card.description}</p>
                <blockquote>"{card.testimonial.quote}"</blockquote>
                <cite>- {card.testimonial.author}</cite>
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Profil;
