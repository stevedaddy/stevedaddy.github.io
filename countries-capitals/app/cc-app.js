
angular.module('ccApp', ['ui.router', 'ngAnimate'])
.config(function($stateProvider, $urlRouterProvider, $httpProvider){
    $httpProvider.defaults.useXDomain = true;

    // For any unmatched url, send to home
    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home.html"
        })
        .state('countries', {
            url: "/countries",
            templateUrl: "country-list.html"
        })
        .state('country', {
            url: "/countries/:country",
            templateUrl: "country-detail.html",
            controller: function($scope, $stateParams){
                $scope.country = $stateParams.country;

            },
            resolve:{
                country: ['$stateParams', function($stateParams){
                    return $stateParams.country;
                }]}
        })
        .state('country.capital', {
            url: "/capital",
            templateUrl: "country-detail.html",
            controller: function($scope, $stateParams, country){
                $scope.country = country;
            }
        });

})
    .directive('loadingState', function ($rootScope) {
        var loadingStates = {};

        $rootScope.$on('$stateChangeStart', function (event, toState) {
            loadingStates[toState.name] = true;
        });

        ['$stateChangeSuccess', '$stateChangeError', '$stateNotFound'].forEach(function (eventType) {
            $rootScope.$on(eventType, function (event, toState) {
                delete loadingStates[toState.name];
            });
        });

        return {
            template: '<div ng-show="loading[state]" ng-transclude></div>',
            transclude: true,
            scope: {
                state: '@loadingState'
            },
            controller: function ($scope) {
                $scope.loading = loadingStates;
            }
        };
    })
.controller('countryCtrl', ['$scope', '$http', '$sce', '$location', function($scope, $http, $sce, $location, loadingState){





    $scope.trustSrc = function(src) {
    return $sce.trustAsResourceUrl(src);
    }
    $scope.importCountries = function() {
        var url = "http://api.geonames.org/countryInfo";
        var request = {
            username: 'stzy',
            type: 'JSON'
        }
        $scope.loading = true;
        $http({
            method: 'GET',
            url: url,
            params: request,
            cache: true
        })
            .then(function (response) {
                //  var httpCache = $cacheFactory.get('$http');
                // console.log( response.data.geonames);
                $scope.results = response.data.geonames;
                //console.log($scope.results[0]);
            },
            function (response) {
                alert('error');
            })
            .finally(function () {
                // Hide loading spinner whether our call succeeded or failed.
                $scope.loading = false;
            });
    }
    //if no results run the api call
    if(!$scope.results) {
        $scope.importCountries();
    }

    $scope.goToDetail = function(cCode) {
        $location.url('/countries/' + cCode.countryCode +'/capital');
    };
}])
.controller('countryDetailCtrl', ['$scope', '$http', function($scope, $http, country){

        $scope.searchThisCountryInfo = function() {
            var url = "http://api.geonames.org/countryInfo";
            var request = {
                username: 'stzy',
                type: 'JSON',
                country: $scope.country
            };
            $http({
                method: 'GET',
                url: url,
                params: request,
                cache: true
            })
                .then(function (response) {
                    $scope.results3 = response.data.geonames;
                    $scope.countryName = $scope.results3[0]['countryName'];
                    $scope.population = $scope.results3[0]['population'];
                    $scope.areaInSqKm = $scope.results3[0]['areaInSqKm'];
                    $scope.capital = $scope.results3[0]['capital'];
                    $scope.continent = $scope.results3[0]['continent'];

                  //  continent, timezone
                    console.log(response.data.geonames);
                },
                function (response) {
                    alert('error');
                });
        }

        $scope.searchCapitals = function() {
            var url = "http://api.geonames.org/search";
            var request = {
                username: 'stzy',
                type: 'JSON',
                name_equals :  $scope.capital,
                q : 'capital',
                country: $scope.country,
                isNameRequired : 1,
                maxRows : 1
            };
            $http({
                method: 'GET',
                url: url,
                params: request,
                cache: true
            })
                .then(function (response) {
                    $scope.results = response.data.geonames;
                    $scope.capPopulation = $scope.results[0]['population'];
                    $scope.capName = $scope.results[0]['name'];
                   //console.log(response.data.geonames);
                },
                function (response) {
                    alert('error');
                });
        }


        $scope.searchNeighbors = function() {
            var url = "http://api.geonames.org/neighboursJSON";
            var request = {
                username: 'stzy',
                type: 'JSON',
                country: $scope.country
            };
            $http({
                method: 'GET',
                url: url,
                params: request,
                cache: true
            })
                .then(function (response) {
                    $scope.searchResults = response.data.geonames;
                    $scope.howMany = $scope.searchResults.length;
                  //  console.log(response.data.geonames);

                },
                function (response) {
                    alert('error');
                });
        }
        $scope.searchThisCountryInfo();
        $scope.searchCapitals();
        $scope.searchNeighbors();

}]);


