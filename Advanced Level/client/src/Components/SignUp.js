import React, { useState } from 'react';
import { validateEmail } from '../utils';

function SignUp() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();

    // must show alert
    // if (!validateEmail(email)) {
    //   console.error('Email is not valid');
    //   return;
    // }

    if (password !== confirmPassword) {
      console.error('Passwords are not same');
      return;
    }

    console.log('event:', event, username, password);
    fetch('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <div>
      {/* <form method="POST" action="/api/v1/basic-auth" onSubmit={onSubmit}> */}
      <form onSubmit={onSubmit} method="POST">
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleEmail}
          ></input>
        </div>
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="username"
            name="username"
            id="username"
            onChange={handleUsername}
          ></input>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handlePassword}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            onChange={handleConfirmPassword}
          />
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
