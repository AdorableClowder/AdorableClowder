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
    console.log('user to search for: ', newUser);

    // TODO: factor the find user stuff into a separate function for DRY purposes
    // create new user
    newUser.fetch({ // fetch from db
      require: true // triggers err if user not found
    }).then(function (user) {
      console.log("fetched user: ", user);
      if (!user) {
        next(new Error('User does not exist')); //not sure if need this and 'require: true' above.
      } else {
        console.log('found user: ', user);
        return user.comparePasswords(password) //promisified on User model
          .then(function (foundUser) {
            console.log('password compared, here is user: ', user);
            if (foundUser) {
              var token = jwt.encode(user, secret);
              console.log('jwt encoded, here is token: ', token);
              res.json({
                token: token
              });
            } else {
              return next(new Error('No user'));
            }
          });
      }
    })
      .catch(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    console.log('request body: ', req.body);

    var username = req.body.username;
    var password = req.body.password;
    var newUser;

    // check to see if user already exists
    User.forge({
      username: username
    }).fetch().then(function (user) {
      console.log('in then after fetch.')
      if (user) {
        next(new Error('User already exists!'));
      } else {
        // make a new user if not one
        newUser = User.forge({
          username: username,
          password: password
        });
        newUser.save().then(function (user) {
          if (!user) {
            next(new Error('Write to DB failed!'));
          } else {
            // create token to send back for auth
            console.log("about to create jwt with user: ", user);
            var token = jwt.encode(user, secret);
            res.json({
              token: token
            });
            console.log("finished creating jwt");
          }
        }).catch(function (error) {
          next(error);
        });
      }
    })
  },

  checkAuth: function (req, res, next) {
    // checking to see if the user is authenticated
    // grab the token in the header if any
    var token = req.headers['x-access-token'];
    if (!token) {
      next(new Error('No token'));
    } else {
      // then decode the token, which will end up being the user object
      var user = jwt.decode(token, secret);
      // check to see if that user exists in the database
      User.forge({
        username: user.username
      }).fetch({ // fetch from db
        require: true // triggers err if user not found
      }).then(function (foundUser) {
        if (foundUser) {
          res.send(200);
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

  logout: function (req, res, next) {
    //must also send message to frontend to destroy token
    //or should it? maybe it should just flag it on the serverside?
    //seems like a frontend token destroy would be vulnerable...
    res.status(200).send('User logged out');
  },

  sendToken: function (req, res, next) {
    res.json({
      token: "sdklfh8a9ewrnaslkfmp894nfasdkhfas89joklsjdoif"
    });
  }


}
