import { Link } from "react-router-dom";
import styles from "../Login/Auth.module.css";
import { useState } from "react";
import axios from 'axios'

const Signup = () => {
  let [username, setUserName] = useState('');
  let [email, setEmail] = useState('');
  let [password, setPassword] = useState('');
  let [confirmPassword, setConfirmPassword] = useState('');
  let [telephone, setTelephone] = useState('');
  let [specialite, setSpecialite] = useState('');
  let [date, setDate] = useState('');

  let today = new Date();
    let todayString = today.toISOString().slice(0, 16);

  const handlesubmit = (e)=>{
    e.preventDefault();

    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    console.log('name:', username);
    console.log('email:', email);
    console.log('password:', password);
    console.log('telephone:', telephone);
    console.log('specialite:', specialite);
    console.log('date:', date);

    let signupInfo = {
      username: username,
      email: email,
      password: password,
      telephone: telephone,
      specialite: specialite,
      date: date
    }
    console.log(signupInfo);

    axios.post('http://localhost:5000/freelace/signup', signupInfo)
    .then((response)=> {
      console.log(response.data);
      window.location.href ="/Login";
    })
    .catch((error)=>{
      console.log(error);
      alert(error.response?.data?.error || "Erreur inconue");
    })

  }

  

  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <form className={styles.left} onSubmit={handlesubmit}>
          <h2>Create Account</h2>
          <p className={styles.p2}>Use your email for registration</p>
          <div className={styles.inputbox}>
            <div className={styles.leftbox}>
            <input
              type="text"
              placeholder="username"
              name="nom"
              value={username}
              onChange={(e)=>setUserName(e.target.value)}
              className={styles.input}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              className={styles.input}
            />
            <input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className={styles.input}
            />
            </div>
            <div className={styles.rightbox}>
            <input
            type="password"
            placeholder="Confirm Password"
            name="password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <input
            type="number"
            placeholder="Phone Number"
            name="Phone Number"
            value={telephone}
            onChange={(e)=>setTelephone(e.target.value)}
            className={styles.input}
            />
            <input
            type="text"
            placeholder="Speciality"
            name="speciality"
            value={specialite}
            onChange={(e)=>setSpecialite(e.target.value)}
            className={styles.input}
          />
          <input
            type="datetime-local"
            placeholder="Date of signup"
            name="date"
            value={date}
            onChange={(e)=>setDate(e.target.value)}
            className={styles.input}
            min={todayString}
          />
            </div>
            
          
          
          
          
          

        </div>  

          <button className={styles.button}>SIGN UP</button>
        </form>
        <div className={styles.right}>
          <h2 className={styles.welcome}>Welcome Back!</h2>
          <p>To keep connected with us, please login with your details</p>
          <Link to="/login" className={styles.button2}>SIGN IN</Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
