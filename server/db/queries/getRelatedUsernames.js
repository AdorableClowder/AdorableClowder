var Want = require('../models.js').Want;
var Offer = require('../models.js').Offer;
var _ = require('underscore');
var Promise = require('bluebird');

// exports a promise that takes an array of skill strings and converts them into a unique array of
// all user IDs who WANT TO LEARN that skill
module.exports = function (skill, type) {
  if (!skill) {
    throw new Error('getRelatedUserIds called with no skill');
  }
  console.log('skill=', skill);
  var obj;
  //determine is wants or offers is requested
  if (type === "want") {
    Obj = Want;
  } else if (type === "offer") {
    Obj = Offer;
  }

  return Obj.forge({
      skill: skill
    }).fetch({
      withRelated: 'users'
    })
    .then(function (skill, err) {
      if (!skill) {
        return null;
      }
      if (err) {
        throw new Error(err);
      }
      return skill.related('users').map(function (user) {
        return user.get('username');
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
