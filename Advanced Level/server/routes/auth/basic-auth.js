const express = require('express');
const router = express.Router();

// db
const { ObjectID } = require('mongodb');

// password authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const mongo = require('../../mongo');
const { createUser, getUserByMail } = mongo;

router.post('/signup', async (req, res) => {
  const { email, password, fullName, photoUrl } = req.body;

  if (!(email && password && fullName)) {
    return res
      .status(400)
      .send({ message: 'Email, password, fullname are mandatory' });
  }

  // encrypt password
  const encryptedPassword = await bcrypt.hash(password, 10);

  const userId = new ObjectID();
  const token = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY);
  console.log('[Signup] token generated');

  try {
    const [status] = await createUser({
      email,
      password: encryptedPassword,
      fullName,
      photoUrl,
      _id: userId,
      userId: userId.toHexString(),
    });
    if (status === 401) {
      res
        .status(401)
        .send({ message: "There's already a account using this email" });
    } else {
      res.status(status).send({ token, fullName });
    }
  } catch (err) {
    console.log('err.message:', err.message);
    res.status(400).send(err.message);
  }

  // dummy check
  // const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  // console.log('decoded:', decoded);

  // res.send({ token });
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).send('Both email and password should be sent');
  }

  /* get userData from mongo user collection 
    bcrypt current password and compare 
    if success return userObj (excluding password and token stored)
    else return 401
  */

  const userObj = await getUserByMail(email);
  if (!userObj) {
    return res.status(400).send('Username or password is incorrect');
  }
  const { photoUrl, fullName, userId } = userObj;

  const token = jwt.sign({ userId }, process.env.JWT_PRIVATE_KEY);

  // res.status(status).send(response);
  const isCorrectPassword = await bcrypt.compare(password, userObj.password);
  if (isCorrectPassword) {
    console.log(`user ${email} signed in`);
    res.send({ email, fullName, photoUrl, token });
  } else {
    res.status(401).send('Username or password is incorrect');
  }
});

router.post('/logout', async (req, res) => {
  const userId = req.authUserId;

  //  I don't no what to do in server
  res.sendStatus(204);
});

module.exports = router;
