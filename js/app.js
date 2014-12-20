angular.module('starter', [
	'ionic',
	'ngResource'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})
	.config(function($stateProvider, $urlRouterProvider) {

		$stateProvider

			.state('main', {
				url: "/main",
				templateUrl: "partials/main.html",
				controller: 'main'
			})
			.state('news', {
				url: "/news",
				templateUrl: "partials/news-list.html",
				controller: 'news'
			})
			.state('call', {
				url: "/call",
				templateUrl: "partials/call.html",
				controller: 'call'
			})
			.state('offers', {
				url: "/offers",
				templateUrl: "partials/offers-list.html",
				controller: 'news'
			})
			.state('map', {
				url: "/map",
				templateUrl: "partials/map.html",
				controller: 'map'
			})
			.state('menu', {
				url: "/menu",
				templateUrl: "partials/menu.html",
				controller: 'menu'
			})
;

		$urlRouterProvider.otherwise('/main');

	})
	.controller('main', function ($scope, $location, $interval, $timeout, $resource) {
		$scope.go = function (url) {
			$location.url(url);
			$resource('http://shrouded-island-7468.herokuapp.com/immortal?id='+ 3, {}, {
				query: {method:'GET',isArray:false}
			}).query().$promise.then(function(stat) {
					console.log(stat);
				});

			if (url === '/map') {
				$timeout(function () {
						var myMap,
							myPlacemark;
						myMap = new ymaps.Map("map", {
							center: [55.76, 37.64],
							zoom: 7
						});

						myPlacemark = new ymaps.Placemark([55.76, 37.64], {
							hintContent: 'Москва!',
							balloonContent: 'Столица России'
						});

						myMap.geoObjects.add(myPlacemark);
					},
					1000)
			}
		};
		var button = jQuery('#current_width'),
			mocking_bird = jQuery('#mocking_bird'),
			currentWidth = button.width(),
			screen_availHeight = screen.availHeight;
		$scope.imgWidth = currentWidth;
		$interval(function() {
				if(screen.width < 400) {
					$scope.width_ = "col col-100 withoutMarginTopAndBottom";
				} else {
					if(screen.width < 600) {
						$scope.width_ = "col col-80 col-offset-10 withoutMarginTopAndBottom";
					} else {
						if(screen.width < 900) {
							$scope.width_ = "col col-50 col-offset-25 withoutMarginTopAndBottom";
						} else {
							$scope.width_ = "col col-33 col-offset-33 withoutMarginTopAndBottom";
						}
					}
				}

				if(currentWidth !== button.width()) {
					currentWidth = button.width();
					$scope.imgWidth = currentWidth + 26;
				}
				if(screen_availHeight !== screen.availHeight) {
					screen_availHeight = screen.availHeight;
					mocking_bird.height((screen.availHeight - button.offset().top - 26)/2);
				}
		},
		50)
	})
	.controller('news', function($scope, $location, $resource) {
		$scope.refresh = function() {
			$resource('anyString', {}, {
				query: {method: 'GET', isArray: true}
			})
		};
		$scope.go = function(url) {
			$location.url(url);
		}
	})
	.controller('call', function($scope, $location, $resource) {

		$scope.request = function(name, phone) {
			$resource('anyString'+name + ' ' + phone, {}, {
				query: {method: 'GET', isArray: false}
			})
		};

		$scope.go = function(url) {
			$location.url(url);
		}
	})
	.controller('offers', function($scope, $location) {
		$scope.go = function(url) {
			$location.url(url);
		}
	})
	.controller('map', function($scope, $location) {
		$scope.go = function(url) {
			$location.url(url);
		}
	})
	.controller('menu', function($scope, $location) {
		$scope.go = function(url) {
			$location.url(url);
		}
	});
