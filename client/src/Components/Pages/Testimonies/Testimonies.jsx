import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Testimonie.module.css";

const testimonies = [
  {
    id: 1,
    name: "Alice Dupont",
    message: "Excellent service ! L'équipe a su comprendre mes besoins et répondre parfaitement à mes attentes. J'ai été impressionnée par leur professionnalisme et leur réactivité.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    id: 2,
    name: "Jean Martin",
    message: "Super expérience ! Dès le premier contact, j’ai senti que j’étais entre de bonnes mains. Le suivi et l'accompagnement ont été impeccables, et le résultat final a dépassé mes attentes.",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    id: 3,
    name: "Sophie Laurent",
    message: "Une équipe très compétente et à l’écoute. J’ai particulièrement apprécié leur approche personnalisée et leur capacité à s’adapter à mes besoins spécifiques.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "David Morel",
    message: "Des solutions adaptées et un service client exceptionnel ! Je recommande vivement cette équipe à toute personne cherchant une prestation de qualité.",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Elodie Vernier",
    message: "Un travail remarquable ! Non seulement ils ont livré à temps, mais ils ont aussi pris le temps de m’expliquer chaque étape du processus. Très satisfaite du résultat final !",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    id: 6,
    name: "Bell Graham",
    message: "Super expérience ! Dès le premier contact, j’ai senti que j’étais entre de bonnes mains. Le suivi et l'accompagnement ont été impeccables, et le résultat final a dépassé mes attentes.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
  }
];

const Testimonie = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className={styles.testimonieSection}>
      <h2 className={styles.heading} data-aos="fade-down">
        Témoignages de nos clients
      </h2>
      <div className={styles.testimonieList}>
        {testimonies.map((testimony, index) => (
          <div
            className={styles.testimonyCard}
            key={testimony.id}
            data-aos="fade-up"
            data-aos-delay={index * 150} // Décalage progressif
          >
            <img src={testimony.image} alt={testimony.name} className={styles.image} />
            <div className={styles.content}>
              <h3 className={styles.name}>{testimony.name}</h3>
              <p className={styles.message}>"{testimony.message}"</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonie;
