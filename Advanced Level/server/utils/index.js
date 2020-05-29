const userIdClientMapper = (iterator) =>
  iterator.map((i) => {
    i.userId = i._id;
    delete i._id;
    return i;
  });

module.exports = {
  userIdClientMapper,
};
