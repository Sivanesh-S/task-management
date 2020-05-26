const express = require('express');
const router = express.Router();

// utils
const { verify } = require('./authUtils');

router.post('/login', async (req, res) => {
  const oauthToken = req.headers.authorization.split('token ')[1];
  console.log('oauthToken obtained');

  try {
    const userId = await verify(oauthToken);
    res.send({ userId });

    // store them in db with respective user
  } catch {
    res.sendStatus(403);
  }
});

router.post('/logout', async (req, res) => {
  const { userId } = req.body;

  console.log('Logged out userId:', userId);
  res.sendStatus(200);
  // handle logged off logic
});

module.exports = router;
