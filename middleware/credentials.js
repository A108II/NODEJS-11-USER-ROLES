const whiteList = require('../config/whiteList');

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (whiteList.includes(origin) && !res.headersSent) {
    // Server is allowing browser to include user credentials such as cookies, HTTP authentication
    res.header('Access-Control-Allow-Credntials', true);
  }
  next();
}

module.exports = credentials;

/* 
Why Set Access - Control - Allow - Credentials to true?
When this header is set to true, it indicates that the server allows the browser to send credentials such as cookies, authorization headers, or TLS client certificates with requests to this server.
You want the server to allow requests that include user credentials(e.g., cookies, HTTP authentication).
The frontend application needs to make requests to the server that require authentication or user - specific data. 
*/


/* 
Why Credentials Are Important
Credentials are important because they allow the server to:
Authenticate the user making the request (e.g., checking if the user is logged in).
Authorize access to resources based on the user's identity (e.g., only allowing certain actions if the user has the right permissions).
Maintain state between different requests (e.g., remembering items in a shopping cart). 
*/




