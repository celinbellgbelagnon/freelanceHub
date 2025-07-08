import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Services.module.css'; // tu peux garder ce nom de fichier CSS

const combinedServices = [
  {
    icon: <span role="img" aria-label="Dossiers">🗂️</span>,
    title: "Gestion simplifiée",
    description: "Gérez vos missions, contrats et paiements en quelques clics grâce à notre interface intuitive."
  },
  {
    icon: <span role="img" aria-label="Accompagnement">🤝</span>,
    title: "Accompagnement dédié",
    description: "Un conseiller vous suit à chaque étape pour garantir la réussite de vos projets."
  },
  {
    icon: <span role="img" aria-label="Conformité">✅</span>,
    title: "Conformité assurée",
    description: "Toutes vos démarches administratives et légales sont prises en charge."
  },
  {
    icon: <span role="img" aria-label="Paiement">💳</span>,
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées et vos paiements garantis à chaque mission."
  },
  {
    icon: <span role="img" aria-label="Sourcing">🔎</span>,
    title: "SOURCING",
    description: <> <strong>Nous trouvons les bonnes compétences</strong>, disponibles au bon moment. </>
  },
  {
    icon: <span role="img" aria-label="Portage">📋</span>,
    title: "PORTAGE",
    description: <> En portage salarial ou administratif, <strong>nous assurons toute la gestion.</strong> </>
  },
  {
    icon: <span role="img" aria-label="Payrolling">🌍</span>,
    title: "PAYROLLING",
    description: <> Nous gérons les besoins de <strong>mobilité internationale</strong> de vos équipes et talents. </>
  },
  {
    icon: <span role="img" aria-label="Services additionnels">🛠️</span>,
    title: "SERVICES",
    subtitle: "ADDITIONNELS",
    description: <> <strong>Sécuriser et enrichir la relation</strong> avec votre écosystème de talents externes. </>
  }
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className={styles.serviceSection}>
      <div className={styles.serviceContainer}>
        {combinedServices.map((service, index) => (
          <div
            key={index}
            className={styles.card}
            data-aos="fade-up"
          >
            <div className={styles.icon}>{service.icon}</div>
            <h3 className={styles.title}>
              {service.title}
              {service.subtitle && <span className={styles.subtitle}> {service.subtitle}</span>}
            </h3>
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
