import React, { useState } from 'react';

function BasicAuth() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = (event) => {
    event.preventDefault();
    console.log('event:', event, username, password);
    fetch('/api/v1/basic-auth', {
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

  return (
    <div>
      {/* <form method="POST" action="/api/v1/basic-auth" onSubmit={onSubmit}> */}
      <form onSubmit={onSubmit} method="POST">
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
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
}

export default BasicAuth;
