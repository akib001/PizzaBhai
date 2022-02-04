import { Fragment } from 'react';
import HeaderCartButton from './HeaderCartButton';
import mealsImage from '../../assets/meals.jpg';
import classes from './Header.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import { useNavigate } from 'react-router-dom';

const Header = (props) => {
  const isLoggedIn = useSelector(state => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
  }

  const loginhandler = () => {
    navigate('/auth')
  }

  const homeHandler = () => {
    navigate('/');
  }

  return (
    <Fragment>
      <header className={classes.header}>
        <h1 onClick={homeHandler}>ReactMeals</h1>
        {isLoggedIn ? <button onClick={logoutHandler}>Logout</button> : <button onClick={loginhandler}>Login</button>}
        <HeaderCartButton onClick={props.onShowCart} />
      </header>
      <div className={classes['main-image']}>
        <img src={mealsImage} alt='A table full of delicious food!' />
      </div>
    </Fragment>
  );
};

export default Header;
