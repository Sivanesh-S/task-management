const express = require('express');
const app = express();

// morgan
const morgan = require('morgan');
const morganMiddleware = morgan('tiny');

// routes
const basicAuth = require('./routes/auth/basic-auth');
const googleOAuth = require('./routes/auth/google-oauth');
const api = require('./routes/api/task');
const user = require('./routes/api/user');

// middlewares
const authenticationMiddleware = require('./authentication/authenticationMiddleware');
app.use(express.json());
// for form data
app.use(express.urlencoded({ extended: true }));
// middleware which logs all network requests
app.use(morganMiddleware);

// authenticationLayer
app.use(authenticationMiddleware);

// Routes (Also considered as a middleware - Last middleware)
app.use('/auth', basicAuth);
app.use('/google', googleOAuth);
app.use('/api/v2', api);
app.use('/api/v2', user);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Server is running in port:', port));
