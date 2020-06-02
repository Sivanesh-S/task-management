import React from 'react';

// components
import TaskProperty from '../TaskProperty/TaskProperty';

// icons
import { MdLowPriority } from 'react-icons/md';
import { FaBookOpen, FaBookReader, FaBook, FaRegClock } from 'react-icons/fa';

function TaskProperties() {
  return (
    <div>
      <TaskProperty icon={MdLowPriority} text={'High'} />
      <TaskProperty icon={FaBookOpen} text={'Open'} />
      <TaskProperty icon={FaRegClock} text={'2 days more'} />
    </div>
  );
}

export default TaskProperties;
