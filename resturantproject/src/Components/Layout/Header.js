import React from 'react';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderButtonCart';

function Header({ onShowCart }) {
  return (
    <>
      <header className={styles.header}>
        <h1>React Meals</h1>
        <HeaderCartButton onClick={onShowCart} />
      </header>
      <div className={styles['main-image']}>
        <img src='https://image.lexica.art/full_jpg/5b464aad-a616-4387-b4f0-bc234e4354ea' alt='table with delicious food' />
      </div>
    </>
  );
}

export default Header;
