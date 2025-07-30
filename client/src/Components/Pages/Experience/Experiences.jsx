import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import styles from './Experiencs.module.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers, faHandshake, faClock } from "@fortawesome/free-solid-svg-icons";
import AOS from 'aos';
import 'aos/dist/aos.css';
import CountUp from 'react-countup';


import img1 from '../../../Assets/female-freelancer-working-laptop-remotely.jpg';
import img2 from '../../../Assets/image-of-multiethnic-young-coworkers-working-on-la-2023-11-27-04-57-51-utc.jpg';
import img3 from '../../../Assets/meilleurs-sites-freelances-740x416.jpg';
import img4 from '../../../Assets/devenir-freelance-comment-1300x706.jpg';

import axios from 'axios';

const Experiences = () => {
  const [projectCount, setProjectCount] = useState(0);
  const [freelancerCount, setFreelancerCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/user/count")
      .then((res) => {
        if (res.data && typeof res.data.total === 'number') {
          setUserCount(res.data.total);
        } else {
          setUserCount(0);
        }
      })
      .catch((error) => {
        console.error("Erreur lors du chargement du nombre d'utilisateurs :", error);
        setUserCount(0);
      });
  }, []);

useEffect(() => {
  axios.get("http://localhost:5000/projet/count")
    .then((res) => setProjectCount(res.data.total))
    .catch(() => setProjectCount(0));
}, []);

  /* const startCount = () => {
    let project = 0;
    let freelancer = 0;

    const intervalProject = setInterval(() => {
      if (project < 1200) {
        project += 20;
        setProjectCount(project);
      } else {
        clearInterval(intervalProject);
      }
    }, 30);

    const intervalFreelancer = setInterval(() => {
      if (freelancer < 300) {
        freelancer += 5;
        setFreelancerCount(freelancer);
      } else {
        clearInterval(intervalFreelancer);
      }
    }, 40);
  }; */

  return (
    <div className={styles.experienceSection}>
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
              <h3><CountUp end={projectCount} duration={2} separator="," />+</h3>
              <p>Projets réalisés</p>
            </div>
          </div>
          <div className={styles.statBox}>
            <FontAwesomeIcon icon={faUsers} className={styles.icon} />
            <div>
              <h3><CountUp end={userCount} duration={2} separator="," />+</h3>
              <p>Utilisateurs inscrits</p>
            </div>
          </div>
        </div>

        <Link to="/savoirPlus" className={styles.learnMore}>En savoir plus</Link>
        <p className={styles.sousTexte}>
          Cliquez pour découvrir tous les services et opportunités offerts par notre plateforme.
        </p>
      </div>

      <div className={styles.left}>
        <div className={styles.row} data-aos="fade-up">
          <img src={img1} alt="Freelance femme travaillant à distance" className={styles.imageSmall} />
          <img src={img2} alt="Jeunes collègues travaillant ensemble" className={styles.imageLarge} />
        </div>
        <div className={styles.row} data-aos="fade-up">
          <img src={img3} alt="Meilleurs sites de freelances" className={styles.imageLarge} />
          <img src={img4} alt="Comment devenir freelance" className={styles.imageSmall} />
        </div>
      </div>
    </div>
  );
};

export default Experiences;
