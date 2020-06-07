export const taskNormalizer = (tasks) => {
  return tasks.reduce((obj, task) => {
    const { taskId } = task;
    obj[taskId] = task;
    return obj;
  }, {});
};

export const deleteTask = (tasks, deletedId) => {
  return Object.keys(tasks).reduce((res, taskId) => {
    if (deletedId !== taskId) {
      const taskObj = tasks[taskId];
      res[taskId] = taskObj;
    }
    return res;
  }, {});
};
