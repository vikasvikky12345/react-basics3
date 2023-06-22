import React from 'react';
import { Link, useMatch,useResolvedPath } from 'react-router-dom';
import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const homeMatch = useMatch('/');
  const authMatch = useMatch('/auth');
  const profileMatch = useMatch('/profile');

  const homePath = useResolvedPath('/');
  const authPath = useResolvedPath('/auth');
  const profilePath = useResolvedPath('/profile');

  return (
    <header className={classes.header}>
      <Link to={homePath}>
        <div className={`${classes.logo} ${homeMatch && classes.active}`}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to={authPath} className={authMatch && classes.activeLink}>
              Login
            </Link>
          </li>
          <li>
            <Link to={profilePath} className={profileMatch && classes.activeLink}>
              Profile
            </Link>
          </li>
          <li>
            <button>Logout</button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
