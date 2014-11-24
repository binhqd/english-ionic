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
.controller('WordDetailCtrl', function($scope, $stateParams) {
	var wordId = $stateParams.wordId;
	
	$scope.word = $scope.collection.currentCollection.indexedItems[wordId];
})
.controller('CollectionCtrl', function($scope, $ionicPopover, $state, $ionicSideMenuDelegate) {
	$scope.navButtons = {};
	$scope.popover = {};
	$scope.navButtons.showPopoverButton = false;
	
	$scope.collection = {};
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
		$http.get('http://api.english.localhost.com/collections').success(function(data) {
			$ionicLoading.hide();
			if (data.meta.code == 200) {
				$scope.collection.list = data.data.items;
			}
		});
	}
	
})
.controller('CollectionDetailCtrl', function($scope, $stateParams, $state, $ionicPopover) {
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
	
	collectionId = $stateParams.collectionId;
	if (typeof $scope.collection.currentCollection == "undefined") {
		
		$scope.collection.currentCollection = {
			id : 1,
			name : 'Hỏi đường',
			items : [
				
				{
					show : true,
					id : '5226f913f6e4427689601a40c0a801be',
					phonetic : "/'regjuləri/",
					word : "regularly",
					meaning : "at regular times or intervals.",
					vietnamese : "đều đều, đều đặn, thường xuyên",
					example : "Keep watering them regularly if you want to grow them larger."
				},
				
				{
					show : true,
					id : '5226fc55807842f692b81a40c0a801be',
					phonetic : "/θru:'aut/",
					word : "throughout",
					meaning : "in or to every part of; everywhere in",
					vietnamese : "từ đầu đến cuối, khắp, suốt",
					example : "They searched throughout the house."
				},
				
				{
					show : true,
					id : '5226fd5709504a78b5611a40c0a801be',
					phonetic : "/ʌn'faundid/",
					word : "unfounded",
					meaning : "without foundation; not based on fact, realistic considerations",
					vietnamese : "không căn cứ, không có sơ sở",
					example : "the prophet of a religion as yet unfounded."
				},
				
				{
					show : true,
					id : '5226fde2d59c43fda4671a40c0a801be',
					phonetic : "/in'fɔ:mətiv/",
					word : "informative",
					meaning : "giving information; instructive",
					vietnamese : "cung cấp nhiều tin tức, có nhiều tài liệu",
					example : "Thanks so much for an informative  and educational article."
				},
				{
					show : true,
					id : '5226fe456a0441f4a1991a40c0a801be',
					phonetic : "/in'sentiv/",
					word : "incentive ",
					meaning : "something that incites or tends to incite to action or greater effort, as a reward offered for increased productivity.",
					vietnamese : "khuyến khích, khích lệ; thúc đẩy",
					example : "an additional payment made to employees as a means of increasing production"
				},
				{
					show : true,
					id : '5226fe8560e8418eaca81a40c0a801be',
					phonetic : "/,remi'nisnt/",
					word : "reminiscent",
					meaning : "awakening memories of something similar",
					vietnamese : "nhớ lại; làm nhớ lại, gợi lại",
					example : "His style of writing is reminiscent of Melville's."
				},
				
				{
					show : true,
					id : '52780304bb2c493bb7e41a40c0a801be',
					phonetic : "/ri'gɑ:dlis/",
					word : "regardless",
					meaning : "without concern as to advice, warning, hardship",
					vietnamese : "không kể, không đếm xỉa tới, không chú ý tới; bất chấp",
					example : "They'll do it regardless of the cost."
				}
			]
		}
	}
	
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
	
	$scope.showWordDetail = function(item) {
		$state.go('collection.word-detail', {wordId : item.id});
	}
})