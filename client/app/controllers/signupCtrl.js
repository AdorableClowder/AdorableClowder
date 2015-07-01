angular.module('signupCtrl', [])

.controller('signupController', function (Auth, $location, $window) {
  //vm stands for view model, will be signup in html
  var vm = this;

  vm.user = {};

  vm.initialWants = [];
  vm.initialOffers = [];

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
    var index = vm.initialWants.indexOf(want);
    if (index > -1) {
      vm.initialWants.splice(index, 1);
    } else {
      vm.initialWants.push(want);
    }
  };

  vm.toggleOffer = function(offer) {
    var index = vm.initialOffers.indexOf(offer);
    if (index > -1) {
      vm.initialOffers.splice(index, 1);
    } else {
      vm.initialOffers.push(offer);
    }
  };


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

});
