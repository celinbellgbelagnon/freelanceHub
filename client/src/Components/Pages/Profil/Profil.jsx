import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Profil.module.css';

const Profil = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const cards = [
    {
      title: "Jean Dupont",
      description: "Développeur Full Stack spécialisé en React et Node.js.",
      testimonial: {
        author: "Client : Société X",
        quote: "Jean a su livrer notre projet web dans des délais records avec une grande qualité."
      },
      bgImg: require('../../../Assets/talent1.jpg')
    },
    {
      title: "Claire Martin",
      description: "Consultante RH experte en recrutement IT.",
      testimonial: {
        author: "Client : Start-up Y",
        quote: "Claire a trouvé les meilleurs profils pour accélérer notre croissance."
      },
      bgImg: require('../../../Assets/talent2.jpg')
    },
    {
      title: "Karim Lahlou",
      description: "Designer UX/UI passionné par l’expérience utilisateur.",
      testimonial: {
        author: "Client : Agence Z",
        quote: "Karim a transformé notre application en un outil intuitif et moderne."
      },
      bgImg: require('../../../Assets/profil2.jpg')
    },
    {
      title: "Fatou Diop",
      description: "Spécialiste en marketing digital et réseaux sociaux.",
      testimonial: {
        author: "Client : PME Afrique",
        quote: "Fatou a boosté notre visibilité et notre engagement sur les réseaux."
      },
      bgImg: require('../../../Assets/profil3.jpg')
    },
    /* {
      title: "Lucas Morel",
      description: "Chef de projet Agile certifié Scrum Master.",
      testimonial: {
        author: "Client : Groupe international",
        quote: "Lucas a piloté notre transformation digitale avec efficacité et pédagogie."
      },
      bgImg: require('../../../Assets/image-of-multiethnic-young-coworkers-working-on-la-2023-11-27-04-57-51-utc.jpg')
    }, */
  ];

  return (
    <section className={styles.descriptionSection}>
      <div className={styles.intro}>
        <h2>Pourquoi choisir notre plateforme ?</h2>
        <p>
          Nous connectons les entreprises et les talents en simplifiant les démarches,
          en garantissant la conformité, et en assurant un accompagnement humain et digital.
        </p>
      </div>

      <div className={styles.cardGrid}>
        {cards.map((card, index) => (
          <div
            key={index}
            className={styles.card}
            style={{
              backgroundImage: `url(${card.bgImg})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              imageRendering: 'auto'
            }}
            data-aos="fade-up"
          >
            <h3>{card.title}</h3>
            <p className={styles.cardText}>{card.description}</p>
            <div className={styles.testimonial}>
              <blockquote>"{card.testimonial.quote}"</blockquote>
              <cite>- {card.testimonial.author}</cite>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Profil;