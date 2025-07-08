import React, { useState, useEffect } from 'react';
import styles from './Experiencs.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHandshake, faClock, faLightbulb } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';

import img1 from '../../../Assets/female-freelancer-working-laptop-remotely.jpg';
import img2 from '../../../Assets/image-of-multiethnic-young-coworkers-working-on-la-2023-11-27-04-57-51-utc.jpg';
import img3 from '../../../Assets/meilleurs-sites-freelances-740x416.jpg';
import img4 from '../../../Assets/devenir-freelance-comment-1300x706.jpg';

const Experiences = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [freelancerCount, setFreelancerCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const startCount = () => {
    let project = 0;
    let freelancer = 0;

    const intervalProject = setInterval(() => {
      if (project < 1200) {
        project += 20;
        setProjectCount(project);
      } else clearInterval(intervalProject);
    }, 30);

    const intervalFreelancer = setInterval(() => {
      if (freelancer < 300) {
        freelancer += 5;
        setFreelancerCount(freelancer);
      } else clearInterval(intervalFreelancer);
    }, 40);
  };

  return (
    <div className={styles.experienceSection} onMouseEnter={startCount}>
      <div className={styles.right} data-aos="fade-right">
        <h2><FontAwesomeIcon icon={faHandshake} /> À propos de nous</h2>
        <p>
          Nous mettons en relation des freelances qualifiés avec des clients de tous horizons.
          Profitez d’une plateforme fiable pour collaborer, innover et réussir vos projets.
        </p>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <FontAwesomeIcon icon={faClock} className={styles.icon} />
            <div>
              <h3>{projectCount}+</h3>
              <p>Projets réalisés</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <div>
              <h3>{freelancerCount}+</h3>
              <p>Freelances inscrits</p>
            </div>
          </div>
        </div>
        <button className={styles.learnMore}>En savoir plus</button>
      </div>

      <div className={styles.left}>
        <div className={styles.row} data-aos="fade-up">
          <img src={img1} alt="Freelance 1" className={styles.imageSmall} />
          <img src={img2} alt="Freelance 2" className={styles.imageLarge} />
        </div>
        <div className={styles.row} data-aos="fade-up">
          <img src={img3} alt="Freelance 3" className={styles.imageLarge} />
          <img src={img4} alt="Freelance 4" className={styles.imageSmall} />
        </div>
      </div>
    </div>
  );
};

export default Experiences;
