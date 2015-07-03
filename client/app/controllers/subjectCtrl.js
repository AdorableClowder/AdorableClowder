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
           vm.wants.forEach(function(item){
          	if(vm.wantsObj[item.category]){
          		vm.wantsObj[item.category].push(item);
          	} else {
          		vm.wantsObj[item.category] = [];
          		vm.wantsObj[item.category].push(item);
          	}
          });
          vm.offers = vm.user.offer;
          vm.offersSkills = vm.offers.map(function(item) {
            return item.skill;
          });
          vm.offers.forEach(function(item){
          	if(vm.offersObj[item.category]){
          		vm.offersObj[item.category].push(item);
          	} else {
          		vm.offersObj[item.category] = [];
          		vm.offersObj[item.category].push(item);
          	}
          });
        })
        .catch(function (err) {
          console.log(err);
          //if can't get user, redirect to login
          $location.path('/login');
        });
    };

    vm.getUser();

    vm.categories = ['Language Learning', 'Technology', 'Sports', 'Knowledge', 'Wild n Wacky', 'Business', 'Craft and Design', 'LinkedIn'];

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
	   var index = vm.wantsSkills.indexOf(want);
	   var idx = vm.wantsObj[category].indexOf(want);
	   if (index > -1 || idx > -1) {
	     vm.wants.splice(index, 1);
	     vm.wantsSkills.splice(index, 1);
	     vm.wantsObj[category].splice(idx, 1);
	   } else {
	     vm.wants.push({skill: want, category: category});
	     vm.wantsSkills.push(want);
	     vm.wantsObj[category].push({skill: want, category: category});
	   }
	 };

	 vm.toggleOffer = function(offer, category) {
	   var index = vm.offersSkills.indexOf(offer);
	   var idx = vm.offersObj[category].indexOf(offer);
	   if (index > -1 || idx > -1) {
	     vm.offers.splice(index, 1);
	     vm.offersSkills.splice(index, 1);
	     vm.offersObj[category].splice(idx, 1);
	   } else {
	     vm.offers.push({skill: offer, category: category});
	     vm.offersSkills.push(offer);
	     vm.offersObj[category].push({skill: offer, category: category});
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
          $location.path('/subjects');
        });
    };

    // Add categories as keys to the wants and offers objects
    for(var i = 0; i < vm.categories.length; i++){
    	vm.wantsObj[vm.categories[i]] = [];
    	vm.offersObj[vm.categories[i]] = [];
    }
});