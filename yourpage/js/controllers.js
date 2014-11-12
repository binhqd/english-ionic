angular.module('starter.controllers', [])
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
})
.controller('CollectionCtrl', function($scope, $ionicPopover, $state) {
	$scope.items = [
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
	];
	
	$scope.currentTestItem = $scope.items[0];
	
	$ionicPopover.fromTemplateUrl('popover.html', function(popover) {
	    $scope.popover = popover;
	  });
	  
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
	
	$scope.test = function() {
		$state.go("/yourpage/test"); 
	}
})
.controller('DashCtrl', function($scope) {
	$scope.data = {};
	
});