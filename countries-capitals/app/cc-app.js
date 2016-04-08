angular.module('ccApp', ['ui.router', 'ngAnimate'])
    .filter('kms', ['$filter', function($filter) {
        return function(input) {
            // This if fixes that it was displaying 'undefined' until it loaded a value,
            // instead of using it's placeholder 'No Data' from the template
            if (input) {
                return $filter('number')(input) + ' sq km';
            }
        };
    }])

//change these to plachold1, placehold2, and use 'gulp build' for all develop/deploy?
.config(['$urlRouterProvider', '$httpProvider', '$stateProvider', function($urlRouterProvider, $httpProvider, $stateProvider){

        var slowResolve = function(countriesDataLoad){
            return countriesDataLoad.searchThisCountryInfo();
        }
        slowResolve.$inject = ['countriesDataLoad'];



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

        //is this how you have to do it? id rather not have to call county and pass along stuff to the child
        .state('country', {
            url: "/countries/:country/capital",
            templateUrl: "country-detail.html",
            controller: 'countryDetailCtrl',
            resolve: {
                neighbors: function(api, $stateParams){
                    return api.searchNeighbors($stateParams.country);
                }
            },
            
        });

}])
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
.controller('countryCtrl', ['$scope', '$http', '$sce', '$state', function($scope, $http, $sce, $location, loadingState){
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
                $scope.results = response.data.geonames;
                console.log($scope.results);
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
        $state.go('country', {country: cCode.countryCode});
    };
}])
.controller('countryDetailCtrl', ['$scope', '$http', 'api', 'neighbors', function($scope, $http, api, neighbors){

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
                   // console.log(response.data.geonames);
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
                    //console.log(response);
                    if($scope.results[0]) {
                        $scope.capPopulation = $scope.results[0]['population'];
                        $scope.capName = $scope.results[0]['name'];
                    }
                    else{
                        $scope.capPopulation = 'No Data';
                        $scope.capName = 'No Data';
                    }
                },
                function (response) {
                    alert('error');
                });
        }


        $scope.searchNeighbors = function() {
            $scope.searchResults = neighbors;
            $scope.howMay = neighbors.length;
        };

        $scope.searchThisCountryInfo();
        $scope.searchCapitals();
        $scope.searchNeighbors();


}])
.factory('api', function($http, $q){
    var baseUrl = 'http://api.geonames.org/';
    var config = {
        params: {
            username: 'stzy'
        }
    };

    return {
        searchNeighbors: searchNeighbors
    };

    function searchNeighbors(country){
        var reqParams = {
            country: country
        };
        angular.extend(config.params, reqParams);
        return $http.get(baseUrl + 'neighboursJSON', config)
            .then(function(response){
                return $q.when(response.data.geonames);
            });
    }
});


