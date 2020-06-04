import React from 'react';
import PropTypes from 'prop-types';

// routing
import { useHistory } from 'react-router-dom';

// styles
import style from './AuthPage.module.css';

// icons
import { FaArrowLeft, FaUser } from 'react-icons/fa';

// components
import { Typography } from 'antd';
const { Title } = Typography;

function AuthPage(props) {
  const history = useHistory();

  // routing
  const goMailLogin = () => history.push('./signin');
  const goMailSignup = () => history.push('./signup');

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
          <img src="/icons/email.svg" className={style.icon}></img>

          <span className={style.buttonText}>Sign in with Email</span>
        </button>
        <button
          // onChange={onChange}
          className={style.button}
        >
          <img src="/icons/google.svg" className={style.icon}></img>

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
