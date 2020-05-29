// auth verifications
const googleAuth = require('./google');
const basicAuth = require('./basic');

// whitelisted urls for non auth token
const whiteListUrls = require('./authenticationUrls');

const authenticationMiddleware = async (req, res, next) => {
  const authToken = req.headers.authorization;

  console.log('req.url:', req.url);

  const isWhiteListedUrl = (url) =>
    Object.keys(whiteListUrls).some((urlKey) => whiteListUrls[urlKey] === url);

  if (isWhiteListedUrl(req.url)) {
    return next();
  }

  try {
    let userId = null;
    if (authToken.includes('google ')) {
      userId = await googleAuth(authToken);
    } else {
      const basicAuthToken = authToken.split('bearer ')[1];
      userId = await basicAuth(basicAuthToken);
    }
    req.authUserId = userId;
    console.log('came to middleware:', req.headers.authorization);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = authenticationMiddleware;
