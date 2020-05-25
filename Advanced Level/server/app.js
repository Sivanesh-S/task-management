const express = require('express');
const app = express();

const port = process.env.PORT || 5001;

// token confirmation
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// middlewares
app.use(express.json());

app.post('/google-oauth', (req, res) => {
  const oauthToken = req.headers.authorization.split('token ')[1];
  console.log('oauthToken:', oauthToken);
  verify(oauthToken).catch(console.error);
});

// test
app.get('/google-oauth', (req, res) => {
  console.log('resp Received:');
  res.send('Working');
});

// app.post('/')

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
  const userId = payload['sub'];
  console.log('userId:', userId);
  console.log('payload:', payload);
  // If request specified a G Suite domain:
  // const domain = payload['hd'];
}
