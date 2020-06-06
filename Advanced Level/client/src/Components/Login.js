import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

function Login() {
  const [userId, setUserId] = useState('');
  // google oauth
  const clientId =
    '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

  const onSuccess = (res) => {
    const { tokenId, googleId } = res;
    setUserId(googleId);
    console.log('Logged in res:', res);
    fetch('/google/login', {
      method: 'POST',
      headers: {
        Authorization: `Bearer google ${tokenId}`,
      },
    });
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
  });

  const onLogoutSuccess = () => {
    fetch('/google/logout', {
      method: 'POST',
      body: JSON.stringify({ userId }),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    console.log('Successfully logged out.');
  };

  const onFailure = (err) => {
    console.log('Issue occured in log out', err);
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <>
      <button onClick={signIn}>Login</button>
      <button onClick={signOut}>Logout</button>
    </>
  );
}

export default Login;
