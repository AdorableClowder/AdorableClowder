var db = require('../config.js');
var Promise = require('bluebird');
var _ = require('underscore');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


// exports a promise that takes a user-obj posted to '/signup' (see docs/interface.json for more info)
// and a next callback. createUser adds the user to the database and establishes a link between wanted and offered skills
module.exports = function (user, next) {

  return User.forge({
      username: user.username
    })
    .fetch()
    .then(function (userExists) {
      if (userExists) {
        throw new Error('User already exists!');
      }
      return User.forge({
        username: user.username,
        email: user.email
      });
    })
    .then(function (newUser) {
      return newUser.hashPassword(user.password, next);
    })
    .then(function (newUser) {
      return attachSkillsToUser(newUser, user.want, 'wants');
    })
    .then(function (newUser) {
      return attachSkillsToUser(newUser, user.offer, 'offers');
    })
    .catch(function (error) {
      next(error);
    });

};

// attachSkillsToUser is a promise that takes a Bookshelf User model, an array of skills (as strings),
// and the corresponding table the skills belong to (eg: 'offers' or 'wants') and creates the Bookstrap version
// of a join table between the user and the skills on that table
// NOTE: Bookshelf creates a new user model and updates the relations when .attach is called.
// Since this is the case attachSkillsToUser must chain sequentially
var attachSkillsToUser = function (user, skills, table) {
  return new Promise(function (resolve, reject) {
    getAllSkillIds(skills, convertToModelName(table)).then(function (ids) {
      // attaches an array of ids from from the table passed into the 'related' method
      user.related(table).attach(ids).then(function (relation) {
        resolve(user);
      });
    });
  });
};

/*
getAllSkillIds is a promise that accepts an array of skill strings and a string representing a
Bookshelf skill type model, and adds them to the db if not already there. an array of id's
associated with the corresponding skill are passed to the resolve function for .then chaining

ex: getAllSkillIds(['skyrim', 'yoga', 'surfing'], 'Want').then(function (ids) {
  console.log(ids);
}) => [4, 12, 6]
*/
var getAllSkillIds = function (skills, skillType) {
  return Promise.all(skills.map(function (skill) {
    return getSkillId(skill, skillType);
  }));
};

// getSkillId is a promise that accepts a raw skill string (eg: 'cooking') and a string representing a Bookshelf class
// and gets the skill's id from the table based on skill type. the found is then passed through the resolve function
// NOTE: if the skill is not already in the db, getSkillId will add it to the db before resolving
var getSkillId = function (skill, skillType) {
  return new Promise(function (resolve, reject) {
    // convert 'skillType' to the actual Bookshelf class
    var Model = Models[skillType];

    Model.forge({
      skill: skill
    }).fetch().then(function (skillExists) {
      if (skillExists) {
        resolve(skillExists.get('id'));
        return;
      }
      Model.forge({
        skill: skill
      }).save().then(function (savedSkill) {
        console.log(
          savedSkill.get('skill'),
          'saved successfully in ' + skillType + 's table',
          'with an id of:', savedSkill.get('id')
        );
        resolve(savedSkill.get('id'));
      });
    });
  });
};


// useful when distinguishing between the MySQL table name VS. the Bookshelf model name
var convertToModelName = function (tableName) {
  return tableName.charAt(0).toUpperCase() + tableName.slice(1, tableName.length - 1);
};
