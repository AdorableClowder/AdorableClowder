// using angular-ui router
// setting up karmaApp angular
var karmaApp = angular.module('karmaApp', ['ui.router', 'loginCtrl', 'signupCtrl', 'exploreCtrl', 'profileCtrl', 'karmaFactories' ]);

karmaApp.config(function($stateProvider, $urlRouterProvider) {

  // if file path other than listed below, redirect to root page
  // authentication based rerouting later
  $urlRouterProvider.otherwise('/');

  $stateProvider

  // rendering the view based on the template specified in views folder
  .state('/', {
    url: '/',
    templateUrl: 'app/views/view-home.html',
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'app/views/view-signup.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'app/views/view-login.html'
  })

  .state('explore', {
    url: '/explore',
    templateUrl: 'app/views/view-explore.html'
  })
  .state('profile', {
    url: '/profile',
    templateUrl: 'app/views/view-profile.html'
  })
  .state('logout', {
    url:'/logout',
    controller: function($window, $location){
      $window.localStorage.removeItem('karmakonnect');
      $location.path('/login');
    }
  });
});

karmaApp.run(function($rootScope, $window){
  $rootScope.shouldShow = false;
  $rootScope.$on('$stateChangeStart', function(){
    if($window.localStorage.getItem('karmakonnect')){
      $rootScope.shouldShow = true;
    } else {
      $rootScope.shouldShow = false;      
    }
  });
});