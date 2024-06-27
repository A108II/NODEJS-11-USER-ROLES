const whiteList = require('./whiteList');
const cors_options = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) != -1 || !origin) {
      callback(null, true);
    }
    else {
      callback(new Error('Not allowed by the cors'));
    }
  },
  optionSuccessStatus: 200,
}

module.exports = cors_options;

// Note: 
// When we make a request from localhost:3500 it outputs the req.headers.origin as undefined, in order to solve this issue we add || !origin  

