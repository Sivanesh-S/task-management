import React from 'react';
import PropTypes from 'prop-types';

// components
import Tasks from '../Tasks/Tasks.js';
import ArchivedTasks from '../ArchivedTasks/ArchivedTasks.js';
import CreateTask from '../CreateTask/CreateTask.js';

// styles
import style from './Container.module.css';

const Container = (props) => {
  // must call GET tasks, archived tasks.
  return (
    <div className={style.container}>
      <Tasks />
      <ArchivedTasks />
    </div>
  );
};
Container.propTypes = {};

export default Container;
