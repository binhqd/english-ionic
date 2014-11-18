angular.module('starter.controllers', [])
.directive("test", function() {
    return {
        restrict: 'E',
        templateUrl: '/yourpage/templates/test-word.html',
        scope: {
            words: "="
        },
        controller: function ($scope, $timeout) {
			$scope.wrongAnswer = false;
			
			var selectedIndex = 0;
			$scope.word = $scope.words[selectedIndex];
			
			var characterPerLine = 8;
			
			$scope.$watch('word', function() {
				$scope.lines = [];
				$scope.characterClass = [];
				$scope.chars = [];
				
				for (var i = 0; i < $scope.word.word.length; i++) {
					var line = Math.floor(i / characterPerLine);
					if (typeof $scope.lines[line] == "undefined") $scope.lines[line] = [];
					
					$scope.lines[line][i] = i;
					$scope.characterClass[i] = 'character-inactive';
					
					$scope.chars[i] = ' ';
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
				var text = '';
				for (var i = 0; i < $scope.chars.length; i++) {
					text += $scope.chars[i];
				}

				text = text.trim();
				console.log(text);
				// Nếu trả lời đúng
				if (text.toLowerCase() == $scope.word.word.toLowerCase()) {
					//alert('Chúc mừng, bạn đã trả lời đúng.');
					
					selectedIndex++;
					$scope.word = $scope.words[selectedIndex];
					$scope.answerState = 1;
				} else {
					console.log('wrong');
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
				$scope.characterClass[$index] = 'character-actived';
				document.getElementById('input-'+ $index).setSelectionRange(0, 1);
			}
			
			$scope.blur = function(index) {
				$scope.characterClass[index] = 'character-inactive';
			}
			
            $scope.$on("$destroy", function () {
                console.log("OMG! You are killing me");
            });
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
.controller('GuessingCtrl', function($scope) {
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
})
.controller('WordDetailCtrl', function($scope, $stateParams, $rootScope) {
	var wordId = $stateParams.wordId;
	
	$scope.word = $rootScope.collection.items[wordId];
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
	
	$scope.guess = function() {
    	$state.go('collection.guessing');
    	$scope.closePopover();
    }
})
.controller('TestCollectionCtrl', function($scope, $stateParams, $rootScope, $state) {
	var wordId = $stateParams.wordId;
	//console.log($rootScope.collection);
	$scope.words = [];
	$scope.testIndex = 0;
	var cnt = 0;
	angular.forEach($rootScope.collection.items, function(word, key) {
		$scope.words[$scope.words.length] = word;
	});
	
	// Perform actions on document ready
	
})
.controller('CollectionDetailCtrl', function($scope, $stateParams, $rootScope, $state) {
	$rootScope.showContext = true;
	
	$rootScope.collection = {
		id : 1,
		name : 'Hỏi đường',
		items : {
			'521c552a3b1c41d0ae2613d8c0a801be' : {
				show : true,
				id : '521c552a3b1c41d0ae2613d8c0a801be',
				phonetic : "/pi:k/",
				word : "peak",
				meaning : "Reach a highest point",
				vietnamese : "Đỉnh, chóp",
				example : "The peak of herpolitical career"
			},
			'521c56ea8240433bbd2e13d8c0a801be' : {
				show : true,
				id : '521c56ea8240433bbd2e13d8c0a801be',
				phonetic : "/bump/",
				word : "bump",
				meaning : "to come more or less violently in contact with; collide with; strike",
				vietnamese : "Làm nổi lên, thổi ra",
				example : "His car bumped a truck."
			},
			'521ea79c658c4957ab4415a8c0a801be' : {
				show : true,
				id : '521ea79c658c4957ab4415a8c0a801be',
				phonetic : "/smait/",
				word : "smite",
				meaning : "to strike or hit hard, with or as with the hand, a stick, or other weapon",
				vietnamese : "sự làm thử, sự cố gắng (n), làm thất bại, đánh thắng (v)",
				example : " She smote him on the back with her umbrella."
			},
			'5226f76bd608476f8ab31a40c0a801be' : {
				show : true,
				id : '5226f76bd608476f8ab31a40c0a801be',
				phonetic : "/'iriteit/",
				word : "irritate",
				meaning : "to excite to impatience or anger; annoy.",
				vietnamese : "làm phát cáu, chọc tức",
				example : "Aspirin may irritate  the stomach and alcohol can amplify the toxic effects of  ..."
			},
			'5226f7e8bfc4418fa0621a40c0a801be' : {
				show : true,
				id : '5226f7e8bfc4418fa0621a40c0a801be',
				phonetic : "/sti:m/",
				word : "steam",
				meaning : "water in the form of an invisible gas or vapor.",
				vietnamese : "hơi nước (n), bốc hơi (v)",
				example : ""
			},
			'5226f85e86784809b9b91a40c0a801be' : {
				show : true,
				id : '5226f85e86784809b9b91a40c0a801be',
				phonetic : "/ə'nɔi/",
				word : "annoy",
				meaning : "to disturb or bother (a person) in a way that displeases, troubles, or slightly irritates",
				vietnamese : "làm trái ý, làm khó chịu, làm bực mình; chọc tức, làm cho tức giận quấy rầy, làm phiền",
				example : "Big things, little things, all kinds of things annoy  you."
			},
			'5226f913f6e4427689601a40c0a801be' : {
				show : true,
				id : '5226f913f6e4427689601a40c0a801be',
				phonetic : "/'regjuləri/",
				word : "regularly",
				meaning : "at regular times or intervals.",
				vietnamese : "đều đều, đều đặn, thường xuyên",
				example : "Keep watering them regularly if you want to grow them larger."
			},
			'5226f95e42484c1694ec1a40c0a801be' : {
				show : true,
				id : '5226f95e42484c1694ec1a40c0a801be',
				phonetic : "/'mʌndein/",
				word : "mundane",
				meaning : "common; ordinary; banal; unimaginative.",
				vietnamese : "(thuộc) cõi trần, thế tục, trần tục",
				example : "What I fear is that my conclusions appear trivial and mundane."
			},
			'5226f9b9f61447b895661a40c0a801be' : {
				show : true,
				id : '5226f9b9f61447b895661a40c0a801be',
				phonetic : "/ri'tri:t/",
				word : "retreat",
				meaning : "the act of withdrawing, as into safety or privacy; retirement; seclusion.",
				vietnamese : "(quân sự) sự rút lui, sự rút quân; hiệu lệnh rút quân",
				example : "The dollar staged a broad retreat  in sluggish year-end trading yesterday."
			},
			'5226fac8c52c49a69c301a40c0a801be' : {
				show : true,
				id : '5226fac8c52c49a69c301a40c0a801be',
				phonetic : "/ə'dʤendə/",
				word : "agenda",
				meaning : "something that is to be done.",
				vietnamese : "(số nhiều) những việc phải làm, chương trình nghị sự, nhật ký công tác",
				example : "To win these victories, we must first place them on our diplomatic agenda ."
			},
			'5226fb3401204f78b86a1a40c0a801be' : {
				show : true,
				id : '5226fb3401204f78b86a1a40c0a801be',
				phonetic : "/'ouvə 'tɔ:kətiv/",
				word : "over-talkative",
				meaning : "",
				vietnamese : "nói quá nhiều",
				example : ""
			},
			'5226fb9773dc48ab99b91a40c0a801be' : {
				show : true,
				id : '5226fb9773dc48ab99b91a40c0a801be',
				phonetic : "/spɔt/",
				word : "spot",
				meaning : "a small, circumscribed mark caused by disease, allergic reaction, decay, etc.",
				vietnamese : "dấu, đốm, vết, vết nhơ, vết đen",
				example : "About a month ago, one of the cats developed a small bald spot  on her head."
			},
			'5226fbc7acd04a7fa8311a40c0a801be' : {
				show : true,
				id : '5226fbc7acd04a7fa8311a40c0a801be',
				phonetic : "/kɔ'li:g/",
				word : "colleague",
				meaning : "",
				vietnamese : "bạn đồng nghiệp, bạn đồng sự",
				example : ""
			},
			'5226fc2578b4432b961b1a40c0a801be' : {
				show : true,
				id : '5226fc2578b4432b961b1a40c0a801be',
				phonetic : "/'gɔsip/",
				word : "gossip",
				meaning : "idle talk or rumor, especially about the personal or private affairs of others",
				vietnamese : "chuyện ngồi lê đôi mách, chuyện tầm phào, tin đồn nhảm",
				example : "When stressful times arise, so do rumors and gossip ."
			},
			'5226fc55807842f692b81a40c0a801be' : {
				show : true,
				id : '5226fc55807842f692b81a40c0a801be',
				phonetic : "/θru:'aut/",
				word : "throughout",
				meaning : "in or to every part of; everywhere in",
				vietnamese : "từ đầu đến cuối, khắp, suốt",
				example : "They searched throughout the house."
			},
			'5226fc9c470c459ebbab1a40c0a801be' : {
				show : true,
				id : '5226fc9c470c459ebbab1a40c0a801be',
				phonetic : "/tempt/",
				word : "tempt",
				meaning : "to attract, appeal strongly to, or invite",
				vietnamese : "cám dỗ, quyến rũ, nhử, làm thèm, gợi thèm",
				example : "They tempt  governments to splurge with money that may disappear tomorrow."
			},
			'5226fd0613784a57a0081a40c0a801be' : {
				show : true,
				id : '5226fd0613784a57a0081a40c0a801be',
				phonetic : "/ru:d/",
				word : "rude",
				meaning : "without culture, learning, or refinement",
				vietnamese : "khiếm nhã, bất lịch sự, vô lễ, láo xược; thô lỗ",
				example : "Pointing at or touching something with the feet is also considered rude "
			},
			'5226fd5709504a78b5611a40c0a801be' : {
				show : true,
				id : '5226fd5709504a78b5611a40c0a801be',
				phonetic : "/ʌn'faundid/",
				word : "unfounded",
				meaning : "without foundation; not based on fact, realistic considerations",
				vietnamese : "không căn cứ, không có sơ sở",
				example : "the prophet of a religion as yet unfounded."
			},
			'5226fd96d9884fd3a7cc1a40c0a801be' : {
				show : true,
				id : '5226fd96d9884fd3a7cc1a40c0a801be',
				phonetic : "/dis'pə:s/",
				word : "disperse",
				meaning : "to spread widely; disseminate",
				vietnamese : "xua tan, làm tan tác (mây mù...)",
				example : "Police had to disperse  them."
			},
			'5226fde2d59c43fda4671a40c0a801be' : {
				show : true,
				id : '5226fde2d59c43fda4671a40c0a801be',
				phonetic : "/in'fɔ:mətiv/",
				word : "informative",
				meaning : "giving information; instructive",
				vietnamese : "cung cấp nhiều tin tức, có nhiều tài liệu",
				example : "Thanks so much for an informative  and educational article."
			},
			'5226fe456a0441f4a1991a40c0a801be' : {
				show : true,
				id : '5226fe456a0441f4a1991a40c0a801be',
				phonetic : "/in'sentiv/",
				word : "incentive ",
				meaning : "something that incites or tends to incite to action or greater effort, as a reward offered for increased productivity.",
				vietnamese : "khuyến khích, khích lệ; thúc đẩy",
				example : "an additional payment made to employees as a means of increasing production"
			},
			'5226fe8560e8418eaca81a40c0a801be' : {
				show : true,
				id : '5226fe8560e8418eaca81a40c0a801be',
				phonetic : "/,remi'nisnt/",
				word : "reminiscent",
				meaning : "awakening memories of something similar",
				vietnamese : "nhớ lại; làm nhớ lại, gợi lại",
				example : "His style of writing is reminiscent of Melville's."
			},
			'5226ff6ad39c457c98a41a40c0a801be' : {
				show : true,
				id : '5226ff6ad39c457c98a41a40c0a801be',
				phonetic : "/'dʤenjuin/",
				word : "genuine",
				meaning : "possessing the claimed or attributed character, quality, or origin; not counterfeit; authentic; real",
				vietnamese : "thật, chính cống, xác thực",
				example : "Get real people, these aren't as genuine  as you think."
			},
			'52780148348044528bfc1a40c0a801be' : {
				show : true,
				id : '52780148348044528bfc1a40c0a801be',
				phonetic : "/'pɔpjuleit/",
				word : "populate",
				meaning : "to furnish with inhabitants, as by colonization; people.",
				vietnamese : "ở, cư trú (một vùng), đưa dân đến",
				example : "And the insurers who populate  that market have grown all the stronger."
			},
			'52780199b6dc400ba0241a40c0a801be' : {
				show : true,
				id : '52780199b6dc400ba0241a40c0a801be',
				phonetic : "/eid/",
				word : "aid",
				meaning : "to provide support for or relief to",
				vietnamese : "sự giúp đỡ, sự cứu giúp, sự viện trợ",
				example : "His heart is dodgy, he wears a hearing aid  and needs reading glasses."
			},
			'52780212797042d7a3a81a40c0a801be' : {
				show : true,
				id : '52780212797042d7a3a81a40c0a801be',
				phonetic : "/mi:m/",
				word : "meme",
				meaning : "an idea or element of social behaviour passed on through generations in a culture",
				vietnamese : "Như nhau",
				example : "Your meme  needs a place to do business."
			},
			'527802590184415091781a40c0a801be' : {
				show : true,
				id : '527802590184415091781a40c0a801be',
				phonetic : "/'tæktiks/",
				word : "tactics",
				meaning : "a plan, procedure, or expedient for promoting a desired end or result",
				vietnamese : "Chiến thuật",
				example : ""
			},
			'527802c6a2604f2f86d91a40c0a801be' : {
				show : true,
				id : '527802c6a2604f2f86d91a40c0a801be',
				phonetic : "/di'beit/",
				word : "debate",
				meaning : "a discussion, as of a public question in an assembly, involving opposing viewpoints",
				vietnamese : "cuộc tranh luận, cuộc thảo luận, cuộc tranh cãi",
				example : "While experts debate  that question, they agree that more devastating tempests are headed our way."
			},
			'52780304bb2c493bb7e41a40c0a801be' : {
				show : true,
				id : '52780304bb2c493bb7e41a40c0a801be',
				phonetic : "/ri'gɑ:dlis/",
				word : "regardless",
				meaning : "without concern as to advice, warning, hardship",
				vietnamese : "không kể, không đếm xỉa tới, không chú ý tới; bất chấp",
				example : "They'll do it regardless of the cost."
			},
			'527803595dd441f7889f1a40c0a801be' : {
				show : true,
				id : '527803595dd441f7889f1a40c0a801be',
				phonetic : "/sift/",
				word : "sift",
				meaning : "to separate by or as if by a sieve to question closely.",
				vietnamese : "xem xét, chọn lọc (sự kiện về mặt chính xác, thật hư); phân tích tính chất của",
				example : "It's only been two weeks and they have many applications to sift  through."
			},
			'52780e027c90424a88671a40c0a801be' : {
				show : true,
				id : '52780e027c90424a88671a40c0a801be',
				phonetic : "",
				word : "rid",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e07d5c44a6b889d1a40c0a801be' : {
				show : true,
				id : '52780e07d5c44a6b889d1a40c0a801be',
				phonetic : "",
				word : "ingredient",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e0c58a44d78a5831a40c0a801be' : {
				show : true,
				id : '52780e0c58a44d78a5831a40c0a801be',
				phonetic : "",
				word : "overwhelming",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e12f4244575a4dd1a40c0a801be' : {
				show : true,
				id : '52780e12f4244575a4dd1a40c0a801be',
				phonetic : "",
				word : "typo",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e19e3784f3b94671a40c0a801be' : {
				show : true,
				id : '52780e19e3784f3b94671a40c0a801be',
				phonetic : "",
				word : "behold",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e20672c467fb0541a40c0a801be' : {
				show : true,
				id : '52780e20672c467fb0541a40c0a801be',
				phonetic : "",
				word : "culprit",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e25c5b845669bd01a40c0a801be' : {
				show : true,
				id : '52780e25c5b845669bd01a40c0a801be',
				phonetic : "",
				word : "compatibility",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e2b68384fdbac031a40c0a801be' : {
				show : true,
				id : '52780e2b68384fdbac031a40c0a801be',
				phonetic : "",
				word : "bane",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e327830461cb3911a40c0a801be' : {
				show : true,
				id : '52780e327830461cb3911a40c0a801be',
				phonetic : "",
				word : "inadvertently",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e37029c47328b141a40c0a801be' : {
				show : true,
				id : '52780e37029c47328b141a40c0a801be',
				phonetic : "",
				word : "annual",
				meaning : "",
				vietnamese : "",
				example : ""
			},
			'52780e43b3904c31b8571a40c0a801be' : {
				show : true,
				id : '52780e43b3904c31b8571a40c0a801be',
				phonetic : "",
				word : "lend credibility",
				meaning : "",
				vietnamese : "",
				example : ""
			}
		}
	}
	
	//$rootScope.collection = $scope.collection;
	
	$scope.showWordDetail = function(item) {
		$state.go('collection.word-detail', {wordId : item.id});
	}
})