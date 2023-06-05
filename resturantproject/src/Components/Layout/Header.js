import React from 'react'
import styles from './Header.module.css'
import HeaderButtonCart from './HeaderButtonCart'

function Header() {
  return (
    <>
        <header className={styles.header}>
            <h1>React Meals</h1>
            <HeaderButtonCart/>
        </header>
        <div className={styles['main-image']}>
            <img src='https://image.lexica.art/full_jpg/5b464aad-a616-4387-b4f0-bc234e4354ea' alt='table with deleicious food'/>
        </div>
    </>
  )
}

export default Header