const user_db = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  }
}

const fsPromises = require('fs').promises;
const path = require('path');

const handleLogOut = async (req, res) => {
  const cookie = req.cookies;
  if (!cookie?.jwt) {
    console.log("No cookie found");
    return res.sendStatus(204) // No content to send back by response body
  }
  // If there is refresh token, compare refresh token with the refresh token in database, and get the corrsponding user
  const refreshToken = cookie.jwt;
  const user_match = user_db.users.find(user => user.refreshToken === refreshToken);
  if (!user_match) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
    return res.sendStatus(204);
  }
  // Delete refresh token from database, if there is corresponding refresh token
  const otherUsers = user_db.users.filter(user => user.refreshToken !== user_match.refreshToken);
  const userWithoutToken = { ...user_match, refreshToken: '' }
  user_db.setUsers([...otherUsers, userWithoutToken]);

  await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
    JSON.stringify(user_db.users)
  )

  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', /*secure: true*/ });
  res.sendStatus(204);

}

module.exports = { handleLogOut };