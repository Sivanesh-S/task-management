import React, { useContext } from 'react';
import { useGoogleLogin } from 'react-google-login';

import { store } from '../../context';

// routing
import { useHistory } from 'react-router-dom';

// styles
import style from './AuthPage.module.css';

// icons
import { FaUser } from 'react-icons/fa';

// components
import { Typography, message } from 'antd';
import api from '../../utils/api';
import { handleGoogleLogin } from '../../utils/googleLoginHandler';
const { Title } = Typography;

function AuthPage(props) {
  const { dispatch } = useContext(store);
  const history = useHistory();

  if (localStorage.getItem('provider') && localStorage.getItem('authToken')) {
    history.push('/');
  }

  // routing
  const goMailLogin = () => history.push('./signin');
  const goMailSignup = () => history.push('./signup');

  // google oauth
  const clientId =
    '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

  const onSuccess = async (res) => {
    const { profileObj } = res;
    await handleGoogleLogin(res, 'Auth');
    message.success(`${profileObj.name} Welcome to Twelve notes`);
    history.push('/', profileObj);
    dispatch({ type: 'LOGIN', data: { provider: 'GOOGLE_AUTH' } });
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
    // responseType: 'code',
    // prompt: 'consent',
  });

  return (
    <div className={style.page}>
      <FaUser className={style.avatar} />
      <Title>Twelve Tasks</Title>
      <div className={style.container}>
        <button
          // onChange={onChange}
          className={style.button}
          onClick={goMailLogin}
        >
          <img src="/icons/email.svg" alt="email" className={style.icon}></img>

          <span className={style.buttonText}>Sign in with Email</span>
        </button>
        <button onClick={signIn} className={style.button}>
          <img
            src="/icons/google.svg"
            alt="google login"
            className={style.icon}
          ></img>

          <span className={style.buttonText}>Sign in with Google</span>
        </button>
        <div className={style.signUp}>
          Want to Join?{' '}
          <span className={style.signUpLink} onClick={goMailSignup}>
            Sign Up
          </span>
        </div>
      </div>
    </div>
  );
}

export default AuthPage;
