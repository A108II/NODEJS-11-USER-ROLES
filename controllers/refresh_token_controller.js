const user_db = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  }
}
const jwt = require('jsonwebtoken');
require('dotenv').config();

// Get cookie
const handleRefreshToken = (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    console.log("No cookie found");
    console.log(cookie.jwt);
    return res.sendStatus(401);
  }
  // Compare refresh token with the refresh token in database
  const refreshToken = cookie.jwt;
  console.log(refreshToken);
  const foundUser = user_db.users.find(user => user.refreshToken === refreshToken);
  if (!foundUser) {
    console.log("Could not find corresponding user with specific refresh token")
    return res.sendStatus(403);
  }

  // Verify refresh token
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    (err, decoded) => {
      if (err) { return res.sendStatus(403); }
      // Compare username in database with decoded username 
      if (foundUser.username !== decoded.username) { return res.sendStatus(403); }
      // Issue a new access token if refresh token is verified 
      const roles = Object.values(foundUser.roles);
      const access_token = jwt.sign(
        {
          UserInfo: { // JWT private claim 
            "username": decoded.username,
            "roles": roles,
          }
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '60s' })
      return res.json({ access_token });
    }
  )
}

module.exports = { handleRefreshToken };




