import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import styles from './Services.module.css';
import { Player } from '@lottiefiles/react-lottie-player';
import { FaShieldAlt, FaUsersCog, FaHandshake, FaCogs } from "react-icons/fa";

const combinedServices = [
  {
    icon: "https://assets1.lottiefiles.com/private_files/lf30_obidsi0t.json",
    title: "Gestion simplifiée",
    description: "Gérez vos missions, contrats et paiements en quelques clics grâce à notre interface intuitive."
  },
  {
    icon: "https://assets4.lottiefiles.com/packages/lf20_4kx2q32n.json",
    title: "Accompagnement dédié",
    description: "Un conseiller vous suit à chaque étape pour garantir la réussite de vos projets."
  },
  {
    icon: "https://assets5.lottiefiles.com/packages/lf20_CTaizi.json",
    title: "PAYROLLING",
    description: <>Nous gérons les besoins de <strong>mobilité internationale</strong> de vos équipes et talents.</>
  },
  {
    icon: "https://assets5.lottiefiles.com/packages/lf20_w51pcehl.json",
    title: "Paiement sécurisé",
    description: "Vos transactions sont protégées et vos paiements garantis à chaque mission."
  },
  {
    faIcon: <FaShieldAlt size={60} color="#0e4bcf" />,
    title: "Conformité assurée",
    description: "Toutes vos démarches administratives et légales sont prises en charge."
  },
  {
    faIcon: <FaUsersCog size={60} color="#0e4bcf" />,
    title: "SOURCING",
    description: <><strong>Nous trouvons les bonnes compétences</strong>, disponibles au bon moment.</>
  },
  {
    faIcon: <FaHandshake size={60} color="#0e4bcf" />,
    title: "PORTAGE",
    description: <>En portage salarial ou administratif, <strong>nous assurons toute la gestion.</strong></>
  },
  {
    faIcon: <FaCogs size={60} color="#0e4bcf" />,
    title: "SERVICES",
    subtitle: "ADDITIONNELS",
    description: <><strong>Sécuriser et enrichir la relation</strong> avec votre écosystème de talents externes.</>
  }
];

const Services = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <section className={styles.serviceSection}>
      <h2 className={styles.sectionTitle}>Nos Services</h2>
      <div className={styles.serviceContainer}>
        {combinedServices.map((service, index) => (
          <div key={index} className={styles.card} data-aos="fade-up">
            <div className={styles.icon}>
              {service.icon ? (
                <Player
                  autoplay
                  loop
                  src={service.icon}
                  style={{ height: '80px', width: '80px' }}
                  onEvent={(event) => {
                    if (event === 'error') {
                      console.warn(`Lottie error for ${service.title}`);
                    }
                  }}
                />
              ) : (
                service.faIcon
              )}
            </div>
            <h3 className={styles.title}>
              {service.title}
              {service.subtitle && (
                <span className={styles.subtitle}> {service.subtitle}</span>
              )}
            </h3>
            <p className={styles.description}>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Services;
