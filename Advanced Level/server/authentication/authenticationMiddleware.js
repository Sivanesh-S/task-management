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

  if (!authToken) {
    return res.status(401).send('Un Authorized');
  }

  try {
    let userId = null;
    if (authToken.includes('Bearer google ')) {
      const oauthToken = authToken.split('Bearer google ')[1];
      const googleUserObj = await googleAuth(oauthToken);
      req.googleUserObj = googleUserObj;
      userId = googleUserObj.userId;
    } else {
      const basicAuthToken = authToken.split('bearer ')[1];
      userId = await basicAuth(basicAuthToken);
      if (!userId) {
        res.sendStatus(401);
      }
    }
    req.authUserId = userId;
    console.log('came to middleware', userId);
    next();
  } catch (err) {
    res.status(401).send(err.message);
  }
};

module.exports = authenticationMiddleware;
