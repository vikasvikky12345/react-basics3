import React from 'react';
import { FaYoutube, FaSpotify, FaFacebook } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <h2>The Generics</h2>
      <div className="social-icons">
        <FaYoutube className="icon" size={30} />
        <FaSpotify className="icon" size={30} />
        <FaFacebook className="icon" size={30} />
      </div>
    </footer>
  );
};

export default Footer;
