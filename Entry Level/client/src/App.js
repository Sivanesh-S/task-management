import React from 'react';

// styles
import './App.css';
import style from './App.module.css';

// components
import { Typography } from 'antd';

// languages
import { companyName } from './lang/english';

const { Title } = Typography;

function App() {
  return (
    <div className="App">
      <div className="container">
        <div className={style.normal}>
          <div>
            <Title className={style.companyTitle}>{companyName}</Title>
          </div>
          <div className={style.tasks}>tasks</div>
        </div>
      </div>
    </div>
  );
}

export default App;
