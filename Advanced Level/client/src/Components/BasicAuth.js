import React from 'react';

function BasicAuth() {
  return (
    <div>
      <form method="POST" action="/api/v1/basic-auth">
        <label htmlFor="username">Username</label>
        <input type="username" name="username"></input>
        <label htmlFor="password">password</label>
        <input type="password" name="password" />
        <input type="submit" value="Submit"></input>
      </form>
    </div>
  );
}

export default BasicAuth;
