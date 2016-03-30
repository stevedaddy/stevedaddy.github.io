var ccApp = angular.module('ccApp', ['ui.router', 'ngAnimate']);
ccApp.config(function($stateProvider, $urlRouterProvider){

    // For any unmatched url, send to home
    $urlRouterProvider.otherwise("/");
    $stateProvider
        .state('home', {
            url: "/",
            templateUrl: "home.html"
        })
        .state('countryList', {
            url: "/countries",
            templateUrl: "country-list.html"
        })
        .state('countryDetail', {
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
        .state('countryDetail.capital', {
            url: "/capital",
            templateUrl: "country-detail.html",
            controller: function($scope, $stateParams, country){
                $scope.country = country;
            }
        });


});
