var db = require('../config.js');
var Models = require('../models.js');
var User = Models.User;
var Offer = Models.Offer;
var Want = Models.Want;


var Collections = require('../collections.js');
// var Offers = Collections.Offers;
// var Users = Collections.Users;
// var Wants = Collections.Wants;

var allOffers = Collections.allOffers;


// // Query to add a new user with username and password:
// User.forge({
//   username: 'mario',
//   password: 'luigi'
// }).save().then(function (user) {
//   console.log('mario successfully saved');
// });


// // Query to find a user from the DB with username 'mario'
// // require set to true to trigger error if user is not found
// User.forge({
//   username: 'mario'
// }).fetch({
//   require: true
// })
//   .then(function (foundUser) {
//     console.log('found user', foundUser);
//   })
//   .catch(function () {
//     console.log('error finding user');
//   });


// // Query to create two random skills offered
// Offer.forge({
//   skill: 'cooking'
// }).save().then(function (offer) {
//   console.log('cooking saved as a skill offered');
// });

// Offer.forge({
//   skill: 'javascript'
// }).save().then(function (offer) {
//   console.log('javascript saved as a skill offered');
// });


// // Query to create a new user and attach offer_id = 1 and offer_id = 2 to it
// User.forge({
//   username: 'spiderman',
//   password: 'pewpewwebs'
// }).save().then(function (user) {
//   user.related('offers').attach([1, 2]);
// });

// Offers.add({ skill: 'javascript'});


// TODO:
// Create the "sign up" massive query that does the following:
// var offeredSkills = ['bowling', 'archery', 'sailing'];
// var convertToModels = function (skills) {
//   return skills.map(function (skill) {
//     return {skill: skill};
//   });
// };

// Offers.forge();

// allOffers.create({skill: 'cooking'}).then(function (skill) {
//   console.log('skill added');
// });

allOffers.create({skill: 'popping bubblewrap'});



// 1) check to see if each skill offered passed from the user is already in the DB
  // create function that converts the list of skills to an array of raw model objects
  // ex: ['yoga', 'flying'] => [{skill: 'yoga'},{skill: 'flying'}]
  // 
// 2) if not, add and save each skill
// 3) repeat for skills wanted
// 4) once all skills are saved, forge a new user with the given username and password
// 5) save the user and then attach the skills to the user model that are related

// Create a "login" massive query that does the following:
// create a query to find all users who have skills wanted that match the logging in user skills offered
// figure out a way to package it nicely
