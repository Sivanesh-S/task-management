const express = require('express');
const app = express();

const morgan = require('morgan');

const morganMiddleware = morgan('tiny');

app.use(morganMiddleware);

// constants
const { apiPrefix } = require('./constants');

const port = process.env.PORT || 3000;

// GET
app.get(`${apiPrefix}tasks`, (req, res) => {
  res.send('Hello World');
});

app.get(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  res.send('Post with id' + taskId);
});

// POST
app.post(`${apiPrefix}tasks`, (req, res) => {
  res.send('Hello World');
});

// PUT
app.put(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  res.send('Hello World');
});

// DELETE
app.delete(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  res.send('Hello World');
});

app.listen(port, () => console.log('[App] Server running in port:', port));
