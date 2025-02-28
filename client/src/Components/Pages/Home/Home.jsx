import React from 'react';
import styles from './Home.module.css';
/* import HomeCont from '../HomeContent/HomeCont'; */
import Advantages from '../Adavantage/Advantage';
import AboutUs from '../About/About';
import Cat from '../Cat/Cat';
import Freelance from '../Freelance/Freelance';
import Testimonie from '../Testimonies/Testimonies';
import Footer from '../../Layout/Footer/Footer';

const Home = () => {
  return (
    <div className={styles.container}> 
      <div className={styles.head1}></div>
      <div className={styles.header}>
        <div className={styles.overlay}></div>
        <h1>Welcome to Freelance Hub</h1>
      </div>
      {/* <HomeCont/> */}
      <Advantages/>
      <AboutUs/>
      <Cat/>
      <Freelance/>
      <Testimonie/>
      <Footer/>
    </div>
  );
};

export default Home;
