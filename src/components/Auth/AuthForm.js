import { useState, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithGoogle } from '../../firebase/Firebase'
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../../store/auth-slice'; 

import classes from './AuthForm.module.css';

const AuthForm = () => {
  const enteredEmailRef = useRef();
  const enteredPasswordRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();


  const dispatch = useDispatch();
  const error = useSelector(state => state.auth.error);


  const switchAuthModeHandler = () => {
    setIsLogin(prevState => !prevState);
  };

  const signInWithGoogleHandler = () => {

    signInWithGoogle()
      .then(result => {
        console.log(result._tokenResponse.idToken);

        console.log(result);
        // const expirationTime = new Date(
        //   new Date().getTime() + +result._tokenResponse.expiresIn * 1000
        // );
        // const name = result.user.displayName;
        // const profilePic = result.user.photoURL;
        dispatch(authActions.login(result._tokenResponse.idToken));
        navigate('/admin')
      })
      .catch(error => {
        console.log(error);
      });
  };

  const submitHandler = event => {
    event.preventDefault();
    const email = enteredEmailRef.current.value;
    const password = enteredPasswordRef.current.value;
    setIsLoading(true);
    let url;

    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY';
    } else {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAL0N1DDE5PErh_25vFihwZzgbQ2cozKYY';
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email,
        password,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        setIsLoading(false);
        if (response.ok) {
          return response.json();
        } else {
          return response.json().then(data => {
            let errorMessage = 'Authentication Failed!';
            if (data && data.error.message && data.error) {
              errorMessage = data.error.message;
            }
            throw new Error(errorMessage);
          });
        }
      })
      .then(data => {
        console.log(data);
        // const expirationTime = new Date(
        //   new Date().getTime() + +data.expiresIn * 1000
        // );
        dispatch(authActions.login(data.idToken));
        navigate('/admin');
      })
      .catch(error => {
        dispatch(authActions.setError(error.message))
      });
  };

  const focusHandler = () => {
    dispatch(authActions.setError(false))
  };

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
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
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <div className={classes.actions}>
            <button className={classes['login-with-google-btn']} onClick={signInWithGoogleHandler}>
              Sign In With Google
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
  );
};

export default AuthForm;
