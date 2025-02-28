import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import styles from "./Cat.module.css";
import cat1 from "../../../Assets/cat-1.jpg";
import cat2 from "../../../Assets/cat-2.jpg";
import cat3 from "../../../Assets/cat-3.jpg";
import cat4 from "../../../Assets/cat-4.jpg";

const Cat = () => {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <section className={styles.container}>
      {/* Section gauche avec 3 images */}
      <div className={styles.leftSection}>
        <div className={styles.top} data-aos="fade-right">
          <img src={cat1} alt="Web Design" />
        </div>
        <div className={styles.bottom}>
          <img src={cat2} alt="Graphic Design" data-aos="fade-up" />
          <img src={cat3} alt="Video Editing" data-aos="fade-down" />
        </div>
      </div>

      {/* Section droite avec 1 image */}
      <div className={styles.rightSection} data-aos="fade-left">
        <img src={cat4} alt="Online Marketing" />
      </div>
    </section>
  );
};

export default Cat;
