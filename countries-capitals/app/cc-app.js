angular.module('myFilters', [])
//  ________________________________________________________________
//
//                        FILTERS
//  __________________________________________ _____________________
    .filter('kms', ['$filter', function ($filter) {
        return function (input) {
            isInputNumber = $filter('number')(input);
            //if the input is a number return the filtered value, else return help message
            isInputNumber ?
                ccResult = isInputNumber + ' sq km' :
                ccResult = 'The kms filter only accepts numbers, some other input was provided for some wacky reason.';
            return ccResult;
        }
    }]);
angular.module('ccApp', ['ui.router', 'ngAnimate', 'myFilters'])
//I rewrote this in it's own module, is that cool?
// I was having trouble running unit tests on it declared this way:
//.filter('kms', ['$filter', function($filter) {
//    return function(input) {
//        return $filter('number')(input) + ' sq km';
//    };
//}])
//  ________________________________________________________________
//
//                        CONFIG
//  __________________________________________ _____________________
    .config(['$urlRouterProvider', '$httpProvider', '$stateProvider', function ($urlRouterProvider, $httpProvider, $stateProvider) {
        //  ________________________________________________________________
        //
        //                        ROUTING
        //  __________________________________________ _____________________
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
                        if (!api2.cache) {
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
                    neighbors: function (api, $stateParams) {
                        return api.searchNeighbors($stateParams.country);
                    },
                    thiscountry: function (api, $stateParams) {
                        $stateParams.thiscountry = api.searchThisCountryInfo($stateParams.country);
                        return $stateParams.thiscountry
                    },
                    thiscapital: function (api, thiscountry) {
                        capitalreturn = api.searchCapitals(thiscountry[0].countryCode, thiscountry[0].capital);
                        return capitalreturn;
                    }
                }
            });


    }])
//  ________________________________________________________________
//
//                        CONTROLLERS
//  __________________________________________ _____________________
    .controller('countryCtrl', ['$scope', '$http', 'api2', 'importcountries', '$state', function ($scope, $http, api2, importcountries, $state) {
        $scope.importcountries = importcountries;
        $scope.goToDetail = function (cCode) {
            $state.go('country', {country: cCode.countryCode});
        };
    }])
    .controller('countryDetailCtrl', ['$scope', '$http', 'api', 'neighbors', 'thiscountry', 'thiscapital', function ($scope, $http, api, neighbors, thiscountry, thiscapital) {
        $scope.thiscountry = thiscountry[0];
        $scope.neighbors = neighbors;
        $scope.thiscapital = thiscapital[0];
    }])
//  ________________________________________________________________
//
//                        SERVICES
//  __________________________________________ _____________________
    .factory('LanguagesServicePromise', ['$http', '$q', function ($http, $q) {
        var lng = {};
        lng.get = function () {
            var deferred = $q.defer();
            $http.get('languages.json')
                .then(function (response) {
                    var languages = response.data.map(function (item) {
                        return item.name;
                    });
                    deferred.resolve(languages);
                })
                .catch(function (response) {
                    deferred.reject(response);
                });
            return deferred.promise;
        };
        return lng;
    }])
    .factory('api', function ($http, $q) {
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
        function searchNeighbors(country) {
            var reqParams = {
                country: country
            };
            angular.extend(config.params, reqParams);
            return $http.get(baseUrl + 'neighboursJSON', config, {cache: true})
                .then(function (response) {
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
                    //how would I do page cacheing??
                    return $q.when(response.data.geonames);
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
                    return $q.when(response.data.geonames);
                });
        }
    })
//when I had this in the factory above it was being overritten by searchThisCountryInfo when you went back to the list after loading the detail page
    .factory('api2', function ($http, $q) {
        var baseUrl = 'http://api.geonames.org/';
        var config = {
            params: {
                username: 'stzy'
            }
        };
        return {
            importCountries: importCountries
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
                    if (!cache) {
                        cache = $q.when(response.data.geonames);
                        // grab data to make mock for unit testing
                        //  console.log(JSON.stringify(response.data.geonames, null, 0));
                    }
                    return cache;
                });
        }
    });
