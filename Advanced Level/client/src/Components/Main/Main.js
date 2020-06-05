import React from 'react';

// routing
import { useHistory } from 'react-router-dom';

// components
import Header from '../Header/Header';
import Analytics from '../Analytics/Analytics';
import ViewSelect from '../ViewSelect/ViewSelect';
import BottomTabs from '../BottomTabs/BottomTabs';
import TaskList from '../TaskList/TaskList';
import { Button } from 'antd';

// icon
import { FaPlus } from 'react-icons/fa';

// style
import style from './Main.module.css';

function Main() {
  const history = useHistory();

  const authToken = localStorage.getItem('authToken');
  if (!authToken) {
    history.push('/landing');
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
