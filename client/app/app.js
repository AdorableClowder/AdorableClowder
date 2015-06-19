// using angular-ui router
// setting up karmaApp angular
console.log('app.js');
var karmaApp = angular.module('karmaApp', ['ui.router']);

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
    templateUrl: 'views/view-signup.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'views/view-login.html'
  })

  .state('explore', {
    url: '/explore',
    template: 'views/view-explore.html'
  })
  // user profile page later
})

