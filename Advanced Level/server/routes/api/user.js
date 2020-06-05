const express = require('express');
const router = express.Router();

const mongo = require('../../mongo');

const { getUser, updateUser, deleteUser } = mongo;

router.get('/user', async (req, res) => {
  const userId = req.authUserId;
  const response = await getUser(userId);
  res.send(response);
});

router.patch('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    // only keys allowed to modify
    const { fullName, email, photoUrl } = req.body;

    if (!(fullName || email || photoUrl)) {
      throw new Error('Only keys email, fullName, photoUrl are allowed');
    }

    const [status, response] = await updateUser(userId, {
      fullName,
      email,
      photoUrl,
    });
    res.status(status).send(response);
  } catch (err) {
    res.status(400).send(err.message);
  }
});

router.delete('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const [status, response] = await deleteUser(userId);

    res.status(status).send(response);
  } catch (err) {
    res.status(408).send({ message: `There's some issue in your request` });
  }
});

module.exports = router;
