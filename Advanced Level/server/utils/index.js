const isUpdated = (response) => {
  if (response.lastErrorObject.n) {
    return true;
  }
  return false;
};

module.exports = {
  isUpdated,
};
