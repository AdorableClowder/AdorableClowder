var express = require('express');
var bodyParser = require('body-parser'); //body parser gives us access to req.body
var controller = require('./controller.js'); // all actual route handling logic will reside here
var passport = require('passport');
var LinkedInStrategy = require('passport-linkedin').Strategy;
var session = require('express-session');
var cookie = require('cookie-parser');
var cors = require('cors');

//scraping modules
var cheerio = require('cheerio');
var request = require('request');


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
    var url = req.user._json.publicProfileUrl;
    request(url, function(err, response, html){
      if(!err){
        var $ = cheerio.load(html);
        // //find the skills item in the html
        // $('.category-items').filter(function(){
        //   var data = $(this);
        //   var items = data.children();
        //   for (var i = 0; i < items.length; i++){
        //     if($(items[i]).children().find('a').children('img').attr()){
        //       var product = {category: 'jeweleryaccessories'};
        //       product.links = $(items[i]).children().find('a').attr();
        //       product.img = $(items[i]).children().find('a').children('img').attr()['data-original'];
        //       product.name = $(items[i]).children('.item-description').children('a').text();
        //       product.salePrice = $(items[i]).children('.item-description').children($('.item-price')).children().first().clone().children().remove().end().text();
        //       product.originalPrice = $(items[i]).children('.item-description').children($('.item-price')).children().first().children('span').text();
        //       product.originalPrice = product.originalPrice.substring(2, product.originalPrice.length -1);
        //       products.push(product);
              
              
        //       //create database object
        //       var product = new Product({
        //         productCategory: product.category,
        //         productLink: "http://www.anthropologie.com"+product.links.href, 
        //         imageLocation: product.img, 
        //         itemName: product.name, 
        //         salePrice: Number(product.salePrice.replace(/[^0-9\.]+/g,'')),
        //         originalPrice: Number(product.originalPrice.replace(/[^0-9\.]+/g,''))
        //       });

        //       product.save(function(err){
        //         if(err){
        //           console.log(err);
        //         }
        //       });
        //     }
      
        //   }
        // });
      }
    });
    
    
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
