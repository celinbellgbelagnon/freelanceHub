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
    <section className={styles.aboutSection} data-aos="fade-up">
      <div className={styles.container}>
        {/* Image Section */}
        <div className={styles.imageContainer} data-aos="fade-right">
          <img src={aboutImage} alt="About Us" className={styles.image} />
        </div>

        {/* Text Content */}
        <div className={styles.textContainer} data-aos="fade-left">
          <h5 className={styles.subtitle}>ABOUT US</h5>
          <h2 className={styles.title}>Discover Freelance Hub</h2>
          <p className={styles.description}>
            Freelance Hub is a platform dedicated to connecting skilled freelancers with businesses 
            looking for top-quality services. We provide a secure environment where professionals 
            and clients can collaborate efficiently.
          </p>
          <p className={styles.description}>
            Our mission is to simplify remote work by offering powerful tools, an active community, 
            and a trusted space for professional interactions. Join us and grow your career with confidence!
          </p>

          {/* Key Features */}
          <div className={styles.features} data-aos="zoom-in">
            <ul>
              <li>✔ Secure platform</li>
              <li>✔ Guaranteed payments</li>
              <li>✔ Access to international clients</li>
            </ul>
            <ul>
              <li>✔ Large freelancer network</li>
              <li>✔ Advanced project management tools</li>
              <li>✔ Responsive customer support</li>
            </ul>
          </div>

          {/* Button */}
          <button className={styles.readMore} data-aos="fade-up">Read More</button>
        </div>
      </div>
    </section>
  );
};

export default About;
