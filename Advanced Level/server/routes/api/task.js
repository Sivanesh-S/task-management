const express = require('express');
const router = express.Router();

const mongo = require('../../mongo');

const {
  getTasks,
  getTasksCount,
  updateTask,
  completeTask,
  createTask,
  deleteTask,
  // archived
  getArchived,
  restoreArchived,
  deleteArchived,
} = mongo;

// GET
router.get(`/tasks`, async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});

router.get(`/tasks/count`, async (req, res) => {
  let count = await getTasksCount();
  res.send({ count });
});

// POST
router.post(`/tasks`, async (req, res) => {
  const body = req.body;
  const response = await createTask(body);
  res.send(response);
});

// PATCH
router.patch(`/tasks/:taskId`, async (req, res) => {
  const { taskId } = req.params;
  const { body } = req;
  const response = await updateTask(taskId, body);
  res.send(response);
});

// PUT
router.put(`/tasks/:taskId`, async (req, res) => {
  const { taskId } = req.params;
  await completeTask(taskId);
  res.sendStatus(204);
});

// DELETE
router.delete(`/tasks/:taskId`, async (req, res) => {
  const { taskId } = req.params;
  await deleteTask(taskId);
  res.sendStatus(204);
});

// archived
router.get('/archived', async (req, res) => {
  const archived = await getArchived();
  return res.send(archived);
});

router.put('/archived/:taskId', async (req, res) => {
  const { taskId } = req.params;
  await restoreArchived(taskId);
  res.sendStatus(204);
});

router.delete('/archived', async (req, res) => {
  await deleteArchived();
  res.sendStatus(204);
});

module.exports = router;
