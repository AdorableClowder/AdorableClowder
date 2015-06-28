var Want = require('../models.js').Want;
var _ = require('underscore');

// exports a promise that takes an array of skill strings and converts them into a unique array of
// all user IDs who WANT TO LEARN that skill
module.exports = function (skills) {
  return Promise.all(
    skills.map(function (skill) {
      return getRelatedUserIds(skill);
    })
  ).then(function (array) {
    // clean up before sending up the chain
    return _.uniq(_.flatten(array).filter(Number));
  });
};

// getRelatedUserIds is a promise that takes a skill string and returns and array of user IDs who WANT TO LEARN that skill
var getRelatedUserIds = function (skill) {
  if (!skill) {
    throw new Error('getRelatedUserIds called with no skill');
  }
  console.log('skill=', skill);
  return Want.forge({
      skill: skill
    }).fetch({
      withRelated: 'users'
    })
    .then(function (want, err) {
      if (!want) {
        return null;
      }
      if (err) {
        throw new Error(err);
      }
      return want.related('users').map(function (user) {
        return user.get('id');
      });
    })
    .catch(function (err) {
      console.log(err);
    });
};
