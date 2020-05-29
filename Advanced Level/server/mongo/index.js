const mongodb = require('mongodb');

// utils
const { userIdClientMapper } = require('../utils');

const { ObjectID } = mongodb;

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://${process.env.MY_MONGODB_USERNAME}:${process.env.MY_MONGODB_PASSWORD}@cluster0-qm0gx.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let activeCollection = null;
let archivedCollection = null;
let userCollection = null;

// collection connection instance
client.connect((err) => {
  activeCollection = client.db('task-management-v1').collection('active');
  // perform actions on the collection object
  // client.close();
});

client.connect((err) => {
  archivedCollection = client.db('task-management-v1').collection('archived');
  // perform actions on the collection object
  // client.close();
});

client.connect((err) => {
  userCollection = client.db('task-management-v1').collection('user');
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

const createTask = async (body) => {
  const response = await activeCollection.insert(body);
  return response.ops[0];
};

const updateTask = async (id, body) => {
  const response = await activeCollection.findOneAndUpdate(
    { _id: ObjectID(id) },
    { $set: body },
    { returnOriginal: false }
  );
  return response.value;
};

const deleteTask = async (id) => {
  const response = await activeCollection.findOneAndDelete({
    _id: ObjectID(id),
  });
  console.log('Deleted from active');
  return response;
};

const completeTask = async (id) => {
  // remove from active
  const response = await deleteTask(id);

  // add in archive
  archivedCollection.insert(response.value);
  console.log('Added to archive');
};

// -- Archived --
const getArchived = async () => {
  const response = '';
  return response;
};

const restoreArchived = async (id) => {
  const response = '';
  return response;
};

const deleteArchived = async () => {
  const response = '';
  return true; // false
};

// -- users --
const getUser = async () => {
  const response = await userCollection.find().toArray();
  // console.log('response:', response);
  return userIdClientMapper(response);
};

const updateUser = async (userId, body) => {
  const response = await userCollection.findOneAndUpdate(
    { _id: ObjectID(userId) },
    { $set: body },
    { returnOriginal: false }
  );
  return response;
};

const deleteUser = async () => {};

module.exports = {
  getTasks,
  getTasksCount,
  createTask,
  updateTask,
  deleteTask,
  completeTask,

  // archived
  getArchived,
  restoreArchived,
  deleteArchived,

  // user
  getUser,
  updateUser,
  deleteUser,
};
