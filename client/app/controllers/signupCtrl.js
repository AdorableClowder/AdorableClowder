angular.module('signupCtrl', [])

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
          console.log(vm.user);
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

    vm.chooseOffers = false;


    vm.toggleWant = function(want, category) {
      var index = vm.wantsSkills.indexOf(want);
      if (index > -1) {
        console.log('turning off');
        vm.wants.splice(index, 1);
        vm.wantsSkills.splice(index, 1);
      } else {
        vm.wants.push({skill: want, category: category});
        vm.wantsSkills.push(want);
      }
    };

    vm.toggleOffer = function(offer, category) {
      var index = vm.offersSkills.indexOf(offer);
      if (index > -1) {
        vm.offers.splice(index, 1);
        vm.offersSkills.splice(index, 1);
      } else {
        vm.offers.push({skill: offer, category: category});
        vm.offersSkills.push(offer);
      }
    };

    vm.changePreferences = function() {
      Users.saveChanges(vm.user)
        .then(function(responseToken) {
          console.log(responseToken);
          $location.path('/explore');
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/login');
        });
    };

  });
