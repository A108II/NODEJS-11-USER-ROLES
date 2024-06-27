const user_db = {
  users: require('../model/users.json'),
  setUsers: function (data) {
    this.users = data;
  }
}

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fsPromises = require('fs').promises;
const path = require('path');
require('dotenv').config();

// Handle user login 
const handleLogin = async (req, res) => {
  const { username, password } = req.body; // destructure username and password from req.body
  if (!username || !password) return res.status(400).json({ "message": "Bad request, please provide both username and password" });
  const foundUser = user_db.users.find(user => user.username === username); // founuser has the username and password retreived from the database
  if (!foundUser) {
    return res.status(400).json({ "message": "Could not find the corresponding username" })
  }
  // Compare password provided by the user and the password in the database
  const pwd_recognized = await bcrypt.compare(password, foundUser.password);
  if (pwd_recognized) {
    const roles = Object.values(foundUser.roles);
    const accesToken = jwt.sign(
      {
        UserInfo: { // JWT private claim 
          "username": foundUser.username,
          "roles": roles
        }
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '60s' },
    )
    const refreshToken = jwt.sign(
      { "username": foundUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '1d' },
    )
    const usersExceptFoundUser = user_db.users.filter(user => user.username !== foundUser.username); // Create a new array containing all the users except current user
    const userWithToken = { ...foundUser, refreshToken }; // Adding refresh token to the foundUser object
    user_db.setUsers([...usersExceptFoundUser, userWithToken]); // Updating database, which contains all the users and foundUser with a refresh token
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'),
      JSON.stringify(user_db.users)
    )
    // Cookie name: jwt, value: refresh token
    res.cookie('jwt', refreshToken, {
      httpOnly: true, // Makes it inaccessible to client-side javascript, it is only accessible in http protocol 
      sameSite: 'None',  // Allows cookie to be included inside the requests made from other origins (websites)
      // secure: true, // Cookie is only sent over https
      maxAge: 24 * 60 * 60 * 1000 // Sets the cookie expiration to 24 hours , 86400000 miliseconds
    })
    res.json({ accesToken });
  }
}

module.exports = { handleLogin };

// Note:
// JWT token contains header:  1.alg:HS256 2.typ:jwt + payload: { { UserInfo: { "username": foundUser.username,"roles": roles}, iat:1635485575 , exp:1635485605 } + Secret token