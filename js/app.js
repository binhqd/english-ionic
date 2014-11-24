// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

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
    .state('login', {
      url: "/login",
      //abstract: true,
      
      templateUrl: "templates/login.html"
    })
    // setup an abstract state for the tabs directive
    .state('yourpage', {
      url: "/yourpage",
      abstract: true,
      templateUrl: "yourpage/templates/yourpage.html"
    })
	
    // Each tab has its own nav history stack:

    .state('yourpage.dashboard', {
      url: '/dashboard',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/dashboard.html',
          controller: 'YourPageCtrl'
        }
      }
    })
    	
    // Collection
    .state('collection', {
      url: "/collection",
      abstract: true,
      templateUrl: 'yourpage/templates/collection.html'
    })
   	.state('collection.list', {
      url: '/list',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/collections.html',
          controller: 'CollectionListCtrl'
        }
      }
    })
    .state('collection.detail', {
      url: '/detail/:collectionId',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/collection-detail.html',
          controller: 'CollectionDetailCtrl'
        }
      }
    })
    .state('collection.word-detail', {
      url: '/word-detail/:wordId',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/word-detail.html',
          controller: 'WordDetailCtrl'
        }
      }
    })
    .state('collection.guessing', {
      url: '/guessing',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/guessing.html',
          controller: 'GuessingCtrl'
        }
      }
    })
    .state('collection.test', {
      url: '/test',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/test.html',
          controller: 'TestCollectionCtrl'
        }
      }
    })
	.state('collection.test-finish', {
      url: '/test/finish',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/test-finish.html',
          //controller: 'TestFinishCtrl'
        }
      }
    })
	.state('collection.test-sound', {
      url: '/testsound',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/testsound.html',
          controller: 'CollectionCtrl'
        }
      }
    })
   	.state('collection.result', {
      url: '/result',
      views: {
        'collectionContent': {
          templateUrl: 'yourpage/templates/result.html',
          controller: 'CollectionCtrl'
        }
      }
    })
  
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

});

