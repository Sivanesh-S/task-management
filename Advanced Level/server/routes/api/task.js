const express = require('express');
const router = express.Router();

const mongo = require('../../mongo');

// utils
const { isValidId } = require('../../utils');

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
  const userId = req.authUserId;

  const tasks = await getTasks(userId);
  res.send(tasks);
});

router.get(`/tasks/count`, async (req, res) => {
  const userId = req.authUserId;
  let count = await getTasksCount(userId);
  res.send({ count });
});

// POST
router.post(`/tasks`, async (req, res) => {
  const userId = req.authUserId;
  const body = req.body;
  if (!body.name) {
    return res.status(400).send('Name is a mandatory field');
  }
  const response = await createTask(userId, body);
  res.send(response);
});

// PUT
router.put(`/tasks/:taskId`, async (req, res) => {
  try {
    const { taskId } = req.params;
    isValidId(taskId);
    const userId = req.authUserId;
    const { body } = req;
    const [status, response] = await updateTask(userId, taskId, body);
    res.status(status).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// DELETE
router.delete(`/tasks/:taskId`, async (req, res) => {
  try {
    const userId = req.authUserId;
    const { taskId } = req.params;
    isValidId(taskId);
    const [status, response] = await deleteTask(userId, taskId);
    res.status(status).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// archived

router.post(`/archived/:taskId`, async (req, res) => {
  const userId = req.authUserId;
  const { taskId } = req.params;
  try {
    isValidId(taskId);
    const [status, response] = await completeTask(userId, taskId);
    res.status(status).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.get('/archived', async (req, res) => {
  const userId = req.authUserId;
  const archived = await getArchived(userId);
  return res.send(archived);
});

router.put('/archived/:taskId', async (req, res) => {
  try {
    const userId = req.authUserId;
    const { taskId } = req.params;
    isValidId(taskId);
    await restoreArchived(userId, taskId);
    res.sendStatus(204);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/archived', async (req, res) => {
  const userId = req.authUserId;
  const deletedCount = await deleteArchived(userId);
  res.status(204).send({ count: deletedCount });
});

module.exports = router;
