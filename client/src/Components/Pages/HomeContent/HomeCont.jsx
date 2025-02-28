import React from 'react';
import { motion } from 'framer-motion';
import styles from './HomeCont.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      {/* En-tête */}
      <motion.header 
        className={styles.header}
        initial={{ opacity: 0, y: 50 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 1 }}
      >
        <h1 className={styles.title}>Bienvenue sur Freelance Hub</h1>
        <p>La plateforme qui connecte talents et entreprises</p>
      </motion.header>

      {/* Section Présentation */}
      <motion.section 
        className={styles.about}
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Qui sommes-nous ?</h2>
        <p>
          Freelance Hub met en relation des freelances et des entreprises
          à la recherche de talents. Trouvez des missions ou recrutez des experts qualifiés facilement.
        </p>
      </motion.section>

      {/* Avantages sous forme de cartes */}
      <motion.section 
        className={styles.benefits}
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>Pourquoi choisir Freelance Hub ?</h2>
        <div className={styles.benefitsGrid}>
          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>🔍 Trouvez des missions facilement</h3>
            <p>Accédez à une large gamme de projets adaptés à vos compétences.</p>
          </motion.div>
          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>🔒 Paiements sécurisés</h3>
            <p>Des transactions protégées pour assurer votre tranquillité d’esprit.</p>
          </motion.div>
          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>👥 Rejoignez une communauté</h3>
            <p>Échangez et collaborez avec d'autres freelances du monde entier.</p>
          </motion.div>
          <motion.div className={styles.card} whileHover={{ scale: 1.05 }}>
            <h3>📈 Développez votre carrière</h3>
            <p>Améliorez vos compétences et boostez vos revenus.</p>
          </motion.div>
        </div>
      </motion.section>

      {/* CTA */}
      <motion.section 
        className={styles.cta}
        initial={{ opacity: 0, y: 50 }} 
        whileInView={{ opacity: 1, y: 0 }} 
        viewport={{ once: true }}
        transition={{ duration: 1 }}
      >
        <h2>🚀 Rejoignez Freelance Hub dès aujourd’hui !</h2>
        <button className={styles.button}>S'inscrire</button>
      </motion.section>
    </div>
  );
};

export default Home;
