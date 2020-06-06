import React from 'react';
import TaskItem from '../TaskItem/TaskItem';

function TaskList({ tasks = [{ taskId: 'wdcw4' }] }) {
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem key={task.taskId} />
      ))}
    </div>
  );
}

export default TaskList;
