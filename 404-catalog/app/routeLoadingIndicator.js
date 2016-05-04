(function(ccApp) {

    var routeLoadingIndicator = function($rootScope) {
        return {
            restrict: 'E',
            template: "<div ng-if='isRouteLoading'><h1>Loading <i class='fa fa-cog fa-spin'></i></h1></h1></div>",
            link: function(scope, elem, attrs) {
                scope.isRouteLoading = false;

                $rootScope.$on('$stateChangeStart',
                    function(event, toState, toParams, fromState, fromParams){
                        scope.isRouteLoading = true;
                       // console.log(scope.isRouteLoading);
                });
                $rootScope.$on('$stateChangeSuccess',
                    function(event, toState, toParams, fromState, fromParams){
                        scope.isRouteLoading = false;
                       // console.log(scope.isRouteLoading);
                });
            }
        };
    };
    routeLoadingIndicator.$inject = ['$rootScope'];

    ccApp.directive('routeLoadingIndicator', routeLoadingIndicator);

}(angular.module('ccApp')));