var User = require ('../models/User.js');

// Query to add a new user with username and password:
User.forge({
  username: 'mario',
  password: 'luigi'
}).save().then(function(user){
  console.log('user successfully saved:', user);
});


// Query to find a user from the DB with username 'mario'
// require set to true to trigger error if user is not found
new User({ username: 'mario' }).fetch({ require: true })
.then(function (foundUser) {
  console.log('found user', foundUser);
})
.catch(function (err) {
  console.log('error finding user', err);
});
