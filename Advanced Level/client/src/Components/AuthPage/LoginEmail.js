import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// hooks
import { useInput, usePrevious } from '../../hooks';

// routing
import { useHistory } from 'react-router-dom';

// styles
import style from './AuthPage.module.css';

// icons
import { FaArrowLeft, FaUser, FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

// utils
import { validateEmail, isInvalidPassword } from '../../utils';

// components
import { Typography, Input, message } from 'antd';
const { Title } = Typography;

function LoginEmail(props) {
  // inputs
  const [email, setEmail] = useInput('');
  const [password, setPassword] = useInput('');

  // state
  const [msg, setMsg] = useState('');
  const prevMsg = usePrevious(msg);

  // routing
  const history = useHistory();

  const goBack = () => history.goBack();

  useEffect(() => {
    if (msg && prevMsg === msg) {
      setMsg('');
    }
  }, [email, password]);

  // events
  const onSubmit = async (e) => {
    e.preventDefault();

    if (isEmailValid() && isPasswordValid()) {
      const response = await fetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      const { status } = response;

      if (status === 400 || status === 401) {
        const message = await response.text();
        setMsg(message);
        console.log('message:', message);
      } else {
        const { token, fullName } = await response.json();

        localStorage.setItem('authToken', token);
        history.push('/');
        message.success(`Welcome To Twelve Tasks ${fullName}`);
      }
    }
  };

  const isEmailValid = () => {
    if (!validateEmail(email)) {
      setMsg('Enter a valid Email');
      return false;
    }
    return true;
  };

  const isPasswordValid = () => {
    let errorString = null;
    errorString = isInvalidPassword(password);
    if (errorString) {
      setMsg(errorString);
      return false;
    }
    return true;
  };

  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} onClick={goBack} />
      <FaUser className={style.avatar} />
      <Title>Twelve Tasks</Title>
      <Title level={3}>Login</Title>
      <div className={style.container}>
        <form onSubmit={onSubmit} method="POST">
          <Input
            placeholder="Email"
            type="text"
            className={style.input}
            onChange={setEmail}
            onBlur={isEmailValid}
          ></Input>
          <Input.Password
            onChange={setPassword}
            className={style.input}
            placeholder="Password"
            iconRender={(visible) =>
              visible ? <FaRegEye /> : <FaRegEyeSlash />
            }
            onBlur={isPasswordValid}
          />
          {msg && <div style={{ color: 'crimson' }}>{msg}</div>}
          <input
            type="submit"
            className={`${style.input} ${style.signUpButton}`}
            value={'Sign In'}
          ></input>
        </form>
        <div className={style.signUp}>
          Want to Join? <span className={style.signUpLink}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
