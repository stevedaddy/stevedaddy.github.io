
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
.controller('countryCtrl', ['$scope', '$http', '$sce', function($scope, $http, $sce){

        $scope.trustSrc = function(src) {
            return $sce.trustAsResourceUrl(src);
        };

        $scope.getCountries = function() {

            var url = "http://api.geonames.org/countryInfo";
            var request = {
                username : 'stzy',
                type : 'JSON'
            };
            $http({
                method: 'GET',
                url: url,
                params: request,
                cache: true
            })
                .then(function (response) {
                  //  var httpCache = $cacheFactory.get('$http');
                   console.log( response.data.geonames);
                   $scope.results = response.data.geonames;
                   // console.log($scope.results);
                },
                function (response) {
                    alert('error');
                });
          }
        $scope.getCountries();
        }]);



