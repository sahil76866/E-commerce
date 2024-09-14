import React from 'react'
import { Link } from 'react-router-dom';

import styles from '../styles/styles.module.css';
import { ImFacebook2 } from "react-icons/im";
import { RiInstagramFill } from "react-icons/ri";
import { BsLinkedin } from "react-icons/bs";
import { ImGithub } from "react-icons/im";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  return (
    <>

      <section className="container" id="foterbox">

        <div className="mainfoter row py-3 ">

          <footer className={styles.footer}>
            <hr className="container  " />

            <div className={`${styles.credit} bg-slate-800 p-4`}>
              <div className='flex p-2 text-3xl gap-5 justify-center  text-white my-3 rounded-full '>
                <Link to={'https://www.facebook.com/profile.php?id=100027765728262&mibextid=ZbWKwL'} target='_blank'> <ImFacebook2 /></Link>
                <Link to={'https://www.instagram.com/name_is_sahil_7?igsh=ejh1aW4wbnIwcm0='} target='_blank'>  <RiInstagramFill /> </Link>
                <Link to={'mailto:sahildhiman76866@gmail.com'} target='_blank'> <MdEmail/> </Link>
                <Link to={'https://github.com/sahil76866'} target='_blank'> <ImGithub /> </Link>
                <Link to={'https://www.linkedin.com/in/sahil-dhiman-b249a5244/'} target='_blank'> <BsLinkedin /> </Link>
              </div>

              <p className='text-white'> Developed By
                <span className=" italic text-red-400 " >  Mr. Sahil Dhiman  </span>
                | all &copy; copy rights reserved

              </p>
            </div>

            <hr className="container" />
          </footer>
        </div>
      </section >


    </>
  )
}

export default Footer;
