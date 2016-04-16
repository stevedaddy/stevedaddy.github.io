'use strict';

angular.module('MyApp', [
    'ui.bootstrap',
    'ngMessages',
    'ngAnimate'
])



/**
 * Custom submit directive that will only submit when all the validation has passed
 * for all the fields. This extends on the ng-submit directive provided by AngularJS.
 *
 * This directive will also remove the 'pristine' flag from all the fields when
 * hitting submit, allowing the form to display no errors until the submit button
 * is clicked/enter is pressed.
 *
 * The variable 'app' is the instance of a module.
 * E.g. var app = angular.module('my-app', []);
 */
.directive('optIn', function() {
    return {
        restrict: 'E',
        transclude: true,
        templateUrl: 'loginView.html',
        replace: true
    }
})
.directive('customSubmit', function()
{
    return {
        restrict: 'A',
        link: function( scope , element , attributes )
        {
            element.bind('submit', function(e) {
                e.preventDefault();

                ['input', 'textarea', 'select'].forEach(function(e){
                    element.find(e).removeClass('ng-pristine');
                });

                // Get the form object.
                var form = scope[ attributes.name ];

                // Set all the fields to dirty and apply the changes on the scope so that
                // validation errors are shown on submit only.
                angular.forEach( form , function ( formElement , fieldName ) {
                    // If the fieldname starts with a '$' sign, it means it's an Angular
                    // property or function. Skip those items.
                    if ( fieldName[0] === '$' ) return;

                    formElement.$pristine = false;
                    formElement.$dirty = true;
                });
                scope.$apply();

                // Do not continue if the form is invalid.
                if ( form.$invalid ) {
                    // Focus on the first field that is invalid.
                    //$element.find('.ng-invalid').first().focus();
                    //
                    return false;
                }

                // From this point and below, we can assume that the form is valid.
                scope.$eval( attributes.customSubmit );
                scope.$apply();
            });
        }
    };
});