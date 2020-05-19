import React from 'react';

// components
// import DatePicker from 'react-date-picker';
import { DatePicker, Input, Row, Col } from 'antd';
// import DatePicker from 'react-date-picker/dist/entry.nostyle';

// style
import style from './CreateTask.module.css';
import '../../styles/DatePicker.css';
import { addTask } from '../../lang/english';

function CreateTask() {
  // must POST /tasks

  //events
  const onChange = (moment, str) => {
    console.log('Chosed date string:', str);
  };
  return (
    <div className={style.createTask}>
      <Row>
        <Col span={20}>
          <Input placeholder={addTask} />
        </Col>
        <Col span={4}>
          <DatePicker onChange={onChange} />
        </Col>
      </Row>
    </div>
  );
}

export default CreateTask;
