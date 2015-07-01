var utils = require('./userUtils.js');

module.exports = saveUser = function (user, next) {
 	
 	return User.forge({
 		username: user.username
 	})
 	.fetch()
 	.then(function (foundUser) {
 		if(!foundUser){
 			throw new Error('User does not exists!');
 		}
 	})
 	.then(function (foundUser) {
		return detachSkillsFromUser(foundUser, foundUser.want, 'wants');
 	})
 	.then(function (foundUser) {
 		return attachSkillsToUser(foundUser, user.want, 'wants');
 	})
 	.then(function (foundUser){
 		return detachSkillsFromUser(foundUser, foundUser.offer, 'offers');
 	})
 	.then(function (foundUser){
 		return attachSkillsToUser(foundUser, user.offer, 'offers');
 	})
 	.catch(function (error) {
 		next(error);
 	});
 		
};

