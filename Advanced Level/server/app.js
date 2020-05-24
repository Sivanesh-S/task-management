const express = require('express');
const app = express();

const port = process.env.PORT || 5001;

// middlewares
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Task APp');
});

app.post('/google-oauth', (req, res) => {
  console.log('resp Received:');
});

// test
app.get('/google-oauth', (req, res) => {
  console.log('resp Received:');
});

app.listen(port, () => console.log('Server is running in port:', port));
