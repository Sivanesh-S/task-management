import React from 'react';

// styles
import style from './TaskItem.module.css';

// components
import { Card, Checkbox, Menu, Dropdown } from 'antd';

// Icons
import { FaEllipsisV } from 'react-icons/fa';
import TaskProperties from '../TaskProperties/TaskProperties';
import Labels from '../Labels/Labels';

// events
const onChange = () => {};

function TaskItem(props) {
  const {
    taskId,
    name,
    status,
    priority,
    dueDate,
    labels,
    setCompleted,
    deleteTask,
    editTask,
  } = props;

  const menu = (
    <Menu>
      <Menu.Item key="0" onClick={() => editTask(taskId)}>
        Edit
      </Menu.Item>
      <Menu.Item key="1" onClick={() => deleteTask(taskId)}>
        Delete
      </Menu.Item>
    </Menu>
  );

  const handleChecked = () => {
    setCompleted(taskId);
  };

  return (
    <div style={{ overflowY: 'scroll' }}>
      {/* <Card className={style.task} hoverable size="small">
        <div className={style.container}>
          <Checkbox onChange={onChange}>
            aa asdasdwdknew fhgwbd bw dwh4e d 4ewdh we asdasd asda da sd
          </Checkbox>
          <a className={style.option}>
            <FaEllipsisV />
          </a>
        </div>
      </Card> */}
      <Card className={style.task} hoverable size="small">
        <div className={style.container}>
          <Checkbox onChange={handleChecked}>{name}</Checkbox>
          <a className={style.option}>
            <Dropdown overlay={menu} trigger={['click']}>
              <FaEllipsisV />
            </Dropdown>
          </a>
        </div>
        <TaskProperties {...{ status, priority, dueDate }} />
        <Labels />
      </Card>
    </div>
  );
}

export default TaskItem;
