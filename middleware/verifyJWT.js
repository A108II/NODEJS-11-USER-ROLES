const jwt = require('jsonwebtoken');
require('dotenv').config();

const jwtVerification = (req, res, next) => {
  const authHeader = req.headers['authorization'] || req.headers['Authorization']; // Bearer token
  if (!authHeader?.startsWith('Bearer ')) {
    return res.sendStatus(401);
  }
  const token = authHeader.split(' ')[1]; // get token

  jwt.verify( // verification
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err, decoded) => {
      if (err) return res.sendStatus(403);
      req.user = decoded.UserInfo.username;
      req.roles = decoded.UserInfo.roles;
    })
  next();
}

module.exports = jwtVerification;

/*
Some explanation: 
1. Authorization header: http request which contains authentication info which client sends to server to authenticate request.
2. JWT: When using json web token, authorization header contains token prefixed with the word bearer. Like this, Authorization: Bearer <token>
3. If token is invalid or expired then respond with invalid token
4. Otherwise, decode the payload which contains the username info
*/

