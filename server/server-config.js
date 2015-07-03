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
    // console.log('request passed into callback-------------', req);
    res.redirect('/#/linkedinsuccess');
  });


// Router (routes to controller)
// Express method chaining--calls methods in listed order
app.get('/explore', controller.checkAuth, controller.getMatchingUsers);
app.get('/profile', controller.checkAuth, controller.getCurrentUser);
app.post('/profile', controller.checkAuth, controller.saveUserChanges);
app.post('/signup', controller.signup);
app.post('/login', controller.login);
app.get('/linkedinsuccess', controller.linkedin);
app.get('/people', controller.checkAuth, controller.getUsersBySkill);
app.post('/setaction', controller.setAction);

module.exports = app;
