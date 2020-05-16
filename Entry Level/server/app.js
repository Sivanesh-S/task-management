const express = require('express');
const app = express();

const morgan = require('morgan');
const morganMiddleware = morgan('tiny');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MY_MONGODB_USERNAME}:${process.env.MY_MONGODB_PASSWORD}@cluster0-qm0gx.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect((err) => {
  const collection = client.db('demoDb').collection('demoCollection');
  collection.find().toArray((err, docs) => {
    if (err) throw err;
    console.log('docs:', docs);
  });
  // perform actions on the collection object
  client.close();
});

// Middlewares
app.use(morganMiddleware);
app.use(express.json());

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
  console.log('req.body:', req.body);
  res.send(req.body);
});

// PUT
app.put(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  console.log('req.body:', req.body);
  res.send('Updated' + taskId);
});

// DELETE
app.delete(`${apiPrefix}tasks/:taskId`, (req, res) => {
  const { taskId } = req.params;
  res.send('Deleted' + taskId);
});

app.listen(port, () => console.log('[App] Server running in port:', port));
