import React from 'react';

// styles
import './App.css';
import style from './App.module.css';
import 'antd/dist/antd.css';

// components
import Header from './components/Header/Header';
import Container from './components/Container/Container';

function App() {
  return (
    <div className={style.app}>
      <div className={style.container}>
        <div className={style.normal}>
          <Header />
          <div className={style.tasks}>
            <Container />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
