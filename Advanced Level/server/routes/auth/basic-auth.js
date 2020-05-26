const express = require('express');
const router = express.Router();

// password authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

router.post('/signup', (req, res) => {
  console.log('req.body:', req.body);
  const { username, password } = req.body;

  // encrypt password
  bcrypt.hash(password, 10, (err, encryptedPassword) => {
    console.log('encryptedPassword:', encryptedPassword);

    // dummy check
    // bcrypt
    //   .compare(password, encryptedPassword)
    //   .then((res) => console.log('isPasswordSame:', res));

    // Save in db
  });

  // create token
  console.log(
    'username, process.env.JWT_PRIVATE_KEY:',
    username,
    process.env.JWT_PRIVATE_KEY
  );
  const token = jwt.sign({ username }, process.env.JWT_PRIVATE_KEY);
  console.log('token:', token);

  // dummy check
  // const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
  // console.log('decoded:', decoded);

  res.send({ token });
});

module.exports = router;
