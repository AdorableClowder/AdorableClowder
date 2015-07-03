angular.module('subjectCtrl', [])

.controller("subjectsController", function (Users, $location, $window) {
    var vm = this;
    vm.user = {};
    vm.wants = [];
    vm.offers = [];
    vm.wantsSkills = [];
    vm.offersSkills = [];
    vm.wantsObj = {};
    vm.offersObj = {};

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
    	console.log("want", want);
    	console.log("category", category);
      var index = vm.wants.indexOf(want);
      var idx = vm.wantsObj.category.indexOf(want);
      if (index > -1 || idx > -1) {
        vm.wants.splice(index, 1);
        vm.wantsObj.category.splice(idx, 1);
      } else {
        vm.wants.push({skill: want, category: category});
        vm.WantsObj.category.push({skill: want, category: category});
      }
    };

    vm.toggleOffer = function(offer, category) {
      var index = vm.offers.indexOf(offer);
      var idx = vm.offersObj.category.indexOf(offer);
      if (index > -1 || idx > -1) {
        vm.offers.splice(index, 1);
        vm.offersObj.category.splice(idx, 1);
      } else {
        vm.offers.push({skill: offer, category: category});
        vm.offersObj.category.push({skill: offer, category: category});
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

    // Add categories as keys to the wants and offers objects
    for(var i = 0; i < vm.categories.length; i++){
    	vm.wantsObj[vm.categories[i]] = [];
    	vm.offersObj[vm.categories[j]] = [];
    }
});