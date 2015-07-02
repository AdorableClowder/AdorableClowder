// using angular-ui router
// setting up skillitApp angular
var skillitApp = angular.module('skillitApp', ['ui.router', 'loginCtrl', 'signupCtrl', 'exploreCtrl', 'profileCtrl', 'skillitFactories', 'skillitDirectives']);

skillitApp.config(function ($stateProvider, $urlRouterProvider) {

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
    .state('choose', {
      url: '/choosesubjects',
      templateUrl: 'app/views/view-choosecategories.html'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/view-login.html'
    })
    .state('linkedin', {
      url: '/linkedinsuccess',
      templateUrl: 'app/views/view-linkedinsuccess.html'
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
      url: '/logout',
      controller: function ($window, $location) {
        // removes token on logout
        $window.localStorage.removeItem('skillitToken');
        $location.path('/login');
      }
    });
});

skillitApp.run(function ($rootScope, $window, $location) {
  //$rootScope give access to angular 'global' scope
  //shouldShow is in index.html referring to ng-show and ng-hide in nav bar
  $rootScope.shouldShow = false;
  $rootScope.$on('$stateChangeStart', function () {
    // if there is token, show profile/logout in nav bar
    if ($window.localStorage.getItem('skillitToken')) {
      $rootScope.shouldShow = true;
    } else {
      // no token shows login/signup
      $rootScope.shouldShow = false;
    }
  });
});
