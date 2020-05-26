import React, { useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import SignUp from './Components/SignUp.js';

function App() {
  return (
    <div className="App">
      <Login />
      <SignUp />
    </div>
  );
}

export default App;
