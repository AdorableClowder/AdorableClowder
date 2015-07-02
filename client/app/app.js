// using angular-ui router
// setting up skillitApp angular
var skillitApp = angular.module('skillitApp', ['ui.router', 'loginCtrl', 'signupCtrl', 'exploreCtrl', 'profileCtrl', 'chartCtrl', 'skillitFactories', 'skillitDirectives']);

skillitApp.config(function ($stateProvider, $urlRouterProvider) {

  // if file path other than listed below, redirect to root page
  // authentication based rerouting later
  $urlRouterProvider.otherwise('/');

  $stateProvider

  // rendering the view based on the template specified in views folder
  .state('/', {
    url: '/',
    templateUrl: 'app/views/view-home.html',
    data: {
      requirelogin: false
    }
  })
    .state('signup', {
      url: '/signup',
      templateUrl: 'app/views/view-signup.html',
      data: {
        requirelogin: false
      }
    })
    .state('choose', {
      url: '/choosesubjects',
      templateUrl: 'app/views/view-choosecategories.html',
      data: {
        requirelogin: true
      }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'app/views/view-login.html',
      data: {
        requirelogin: false
      }
    })
    .state('linkedin', {
      url: '/linkedinsuccess',
      templateUrl: 'app/views/view-linkedinsuccess.html',
      data: {
        requirelogin: false
      }
    })
    .state('explore', {
      url: '/explore',
      templateUrl: 'app/views/view-explore.html',
      data: {
        requirelogin: true
      }
    })
    .state('explore.chart', {
      url: '/chart',
      templateUrl : 'app/views/view-chart.html'
      // ,
      // controller: 'chartController'
    })
    .state('profile', {
      url: '/profile',
      templateUrl: 'app/views/view-profile.html',
      data: {
        requirelogin: true
      }
    })
    .state('logout', {
      url: '/logout',
      controller: function ($window, $location) {
        // removes token on logout
        $window.localStorage.removeItem('skillitToken');
        $location.path('/#/login');
      },
      data: {
        requirelogin: true
      }
    });
});

skillitApp.run(function ($rootScope, $window, $location, $state) {
  //$rootScope give access to angular 'global' scope
  //shouldShow is in index.html referring to ng-show and ng-hide in nav bar
  $rootScope.shouldShow = false;
  $rootScope.$on('$stateChangeStart', function (event, toState) {
    // if there is token, show profile/logout in nav bar
    var token = $window.localStorage.getItem('skillitToken');
    var requirelogin = toState.data.requirelogin;
    if (token) {
      $rootScope.shouldShow = true;
    } else {
      // no token shows login/signup
      $rootScope.shouldShow = false;
    }
    if(!token && requirelogin){
      event.preventDefault();
      console.log('User Must be logged in to see this page');
      $state.go('login');
    }
  });
});
