var utils = require('./userUtils.js');


// exports a promise that takes a user-obj posted to '/signup' (see docs/interface.json for more info)
// and a next callback. createUser adds the user to the database and establishes a link between wanted and offered skills
module.exports = createUser = function (user, next) {

  return User.forge({
      username: user.username
    })
    .fetch()
    .then(function (userExists) {
      if (userExists) {
        throw new Error('User already exists!');
      }
      return User.forge({
        username: user.username,
        email: user.email
      });
    })
    .then(function (newUser) {
      return newUser.hashPassword(user.password, next);
    })
    .then(function (newUser) {
      return attachSkillsToUser(newUser, user.want, 'wants');
    })
    .then(function (newUser) {
      return attachSkillsToUser(newUser, user.offer, 'offers');
    })
    .catch(function (error) {
      next(error);
    });

};