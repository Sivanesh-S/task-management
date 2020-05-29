const userIdClientMapper = (iterator) =>
  iterator.map((i) => {
    i.userId = i._id;
    delete i._id;
    return i;
  });

const isUpdated = (response) => {
  if (response.lastErrorObject.n) {
    return true;
  }
  return false;
};

module.exports = {
  userIdClientMapper,
  isUpdated,
};
