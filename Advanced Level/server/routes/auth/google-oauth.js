const express = require('express');
const router = express.Router();

// mongo
const mongo = require('../../mongo');
const { getGoogleUser, createGoogleUser } = mongo;

router.post('/login', async (req, res) => {
  try {
    const { userId, fullName, email, photoUrl } = req.googleUserObj;

    // store them in db
    const userObj = await getGoogleUser(userId);

    if (userObj) {
      res.send({ userId, isNew: false });
    } else {
      await createGoogleUser(userId, email, fullName, photoUrl);
      res.send({ userId, isNew: true });
    }

    // store them in db with respective user
  } catch (err) {
    console.error('[Google]', err.message);
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
