const express = require('express');
const app = express();

// constants
const { apiPrefix } = require('./constants');

const port = process.env.PORT || 3000;

app.get(`${apiPrefix}tasks`, (req, res) => {
  res.send('Hello World');
});

app.listen(port, () => console.log('[App] Server running in port:', port));
