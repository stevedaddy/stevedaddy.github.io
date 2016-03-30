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
            url: "/country-list",
            templateUrl: "country-list.html"
        })
        .state('countryDetail', {
            url: "/country-detail",
            templateUrl: "country-detail.html"
        })
        //.state('route1.list', {
        //    url: "/list",
        //    templateUrl: "route1.list.html",
        //    controller: function($scope){
        //        $scope.items = ["A", "List", "Of", "Items"];
        //    }
        //})

});
