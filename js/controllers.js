angular.module('starter.controllers', [])
.controller('YourPageCtrl', function($scope, $http) {
	
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

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

.controller('AccountCtrl', function($scope) {
});
