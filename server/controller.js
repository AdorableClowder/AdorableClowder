// All logic interactions taking info from request and responding from db
var jwt = require('jwt-simple');

var Models = require('./db/models.js');
var User = Models.User;

var secret = 'INSERTWITTYSECRETHERE';

module.exports = {

  login: function (req, res, next) {
    console.log('request body: ', req.body);

    var username = req.body.username;
    var password = req.body.password;
    var newUser = User.forge({
      username: username
    });
    var userInfo;
    console.log('user to search for: ', newUser);

    // TODO: factor the find user stuff into a separate function for DRY purposes
    // create new user
    newUser
      .fetch()
      .then(function (user) {
        console.log("fetched user: ", user);
        if (!user) {
          throw new Error('User does not exist');
        }
        console.log('found user: ', user);
        console.log('password to compare is: ', password);
        userInfo = user; //in order to properly chain promises, need to save found user in higher scope
        return user.comparePasswords(password)
      })
      .then(function (passwordsMatch) { //compare currently returns true or false
        console.log('result of comparePasswords: ', passwordsMatch);
        if (passwordsMatch) {
          var token = jwt.encode(userInfo, secret);
          console.log('jwt encoded, here is token: ', token);
          res.json({
            token: token
          });
        } else {
          throw new Error('Incorrect Password!');
        }
      })
      .catch(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    console.log('request body: ', req.body);

    var newUser = User.forge({
      username: req.body.username
    });

    // check to see if user already exists
    newUser
      .fetch()
      .then(function (user) {
        if (user) {
          throw new Error('User already exists!');
        } else {
          // make a new user if not one
          console.log("about to hash")
          return newUser.hashPassword(req.body.password);
        }
      })
      .then(function (user) {
        console.log("hash promise result: ", user);
        if (!user) {
          throw new Error('Write to DB failed!');
        }
        // create token to send back for auth
        console.log("about to create jwt with user: ", user);
        var token = jwt.encode(user, secret);
        res.json({
          token: token
        });
        console.log("finished creating jwt");
      })
      .catch(function (error) {
        next(error);
      });
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    var token = req.headers['x-access-token'];

    if (!token) {
      throw new Error('No token');
    } else {
      // then decode the token, which will end up being the user object
      var user = jwt.decode(token, secret);
      // check to see if that user exists in the database
      User.forge({
        username: user.username
      }).fetch()
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
    }
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

    var loggedInUser = {
      "id": 4,
      "username": "michael",
      "offer": ["video games", "drinking scotch", "cooking"],
      "want": ["how to do things good", "how to not do things bad"],
      "email": "michael@gmail.com"
    };

    res.json(loggedInUser);


  },

  createUser: function (req, res, next) {
    res.status(201).send('User created');
  },

  sendToken: function (req, res, next) {
    res.json({
      token: "sdklfh8a9ewrnaslkfmp894nfasdkhfas89joklsjdoif"
    });
  }


}
