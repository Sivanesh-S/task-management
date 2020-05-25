import React, { useEffect } from 'react';
import './App.css';
import Login from './Components/Login';
import BasicAuth from './Components/BasicAuth.js';

function App() {
  return (
    <div className="App">
      <Login />
      <BasicAuth />
    </div>
  );
}

export default App;
