const express = require('express');
const app = express();

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

// test
app.get('/google-oauth', (req, res) => {
  console.log('resp Received:');
  res.send('Working');
});

app.post('/api/v1/basic-auth', (req, res) => {
  console.log('req.body:', req.body);
  res.send('success');
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
