import React from "react";
import styles from "./Footer.module.css";
import {  FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        {/* Quick Links */}
        <div className={styles.section}>
          <h3>Quick Links</h3>
          <ul>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Conditions</li>
            <li>FAQs & Help</li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.section}>
          <h3>Contact</h3>
          <p><FaMapMarkerAlt /> 123 Street, New York, USA</p>
          <p><FaPhoneAlt /> +012 345 67890</p>
          <p><FaEnvelope /> info@example.com</p>
          <div className={styles.socialIcons}>
            <FaFacebookF className={styles.icon} />
            <FaTwitter className={styles.icon} />
            <FaYoutube className={styles.icon} />
            <FaLinkedinIn className={styles.icon} />
          </div>
        </div>

        {/* Gallery */}
        <div className={styles.section}>
          <h3>Gallery</h3>
          <div className={styles.gallery}>
            {[...Array(6)].map((_, index) => (
              <img key={index} src={`https://source.unsplash.com/50x50/?office,work,meeting&random=${index}`} alt={`gallery${index + 1}`} />
            ))}
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.section}>
          <h3>Newsletter</h3>
          <p>Subscribe to our newsletter for the latest updates.</p>
          <div className={styles.newsletter}>
            <input type="email" placeholder="Your email" />
            <button>Sign Up</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
