import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';
import { uiActions } from '../../store/ui-slice';

const Header = props => {
  const isAdminLoggedIn = useSelector(state => state.auth.adminToken);
  const isUserLoggedIn = useSelector(state => state.auth.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminLogoutHandler = () => {
    dispatch(authActions.adminLogout());
  };

  const userLogoutHandler = () => {
    dispatch(authActions.userLogout());
  };

  const homeHandler = () => {
    navigate('/');
  };

  const adminHandler = () => {
    navigate('/admin');
  };

  const userHandler = () => {
    navigate('/user');
  };

  const pathname = window.location.pathname;

  let buttonContent;

  if (isAdminLoggedIn && pathname === '/admin') {
    buttonContent = <button onClick={adminLogoutHandler}>Logout</button>;
  }

  if (isUserLoggedIn && pathname === '/user') {
    buttonContent = <button onClick={userLogoutHandler}>Logout</button>;
  }

  if (isAdminLoggedIn && !isUserLoggedIn && pathname === '/') {
    buttonContent = <button onClick={adminHandler}>Admin</button>;
  }

  if (isUserLoggedIn && !isAdminLoggedIn && pathname === '/') {
    buttonContent = <button onClick={userHandler}>User</button>;
  }

  if (!isUserLoggedIn && !isAdminLoggedIn) {
    buttonContent = <button onClick={() => dispatch(uiActions.toggleShowAuthHandler())}>Login</button>;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        {pathname !== '/' ? (
          <button onClick={homeHandler}>Home</button>
        ) : (
          <h1 onClick={homeHandler}>PizzaBhai</h1>
        )}
        {buttonContent}
        {pathname === '/' &&
          <HeaderCartButton
          className={classes.headerButton}
        />
        }
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt="A table full of delicious food!" />
      </div>
    </Fragment>
  );
};

export default Header;
