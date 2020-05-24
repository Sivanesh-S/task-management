import React from 'react';
import ReactDOM from 'react-dom';
import { useGoogleLogin } from 'react-google-login';

function Login() {
  const responseGoogle = (response) => {
    console.log(response);
  };

  // google oauth
  const clientId =
    '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

  const onSuccess = (res) => {
    console.log('res:', res);
    const { tokenId } = res;
  };

  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
  });

  console.log('signIn, loaded:', signIn, loaded);

  return <div onClick={signIn}>Login</div>;
}

export default Login;
