const { ObjectID } = require('mongodb');

const isUpdated = (response) => {
  if (response.lastErrorObject.n) {
    return true;
  }
  return false;
};

const isValidId = (id) => {
  try {
    let objectId = new ObjectID(id);
    return true;
  } catch (error) {
    console.log('Invalid object id error:', error.message);
    throw new Error(error.message);
  }
};

module.exports = {
  isUpdated,
  isValidId,
};
