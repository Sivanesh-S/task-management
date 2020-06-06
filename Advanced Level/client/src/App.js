import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Common css and antd css imported
import './App.css';
import AuthPage from './Components/AuthPage/AuthPage';
import LoginEmail from './Components/AuthPage/LoginEmail';
import SignUpEmail from './Components/AuthPage/SignUpEmail';
import TaskPage from './Components/TaskPage/TaskPage';
import FilterPage from './Components/FilterPage/FilterPage';
import Main from './Components/Main/Main';
import RightMenu from './Components/RightMenu/RightMenu';

// oauth
import { useGoogleLogin } from 'react-google-login';
import { handleGoogleLogin } from './utils/googleLoginHandler';

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
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/landing" component={AuthPage}></Route>
          <Route path="/signIn" component={LoginEmail}></Route>
          <Route path="/signUp" component={SignUpEmail}></Route>
          <Route path="/task" component={TaskPage}></Route>
          <Route path="/filter" component={FilterPage}></Route>
          <Route path="/userInfo" component={RightMenu}></Route>
          <Route path="/" component={Main}></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
