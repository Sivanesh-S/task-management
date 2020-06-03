import React, { useEffect } from 'react';
import './App.css';

// Components
import Login from './Components/Login';
import SignUp from './Components/SignUp.js';
import Header from './Components/Header/Header';
import Analytics from './Components/Analytics/Analytics';
import ViewSelect from './Components/ViewSelect/ViewSelect';
import TaskItem from './Components/TaskItem/TaskItem';
import RightMenu from './Components/RightMenu/RightMenu';
import BottomTabs from './Components/BottomTabs/BottomTabs';
import FilterPage from './Components/FilterPage/FilterPage';

function App() {
  return (
    <div className="App">
      {/* <Header />
      <Analytics />
      <ViewSelect />*/}
      {/* <TaskItem /> */}
      {/* <RightMenu /> */}
      {/* <BottomTabs /> */}
      <FilterPage />
    </div>
  );
}

export default App;
