(function(){
    angular.module('catalogApp')
    .config(function($stateProvider, $urlRouterProvider, $httpProvider) {
        $stateProvider
            .state('catalog', {
                url: '',
                controller: 'CatalogCtrl',
                templateUrl: "./partials/catalog.html"

            })
            .state('product-details', {
                url: '/catalog/:productId',
                controller: 'ProductCtrl',
                templateUrl: './partials/product-details.html'
            })
            .state('error', {
                controller: 'ErrorCtrl',
                templateUrl: "./partials/errorscatalog.html"
            });
            //$urlRouterProvider.when('', '/');
            $urlRouterProvider.otherwise(function($injector, $location){
                var state = $injector.get('$state');
                state.go('catalog');
                  //  console.log($location.path());
                return $location.path();
            });
    });
}());