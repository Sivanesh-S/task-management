const jwt = require('jsonwebtoken');

const basicAuth = (token) => {
  try {
    const userObj = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    console.log('userObj:', userObj);
    return userObj.userId;
  } catch (err) {
    console.error(`[basic Auth] ${err.message}`);
  }
};

module.exports = basicAuth;
