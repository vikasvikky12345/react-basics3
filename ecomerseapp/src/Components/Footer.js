import React from 'react';
import { FaYoutube, FaSpotify, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-info text-white text-center py-4">
      <h2> The Generics</h2>
      <div className="mt-3">
        <FaYoutube className="mx-3" size={30} />
        <FaSpotify className="mx-3" size={30} />
        <FaFacebook className="mx-3" size={30} />
      </div>
    </footer>
  );
};
export default Footer;