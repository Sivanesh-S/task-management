export const taskNormalizer = (tasks) => {
  return tasks.reduce((obj, task) => {
    const { taskId } = task;
    obj[taskId] = task;
    return obj;
  }, {});
};
