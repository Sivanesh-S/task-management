const express = require('express');
const router = express.Router();

const mongo = require('../../mongo');

const { getUser, updateUser, deleteUser } = mongo;

router.get('/user', async (req, res) => {
  const response = await getUser();
  res.send(response);
});

router.patch('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  await updateUser(userId, req.body);
  res.sendStatus(204);
});

router.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    // need to check there should be no key for userId, _id, username etc and send bad request respectively
    const [status, response] = await deleteUser(userId);

    res.status(status).send(response);
  } catch (err) {
    res.send(408, { message: `There's some issue in your request` });
  }
});

module.exports = router;
