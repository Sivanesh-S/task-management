import React from 'react';

function BasicAuth() {
  return (
    <div>
      <form method="POST" action="/api/v1/basic-auth">
        <div>
          <label htmlFor="username">Username</label>
          <input type="username" name="username" id="username"></input>
        </div>
        <div>
          <label htmlFor="password">password</label>
          <input type="password" name="password" id="password" />
        </div>
        <div>
          <input type="submit" value="Submit"></input>
        </div>
      </form>
    </div>
  );
}

export default BasicAuth;
