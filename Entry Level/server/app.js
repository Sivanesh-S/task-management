const express = require('express');
const app = express();

const morgan = require('morgan');
const morganMiddleware = morgan('tiny');

const mongo = require('./mongo');

const {
  getTasks,
  getTasksCount,
  updateTask,
  completeTask,
  createTask,
  deleteTask,
} = mongo;

// Middlewares
app.use(morganMiddleware);
app.use(express.json());

// constants
const { apiPrefix } = require('./constants');

const port = process.env.PORT || 3000;

// GET
app.get(`${apiPrefix}tasks`, async (req, res) => {
  const tasks = await getTasks();
  res.send(tasks);
});

app.get(`${apiPrefix}tasks/count`, async (req, res) => {
  let count = await getTasksCount();
  res.send({ count });
});

// POST
app.post(`${apiPrefix}tasks`, async (req, res) => {
  const body = req.body;
  const response = await createTask(body);
  res.send(response);
});

// PATCH
app.patch(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  console.log('req.body:', req.body);
  res.send('Updated' + taskId);
});

// PUT
app.put(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  console.log('req.body:', req.body);
  res.send('Archived' + taskId);
});

// DELETE
app.delete(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  res.send('Deleted' + taskId);
});

app.listen(port, () => console.log('[App] Server running in port:', port));
