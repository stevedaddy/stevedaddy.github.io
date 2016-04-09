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
            controller: 'countryCtrl',
            templateUrl: "country-list.html",
            resolve: {
                importcountries: function (api2) {
                    //if there's a cached version saved in api2 don't load a new one when the state is loaded
                    if(!api2.cache){
                        api2.cache = api2.importCountries()
                    }
                    return api2.cache
                }
            }
        })

        .state('country', {
            url: "/countries/:country/capital",
            templateUrl: "country-detail.html",
            controller: 'countryDetailCtrl',
            resolve: {
                neighbors: function(api, $stateParams){
                    return api.searchNeighbors($stateParams.country);
                },
                thiscountry :  function(api, $stateParams) {
                    $stateParams.thiscountry = api.searchThisCountryInfo($stateParams.country);
                    return $stateParams.thiscountry
                },
                thiscapital :  function(api, thiscountry) {
                    return  api.searchCapitals(thiscountry[0].countryCode, thiscountry[0].capital);
                }
            }
            
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
.controller('countryCtrl', ['$scope', '$http', 'api2', 'importcountries', '$state', function($scope, $http, api2, importcountries, $state){

      $scope.importcountries = importcountries;
      //  console.log(importcountries);


    $scope.goToDetail = function(cCode) {
        $state.go('country', {country: cCode.countryCode});
    };
}])
.controller('countryDetailCtrl', ['$scope', '$http', 'api', 'neighbors', 'thiscountry', 'thiscapital',  function($scope, $http, api, neighbors, thiscountry, thiscapital){

        //$scope.searchThisCountryInfo = function() {
        //    var url = "http://api.geonames.org/countryInfo";
        //    var request = {
        //        username: 'stzy',
        //        type: 'JSON',
        //        country: $scope.country
        //    };
        //    $http({
        //        method: 'GET',
        //        url: url,
        //        params: request,
        //        cache: true
        //    })
        //        .then(function (response) {
        //            $scope.results3 = response.data.geonames;
        //            $scope.countryName = $scope.results3[0]['countryName'];
        //            $scope.population = $scope.results3[0]['population'];
        //            $scope.areaInSqKm = $scope.results3[0]['areaInSqKm'];
        //            $scope.capital = $scope.results3[0]['capital'];
        //            $scope.continent = $scope.results3[0]['continent'];
        //
        //          //  continent, timezone
        //           // console.log(response.data.geonames);
        //        },
        //        function (response) {
        //            alert('error');
        //        });
        //}





        //$scope.searchNeighbors = function() {
        //    $scope.searchResults = neighbors;
        //    $scope.howMay = neighbors.length;
        //};

        //api.searchThisCountryInfo().then(function(country) {
        //    $scope.country = $stateParams.country;
        //});
        //$scope.country = api.searchThisCountryInfo();
        //api.searchThisCountryInfo('US');
        //rr = api.searchThisCountryInfo('US');


        $scope.thiscountry = thiscountry[0];
        $scope.neighbors = neighbors;
        $scope.thiscapital = thiscapital[0];

     //   $scope.thiscapital =  api.searchCapitals($scope.thiscountry.countryName, $scope.thiscountry.capital);

      //  console.log(thiscapital);
       // api.searchCapitals('US', 'Washington');



}])
.factory('api', function($http, $q){
    var baseUrl = 'http://api.geonames.org/';
    var config = {
        params: {
            username: 'stzy'
        }
    };

    return {
        searchNeighbors: searchNeighbors,
        searchThisCountryInfo: searchThisCountryInfo,
        searchCapitals: searchCapitals

    };

    function searchNeighbors(country){
        var reqParams = {
            country: country
        };
        angular.extend(config.params, reqParams);
        return $http.get(baseUrl + 'neighboursJSON', config, {cache: true})
            .then(function(response){
                return $q.when(response.data.geonames);
            });
    }
    function searchThisCountryInfo(country) {
        var reqParams = {
            country: country,
            type: 'JSON'
        };
        angular.extend(config.params, reqParams);
        return $http.get(baseUrl + 'countryInfo', config, {cache: true})
            .then(function (response) {
                return $q.when(response.data.geonames);

                //
                //$scope.countryName = $scope.results3[0]['countryName'];
                //$scope.population = $scope.results3[0]['population'];
                //$scope.areaInSqKm = $scope.results3[0]['areaInSqKm'];
                //$scope.capital = $scope.results3[0]['capital'];
                //$scope.continent = $scope.results3[0]['continent'];
            });
    }
    function searchCapitals(country, capital) {
        var reqParams = {
            name_equals: capital,
            q: 'capital',
            country: country,
            isNameRequired: 1,
            maxRows: 1,
            type: 'JSON'
        };
        angular.extend(config.params, reqParams);
        return $http.get(baseUrl + 'search', config, {cache: true})
            .then(function (response) {
               // results = response.data.geonames;
               //// console.log(response);
               // if (results[0]) {
               //     capPopulation = results[0]['population'];
               //     capName = results[0]['name'];
               // }
               // else {
               //     capPopulation = 'No Data';
               //     capName = 'No Data';
               // }
                return $q.when(response.data.geonames);
            });

    }

})

//when I had this in the factory above it was being overritten by searchThisCountryInfo when you went back to the list after loading the detail page
.factory('api2', function($http, $q){

    var baseUrl = 'http://api.geonames.org/';
    var config = {
        params: {
            username: 'stzy'
        }
    };

    return {
        importCountries : importCountries

    };
    function importCountries() {

            var reqParams = {
                type: 'JSON'
            };
            angular.extend(config.params, reqParams);
            return $http.get(baseUrl + 'countryInfo', config, {cache: true})
                .then(function (response) {
                    //if there's a cached version saved in api2 don't load a new one when the state is loaded
                    var cache;
                    if(!cache) {
                        cache = $q.when(response.data.geonames);
                    }
                    return cache;
                });
    }





})













