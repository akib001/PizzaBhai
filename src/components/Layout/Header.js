import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';

const Header = props => {
  const isLoggedIn = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  };

  const loginhandler = () => {
    navigate('/auth');
  };

  const homeHandler = () => {
    navigate('/');
  };

  const adminHandler = () => {
    navigate('/admin');
  };

  const pathname = window.location.pathname;

  let buttonContent;

  if (isLoggedIn && pathname === '/admin') {
    buttonContent = <button onClick={logoutHandler}>Logout</button>;
  }

  if (isLoggedIn && pathname === '/') {
    buttonContent = <button onClick={adminHandler}>Admin</button>;
  }

  if (!isLoggedIn) {
    buttonContent = <button onClick={loginhandler}>Login</button>;
  }

  return (
    <Fragment>
      <header className={classes.header}>
        {pathname !== '/' ? (
          <button onClick={homeHandler}>Home</button>
        ) : (
          <h1 onClick={homeHandler}>ReactMeals</h1>
        )}
        {buttonContent}
        {pathname !== '/admin' &&
          <HeaderCartButton
          className={classes.headerButton}
          onClick={props.onShowCart}
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
