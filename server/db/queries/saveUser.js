var utils = require('./userUtils.js');
var Models = require('../models.js');
var User = Models.User;
module.exports = saveUser = function (user, next) {
  console.log('used passed to saveUser------------------------------------', user);
 	return User.forge({
 		username: user.username
 	})
 	.fetch()
 	.then(function (foundUser) {
     console.log('found user: ', foundUser);
     return foundUser;
 		if(!foundUser){
 			throw new Error('User does not exist!');
 		}
 	})
   .then(function(foundUser) {
     return utils.detachSkillsFromUser(foundUser, 'wants');
   })
 	.then(function (foundUser) {
 		return utils.attachSkillsToUser(foundUser, user.want, 'wants');
 	})
   .then(function(foundUser) {
     return utils.detachSkillsFromUser(foundUser, 'offers');
   })
 	.then(function (foundUser){
 		return utils.attachSkillsToUser(foundUser, user.offer, 'offers');
 	})
 	.catch(function (error) {
 		next(error);
 	});

};
