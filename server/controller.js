// All logic interactions taking info from request and responding from db
var jwt = require('jwt-simple');

var Models = require('./db/models.js');
var User = Models.User;

var createUser = require('./db/queries/createUser.js');

var secret = 'INSERTWITTYSECRETHERE';

module.exports = {

  login: function (req, res, next) {
    var username = req.body.username;
    var password = req.body.password;
    var userModel;

    User.forge({
      username: username
    })
      .fetch()
      .then(function (user) {
        if (!user) {
          throw new Error('User does not exist');
        }
        //in order to take advantage of chain promises, need to save found user in higher scope
        userModel = user;
        return user.comparePasswords(password);
      })
      .then(function (passwordsMatch) { //compare currently returns true or false
        if (!passwordsMatch) {
          throw new Error('Incorrect password');
        }
        var token = jwt.encode(userModel, secret);
        res.json({
          token: token
        });
      })
      .catch(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    createUser(req.body, next)
      .then(function (user) {
        if (!user) {
          throw new Error('User creation failed');
        }
        res.json({
          token: jwt.encode(user, secret)
        });
      })
      .catch(function (error) {
        next(error);
      })
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    var token = req.headers['x-access-token'];

    if (!token) {
      throw new Error('No token');
    }
    // then decode the token, which will end up being the user object
    var user = jwt.decode(token, secret);
    // check to see if that user exists in the database
    User.forge({
      username: user.username
    })
      .fetch()
      .then(function (foundUser) {
        if (foundUser) {
          next(); //if everything goes well, pass req to next handler (in server config)
        } else {
          res.send(401);
        }
      })
      .catch(function (error) {
        next(error);
      });

  },

  getMatchingUsers: function (req, res, next) {

    var fabricatedUsers = [{
      "id": 1,
      "username": "austin",
      "offer": ["yoga", "cooking"],
      "want": ["angular", "scootering"],
      "email": "austin@gmail.com"
    }, {
      "id": 2,
      "username": "sarah",
      "offer": ["brewing tea", "angular", "making lemonade"],
      "want": ["yoga", "scootering"],
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
      "offer": ["video games", "drinking scotch", "cooking"],
      "want": ["how to do things good", "how to not do things bad"],
      "email": "michael@gmail.com"
    }];

    res.json(fabricatedUsers);

  },

  getCurrentUser: function (req, res, next) {

    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, secret);
    var currentUser = {};

    // need to figure out how to access an array of the skills based on

    var loggedInUser = {
      "id": 4,
      "username": "michael",
      "offer": ["video games", "drinking scotch", "cooking"],
      "want": ["how to do things good", "how to not do things bad"],
      "email": "michael@gmail.com"
    };

    res.json(loggedInUser);

  }

}
