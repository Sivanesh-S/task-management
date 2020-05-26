const express = require('express');
const app = express();

// password authentication
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// token confirmation
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// middlewares
app.use(express.json());
// for form data
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 5001;

app.post('/google-oauth', async (req, res) => {
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

app.post('/google-oauth-logout', async (req, res) => {
  const { userId } = req.body;

  console.log('Logged out userId:', userId);
  res.sendStatus(200);
  // handle logged off logic
});

// test
app.get('/google-oauth', (req, res) => {
  console.log('resp Received:');
  res.send('Working');
});

app.post('/api/v1/basic-auth', (req, res) => {
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

app.listen(port, () => console.log('Server is running in port:', port));

/*

const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(CLIENT_ID); 
verify().catch(console.error);

*/

async function verify(token) {
  const ticket = await client.verifyIdToken({
    idToken: token,
    audience: process.env.GOOGLE_CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
    // Or, if multiple clients access the backend:
    //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
  });
  const payload = ticket.getPayload();

  console.log('payload:', payload);

  const { sub } = payload;
  const userId = sub;
  return userId;
}
