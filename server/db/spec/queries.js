var db = require('../config.js');
var Promise = require('bluebird');
var _ = require('underscore');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


// a function that takes the agreed-upon json user-obj posted to '/signup' (see docs/interface.json for more info)
// adds the user to the database and establishes a link between wanted and offered skills
var createUser = exports.createUser = function (jsonUser) {
  var user = JSON.parse(jsonUser);
  return User.forge({ username: user.username }).fetch().then(function (userExists) {
    if (userExists) {
      console.log(user.username, 'already exists');
      return;
    }
    User.forge({
      username: user.username,
      password: user.password,
      email: user.email
    }).save().then(function (savedUser) {
      var relationships = [
        attachSkillsToUser(savedUser, user.offer, 'offers'),
        attachSkillsToUser(savedUser, user.want, 'wants')
      ];
      return Promise.all(relationships);
    })
    .then(function (user) {
      console.log('USER CREATION SUCCESSFULL!!!!!!');
    });
  });
};
  
// attachSkillsToUser is a promise that takes a backbone User model, an array of skills (as strings), 
// and the corresponding table the skills belong to (eg: 'offers' or 'wants') and creates the Bookstrap version 
// of a join table between the user and the skills on that table
var attachSkillsToUser = function (user, skills, table) {
  return new Promise(function (resolve, reject) {
    getAllSkillIds(skills, convertToModelName(table)).then(function (ids) {
      user.related(table).attach(ids); //populates join table
      console.log('successfully attached skills to', table, 'table');
      resolve(user);
    });
  });
};

/*
getAllSkillIds is a promise that accepts an array of skill strings, and a string representing a 
Backbone skill type model and adds them to the db if not already there. an array of id's 
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
// var getAllSkillIds = function (skills, skillType) {
//   return new Promise (function (resolve, reject) {

//     var newSkillIds = [];

//     async.each(skills, function (skill, callback) {
//       console.log('getting skill ID for', skill);
//       getSkillId(skill, skillType).then(function(skillId) {
//         newSkillIds.push(skillId);
//         callback();
//       });

//     }, function (err) {
//       if (err) {
//         console.log('failed to retreive skill id');
//       } else {
//         console.log('all new skills added to db');
//         resolve(newSkillIds);
//       }
//     });
//   });
// };



// getSkillId is a promise that accepts a raw skill string (eg: 'cooking') and a string representing a Backbone class
// and gets the skill's id from the table based on skill type. the found is then passed through the resolve function
// NOTE: if the skill is not already in the db, getSkillId will add it to the db before resolving
var getSkillId = function (skill, skillType) {
  // convert 'skillType' to the actual Backbone class
  var Model = Models[skillType];

  return new Promise(function (resolve, reject) {
    Model.forge({ skill: skill }).fetch().then(function (skillExists) {
      if (!skillExists) {
        Model.forge({ skill: skill}).save().then(function (savedSkill) {
          console.log(savedSkill.get('skill'), 'saved successfully in ' + skillType + 's table');
          console.log('with an id of:', savedSkill.get('id'));
          // pass saved skill id into then function
          resolve(savedSkill.get('id'));
        });
      }
      else {
        console.log(skill, 'already exists in db');
        // pass fetched skill id into then function
        resolve(skillExists.get('id'));
      }
    });
  });
};


// useful when distinguishing between the MySQL table name VS. the Backbone model name
var convertToModelName =  function (tableName) {
  return tableName.charAt(0).toUpperCase() + tableName.slice(1, tableName.length-1);
};


// TODO:
// Create a "login" massive query that does the following:
// create a query to find all users who have skills wanted that match the logging in user skills offered
// figure out a way to package it nicely
