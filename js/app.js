angular.module('starter', ['ionic'])

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
;

		$urlRouterProvider.otherwise('/main');

	})
	.controller('main', function ($scope, $location) {
		$scope.go = function (url) {
			$location.url(url);
			if (url === '/map') {
				setTimeout(function () {
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
					300)
			}
		}
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
	});
