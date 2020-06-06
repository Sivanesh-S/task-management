import React, { useEffect } from 'react';

// routing
import { useHistory } from 'react-router-dom';

import api from '../../utils/api';

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

function Main() {
  const history = useHistory();

  const authToken = localStorage.getItem('authToken');

  useEffect(() => {
    (async () => {
      if (!authToken) {
        return;
      }
      const userResponse = await api().get(`${apiPrefix}user`);
      console.log('userResponse:', userResponse);
    })();
  }, []);

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
