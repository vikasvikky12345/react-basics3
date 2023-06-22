import React from 'react';
import { useContext } from 'react';
import { Link, useMatch,useResolvedPath } from 'react-router-dom';
import classes from './MainNavigation.module.css';
import AuthContext from '../../Store/authContex';



const MainNavigation = () => {

    const authCtx = useContext(AuthContext);
    const isLoggedIn = authCtx.isLoggedIn;
  const homeMatch = useMatch('/');
  const authMatch = useMatch('/auth');
  const profileMatch = useMatch('/profile');

  const homePath = useResolvedPath('/');
  const authPath = useResolvedPath('/auth');
  const profilePath = useResolvedPath('/profile');
  const logoutHandler = () => {
    authCtx.logout();
  };

  return (
    <header className={classes.header}>
      <Link to={homePath}>
        <div className={`${classes.logo} ${homeMatch && classes.active}`}>React Auth</div>
      </Link>
      <nav>
        <ul>
        {!isLoggedIn && (
          <li>
            <Link to={authPath} className={authMatch && classes.activeLink}>
              Login
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <Link to={profilePath} className={profileMatch && classes.activeLink}>
              Profile
            </Link>
          </li>
        )}
        {isLoggedIn && (
          <li>
            <button onClick={logoutHandler}>Logout</button>
          </li>
        )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
