// All logic interactions taking info from request and responding from db
var jwt = require('jwt-simple');
var Models = require('./db/models.js');
var User = Models.User;
var createUser = require('./db/queries/createUser.js');
var buildUserObj = require('./db/queries/buildUserObj.js');
var getRelatedUserIds = require('./db/queries/getRelatedUserIds.js');

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
      });
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

    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, secret);

    User.forge({
      username: user.username
    })
    .fetch({withRelated: 'offers'})
    .then(function (foundUser) {
      // grab users array of offers
      return foundUser.related('offers').map(function (offer) {
        return offer.get('skill');
      });
    })
    // convert array of offers to array of user id's that want to learn what user has to offer
    .then(function (offers) {
      console.log('offers=', offers);
      return getRelatedUserIds(offers);
    })
    // convert user_id's into user objects to send
    .then(function (userIds) {
      console.log('user IDs received from getRelatedUserIds', userIds);
      if (!userIds.length) {
        throw new Error ('No matching users found');
      }
      return Promise.all(
        userIds.map(function (id) {
          return buildUserObj(id);
        })
      );
    })
    .then(function (users) {
      console.log(users);
      res.json(users);
    })
    .catch(function (err) {
      next(err);
    });

  },

  getCurrentUser: function (req, res, next) {

    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, secret);

    buildUserObj(user.id).spread(function (builtUserObj) {
      res.json(builtUserObj);
    });
  }

};
