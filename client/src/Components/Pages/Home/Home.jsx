import React from 'react';
import styles from './Home.module.css';
import Services from '../Services/Services';
import About from '../About/About';
import Experiences from '../Experience/Experiences';
import Profil from '../Profil/Profil';

const Home = () => {
  return (
    <div className={styles.container}> 
    <About/>
    <Services/>
    <Experiences/>
    <Profil/>     
    </div>
  );
};

export default Home;
