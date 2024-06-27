const rolesVerification = (...permittedRoles) => {
  return (req, res, next) => {
    if(!req?.roles) return res.sendStatus(401);
    console.log("Permitted roles are: " + permittedRoles);
    console.log("User's roles are: " + req.roles);

    const rolesMatch = req.roles.map(role => permittedRoles.includes(role)).find(val => val === true);
    if(!rolesMatch) return res.sendStatus(401);
    next();
  }
}

module.exports = rolesVerification;

// (...allowedRoles) here ... is rest operator which allows us to pass as many parameters as we want to the fucntion, this is useful when we don't know how many arguments will be passed to the function, the arguments will be gathered inside an array.

// req.roles.map(role => arrayOfRoles.includes(role)) creates an array of boolean values indicating if each role in req.roles is in arrayOfRoles.

//.find(val => val === true) searches for the first true value in the array. If found, result will be true; otherwise, it will be undefined.

