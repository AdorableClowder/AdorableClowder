var Want = require('../models.js').Want;
var Offer = require('../models.js').Offer;
var _ = require('underscore');
var Promise = require('bluebird');

// exports a promise that takes an array of skill strings and converts them into a unique array of
// all user IDs who WANT TO LEARN that skill
module.exports = function (skills, type) {
  return Promise.all(
    skills.map(function (skill) {
      return getRelatedUserIds(skill, type);
    })
  ).then(function (array) {
    // clean up before sending up the chain
    return _.uniq(_.flatten(array).filter(Number));
  });
};

// getRelatedUserIds is a promise that takes a skill string and returns and array of user IDs who WANT TO LEARN that skill
var getRelatedUserIds = function (skill, type) {
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
        return user.get('id');
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
