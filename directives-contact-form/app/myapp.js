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
        //controller: 'optIn',
        replace: true
    }
})
.directive('customSubmit', function(){
    return {
        restrict: 'A',
        link: function( scope , element , attributes )
        {
            element.bind('submit', function(e) {
                e.preventDefault();
                ['input', 'textarea', 'select'].forEach(function(e){
                    element.find(e).removeClass('ng-pristine');
                });
                // Get the form object
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
               else{
                    alert('Valid submission!');
                }
                // From this point and below, we can assume that the form is valid.
                scope.$eval( attributes.customSubmit );
                scope.$apply();
            });
        }
    };
});
//
//
//.controller('SignUpCtrl', [
//    '$scope', '$q', 'setFormErrors',
//    function($scope, $q, setFormErrors) {
//        var serverErrors = this.serverErrors = {};
//
//        this.signup = function(user) {
//            fakeUserCreate(user).then(function() {
//                // Success
//            }, function(errors) {
//                // Failed
//                setFormErrors({
//                    formName: 'signUpForm',
//                    fieldErrors: errors
//                });
//            });
//        };
//
//        function fakeUserCreate() {
//            return $q.reject({username: ['This username is taken']});
//        }
//    }
//])
//
//.factory('setFormErrors', function() {
//    // Registered withErrors controllers
//    var withErrorCtrls = [];
//
//    // The exposed service
//    var setFormErrors = function(opts) {
//        var fieldErrors = opts.fieldErrors;
//        var ctrl = withErrorCtrls[opts.formName];
//
//        Object.keys(fieldErrors).forEach(function(fieldName) {
//            ctrl.setErrorsFor(fieldName, fieldErrors[fieldName]);
//        });
//    };
//
//    // Registers withErrors controller by form name (for internal use)
//    setFormErrors._register = function(formName, ctrl) {
//        withErrorCtrls[formName] = ctrl;
//    };
//
//    return setFormErrors;
//})
//
//.directive('withErrors', ['setFormErrors', function(setFormErrors) {
//    return {
//        restrict: 'A',
//        require: 'withErrors',
//        controller: ['$scope', '$element', function($scope, $element) {
//            var controls = {};
//
//            this.addControl = function(fieldName, ctrl) {
//                controls[fieldName] = ctrl;
//            };
//
//            this.setErrorsFor = function(fieldName, errors) {
//                if (!(fieldName in controls)) return;
//                return controls[fieldName].setErrors(errors);
//            };
//
//            this.clearErrorsFor = function(fieldName, errors) {
//                if (!(fieldName in controls)) return;
//                return controls[fieldName].clearErrors(errors);
//            };
//        }],
//        link: function(scope, element, attrs, ctrl) {
//            // Make this form controller accessible to setFormErrors service
//            setFormErrors._register(attrs.name, ctrl);
//        }
//    };
//}])
//
//.directive('input', function() {
//    return {
//        restrict: 'E',
//        require: ['?ngModel', '?^withErrors'],
//        scope: true,
//        link: function(scope, element, attrs, ctrls) {
//            var ngModelCtrl = ctrls[0];
//            var withErrorsCtrl = ctrls[1];
//            var fieldName = attrs.name;
//
//            if (!ngModelCtrl || !withErrorsCtrl) return;
//
//            // Watch for model changes and set errors if any
//            scope.$watch(attrs.ngModel, function() {
//                if (ngModelCtrl.$dirty && ngModelCtrl.$invalid) {
//                    withErrorsCtrl.setErrorsFor(fieldName, errorMessagesFor(ngModelCtrl));
//                } else if (ngModelCtrl.$valid) {
//                    withErrorsCtrl.clearErrorsFor(fieldName);
//                }
//            });
//
//            // Mapping Angular validation errors to a message
//            var errorMessages = {
//                required: 'This field is required'
//            };
//
//            function errorMessagesFor(ngModelCtrl) {
//                return Object.keys(ngModelCtrl.$error).
//                    map(function(key) {
//                        if (ngModelCtrl.$error[key]) return errorMessages[key];
//                        else return null;
//                    }).
//                    filter(function(msg) {
//                        return msg !== null;
//                    });
//            }
//        }
//    }
//})
//
//.directive('fielderrors', function() {
//    return {
//        restrict: 'E',
//        replace: true,
//        scope: true,
//        require: ['fielderrors', '^withErrors'],
//        template:
//        '<div ng-repeat="error in errors">' +
//        '<small class="error">{{ error }}</small>' +
//        '</div>',
//        controller: ['$scope', function($scope) {
//            $scope.errors = [];
//            this.setErrors = function(errors) {
//                $scope.errors = errors;
//            };
//            this.clearErrors = function() {
//                $scope.errors = [];
//            };
//        }],
//        link: function(scope, element, attrs, ctrls) {
//            var fieldErrorsCtrl = ctrls[0];
//            var withErrorsCtrl = ctrls[1];
//            withErrorsCtrl.addControl(attrs.for, fieldErrorsCtrl);
//        }
//    };
//});