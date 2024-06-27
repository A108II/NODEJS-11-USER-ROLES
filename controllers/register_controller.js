const user_db = {
  users: require('../model/users.json'),
  setUsers: function (data){
    this.users = data;
  }
}

const fsPromises = require('fs').promises;
const path = require('path');
// Requiring bcrypt for hashing and salting the passwords
const bcrypt = require('bcrypt');

// Handling new user
const handle_new_user = async (req, res) => {
  const {username, password} = req.body;
  if(!username || !password) return res.status(400).json({"Error message": "Please provide both username and password"});
  // Preveting duplication in the data base
  const duplication_exists = user_db.users.find(item => item.username === username);
  if(duplication_exists){
    return res.status(409).json({"Error message": "User already exists"});
  }

  try {
    const hashed_password = await bcrypt.hash(password, 10);  // cost factor: 10
    const new_user = {
      "username" : username,
      "roles": {"User": 4444},
      "password": hashed_password,
    }
    user_db.setUsers([...user_db.users, new_user]);
    await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'users.json'), 
    JSON.stringify(user_db.users))
    console.log(user_db.users);
    res.status(201).json({"Success message": `New user with ${username} username just created!`});  
  } catch (error) {
    res.status(500).json({"Error message": `${error.message}`});
  }
}

module.exports = {handle_new_user};