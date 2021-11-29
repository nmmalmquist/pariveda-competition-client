import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";

import styles from "../css/footer.module.css";

const Footer = () => {
  return (
    <section className={styles.footer}>
      <div className={styles.footerText}>
        <h5>2021 Puppy Paws, LLC</h5>
        <ul className={styles.footerList}>
          <li className={styles.footerListItem}>
            <Link to="/policy">Policies</Link>
          </li>
          <li className={styles.footerListItem}>
            <a href="https://www.google.com/maps/d/u/0/viewer?ie=UTF8&t=m&oe=UTF8&msa=0&mid=1TOzNDA74S3rFASKmtp-EH_gAkWk&ll=33.21068221174746%2C-87.5539018349425&z=21" target="_blank" rel="noreferrer">Location</a>
          </li>
        </ul>
      </div>
      <div className={styles.socialMediaIconsContainer}>
        <a href="https://www.instagram.com">
          <FontAwesomeIcon className={styles.iconStyle} icon={faInstagram} />
        </a>
        <a href="https://www.facebook.com/">
          <FontAwesomeIcon className={styles.iconStyle} icon={faFacebook} />
        </a>
        <a href="https://www.twitter.com/">
          <FontAwesomeIcon className={styles.iconStyle} icon={faTwitter} />
        </a>
      </div>
    </section>
  );
};

export default Footer;
