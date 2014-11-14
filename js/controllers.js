angular.module('starter.controllers', [])
.controller('LoginCtrl', function($scope, $state) {
	$scope.facebookLogin = function() {
		$state.go('collection.list', {}, {location:'replace'});
	}
})
.controller('DashCtrl', function($scope, $http) {
	$scope.data = {};
	$scope.inputs = {
		'username'	: 'danang',
		'password'	: 'danangwifi'
	};
	$scope.doLogin = function() {
		var request = $http({
			method: 'post',
			url: "http://10.79.0.87:3992/login?alt=json",
			data : "username=" + encodeURIComponent($scope.inputs.username) + '&password=' + encodeURIComponent($scope.inputs.password)+'&alt=json',
			headers : {
				'Content-type' : 'application/x-www-form-urlencoded; charset=utf-8'
			}
		});
		
		request.success(function(data, status, headers, config) {
			if (data.code == 200) {
				alert("You are now connected");
				
			} else {
				alert("Login failed");
				
			}
		  }).
		  error(function(data, status, headers, config) {
		    // called asynchronously if an error occurs
		    // or server returns response with an error status.
		  });
	};
})
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	
})
.controller('CollectionCtrl', function($scope, $ionicPopover, $state, $ionicSideMenuDelegate, $rootScope) {
	$rootScope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
	
	$rootScope.showContext = false;
	$scope.collections = [
		{
			id : 1,
			name : 'Siêu Thị',
			words : 45
		},
		{
			id : 2,
			name : 'Khu vui chơi',
			words : 32
		},
		{
			id : 3,
			name : 'Công viên',
			words : 18
		},
		{
			id : 4,
			name : 'Hỏi đường',
			words : 32
		}
	];
	
	$ionicPopover.fromTemplateUrl('popover.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover = popover;
  	});
  
  	$scope.openPopover = function($event) {
    	$scope.popover.show($event);
  	};
  	$scope.closePopover = function() {
    	$scope.popover.hide();
  	};
  	//Cleanup the popover when we're done with it!
  	$scope.$on('$destroy', function() {
    	$scope.popover.remove();
  	});
  	// Execute action on hide popover
  	$scope.$on('popover.hidden', function() {
    	// Execute action
  	});
  	// Execute action on remove popover
  	$scope.$on('popover.removed', function() {
    	// Execute action
  	});
  
	$scope.test = function() {
		$state.go("/yourpage/test"); 
	}
	
	/*$scope.optionButtons1 = [
          {
            text: 'Edit',
            onTap: function(item, button) { alert(button.text + ' Button: ' + item.text) }
          },
          {
            text: 'Share',
            type: 'button-balanced',
            onTap: function(item, button) { alert(button.text + ' Button: ' + item.text) }
          }
        ];

        $scope.optionButtons2 = [
          {
            text: 'Cancel',
            onTap: function() { alert('CANCEL!') }
          },
          {
            text: 'Submit',
            onTap: function() { alert('SUBMIT!') }
          }
        ];
    */
    
    $scope.yourCollections = function() {
    	$state.go('collection.list');
    	$ionicSideMenuDelegate.toggleLeft();
    	
    }
    
    $scope.showCollectionDetail = function(id) {
    	$state.go('collection.detail', {collectionId : id});
    }
    $scope.doTest = function(collection) {
		$state.go('collection.test');
		
		$scope.closePopover();
	}
})
.controller('CollectionDetailCtrl', function($scope, $stateParams, $rootScope) {
	$rootScope.showContext = true
	
	$scope.collection = {
		id : 1,
		name : 'Hỏi đường',
		items : [
			{
				show: true,
				word: 'substantially',
				phonetic: "səb'stænʃəli",
				translate : "về căn bản"
			},
			{
				show: true,
				word: 'mundane',
				phonetic: "mʌndein",
				translate : "(thuộc) cõi trần, thế tục, trần tục"
			},
			{
				show: true,
				word: 'gossip',
				phonetic: "'gɔsip",
				translate : "chuyện ngồi lê đôi mách, chuyện tầm phào, tin đồn nhảm"
			}
		]
	}
	
	//$rootScope.collection = $scope.collection;
	
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
})