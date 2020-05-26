const express = require('express');
const app = express();

// routes
const basicAuth = require('./routes/auth/basic-auth');
const googleOAuth = require('./routes/auth/google-oauth');

// middlewares
app.use(express.json());
// for form data
app.use(express.urlencoded({ extended: true }));

// Routes (Also considered as a middleware - Last middleware)
app.use('/auth', basicAuth);
app.use('/google', googleOAuth);

const port = process.env.PORT || 5001;

app.listen(port, () => console.log('Server is running in port:', port));
