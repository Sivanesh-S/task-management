import React from 'react';
import PropTypes from 'prop-types';

// styles
import style from './AuthPage.module.css';

// icons
import {
  FaArrowLeft,
  FaUser,
  FaEye,
  FaEyeSlash,
  FaRegEye,
  FaRegEyeSlash,
} from 'react-icons/fa';

// components
import { Typography, Input } from 'antd';
const { Title } = Typography;

function LoginEmail(props) {
  return (
    <div className={style.page}>
      <FaArrowLeft className={style.back} />
      <FaUser className={style.avatar} />
      <Title>Twelve Tasks</Title>
      <Title level={3}>Login</Title>
      <div className={style.container}>
        <Input placeholder="Email" type="email" className={style.input}></Input>
        <Input.Password
          className={style.input}
          placeholder="Password"
          iconRender={(visible) => (visible ? <FaRegEye /> : <FaRegEyeSlash />)}
        />
        <button className={`${style.input} ${style.signUpButton}`} block>
          Sign In
        </button>
        <div className={style.signUp}>
          Want to Join? <span className={style.signUpLink}>Sign Up</span>
        </div>
      </div>
    </div>
  );
}

export default LoginEmail;
