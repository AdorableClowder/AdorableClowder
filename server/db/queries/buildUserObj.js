var db = require('../config.js');
var Promise = require('bluebird');
var _ = require('underscore');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


// buildUserObj is a promise that takes a Bookshelf User model and converts it into the JSON format
// expected by the front end (see interface.json in docs for the expected format)
var buildUserObj = module.exports = function (username) {
  console.log('buildUserObj called with username:', username);
  return User.forge({
      username: username
    })
    .fetch()
    .then(function (user) {
      var props = ['offer', 'want'];
      var userObj = {
        id: user.get('id'),
        username: user.get('username'),
        email: user.get('email'),
        linkedin: user.get('linkedin')
      };

      return Promise.all(props.map(function (prop) {
        return getSkills(user, prop + 's').then(function (skills) {
          userObj[prop] = skills;
          return userObj;
        });
      })).spread(function (builtUserObj) {
        return builtUserObj;
      });
    });
};

// getSkills is a promise that takes a Bookshelf User model and a skill table
// and returns an array of skills associated with that user obj
// ex: getSkills('justin', 'wants').tap(console.log) => ['yo-yoging', 'twirling', 'disco']
var getSkills = function (user, table) {
  return User.forge({
      username: user.get('username')
    })
    .fetch({
      withRelated: [table]
    })
    .then(function (user) {
      var skills = user.related(table).toJSON();
      return skills.map(function (item) {
        return {skill: item.skill, category: item.category};
      });
    });
};
