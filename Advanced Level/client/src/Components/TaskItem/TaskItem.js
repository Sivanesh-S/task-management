import React from 'react';

// styles
import style from './TaskItem.module.css';

// components
import { Card, Checkbox } from 'antd';

// Icons
import { FaEllipsisV } from 'react-icons/fa';
import TaskProperties from '../TaskProperties/TaskProperties';
import Labels from '../Labels/Labels';

// events
const onChange = () => {};

function TaskItem() {
  return (
    <div>
      <Card className={style.task} hoverable>
        <div className={style.container}>
          <Checkbox onChange={onChange}>
            aa asdasdwdknew fhgwbd bw dwh4e d 4ewdh we asdasd asda da sd
          </Checkbox>
          <a href="#" className={style.option}>
            <FaEllipsisV />
          </a>
        </div>
      </Card>
      <Card className={style.task} hoverable>
        <div className={style.container}>
          <Checkbox onChange={onChange}>aa asdasdq asd</Checkbox>
          <a href="#" className={style.option}>
            <FaEllipsisV />
          </a>
        </div>
        <TaskProperties />
        <Labels />
      </Card>
    </div>
  );
}

export default TaskItem;
