import React, { useContext } from 'react';

// components
import TaskItem from '../TaskItem/TaskItem';

// context
import { store } from '../../context';

function TaskList() {
  const { state } = useContext(store);
  const { tasks, archived, isShowArchived } = state;

  if (!tasks || !archived) {
    return null;
  }

  let showable = isShowArchived ? archived : tasks;

  if (!Object.keys(showable).length) {
    return (
      <div
        style={{
          marginTop: '90px',
          padding: '20px',
          fontSize: '2em',
          textAlign: 'center',
        }}
      >
        To create one press + button
      </div>
    );
  }

  return (
    <div style={{ marginBottom: '100px' }}>
      {Object.keys(showable).map((taskId) => {
        const task = showable[taskId];
        return <TaskItem key={taskId} {...task} isDisabled={isShowArchived} />;
      })}
    </div>
  );
}

export default TaskList;
