import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import { apiPrefix } from '../../constants';
import api from '../../utils/api';

import { store } from '../../context';

// styles
import style from './TaskItem.module.css';

// components
import { Card, Checkbox, Menu, Dropdown, message } from 'antd';

// Icons
import { FaEllipsisV } from 'react-icons/fa';
import TaskProperties from '../TaskProperties/TaskProperties';
import Labels from '../Labels/Labels';

// events
const onChange = () => {};

function TaskItem(props) {
  const { taskId, name, status, priority, dueDate, labels } = props;

  const history = useHistory();
  const { dispatch } = useContext(store);

  const editTask = () => {
    history.push('/task', {
      from: 'UPDATE',
      task: { taskId, name, status, priority, dueDate, labels },
    });
  };

  const deleteTask = async () => {
    await api().delete(`${apiPrefix}tasks/${taskId}`);
    message.success('Deleted the task');
    dispatch({ type: 'DELETE_TASK', data: taskId });
  };

  const completeTask = async () => {
    await api().post(`${apiPrefix}archived/${taskId}`);
    message.success('');
    dispatch({ type: 'ADD_TO_ARCHIVE', data: taskId });
  };

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

  const openUpdateTask = () => {
    history.push('/task', {
      from: 'UPDATE',
      task: { taskId, name, status, priority, dueDate, labels },
    });
  };

  return (
    <div onClick={openUpdateTask}>
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
          <Checkbox
            onChange={completeTask}
            onClick={(e) => e.stopPropagation()}
          >
            {name}
          </Checkbox>
          <a className={style.option} onClick={(e) => e.stopPropagation()}>
            <Dropdown overlay={menu} trigger={['click']}>
              <FaEllipsisV />
            </Dropdown>
          </a>
        </div>
        <TaskProperties {...{ status, priority, dueDate }} />
        {labels && <Labels labels={labels} />}
      </Card>
    </div>
  );
}

export default TaskItem;
