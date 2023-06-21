import React from 'react';
import { useLocation } from 'react-router-dom';
import './Title.css';

const Title = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  return (
    <div className="text-center mt-4 bg-secondary">
      <h1 className="text-white">The Generics</h1>
      {isHomePage && <h2 className="title">Get our Latest Album</h2>}
    </div>
  );
};

export default Title;
