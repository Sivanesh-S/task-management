const colors = require('colors');

const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.MY_MONGODB_USERNAME}:${process.env.MY_MONGODB_PASSWORD}@cluster0-qm0gx.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let activeCollection = null;

const clientConnection = client.connect((err) => {
  activeCollection = client.db('task-management-v1').collection('active');
  // perform actions on the collection object
  // client.close();
});

const getTasks = async () => {
  const tasks = await activeCollection.find().toArray();
  return tasks;
};

const getTasksCount = async () => {
  const count = await activeCollection.find().count();
  return count;
};

const updateTask = () => {};

const createTask = () => {};

const deleteTask = () => {};

const completeTask = () => {};

module.exports = {
  getTasks,
  getTasksCount,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};
