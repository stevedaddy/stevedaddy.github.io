'use strict';

angular.module('MyApp', [
    'ui.bootstrap',
    'ngMessages',
    'ngAnimate'
])
.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'loginView.html',
        replace: true
    }
});
// create a module to make it easier to include in the app module
angular.module('rcForm', [])
    .directive(rcSubmitDirective);

// define module for app
angular.module('LoginApp', ['rcForm'])
    .directive('optIn', function() {
        return {
            restrict: 'E',
            transclude: true,
            controller: 'LoginController',
            replace: true
        }
    });