import React, { useEffect } from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import styles from "./Advantage.module.css";

const advantages = [
  { icon: "🎓", title: "Skilled Instructors", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam." },
  { icon: "🌐", title: "Online Classes", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam." },
  { icon: "🏠", title: "Home Projects", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam." },
  { icon: "📖", title: "Book Library", description: "Diam elitr kasd sed at elitr sed ipsum justo dolor sed clita amet diam." }
];

const Advantages = () => {
  useEffect(() => {
    Aos.init({ duration: 1500 });
  }, []);

  return (
    <div className={styles.advantageContainer}>
      {advantages.map((adv, index) => (
        <div key={index} className={styles.card} data-aos="fade-up">
          <span className={styles.icon}>{adv.icon}</span>
          <h3>{adv.title}</h3>
          <p>{adv.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Advantages;
