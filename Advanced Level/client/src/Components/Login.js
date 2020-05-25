import React from 'react';
import ReactDOM from 'react-dom';
import { useGoogleLogin } from 'react-google-login';

function Login() {
  // google oauth
  const clientId =
    '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

  const onSuccess = (res) => {
    const { tokenId } = res;
    fetch('/google-oauth', {
      method: 'POST',
      headers: {
        Authorization: `token ${tokenId}`,
      },
    });
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
  });

  return <div onClick={signIn}>Login</div>;
}

export default Login;
