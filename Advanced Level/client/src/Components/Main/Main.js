import React, { useEffect, useContext } from 'react';

// routing
import { useHistory } from 'react-router-dom';

import { useFetch } from '../../hooks/useFetch';

// components
import Header from '../Header/Header';
import Analytics from '../Analytics/Analytics';
import ViewSelect from '../ViewSelect/ViewSelect';
import BottomTabs from '../BottomTabs/BottomTabs';
import TaskList from '../TaskList/TaskList';

// icon
import { FaPlus } from 'react-icons/fa';

// style
import style from './Main.module.css';
import { apiPrefix } from '../../constants';

// context
import { store } from '../../context/Store';

function Main() {
  const history = useHistory();
  const [, userData, , userCall] = useFetch(`${apiPrefix}user`, 'GET');
  const [tasksLoading, tasksData, tasksError, tasksCall] = useFetch(
    `${apiPrefix}tasks`,
    'GET'
  );

  const { state, dispatch } = useContext(store);

  const authToken = localStorage.getItem('authToken');

  // didmount
  useEffect(() => {
    userCall();
    tasksCall();
  }, []);

  // user effect
  useEffect(() => {
    if (!userData) return;
    dispatch({ type: 'GET_USER', data: userData });
  }, [userData]);

  // user effect
  useEffect(() => {
    if (!tasksData) return;
    console.table('taskData', tasksData);
    dispatch({ type: 'GET_TASKS', data: tasksData });
  }, [tasksData]);

  if (!authToken) {
    history.push('/landing');
    return null;
  }

  // routing
  const openAdd = () => history.push('/task');
  return (
    <div>
      <Header />
      <Analytics />
      <ViewSelect />
      <TaskList />
      <BottomTabs />

      <FaPlus className={style.addButton} onClick={openAdd} />
    </div>
  );
}

export default Main;
