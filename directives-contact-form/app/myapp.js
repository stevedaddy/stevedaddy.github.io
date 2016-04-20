'use strict';

angular.module('MyApp', [
    'ui.bootstrap'
])
.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'loginView.html',
        replace: true,
        link: function (scope, element, attributes) {
            element.bind('submit', function (e) {
                e.preventDefault();
                // Set all the fields to dirty and apply the changes on the scope so that
                // validation errors are shown on submit only.
                angular.forEach( scope.createProjectForm , function ( formElement , fieldName ) {
                    // If the fieldname starts with a '$' sign, it means it's an Angular
                    // property or function. Skip those items.
                    if ( fieldName[0] === '$' ) return;
                    formElement.$pristine = false;
                    formElement.$dirty = true;
                });
                scope.$apply();
                if (scope.createProjectForm.$valid) {
                    alert('it is valid');
                }
                else{
                  //  console.log(scope.createProjectForm);
                   angular.element('.ng-invalid').focus();
                }
                element.addClass('submitted');
            });
        }
    };
})