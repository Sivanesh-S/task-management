import React from 'react';

// components
import TaskProperty from '../TaskProperty/TaskProperty';

// icons
import { MdLowPriority } from 'react-icons/md';
import { FaBookOpen, FaBookReader, FaBook, FaRegClock } from 'react-icons/fa';
import { daysDifference } from '../../utils';

function TaskProperties(props) {
  const { priority, status, dueDate } = props;

  let statusIcon = null;
  if (status === 'open') statusIcon = FaBookOpen;
  else if (status === 'in progress') statusIcon = FaBookReader;
  else statusIcon = FaBook;

  let dueDateString = null;
  if (dueDate) {
    dueDateString = daysDifference(+new Date(), +new Date(dueDate));
    console.log('dueDateString:', dueDateString);

    if (dueDateString < 0) {
      dueDateString = 'expired';
    } else if (dueDateString === 0) {
      dueDateString = 'last day';
    } else if (dueDateString === 1) dueDateString = `1 day`;
    else dueDateString = `${dueDateString} days`;
  }

  return (
    <div>
      {priority && <TaskProperty icon={MdLowPriority} text={priority} />}
      {status && <TaskProperty icon={statusIcon} text={status} />}
      {dueDate && <TaskProperty icon={FaRegClock} text={dueDateString} />}
    </div>
  );
}

export default TaskProperties;
