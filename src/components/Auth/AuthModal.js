import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
// import { signInWithGoogle } from '../../firebase/Firebase';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice';
import React from 'react';
import { uiActions } from '../../store/ui-slice';

import classes from './AuthModal.module.css';
import Modal from '../UI/Modal';

const AuthModal = (props) => {
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const enteredNameRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const error = useSelector((state) => state.auth.error);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();
    const email = enteredEmailRef.current.value;
    const password = enteredPasswordRef.current.value;
    const name = isLogin ? null : enteredNameRef.current.value;
    setIsLoading(true);
    let url;
    let bodyContent;
    let method;

    // User Login
    if (isLogin && !isAdminMode) {
      url =
        'https://pizzabhai.cyclic.app/auth/user/login';
      method = 'POST';
      bodyContent = {
        email,
        password
      };
    }

    // User Signup
    if (!isLogin && !isAdminMode) {
      url =
        'https://pizzabhai.cyclic.app/auth/user/signup';
      method = 'PUT';
      bodyContent = {
        name,
        email,
        password,
        userRole: true,
      };
    }

    // Admin Login
    if (isLogin && isAdminMode) {
      url =
        'https://pizzabhai.cyclic.app/auth/admin/login';
      method = 'POST';
      bodyContent = {
        email,
        password
      };
    }

    // Admin Signup
    if (!isLogin && isAdminMode) {
      console.log('Admin Signup')
      url =
        'https://pizzabhai.cyclic.app/auth/admin/signup';
      method = 'PUT';
      bodyContent = {
        name,
        email,
        password,
        adminRole: true,
      };
    }

    fetch(url, {
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bodyContent),
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
        if (isAdminMode) {
          if (!data.token) {
            setIsLogin(false);
            return
          }
          dispatch(authActions.adminLogin(data.token));
          dispatch(uiActions.toggleShowAuthHandler())
          navigate('/admin');
        } else {
          if (!data.token) {
            setIsLogin(false);
            return
          }
          dispatch(authActions.userLogin(data.token));
          dispatch(
            authActions.setUserProfile({ name: data.name, email: data.email })
          );
          dispatch(uiActions.toggleShowAuthHandler())
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
    <Modal>
      <div className={classes[`switch-container`]}>
        <ul>
          <li>
            <button
              onClick={() => setIsAdminMode(false)}
              className={
                !isAdminMode
                  ? classes['active-switch']
                  : classes['inactive-switch']
              }
            >
              User
            </button>
          </li>
          <li>
            <button
              onClick={() => setIsAdminMode(true)}
              className={
                isAdminMode
                  ? classes['active-switch']
                  : classes['inactive-switch']
              }
            >
              Admin
            </button>
          </li>
        </ul>
      </div>

      <form onSubmit={submitHandler}>
        <div className={classes.control}>
          {!isLogin && <><label htmlFor="name">First Name</label>
            <input
              onFocus={focusHandler}
              type="text"
              id="name"
              required
              ref={enteredNameRef}
            /></>}
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
        <div className={classes.actions}>
          {!isLoading && (
            <button type='submit'>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Loading...</p>}
          {/* <div className={classes.actions}>
            <button
              className={classes['login-with-google-btn']}
              onClick={signInWithGoogleHandler}
            >
              {`Sign ${isLogin ? 'in' : 'up'} With Google`}
            </button>
          </div> */}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AuthModal;
