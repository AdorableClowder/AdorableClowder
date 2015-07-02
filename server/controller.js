// All logic interactions taking info from request and responding from db
var jwt = require('jwt-simple');
var Models = require('./db/models.js');
var User = Models.User;
var createUser = require('./db/queries/createUser.js');
var saveUser = require('./db/queries/saveUser.js');
var buildUserObj = require('./db/queries/buildUserObj.js');
var getRelatedUserIds = require('./db/queries/getRelatedUserIds.js');
var Promise = require('bluebird');
var fs = require('fs');



var secret = 'INSERTWITTYSECRETHERE';
var action = '';

module.exports = {
  setAction: function(req, res){
    action = req.body.action;
    res.send('action set');
  },
  
  logo: function(req, res, next){
    res.sendfile('../../client/app/assets/frying.png');
  },

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
      .then(function (passwordsMatch) {
        if (!passwordsMatch) {
          throw new Error('Incorrect password');
        }
        var token = jwt.encode(userModel, secret);
        res.json({ token: token });
      })
      .catch(function (error) {
        next(error);
      });
  },

  signup: function (req, res, next) {
    createUser(req.body, next)
      .then(function (user) {
        console.log(user);
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
    console.log('explore checkauth called');
    var token = req.headers['x-access-token'];

    if (!token) {
      throw new Error('No token');
    }
    // then decode the token, which will end up being the user object
    var user = jwt.decode(token, secret);
    // console.log('checkauth user---------', user);
    // check to see if that user exists in the database
    // "User.forge" is syntactic sugar for "new User"
    User.forge({
      username: user.username
    })
      .fetch()
      .then(function (foundUser) {
        if (foundUser) {
          next(); //if everything goes well, pass req to next handler (in server config)
        } else {
          res.sendStatus(401);
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  },

  getMatchingUsers: function (req, res, next) {

    var token = req.headers['x-access-token'];
    var user = jwt.decode(token, secret);

    //create new user for search
    User.forge({
      username: user.username
    })
      .fetch({ //find in db with related offers
        withRelated: 'offers'
      })
      .then(function (foundUser) {
        // convert bookshelf found user into array of offer strings
        return foundUser.related('offers').map(function (offer) {
          return offer.get('skill');
        });
      })
    // convert array of offers to array of user id's that want to learn what user has to offer
    .then(function (offers) {
      console.log('offers=', offers);
      return getRelatedUserIds(offers);
    })
    // convert user_ids into user objects to send,
    // because JSON format for send different than JSON format from Bookshelf objects
    // TODO: change to send data from bookshelf in the same format it
    // comes out instead of converting to something else
    .then(function (userIds) {
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
    console.log('------------------this is the user', user);
    //convert bookshelf user object to expected JSON format for send
    //TODO: use bookshelf format for send instead
    buildUserObj(user.username).then(function (builtUserObj) {
      res.json(builtUserObj);
    });
  },

  saveUserChanges: function (req, res, next) {
    console.log('save user req----------------', req);
    console.log('save user req.body----------------', req.body);
    saveUser(req.body, next)
      .then(function (user){
        console.log('saved user: ', user);
        if(!user){
          throw new Error('save changes failed');
        }
        res.send('user saved');
      })
      .catch(function (error) {
        next(error);
      });
  },
  //turns linkedin information into user object
  //passes token back to be set in FE
  linkedin: function(req, res){
    var username = req.user.id;
    console.log(req.user);
    console.log('reached linkedin');
    if(action === 'signup'){
      User.forge({
        username: username
      })
      .fetch()
      .then(function (userExists) {
        if (userExists) {
          throw new Error('User already exists!');
        }
        console.log('---------------saving to database');
        return User.forge({
          username: username,
          email: req.user.emails[0].value,
          linkedin: 'true'
        });
      })
      .then(function (newUser) {
        return newUser.hashPassword('anything');
        })
      .then(function(newUser){
        buildUserObj(username).then(function(builtUserObj){
          res.json(jwt.encode(builtUserObj, secret));
        });
      });
    }
    if(action === 'login'){
      User.forge({
        username: username
      })
        .fetch()
        .then(function (user) {
          if (!user) {
            throw new Error('User does not exist');
          }else{
            buildUserObj(username).then(function(builtUserObj){
              res.json(jwt.encode(builtUserObj, secret));
            });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

};
