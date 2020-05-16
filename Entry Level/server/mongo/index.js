const colors = require('colors');
const mongodb = require('mongodb');

const { ObjectID } = mongodb;

const MongoClient = mongodb.MongoClient;
const uri = `mongodb+srv://${process.env.MY_MONGODB_USERNAME}:${process.env.MY_MONGODB_PASSWORD}@cluster0-qm0gx.mongodb.net/test?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true });

let activeCollection = null;
let archivedCollection = null;

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

const deleteTask = async () => {};

const completeTask = async (id) => {
  // remove from active
  const response = await activeCollection.findOneAndDelete({
    _id: ObjectID(id),
  });
  console.log('Deleted from active'.blue);

  // add in archive
  archivedCollection.insert(response.value);
  console.log('Added to archive'.blue);
};

module.exports = {
  getTasks,
  getTasksCount,
  createTask,
  updateTask,
  deleteTask,
  completeTask,
};
