var express = require('express');
var bodyParser = require('body-parser'); //body parser gives us access to req.body
var controller = require('./controller.js'); // all actual route handling logic will reside here
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;

var app = express();

//parse req.body and serve static assets
app.use(bodyParser.json())
  .use(express.static(__dirname + '/../client'));


//set up Passport for LinkedIn oAuth
app.use(passport.initialize());

passport.use(new LinkedInStrategy({
  consumerKey: "75aj0rlf87gsvn",
  consumerSecret: "xuoU3OlOk7IgMPrs",
  callbackUrl: "http://127.0.0.1:3000/auth/linkedin/callback"},

  function(token, tokenSecret, profile, done){
    process.nextTick(function () {
      //RETURN THE TOKEN TO THE FE
      //SAVE USER TO THE DATABASE USING PROFILE ATTRIBUTES
      console.log('in passport');
      console.log(token);
      console.log(profile);
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
  passport.authenticate('linkedin'),
  function(req, res){
    // The request will be redirected to LinkedIn for authentication, so this
    // function will not be called.
  });

app.get('/auth/linkedin/callback',
  passport.authenticate('linkedin', { failureRedirect: '/login' }),
  function(req, res) {
    console.log('callback response', res);
    res.redirect('/');
  });


// Router (routes to controller)
// Express method chaining--calls methods in listed order
app.get('/explore', controller.checkAuth, controller.getMatchingUsers);
app.get('/profile', controller.checkAuth, controller.getCurrentUser);
app.post('/signup', controller.signup);
app.post('/login', controller.login);

module.exports = app;
