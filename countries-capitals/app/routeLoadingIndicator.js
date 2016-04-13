//(function(ccApp) {
//
//    var routeLoadingIndicator = function($rootScope) {
//        return {
//            restrict: 'E',
//            template: "<div ng-if='isRouteLoading'><h1>Loading <i class='fa fa-cog fa-spin'></i></h1></h1></div>",
//            link: function(scope, elem, attrs) {
//                scope.isRouteLoading = false;
//
//                $rootScope.$on('$stateChangeStart',
//                    function(event, toState, toParams, fromState, fromParams){
//                        scope.isRouteLoading = true;
//                       // console.log(scope.isRouteLoading);
//                });
//                $rootScope.$on('$stateChangeSuccess',
//                    function(event, toState, toParams, fromState, fromParams){
//                        scope.isRouteLoading = false;
//                       // console.log(scope.isRouteLoading);
//                });
//            }
//        };
//    };
//    routeLoadingIndicator.$inject = ['$rootScope'];
//
//    ccApp.directive('routeLoadingIndicator', routeLoadingIndicator);
//
//}(angular.module('ccApp')));




//  ________________________________________________________________
//
//                        PROMISE HELPER
//  __________________________________________ _____________________
var PromiseHelper = (function () {
    function wrapPromise(promise) {
        return {
            then: promise.then,
            success: function (fn) {
                promise.then(fn);
                return wrapPromise(promise);
            },
            error: function (fn) {
                promise.then(null, fn);
                return wrapPromise(promise);
            }
        };
    }

    function PromiseHelper() {
        var _this = this;
        inject(function ($injector) {
            var $q = $injector.get("$q");
            _this._deferred = $q.defer();
            _this.$rootScope = $injector.get("$rootScope");
        });
    }

    PromiseHelper.prototype.resolve = function (data) {
        this._deferred.resolve(data);
        this.$rootScope.$apply();
    };

    PromiseHelper.prototype.reject = function () {
        this._deferred.reject();
        this.$rootScope.$apply();
    };

    PromiseHelper.prototype.getHttpPromiseMock = function () {
        var promise = this._deferred.promise;
        return wrapPromise(promise);
    };

    return PromiseHelper;
})();
