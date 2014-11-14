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
.controller('GuessingCtrl', function($scope) {
	$scope.toggleAnswer = function(item) {
		item.show = !item.show;
	}
})
.controller('WordDetailCtrl', function($scope) {
	$scope.word = {
		show: true,
		word: 'regardless',
		phonetic: "/ri'gɑ:dlis/",
		translate : "không kể, không đếm xỉa tới, không chú ý tới; bất chấp",
		meaning : "without concern as to advice, warning, hardship"
	}
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
.controller('CollectionDetailCtrl', function($scope, $stateParams, $rootScope, $state) {
	$rootScope.showContext = true
	
	$rootScope.collection = {
		id : 1,
		name : 'Hỏi đường',
		items : [
			{
				show: true,
				word: 'peak',
				phonetic: "/pi:k/",
				translate : "Đỉnh, chóp",
				meaning : "Reach a highest point"
			},
			{
				show: true,
				word: 'bump',
				phonetic: "/bump/",
				translate : "Làm nổi lên, thổi ra",
				meaning : "to come more or less violently in contact with; collide with; strike"
			},
			{
				show: true,
				word: 'smite',
				phonetic: "/smait/",
				translate : "sự làm thử, sự cố gắng (n), làm thất bại, đánh thắng (v)",
				meaning : "to strike or hit hard, with or as with the hand, a stick, or other weapon"
			},
			{
				show: true,
				word: 'irritate',
				phonetic: "/'iriteit/",
				translate : "làm phát cáu, chọc tức",
				meaning : "to excite to impatience or anger; annoy."
			},
			{
				show: true,
				word: 'steam',
				phonetic: "/sti:m/",
				translate : "hơi nước (n), bốc hơi (v)",
				meaning : "water in the form of an invisible gas or vapor."
			},
			{
				show: true,
				word: 'annoy',
				phonetic: "/ə'nɔi/",
				translate : "làm trái ý, làm khó chịu, làm bực mình; chọc tức, làm cho tức giận quấy rầy, làm phiền",
				meaning : "to disturb or bother (a person) in a way that displeases, troubles, or slightly irritates"
			},
			{
				show: true,
				word: 'regularly',
				phonetic: "/'regjuləri/",
				translate : "đều đều, đều đặn, thường xuyên",
				meaning : "at regular times or intervals."
			},
			{
				show: true,
				word: 'mundane',
				phonetic: "/'mʌndein/",
				translate : "(thuộc) cõi trần, thế tục, trần tục",
				meaning : "common; ordinary; banal; unimaginative."
			},
			{
				show: true,
				word: 'retreat',
				phonetic: "/ri'tri:t/",
				translate : "(quân sự) sự rút lui, sự rút quân; hiệu lệnh rút quân",
				meaning : "the act of withdrawing, as into safety or privacy; retirement; seclusion."
			},
			{
				show: true,
				word: 'agenda',
				phonetic: "/ə'dʤendə/",
				translate : "(số nhiều) những việc phải làm, chương trình nghị sự, nhật ký công tác",
				meaning : "something that is to be done."
			},
			{
				show: true,
				word: 'over-talkative',
				phonetic: "/'ouvə 'tɔ:kətiv/",
				translate : "nói quá nhiều",
				meaning : ""
			},
			{
				show: true,
				word: 'spot',
				phonetic: "/spɔt/",
				translate : "dấu, đốm, vết, vết nhơ, vết đen",
				meaning : "a small, circumscribed mark caused by disease, allergic reaction, decay, etc."
			},
			{
				show: true,
				word: 'colleague',
				phonetic: "/kɔ'li:g/",
				translate : "bạn đồng nghiệp, bạn đồng sự",
				meaning : ""
			},
			{
				show: true,
				word: 'gossip',
				phonetic: "/'gɔsip/",
				translate : "chuyện ngồi lê đôi mách, chuyện tầm phào, tin đồn nhảm",
				meaning : "idle talk or rumor, especially about the personal or private affairs of others"
			},
			{
				show: true,
				word: 'throughout',
				phonetic: "/θru:'aut/",
				translate : "từ đầu đến cuối, khắp, suốt",
				meaning : "in or to every part of; everywhere in"
			},
			{
				show: true,
				word: 'tempt',
				phonetic: "/tempt/",
				translate : "cám dỗ, quyến rũ, nhử, làm thèm, gợi thèm",
				meaning : "to attract, appeal strongly to, or invite"
			},
			{
				show: true,
				word: 'rude',
				phonetic: "/ru:d/",
				translate : "khiếm nhã, bất lịch sự, vô lễ, láo xược; thô lỗ",
				meaning : "without culture, learning, or refinement"
			},
			{
				show: true,
				word: 'unfounded',
				phonetic: "/ʌn'faundid/",
				translate : "không căn cứ, không có sơ sở",
				meaning : "without foundation; not based on fact, realistic considerations"
			},
			{
				show: true,
				word: 'disperse',
				phonetic: "/dis'pə:s/",
				translate : "xua tan, làm tan tác (mây mù...)",
				meaning : "to spread widely; disseminate"
			},
			{
				show: true,
				word: 'informative',
				phonetic: "/in'fɔ:mətiv/",
				translate : "cung cấp nhiều tin tức, có nhiều tài liệu",
				meaning : "giving information; instructive"
			},
			{
				show: true,
				word: 'incentive ',
				phonetic: "/in'sentiv/",
				translate : "khuyến khích, khích lệ; thúc đẩy",
				meaning : "something that incites or tends to incite to action or greater effort, as a reward offered for increased productivity."
			},
			{
				show: true,
				word: 'reminiscent',
				phonetic: "/,remi'nisnt/",
				translate : "nhớ lại; làm nhớ lại, gợi lại",
				meaning : "awakening memories of something similar"
			},
			{
				show: true,
				word: 'genuine',
				phonetic: "/'dʤenjuin/",
				translate : "thật, chính cống, xác thực",
				meaning : "possessing the claimed or attributed character, quality, or origin; not counterfeit; authentic; real"
			},
			{
				show: true,
				word: 'populate',
				phonetic: "/'pɔpjuleit/",
				translate : "ở, cư trú (một vùng), đưa dân đến",
				meaning : "to furnish with inhabitants, as by colonization; people."
			},
			{
				show: true,
				word: 'aid',
				phonetic: "/eid/",
				translate : "sự giúp đỡ, sự cứu giúp, sự viện trợ",
				meaning : "to provide support for or relief to"
			},
			{
				show: true,
				word: 'meme',
				phonetic: "/mi:m/",
				translate : "Như nhau",
				meaning : "an idea or element of social behaviour passed on through generations in a culture"
			},
			{
				show: true,
				word: 'tactics',
				phonetic: "/'tæktiks/",
				translate : "Chiến thuật",
				meaning : "a plan, procedure, or expedient for promoting a desired end or result"
			},
			{
				show: true,
				word: 'debate',
				phonetic: "/di'beit/",
				translate : "cuộc tranh luận, cuộc thảo luận, cuộc tranh cãi",
				meaning : "a discussion, as of a public question in an assembly, involving opposing viewpoints"
			},
			{
				show: true,
				word: 'regardless',
				phonetic: "/ri'gɑ:dlis/",
				translate : "không kể, không đếm xỉa tới, không chú ý tới; bất chấp",
				meaning : "without concern as to advice, warning, hardship"
			},
			{
				show: true,
				word: 'sift',
				phonetic: "/sift/",
				translate : "xem xét, chọn lọc (sự kiện về mặt chính xác, thật hư); phân tích tính chất của",
				meaning : "to separate by or as if by a sieve to question closely."
			}
		]
	}
	
	//$rootScope.collection = $scope.collection;
	
	$scope.showWordDetail = function(item) {
		$state.go('collection.word-detail');
	}
})