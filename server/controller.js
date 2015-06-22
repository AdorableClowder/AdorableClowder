// All logic interactions taking info from request and responding from db
var Promise = require('bluebird');
var jwt = require('jwt-simple');

module.exports = {

  signin: function (req, res, next) {
    var username = req.body.username,
      password = req.body.password;

    //needs correct method name for SQL query
    var findUser = Promise.promisify(User.findUser, User);
    findUser({
      username: username
    })
      .then(function (user) {
        if (!user) {
          next(new Error('User does not exist'));
        } else {
          return user.comparePasswords(password)
            .then(function (foundUser) {
              if (foundUser) {
                var token = jwt.encode(user, 'secret');
                res.json({
                  token: token
                });
              } else {
                return next(new Error('No user'));
              }
            });
        }
      })
      .fail(function (error) {
        next(error);
      });
  },

  getMatchingUsers: function (req, res, next) {

    var fabricatedUsers = [{
      "id": 1,
      "username": "austin",
      "offer": ["yoga", "cooking"],
      "want": ["angular"],
      "email": "austin@gmail.com"
    }, {
      "id": 2,
      "username": "sarah",
      "offer": ["brewing tea", "angular"],
      "want": ["yoga"],
      "email": "sarah@me.com"
    }, {
      "id": 3,
      "username": "justin",
      "offer": ["making lemonade", "scootering"],
      "want": ["angular"],
      "email": "justin@gmail.com"
    }, {
      "id": 4,
      "username": "michael",
      "offer": ["video games", "drinking scotch"],
      "want": ["how to do things good", "how to not do things bad"],
      "email": "justin@gmail.com"
    }]

    res.json(fabricatedUsers);

  },

  createUser: function (req, res, next) {
    res.status(201).send('User created');
  },

  logoutUser: function (req, res, next) {
    res.status(200).send('User logged out');
  },

  sendToken: function (req, res, next) {
    res.json({
      "token": "sdklfh8a9ewrnaslkfmp894nfasdkhfas89joklsjdoif"
    });
  }


}
