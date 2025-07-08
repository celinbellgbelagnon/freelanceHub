import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Card from "../Card/Card";
import styles from "./Freelance.module.css";
import freelancer1 from "../../../Assets/freelancer1.jpg";
import freelancer2 from "../../../Assets/freelancer2.jpg";
import freelancer3 from "../../../Assets/gbelagnonF.png";
import freelancer4 from '../../../Assets/steph.jpg';
import freelancer5 from "../../../Assets/aristide.jpg";
import freelancer6 from "../../../Assets/daniel.jpg";

const freelancers = [
  { id: 1, name: "John Romeo", skill: "Développeur Web", image: freelancer1 },
  { id: 2, name: "Valentin Smith", skill: "Graphiste", image: freelancer2 },
  { id: 3, name: "Alex Antoine", skill: "Rédacteur", image: freelancer3 },
  { id: 4, name: "Stephanie Davis", skill: "Développeur mobile", image: freelancer4 },
  { id: 5, name: "Aristide Gabon", skill: "Intégrateur Data", image: freelancer5 },
  { id: 6, name: "Daniel Garcia", skill: "Ingenieur reseau", image: freelancer6 }
];



const Freelance = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className={styles.freelanceSection}>
      <h2 className={styles.heading} data-aos="fade-down">
        Ours Freelancers
      </h2>
      <div className={styles.grid}>
        {freelancers.map((freelancer, index) => (
          <Card
          key={freelancer.id}
          image={freelancer.image}
          title={freelancer.name}
          description={<span className={styles.description}>{freelancer.skill}</span>}
        />
        
        ))}
      </div>
    </section>
  );
};

export default Freelance;
