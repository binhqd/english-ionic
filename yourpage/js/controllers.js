angular.module('starter.controllers', [])
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
})
.controller('CollectionCtrl', function($scope, $ionicPopover) {
	$scope.item = [
		{show: true},
		{show: true}
	];
	
	$ionicPopover.fromTemplateUrl('popover.html', function(popover) {
	    $scope.popover = popover;
	  });
	  
	$scope.toggleAnswer = function(index) {
		$scope.item[index].show = !$scope.item[index].show;
	}
})
.controller('DashCtrl', function($scope) {
	$scope.data = {};
	
});