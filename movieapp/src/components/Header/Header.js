import React from 'react'
import {Link } from 'react-router-dom';
import './Header.css'

function Header() {
  return (
    <div className='header'>
        <Link to='/'>
            <div className='logo'>Movie App</div>
        </Link>
        <div className='user-image'>
            <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT97ZJnFL8xnPQVMuPDkWiLMlsBKOWDpHMq7w&usqp=CAU' alt='user'/>
        </div>

    </div>
  )
}

export default Header