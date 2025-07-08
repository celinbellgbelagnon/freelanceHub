import React, { useEffect } from 'react';
import styles from './About.module.css';
import Aos from "aos";
import "aos/dist/aos.css";
import aboutImage from '../../../Assets/about2.jpg';

const About = () => {

  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <section className={styles.home}>
      <div className={styles.left} data-aos="fade-right">
        <p className={styles.subTitle}>
          SOURCING, PORTAGE SALARIAL ET COMMERCIAL, CONFORMITÉ
        </p>
        <h1>
          Talent as a service : nous connectons<br />
          les grandes entreprises avec les<br />
          meilleurs talents
        </h1>
        <div className={styles.buttons}>
          <button className={styles.modelBtn}>NOTRE MODÈLE</button>
          <button className={styles.contactBtn}>NOUS CONTACTER</button>
        </div>
      </div>
      <div className={styles.right} data-aos="fade-left">
        <button className={styles.contactFloat}>CONTACTEZ-NOUS</button>
      </div>
    </section>
  );
};

export default About;
