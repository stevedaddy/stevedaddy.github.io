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
})

//.directive('customSubmit', function(){
//    return {
//        restrict: 'A',
//        link: function( scope , element , attributes )
//        {
//            element.bind('submit', function(e) {
//                e.preventDefault();
//                ['input', 'textarea', 'select'].forEach(function(e){
//                    element.find(e).removeClass('ng-pristine');
//                });
//                // Get the form object
//                var form = scope[ attributes.name ];
//
//                // Set all the fields to dirty and apply the changes on the scope so that
//                // validation errors are shown on submit only.
//                angular.forEach( form , function ( formElement , fieldName ) {
//                    // If the fieldname starts with a '$' sign, it means it's an Angular
//                    // property or function. Skip those items.
//                    if ( fieldName[0] === '$' ) return;
//                    formElement.$pristine = false;
//                    formElement.$dirty = true;
//                });
//                scope.$apply();
//
//                // Do not continue if the form is invalid.
//                if ( form.$invalid ) {
//                    // Focus on the first field that is invalid.
//                    //$element.find('.ng-invalid').first().focus();
//                    //
//                    return false;
//                }
//               else{
//                    alert('Valid submission!');
//                }
//                // From this point and below, we can assume that the form is valid.
//                scope.$eval( attributes.customSubmit );
//                scope.$apply();
//            });
//        }
//    };
//})
//
//function canvasDirective () {
//    var link = function () {
//        var canvas = document.getElementById('canvas'),
//            context = canvas.getContext('2d'),
//            testText = 'Test it!';
//
//        canvas.width = 200;
//        canvas.height = 200;
//
//        context.fillStyle = '#cccccc';
//        context.fillRect(0, 0, canvas.width, canvas.height);
//
//        context.font = 'bold 32px Arial';
//        context.textAlign = 'center';
//        context.fillStyle = 'white';
//
//        context.fillText(testText, 100, 100);
//        context.strokeText(testText, 100, 100);
//    }
//
//    return {
//        restrict: 'A',
//        link: link,
//        templateUrl: 'canvas.html'
//    }
//}



    .directive('aGreatEye', function () {
        return {
            restrict: 'E',
            replace: true,
            template: '<h1>lidless, wreathed in flame, {{1 + 1}} times</h1>'
        };
    })
//    .directive('myProfile', function(){
//        return {
//            restrict: 'E',
//            template: '<div>{{user.name}}</div>',
//            //templateUrl: 'path/template.tpl.html'
//            scope: {
//                user: '=data'
//            },
//            replace: true
//        };
//    })
//    .directive('canvasDirective', canvasDirective)
//    .directive("myDirective", function() {
//        return {
//            template: "<div>Hello this is my directive!</div>"
//        }
//    })