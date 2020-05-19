import React from 'react';
import PropTypes from 'prop-types';

// style
import style from './Tasks.module.css';

// components
import TaskItem from '../TaskItem/TaskItem.js';
import { List, Divider, Row, Checkbox, Col } from 'antd';

// lang
import { archivedDivider, showArchivedView } from '../../lang/english';
import CreateTask from '../CreateTask/CreateTask.js';

const Tasks = (props) => {
  const { tasks = [], archivedTasks = [] } = props;

  // dummy
  tasks.push(
    {
      name: 'Task 1',
      dueDate: '123134234',
    },
    {
      name: 'Go buy greenies 1',
      dueDate: '123134234',
    },
    {
      name: 'Donate to devs',
      dueDate: '123134234',
    }
  );

  archivedTasks.push(
    {
      name: 'Task 1',
      dueDate: '123134234',
    },
    {
      name: 'Go buy greenies 1',
      dueDate: '123134234',
    },
    {
      name: 'Donate to devs',
      dueDate: '123134234',
    }
  );

  const archivedViewJSX = (
    <div className={'w-full center'}>{showArchivedView}</div>
  );

  return (
    <div className={style.taskContainer}>
      <List
        size="small"
        header={<CreateTask />}
        footer={archivedViewJSX}
        bordered
        dataSource={tasks}
        className={style.list}
        renderItem={({ name, dueDate }) => (
          <List.Item>
            <Row className={style.row}>
              <Col span={2}>
                <Checkbox onChange={() => {}} />
              </Col>
              <Col span={18}>{name}</Col>
              <Col span={4}>{dueDate}</Col>
            </Row>
          </List.Item>
        )}
      />
      <Divider orientation="left">{archivedDivider}</Divider>
      <List
        size="large"
        // header={<div>Header</div>}
        // footer={<div>Footer</div>}
        className={style.list}
        bordered
        dataSource={archivedTasks}
        renderItem={({ name, dueDate }) => (
          <List.Item>
            <Row className={style.row}>
              <Col span={2}>
                <Checkbox onChange={() => {}} />
              </Col>
              <Col span={18}>{name}</Col>
              <Col span={4}>{dueDate}</Col>
            </Row>
          </List.Item>
        )}
      />
    </div>
  );
  return (
    <div>
      <TaskItem />
    </div>
  );
};
Tasks.propTypes = {};

export default Tasks;
