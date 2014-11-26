function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

angular.module('starter.controllers', [])
.directive("test", function() {
    return {
        restrict: 'E',
        templateUrl: '/yourpage/templates/test-word.html',
        scope: {
            words: "="
        },
        controller: function ($scope, $timeout, $state) {
			$scope.wrongAnswer = false;
			
			var selectedIndex = 0;
			$scope.word = $scope.words[selectedIndex];
			
			var characterPerLine = 8;
			
			$scope.nextTest = function() {
				selectedIndex++;
				
				// if user reach to end of test
				if (selectedIndex == $scope.words.length) {
					$state.go('collection.test-finish');
				} else {
					$scope.word = $scope.words[selectedIndex];
				}
				// Clear all answer state
				$scope.answerState = -1;
					
			}
			$scope.$watch('word', function() {
				$scope.lines = [];
				$scope.characterClass = [];
				$scope.chars = [];
				
				var cnt = 0;
				for (var i = 0; i < $scope.word.word.length; i++) {
					var line = Math.floor(i / characterPerLine);
					if (typeof $scope.lines[line] == "undefined") $scope.lines[line] = [];
					
					// If new line then reset cnt
					if (i % characterPerLine == 0) {
						cnt = 0;
					}
					
					$scope.lines[line][cnt] = i;
					$scope.characterClass[i] = false;
					$scope.chars[i] = ' ';
					
					cnt++;
				}
				
				$timeout(function() {
					document.getElementById('input-0').focus();
				}, 100);
			});
		   
			$scope.keydown = function($event, $index) {
				var code = $event.keyCode;
				if (code == 17) return;
				
				if (code == 8) {
					$scope.chars[$index] = '';
					
					var prevIndex = parseInt($index) - 1;
					var elem = document.getElementById('input-' + prevIndex);
					if (typeof elem != "undefined" && elem != null) elem.focus();
					
				} else if (code == 37){
					var prevIndex = parseInt($index) - 1;
					var elem = document.getElementById('input-' + prevIndex);
					if (typeof elem != "undefined" && elem != null) elem.focus();
				} else if (code == 13) {
					$scope.answer();
					
				} else {
					$scope.chars[$index] = '';
				}
			}
			
			$scope.answer = function() {
				// if question already answer as true, do nothing until user click next
				if ($scope.answerState == 1) return;
				
				var text = '';
				for (var i = 0; i < $scope.chars.length; i++) {
					text += $scope.chars[i];
				}

				text = text.trim();
				// Nếu trả lời đúng
				if (text.toLowerCase() == $scope.word.word.toLowerCase()) {
					// Tra loi dung
					$scope.answerState = 1;
					
				} else {
					//console.log('wrong');
					$scope.answerState = 2;
				}
			}
			
			$scope.keypress = function($event, index) {
				var code = $event.keyCode;

				var keynum;

				if(window.event){ // IE					
					keynum = $event.keyCode;
				}else
				if(e.which){ // Netscape/Firefox/Opera					
					keynum = $event.which;
				}
					
				var _char = String.fromCharCode(keynum);
					
				if (code == 17) return;
				
				if (code != 32 && code != 13 && code != 37 && code != 8) {
					$scope.chars[index] = _char;
					
					var nextIndex = parseInt(index) + 1;
					elem = document.getElementById('input-' + nextIndex);
					
					if (typeof elem != "undefined" && elem != null) elem.focus();
					return true;
				}
			}
			
			$scope.selectCharacter = function($event, $index) {
				$scope.characterClass[$index] = true;
				document.getElementById('input-'+ $index).setSelectionRange(0, 1);
			}
			
			$scope.blur = function(index) {
				$scope.characterClass[index] = false;
			}
        }
    };
})
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
	
})
.controller('YourPageCtrl', function($scope, $ionicSideMenuDelegate) {
	
})
.controller('GuessingCtrl', function($scope, $ionicPopover) {
	$ionicPopover.fromTemplateUrl('/yourpage/templates/popover/test.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover.context = popover;
  	});
	$scope.$on('$destroy', function() {
    	//$scope.popover.context.remove();
		$scope.popover.context = null;
  	});
	
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
	
})
.controller('WordDetailCtrl', function($scope, $stateParams, $state) {
	var wordId = $stateParams.wordId;
	
	if (typeof $scope.collection.currentCollection == "undefined") {
		$state.go('collection.list');
	} else {
		$scope.word = $scope.collection.currentCollection.indexedItems[wordId];
	}
})
.controller('CollectionCtrl', function($scope, $ionicPopover, $state, $ionicSideMenuDelegate) {
	$scope.navButtons = {};
	$scope.popover = {};
	$scope.collections = {};
	
	$scope.navButtons.showPopoverButton = false;
	
	$scope.collection = {};
	$scope.collection.empty = {
		id : null,
		title : null,
		items : []
	};
	$scope.collection.refreshCollections = true;
	
	$scope.sidemenu = {};
	$scope.sidemenu.toggleLeft = function() {
	    $ionicSideMenuDelegate.toggleLeft();
	};
	
	$scope.popover.hasContext = function() {
		if (typeof $scope.popover.context != "undefined" && $scope.popover.context != null) {
			return true;
		} else {
			return false;
		}
	}
  	$scope.popover.open = function($event) {
		if (typeof $scope.popover.context != "undefined") {
			$scope.popover.context.show($event);
		}
  	};
  	$scope.popover.close = function() {
    	$scope.popover.context.hide();
  	};
  	//Cleanup the popover when we're done with it!
  	$scope.$on('$destroy', function() {
    	//$scope.popover.context.remove();
		$scope.popover.context = null;
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
	
    $scope.yourCollections = function() {
    	$state.go('collection.list');
    	$scope.sidemenu.toggleLeft();
    	
    }
    
    $scope.showCollectionDetail = function(id) {
    	$state.go('collection.detail', {collectionId : id});
    }
    $scope.doTest = function(collection) {
		$state.go('collection.test');
		
		$scope.popover.close();
	}
	
	$scope.guess = function() {
    	$state.go('collection.guessing');
    	$scope.popover.close();
    }
	
})
.controller('TestCollectionCtrl', function($scope, $stateParams, $state) {
	
	/*
	$ionicPopover.fromTemplateUrl('/yourpage/templates/popover/collection-detail.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover.context = popover;
		$scope.popover.showContext = false;
  	});
	
	$scope.$on('$destroy', function() {
    	//$scope.popover.context.remove();
  	});
	
	*/
	if (typeof $scope.collection.currentCollection == "undefined") {
		$state.go('collection.list');
	} else {
		$scope.word = $scope.collection.currentCollection.indexedItems[wordId];
	}
	
	var wordId = $stateParams.wordId;
	
	$scope.testIndex = 0;
	var cnt = 0;
	/*angular.forEach($rootScope.collection.items, function(word, key) {
		$scope.words[$scope.words.length] = word;
	});*/
	
	// Perform actions on document ready
	
})
.controller('CollectionListCtrl', function($scope, $http, $ionicLoading) {
	$scope.navButtons.showPopoverButton = false;
	$scope.collection.refreshCollections = true;
	
	if (typeof $scope.collection.list == "undefined") {
		var _this = this
		$ionicLoading.show({
			template: 'loading...'
		});
		$http.get(APIUrl + '/collections').success(function(data) {
			$ionicLoading.hide();
			if (data.meta.code == 200) {
				$scope.collection.list = data.data.items;
			}
		});
	}
	
})
.controller('CollectionDetailCtrl', function($scope, $stateParams, $state, $ionicPopover, $ionicLoading, $http) {
	$scope.navButtons.showPopoverButton = true;
	
	$ionicPopover.fromTemplateUrl('/yourpage/templates/popover/collection-detail.html', {
    	scope: $scope,
  	}).then(function(popover) {
    	$scope.popover.context = popover;
  	});
	$scope.$on('$destroy', function() {
    	//$scope.popover.context.remove();
		$scope.popover.context = null;
  	});
	
	$scope.shuffleArray = function() {
		if ($scope.collection.refreshCollections) {
			$scope.collection.currentCollection.items = shuffle($scope.collection.currentCollection.items);
			$scope.collection.refreshCollections = false;
		}
		
		// set each item with a key, create indexes
		var length = $scope.collection.currentCollection.items.length;
		$scope.collection.currentCollection.indexedItems = {};
		
		for (var i = 0; i < length; i++) {
			var item = $scope.collection.currentCollection.items[i];
			$scope.collection.currentCollection.indexedItems[item.id] = item;
		}
	}
	
	var collectionId = $stateParams.collectionId;
	if (typeof $scope.collections[collectionId] == "undefined") {
		// set empty data
		$scope.collection.currentCollection = $scope.collection.empty;
		$ionicLoading.show({
			template: 'loading...'
		});
		$http.get(APIUrl + '/collections/'+collectionId+'?parts={words:{limit:10}}').success(function(data) {
			$ionicLoading.hide();
			if (data.meta.code == 200) {
				// clean up complex structure in data
				data.data.collections.items = data.data.collections.parts.words.items;
				//delete data.data.collections.parts.words.items;
				
				$scope.collections[collectionId] = data.data.collections;
				$scope.collection.currentCollection = data.data.collections;
				
				$scope.shuffleArray();
			} else {
				// TODO: do something if data is not retrieve or internet error
			}
		});
	} else {
		$scope.collection.currentCollection = $scope.collections[collectionId];
		$scope.shuffleArray();
	}
	
	
	
	$scope.showWordDetail = function(item) {
		$state.go('collection.word-detail', {wordId : item.id});
	}
})