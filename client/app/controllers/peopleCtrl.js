angular.module('peopleCtrl', [])

.controller("peopleController", function (Users, $location){
  var vm = this;

  vm.showOffers = false;
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

        //set initial values
        vm.currentWant = vm.wants[0];
        vm.currentOffer = vm.offers[0];


        //make initial selection
        vm.selectWant(vm.currentWant);
        vm.selectOffer(vm.currentOffer);
      })
      .catch(function (err) {
        console.log(err);
        //if can't get user, redirect to login
        $location.path('/login');
      });
  };

  vm.getUser();

  vm.selectWant = function(want) {
    vm.currentWant = want;
    Users.getUsersBySkill(want, 'offer')
      .then(function(users) {
        vm.matchedOffers = users;
      })
      .catch(function (err) {
        console.log(err);
        //if can't get user, redirect to login
        $location.path('/login');
      });
  };

  vm.selectOffer = function(offer) {
    vm.currentOffer = offer;
    Users.getUsersBySkill(offer, 'want')
        .then(function(users) {
          vm.matchedWants = users;
        })
        .catch(function (err) {
          console.log(err);
          //if can't get user, redirect to login
          $location.path('/login');
        });
  };


  //TODO: trash this jquery crap


  //turn on bootstrap switch
  $("[name='switch-checkbox']").bootstrapSwitch();


  //pass recipient name and email to modal
  $('#message-modal').on('show.bs.modal', function (event) {
    var button = $(event.relatedTarget); // Button that triggered the modal
    var recipient = button.data('username'); // Extract info from data-* attributes

    var modal = $(this);
      modal.find('.modal-title').text('Send a message to ' + recipient);
      modal.find('.modal-body input').val(recipient);
    });



});
