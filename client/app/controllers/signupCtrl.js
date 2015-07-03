angular.module('signupCtrl', ['ui.bootstrap'])

.controller('signupController', function (Auth, $location, $window) {
  //vm stands for view model, will be signup in html
  var vm = this;

  vm.user = {};


  vm.setAction = function(){
    Auth.setAction('signup')
    .then(function(){
      console.log('action set');
    })
    .catch(function(err){
      console.log(err);
    });
  };
  
  vm.action = function(){
    return Auth.action;
  };
  
  vm.setToken = function(){
    Auth.setToken()
      .then(function(token){
        $window.localStorage.setItem('skillitToken', token);
        $location.path('/choosesubjects');
      });
  };

  vm.doSignup = function () {
   console.log('dosignup called');
    Auth.signup(vm.user)
      .then(function (token) {
        console.log('signup success');
        $window.localStorage.setItem('skillitToken', token);
        // redirect if succesful
        $location.path('/choosesubjects');
      })
      .catch(function (err) {
        console.log(err);
        //gets the error without the whole callstack (pretty hacky)
        vm.err = err.data.split('<br>')[0];
      });
  };
})

  .controller("subjectsController", function(Users, $location, $window) {
    var vm = this;
    vm.user = {};
    vm.wants = [];
    vm.offers = [];
    vm.wantsSkills = [];
    vm.offersSkills = [];

    vm.getUser = function () {
      //using Users factory from factories.js to do GET
      Users.getUser()
        .then(function (user) {
          vm.user = user;
          vm.wants = vm.user.want;
          vm.wantsSkills = vm.wants.map(function(item) {
            return item.skill;
          });
          vm.offers = vm.user.offer;
          vm.offersSkills = vm.offers.map(function(item) {
            return item.skill;
          });
        })
        .catch(function (err) {
          console.log(err);
          //if can't get user, redirect to login
          $location.path('/login');
        });
    };

    vm.getUser();

    vm.categories = ['Language Learning', 'Technology', 'Sports', 'Knowledge', 'Wild n Wacky', 'Business', 'Craft and Design'];

    vm.sampleCategories = {
      'Language Learning': ['Spanish', 'Chinese', 'Esperanto'],
      'Technology': ['IoT', 'Hacking Facebook', 'Bitcoin'],
      'Sports': ["Baseball", "Curling", "Cow-tipping"],
      'Knowledge': ["Art History", "Art Garfunkel History", "History"],
      'Wild n Wacky': ["Juggling", "Busking", "Moping"],
      'Business': ["Money Laundering", "Accounting", "Financial Advice"],
      'Craft and Design': ["Woodworking", "Clay Pottery", "Graphic Design"]
    };
  })

.controller('typeAheadController', function(){
  var vm = this;
  vm.test = "hotdog";
  vm.subject = undefined;
  // data for predictive text
  vm.languages = ['Spanish', 'German', 'Japanese', 'Italian', 'Mandarin', 'Navajo', 'Cantonese', 'Esperanto', 'Korean', 'Thai', 'Dutch', 'Russian', 'French', 'Albanian', 'Greek', 'Catalan', 'Galician', 'Hebrew', 'Hungarian', 'Icelandic', 'Latin', 'Lithuanian', 'Polish', 'Portuguese', 'Romanian', 'Afrikaans', 'Arabic', 'Armenian', 'Basque', 'Bengali', 'Bulgarian', 'Burmese', 'Chechen', 'Cornish', 'Czech', 'Croatian', 'Danish', 'English', 'Estonian', 'Faroese', 'Fijian', 'Finnish', 'Georgian', 'Hindi', 'Indonesian', 'Lao'];
  vm.knowledge = ['Art History', 'Philosophy', 'Linguistics', 'Anthropology', 'Biology', 'Physics', 'Chemistry'];
  vm.craftAndDesign = ['Weaving', 'Pottery', 'Painting', 'Sketching', ''];
  vm.technology = ['Python', 'Javascript', 'HTML', 'CSS', 'Ruby', 'C++', 'Java', 'Photography', 'Photoshop', 'Robotics', '3d Printing'];
  vm.wildNWacky = ['Juggling', 'Busking', 'Moping', 'Dog Walking', 'Cat Sitting'];
  vm.sports = ['Basketball', 'Disc Golf', 'Curling', 'Hockey', 'Dog Sledding', 'Baseball', 'Rugby'];
  vm.business = ['Accounting', 'Investing', 'Sales', 'Entrepreneurship', 'Smooth Talking'];
});
