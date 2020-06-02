import React, { useEffect } from 'react';
import './App.css';

// Components
import Login from './Components/Login';
import SignUp from './Components/SignUp.js';
import Header from './Components/Header/Header';
import Analytics from './Components/Analytics/Analytics';
import ViewSelect from './Components/ViewSelect/ViewSelect';

function App() {
  return (
    <div className="App">
      <Header />
      <Analytics />
      <ViewSelect />
    </div>
  );
}

export default App;
