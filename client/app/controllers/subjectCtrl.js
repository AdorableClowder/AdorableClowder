angular.module('subjectCtrl', [])

.controller("subjectsController", function (Users, $location, $window) {
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

    
    // Selects category from dropdown menu and displays the category to submit
    vm.selectedWantCategory = "category";
    vm.selectWantCategory = function(category){
      vm.selectedWantCategory = category;
    };

    vm.selectedOfferCategory = "category";
    vm.selectOfferCategory = function(category){
    	vm.selectedOfferCategory = category;
    };

    vm.chooseOffers = false;

    vm.toggleWant = function(want, category) {
      var index = vm.wants.indexOf(want);
      if (index > -1) {
        vm.wants.splice(index, 1);
      } else {
        vm.wants.push({skill: want, category: category});
      }
    };

    vm.toggleOffer = function(offer, category) {
      var index = vm.offers.indexOf(offer);
      if (index > -1) {
        vm.offers.splice(index, 1);
      } else {
        vm.offers.push({skill: offer, category: category});
      }
    };

    vm.changesSaved = true;
    vm.changePreferences = function() {
      vm.changesSaved = false;
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