// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

    // setup an abstract state for the tabs directive
    .state('yourpage', {
      url: "/yourpage",
      abstract: true,
      templateUrl: "templates/yourpage.html"
    })

    // Each tab has its own nav history stack:

    .state('yourpage.dashboard', {
      url: '/dashboard',
      views: {
        'appContent': {
          templateUrl: 'templates/dashboard.html',
          controller: 'YourPageCtrl'
        }
      }
    })
    .state('yourpage.test', {
      url: '/test',
      views: {
        'appContent': {
          templateUrl: 'templates/test.html',
          controller: 'CollectionCtrl'
        }
      }
    })
	.state('yourpage.test-sound', {
      url: '/testsound',
      views: {
        'appContent': {
          templateUrl: 'templates/testsound.html',
          controller: 'CollectionCtrl'
        }
      }
    })
   	.state('yourpage.result', {
      url: '/result',
      views: {
        'appContent': {
          templateUrl: 'templates/result.html',
          controller: 'CollectionCtrl'
        }
      }
    })
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.
  otherwise('/yourpage/dashboard');

});

