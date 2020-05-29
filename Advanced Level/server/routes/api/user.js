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
  const { userId } = req.params;
  await deleteUser(userId);
  res.sendStatus(204);
});

module.exports = router;
