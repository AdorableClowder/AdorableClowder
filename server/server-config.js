var express = require('express');
var bodyParser = require('body-parser'); //body parser gives us access to req.body
var controller = require('./controller.js'); // all actual route handling logic will reside here
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var session = require('express-session');
var cookie = require('cookie-parser');
var cors = require('cors');

var Models = require('./db/models.js');
var User = Models.User;

var app = express();
app.use(cors());
app.use(cookie());
app.use(session({secret: 'anything'}));

//parse req.body and serve static assets
app.use(bodyParser.json())
  .use(express.static(__dirname + '/../client'));


//set up Passport for LinkedIn oAuth
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});


passport.use(new LinkedInStrategy({
  consumerKey: "75aj0rlf87gsvn",
  consumerSecret: "xuoU3OlOk7IgMPrs",
  callbackURL: "http://localhost:1337/auth/linkedin/callback",
  profileFields: ['id', 'first-name', 'last-name', 'email-address','public-profile-url', 'headline']
  },

  function(token, tokenSecret, profile, done){
    process.nextTick(function () {
      //RETURN THE TOKEN TO THE FE
      //SAVE USER TO THE DATABASE USING PROFILE ATTRIBUTES
      var userid = profile.id;
      User.forge({
            username: userid
          })
          .fetch()
          .then(function (userExists) {
            if (userExists) {
              throw new Error('User already exists!');
            }
            return User.forge({
              username: userid,
              email: "created@gmail.com"
            });
          })
          .then(function (newUser) {
            return newUser.hashPassword('anything');
          });
      console.log('USER ID ---------------------------', userid);
      console.log('THIIIIIIIIIIIISSSSSSSSSSSSSSSSSSSSS ISSSSSSS----------------------------------------', profile);
      // To keep the example simple, the user's LinkedIn profile is returned to
      // represent the logged-in user.  In a typical application, you would want
      // to associate the LinkedIn account with a user record in your database,
      // and return that user instead.
      return done(null, profile);
    });
  }
));

//router (routes for passport authentication)
app.get('/auth/linkedin',
  passport.authenticate('linkedin', { scope: ['r_basicprofile', 'r_emailaddress']}));

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/#/login' }),
  function(req, res) {
    console.log('req-------------------------', req.user);
    res.json(req.user);
    // controller.linkedinSignup(req.user);
    res.redirect('/');
  });


// Router (routes to controller)
// Express method chaining--calls methods in listed order
app.get('/explore', controller.checkAuth, controller.getMatchingUsers);
app.get('/profile', controller.checkAuth, controller.getCurrentUser);
app.post('/signup', controller.signup);
app.post('/login', controller.login);

module.exports = app;
