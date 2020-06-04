import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks = [1] }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem />
      ))}
    </div>
  );
}

export default TaskList;
