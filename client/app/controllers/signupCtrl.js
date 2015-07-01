angular.module('signupCtrl', [])

.controller('signupController', function (Auth, $location, $window) {
  //vm stands for view model, will be signup in html
  var vm = this;

  vm.user = {};

  vm.initialWants = ["hi"];
  vm.initialOffers = ["test"];

  vm.doSignup = function () {
    // storing offers and wants in an array form before sending POST
    //filters out form fields that are empty from wants/offers
    vm.user.offer = vm.initialOffers;
    vm.user.want = vm.initialWants;
    //throw error if fields are empty
    if (vm.user.offer.length === 0 || vm.user.want.length === 0 ||
      vm.user.username === undefined || vm.user.password === undefined || vm.user.email === undefined) {
      vm.err = 'Please fill out required fields';
    } else {
      // using Auth factory from factories.js to do POST
      Auth.signup(vm.user)
        .then(function (token) {
          console.log('signup success');
          $window.localStorage.setItem('skillitToken', token);
          // redirect if succesful
          $location.path('/explore');
        })
        .catch(function (err) {
          console.log(err);
          //gets the error without the whole callstack (pretty hacky)
          vm.err = err.data.split('<br>')[0];
        });
    }
  };

})
  .controller("subjectsController", function(Users, $location, $window) {
    var vm = this;
    vm.user = {};
    vm.wants = [];
    vm.offers = [];

    vm.getUser = function () {
      //using Users factory from factories.js to do GET
      Users.getUser()
        .then(function (user) {
          vm.user = user;
          vm.wants = vm.user.want;
          vm.offers = vm.user.offer;
          console.log(vm.user);
        })
        .catch(function (err) {
          console.log(err);
          //if can't get user, redirect to login
          $location.path('/login');
        });
    };
    vm.getUser();


    vm.sampleCategories = {
      language: ['Spanish', 'Chinese', 'Esperanto'],
      technology: ['IoT', 'Hacking Facebook', 'Bitcoin'],
      sports: ["Baseball", "Curling", "Cow-tipping"],
      knowledge: ["Art History", "Art Garfunkel History", "History"],
      wild: ["Juggling", "Busking", "Moping"],
      business: ["Money Laundering", "Accounting", "Financial Advice"],
      craftAndDesign: ["Woodworking", "Clay Pottery", "Graphic Design"]
    };

    vm.chooseOffers = false;

    vm.toggleWant = function(want) {
      var index = vm.wants.indexOf(want);
      if (index > -1) {
        vm.wants.splice(index, 1);
      } else {
        vm.wants.push(want);
      }
    };

    vm.toggleOffer = function(offer) {
      var index = vm.offers.indexOf(offer);
      if (index > -1) {
        vm.offers.splice(index, 1);
      } else {
        vm.offers.push(offer);
      }
    };

    vm.changePreferences = function() {
      Users.saveChanges(vm.user)
        .then(function(responseToken) {
          console.log(responseToken);
        })
        .catch(function(err) {
          console.log(err);
          $location.path('/login');
        });
    };

  });
