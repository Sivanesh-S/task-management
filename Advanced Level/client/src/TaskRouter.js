import React, { useEffect, useContext } from 'react';

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

import { useFetch } from './hooks/useFetch';

import { apiPrefix } from './constants';

// context
import { store } from './context/Store';

function TaskRouter() {
  const [, userData, , userCall] = useFetch(`${apiPrefix}user`, 'GET');
  const [, tasksData, , tasksCall] = useFetch(`${apiPrefix}tasks`, 'GET');
  const [, archivedData, , archivedCall] = useFetch(
    `${apiPrefix}archived`,
    'GET'
  );

  const { dispatch } = useContext(store);

  // didmount
  useEffect(() => {
    userCall();
    tasksCall();
    archivedCall();
  }, []);

  // user effect
  useEffect(() => {
    if (!userData) return;
    dispatch({ type: 'GET_USER', data: userData });
  }, [userData]);

  // tasks effect
  useEffect(() => {
    if (!tasksData) return;
    console.table('taskData', tasksData);
    dispatch({ type: 'GET_TASKS', data: tasksData });
  }, [tasksData]);

  // archived effect
  useEffect(() => {
    if (!archivedData) return;
    console.table('taskData', archivedData);
    dispatch({ type: 'GET_ARCHIVED', data: archivedData });
  }, [archivedData]);

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

export default TaskRouter;
