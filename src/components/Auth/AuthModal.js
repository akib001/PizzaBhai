import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import React from 'react';

import classes from './AuthModal.module.css';
import Modal from '../UI/Modal';

const AuthModal = (props) => {
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const loginModeHandler = () => {
    setIsAdminMode((prevState) => !prevState);
  };

  const signInWithGoogleHandler = () => {
    signInWithGoogle()
      .then((result) => {
        if (isAdminMode) {          
          dispatch(authActions.adminLogin(result._tokenResponse.idToken));
          navigate('/admin');
        } else {
          dispatch(authActions.userLogin(result._tokenResponse.idToken));
          dispatch(authActions.setUserProfile({name:result._tokenResponse.firstName, email: result._tokenResponse.email}))
          navigate('/user');
        }        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = enteredEmailRef.current.value;
    const password = enteredPasswordRef.current.value;
    setIsLoading(true);
    let url;
    let bodyContent;

    if (isLogin && error !== 'INVALID_PASSWORD') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY';
      bodyContent = {
        email,
        password,
        returnSecureToken: true,
      };
      console.log('login');
    }

    if (!isLogin && error !== 'INVALID_PASSWORD') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY';
      bodyContent = {
        email,
        password,
        returnSecureToken: true,
      };
      console.log('signup');
    }

    if (error === 'INVALID_PASSWORD') {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY';
      bodyContent = {
        requestType: 'PASSWORD_RESET',
        email,
      };
      console.log('reset');
    }

    fetch(url, {
      method: 'POST',
      body: JSON.stringify(bodyContent),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then((data) => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error.message && data.error) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        console.log(data);
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        if (isAdminMode) {
          dispatch(authActions.adminLogin(data.idToken));
          navigate('/admin');
        } else {
          dispatch(authActions.userLogin(data.idToken));
          dispatch(authActions.setUserProfile({name:'User', email: data.email}))
          navigate('/user');
        }
        
      })
      .catch((error) => {
        dispatch(authActions.setError(error.message));
      });
  };

  const focusHandler = () => {
    dispatch(authActions.setError(false));
  };

  return (
    <Modal onClose={props.onClose}>
      <div className={classes[`switch-button`]}>
        <button onClick={loginModeHandler}>
        {isAdminMode ? 'Switch to User Login' : 'Switch to Admin Login'}
      </button>
      </div>
      
      <section className={classes.auth}>
        <h1>
          {isLogin
            ? isAdminMode
              ? 'Admin Login'
              : 'User Login'
            : isAdminMode
            ? 'Admin Sign Up'
            : 'User Sign Up'}
        </h1>
        <form onSubmit={submitHandler}>
          <div className={classes.control}>
            <label htmlFor="email">Your Email</label>
            <input
              onFocus={focusHandler}
              type="email"
              id="email"
              required
              ref={enteredEmailRef}
            />
          </div>
          <div className={classes.control}>
            <label htmlFor="password">Your Password</label>
            <input
              onFocus={focusHandler}
              type="password"
              id="password"
              required
              ref={enteredPasswordRef}
            />
          </div>
          {error && (
            <div className={classes.error}>
              <p>{error}</p>
            </div>
          )}
          {isLogin && error === 'INVALID_PASSWORD' && (
            <button>Reset Password</button>
          )}
          <div className={classes.actions}>
            {!isLoading && (
              <button>{isLogin ? 'Login' : 'Create Account'}</button>
            )}
            {isLoading && <p>Loading...</p>}
            <div className={classes.actions}>
              <button
                className={classes['login-with-google-btn']}
                onClick={signInWithGoogleHandler}
              >
                {`Sign ${isLogin ? 'in' : 'up'} With Google`}
              </button>
            </div>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? 'Create new account' : 'Login with existing account'}
            </button>
          </div>
        </form>
      </section>
    </Modal>
  );
};

export default AuthModal;
