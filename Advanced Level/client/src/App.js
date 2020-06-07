import React from 'react';

// oauth
import { useGoogleLogin } from 'react-google-login';
import { handleGoogleLogin } from './utils/googleLoginHandler';
import { Spin } from 'antd';
import TaskRouter from './TaskRouter';
// google oauth
const clientId =
  '416982686383-bqno596si9butn9mato3a286tvgugi2d.apps.googleusercontent.com';

function App() {
  const onSuccess = (res) => {
    handleGoogleLogin(res, 'App');
  };
  const { signIn, loaded } = useGoogleLogin({
    onSuccess,
    clientId,
    isSignedIn: true,
    accessType: 'offline',
  });
  console.log('loaded:', loaded);

  const provider = localStorage.getItem('provider');

  if (!loaded && provider === 'GOOGLE_AUTH') {
    return (
      <div className="loader">
        <div className="loaderDiv">
          <div>
            <Spin size="large" />
          </div>
          <div>Authenticating with Google Server</div>
        </div>
      </div>
    );
  }

  return <TaskRouter />;
}

export default App;
