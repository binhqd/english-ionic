angular.module('starter.controllers', [])
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
})
.controller('CollectionCtrl', function($scope) {
	$scope.item = [
		{show: true},
		{show: true}
	];
	
	$scope.toggleAnswer = function(index) {
		$scope.item[index].show = !$scope.item[index].show;
	}
})
.controller('DashCtrl', function($scope) {
	$scope.data = {};
	
});