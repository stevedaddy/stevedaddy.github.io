angular.module('ccApp', ['ui.router', 'ngAnimate'])
.config(['$urlRouterProvider', '$httpProvider', '$stateProvider', function($urlRouterProvider, $httpProvider, $stateProvider){
    $httpProvider.defaults.useXDomain = true;
    // For any unmatched url, send to catalog home
   // $urlRouterProvider.otherwise("/");
    $stateProvider

        .state('home', {
            url: "/",
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
            url: "/:country",
            templateUrl: "country-detail.html",
            controller: 'countryDetailCtrl',
            resolve: {

                thiscountry :  function(api, $stateParams) {
                    $stateParams.thiscountry = api.searchThisCountryInfo($stateParams.country);
                 //  console.log($stateParams.thiscountry);
                    return $stateParams.thiscountry;

                }
            }
        });
}])
.controller('countryCtrl', ['$scope', '$http', 'api2', 'importcountries', '$state', function($scope, $http, api2, importcountries, $state){
    $scope.importcountries = importcountries;
    $scope.goToDetail = function(cCode) {
        $state.go('country', {country: cCode.countryCode});
    };
}])
.controller('countryDetailCtrl', ['$scope', '$http', 'api', 'thiscountry',  function($scope, $http, api, thiscountry){
    $scope.thiscountry = thiscountry[0];
}])
.factory('api', function($http, $q){
    var baseUrl = 'http://api.geonames.org/';
    var config = {
        params: {
            username: 'stzy'
        }
    };
    return {
        searchThisCountryInfo: searchThisCountryInfo
    };
    function searchThisCountryInfo(country) {
        var reqParams = {
            country: country,
            type: 'JSON'
        };
        angular.extend(config.params, reqParams);
        return $http.get(baseUrl + 'countryInfo', config, {cache: true})
            .then(function (response) {
               // console.log(response.data.geonames);
                console.log(response.data.geonames['0'].countryCode);
                //how would I do page cacheing??
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
                console.log(JSON.stringify(response.data.geonames));
            }
            return cache;
        });
    }
})













