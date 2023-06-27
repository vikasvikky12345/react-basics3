import React from 'react';
import './Header.css';

const Header = ({ cartQuantity }) => {
  return (
    <div className="header">
      <h1>My Online Store</h1>
      <nav>
        <ul>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/store">Store</a>
          </li>
          <li>
            <a href="/contact">Contact</a>
          </li>
          <li className="cart-button">
            <button>Cart ({cartQuantity || 0})</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
