const mongodb = require('mongodb');

// utils
const { isUpdated } = require('../utils');

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
  userCollection.createIndex({ email: 1 }, { unique: true });
  // perform actions on the collection object
  // client.close();
});

const getTasks = async (userId) => {
  const tasks = await activeCollection.find({ userId }).toArray();
  return tasks;
};

const getTasksCount = async (userId) => {
  const count = await activeCollection.find({ userId }).count();
  return count;
};

const createTask = async (userId, body) => {
  body.userId = userId;
  const response = await activeCollection.insert(body);
  return response.ops[0];
};

const updateTask = async (userId, taskId, body) => {
  try {
    console.log('userId, taskId, body:', userId, taskId, body);
    const response = await activeCollection.findOneAndUpdate(
      { _id: ObjectID(taskId), userId },
      { $set: body },
      { returnOriginal: false }
    );

    if (isUpdated(response)) {
      return [200, response.value];
    } else {
      throw new Error('Not updated');
    }
  } catch (err) {
    console.log('err.message:', err.message);
    return [400, err.message];
  }
};

const deleteTask = async (userId, taskId) => {
  const response = await activeCollection.findOneAndDelete({
    _id: ObjectID(taskId),
    userId,
  });

  if (response.value) {
    console.log('Deleted from active');
    return [204];
  } else {
    return [400, 'No items to delete in this id'];
  }
};

const completeTask = async (userId, taskId) => {
  // remove from active
  const response = await deleteTask(userId, taskId);

  if (response.value) {
    // add in archive
    archivedCollection.insertOne(response.value);
    console.log('Added to archive');
    return [204];
  } else {
    return [400, 'No tasks with this id'];
  }
};

// -- Archived --
const getArchived = async (userId) => {
  const response = archivedCollection.find({ userId }).toArray();

  console.log('response:', response);
  return response;
};

const restoreArchived = async (userId, id) => {
  const response = '';
  return response;
};

const deleteArchived = async (userId) => {
  const response = '';
  return true; // false
};

// -- users --

const createUser = async (userObj) => {
  console.log('[Mongo] User signedup:', userObj.email);

  try {
    const response = await userCollection.insertOne(userObj);
    // console.log('response:', response);
    return [200];
  } catch (err) {
    console.error('/auth/signup error', err.message);
    return [401, err];
  }
};

const getUserByMail = async (email) => {
  const response = await userCollection.find({ email }).toArray();
  if (response.length) {
    return response[0];
  }
  return null;
};

const updateUser = async (userId, body) => {
  try {
    const response = await userCollection.findOneAndUpdate(
      { _id: ObjectID(userId) },
      { $set: body },
      { returnOriginal: false }
    );

    if (isUpdated(response)) {
      return [204];
    }
    return [400, { message: 'Not updated user' }];
  } catch (err) {
    return [400, { message: err.message }];
  }
};

const deleteUser = async (userId) => {
  try {
    const response = await userCollection.findOneAndDelete({
      _id: ObjectID(userId),
    });
    if (isUpdated(response)) {
      const { _id, email, fullName } = response.value;

      return [200, { _id, fullName, email }];
    } else {
      return [400, { message: 'No users deleted' }];
    }
  } catch (err) {
    console.log('err:', err.message);
    return [400, { message: err.message }];
  }
};

// -- Google User --
const createGoogleUser = async (userId, email, fullName, photoUrl) => {
  await userCollection.insertOne({
    email,
    userId,
    fullName,
    photoUrl,
  });
};

const getGoogleUser = async (userId) => {
  const response = await userCollection.find({ userId }).toArray();
  if (response.length) {
    return response[0];
  }
  return null;
};
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
  createUser,
  getUserByMail,
  updateUser,
  deleteUser,

  // google user
  createGoogleUser,
  getGoogleUser,
};
