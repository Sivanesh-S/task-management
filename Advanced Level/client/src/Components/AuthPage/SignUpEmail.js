import React, { useState, useEffect } from 'react';
import axios from 'axios';

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

function SignUpEmail(props) {
  const [email, setEmail] = useInput('');
  const [fullName, setFullName] = useInput('');
  const [password, setPassword] = useInput('');
  const [confirmPassword, setConfirmPassword] = useInput('');

  // state
  const [msg, setMsg] = useState('');
  const prevMsg = usePrevious(msg);

  const history = useHistory();

  // routing
  const goBack = () => history.goBack();

  useEffect(() => {
    if (msg && prevMsg === msg) {
      setMsg('');
    }
  }, [email, password, msg, prevMsg]);

  // events
  const onSubmit = async (event) => {
    event.preventDefault();

    if (
      isEmailValid() &&
      isPasswordValid() &&
      isFullNameValid() &&
      isPasswordConfirmed()
    ) {
      try {
        const response = await axios.post('/auth/signup', {
          fullName,
          email,
          password,
        });
        console.log('response:', response);
        const { token } = response.data;

        if (token) {
          localStorage.setItem('authToken', token);
          localStorage.setItem('provider', 'basic');
          history.push('/');
          message.success(`Welcome To Twelve Tasks ${fullName}`);
        } else {
          setMsg("There's some issue in signup");
        }
      } catch (err) {
        if (err.response.status === 401) {
          setMsg(err.response.data.message);
        } else {
          setMsg(err.message);
        }
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

  const isFullNameValid = () => {
    if (fullName) {
      return true;
    }
    setMsg('Full name must not be empty');
    return false;
  };

  const isPasswordConfirmed = () => {
    if (password === confirmPassword) {
      return true;
    }
    setMsg(`Password and confirm password are not be same`);
    return false;
  };

  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} onClick={goBack} />
      <FaUser className={style.avatar} />
      <Title>Twelve Tasks</Title>
      <Title level={3}>Sign up</Title>
      <div className={style.container}>
        <form method="POST" onSubmit={onSubmit}>
          <Input
            value={email}
            onChange={setEmail}
            placeholder="Email"
            type="text"
            className={style.input}
            onBlur={isEmailValid}
          ></Input>
          <Input
            value={fullName}
            onChange={setFullName}
            placeholder="Full Name"
            type="text"
            className={style.input}
            onBlur={isFullNameValid}
          ></Input>
          <Input.Password
            value={password}
            onChange={setPassword}
            className={style.input}
            placeholder="Password"
            onBlur={isPasswordValid}
            iconRender={(visible) =>
              visible ? <FaRegEye /> : <FaRegEyeSlash />
            }
          />
          <Input.Password
            value={confirmPassword}
            onChange={setConfirmPassword}
            className={style.input}
            placeholder="Confirm Password"
            visibilityToggle={false}
          />
          {msg && <div style={{ color: 'crimson' }}>{msg}</div>}
          <button className={`${style.input} ${style.signUpButton}`} block>
            Sign In
          </button>
        </form>
        <div className={style.signUp}>
          Want to Join? <span className={style.signUpLink}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default SignUpEmail;
