angular.module('starter.controllers', [])
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	$scope.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
})
.controller('CollectionCtrl', function($scope, $ionicPopover, $state) {
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
	
	$ionicPopover.fromTemplateUrl('popover.html', function(popover) {
	    $scope.popover = popover;
	  });
	  
	
	
	$scope.detail = function(id) {
		$state.go("collection.detail"); 
	}
	
	$scope.test = function() {
		$state.go("/yourpage/test"); 
	}
	
	$scope.optionButtons1 = [
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
})
.controller('CollectionDetailCtrl', function($scope, $stateParams) {
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
	
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
})
.controller('DashCtrl', function($scope) {
	$scope.data = {};
	
});