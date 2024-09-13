import React from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles/styles.module.css';

const Footer = () => {
  return (
    <>
      {/* 
      <section className="container" id="foterbox">

        {/* <div className="mainfoter row py-3 "> */}
      {/*  <div className={styles.mainfoter}>

       

          <div className={`${styles.foterbox} col-md-2 text-center`}>
            <h3><span>Quick links</span></h3>
            <Link to="#"> <i className="fas fa-arrow-right"></i> Home </Link>
      
            <Link to="#"> <i className="fas fa-arrow-right"></i> Contact </Link>
          </div>

          <div className={`${styles.foterbox}col-md-4  text-center`}>
            <h3> <span>Contact info</span></h3>
            <Link to="#"> <i className="fas fa-phone"></i> +91 79739 84439</Link>
            <Link to=""> <i className="fas fa-envelope"></i> sahildhiman76866@gmail.com </Link>
                <Link to="#"> <i className="fas fa-map-marker-alt"></i> Chandigarh, india </Link>
          </div>

          <div className={`${styles.foterbox}col-md-3  text-center`}>
            <h3><span>Follow us</span></h3>
            <Link to="https://www.facebook.com/profile.php?id=100027765728262&mibextid=ZbWKwL">
              <i className="fab fa-facebook-f"></i> facebook </Link>
            <Link to="https://www.instagram.com/name_is_sahil_7?igsh=ejh1aW4wbnIwcm0=">
              <i className="fab fa-instagram"></i> instagram </Link>
            <Link to="https://www.whatsapp.com/"> <i className="fab fa-whatsapp">
            </i> whatsapp </Link>
          </div>
        </div> */}
      {/* <footer className={styles.footer}> */}
      <hr className="container  " />

      <div className={`${styles.credit} bg-slate-300 p-4`}> Created by
        <span className={styles.span}> Mr. Web Developer  </span>
        | all &copy; copy rights reserved </div>

      <hr className="container" />
      {/* </section> */}

      {/* </footer> */}


    </>
  )
}

export default Footer;
