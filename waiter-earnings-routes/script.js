angular.module('waiterEarnings', ['ngRoute', 'ngAnimate'])
    .filter('percentage', ['$filter', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input*100, decimals)+'%';
        };
    }])
    .controller('inputCtrl', function($scope, $rootScope){
    //should I set these as constants?
        $rootScope.phtaxRatePrice = 0;
        $rootScope.customerSubTotal = 0;
        $rootScope.customerTip = 0;
        $rootScope.customerTotal = 0;
        $rootScope.earningsTipTotalCount = 0;
        $rootScope.earningsTipTotal = 0;
        $rootScope.earningsAvgTip = 0;


    // is this logical for the percent?
        roundedPercentage = function(myValue){
            return myValue * .01;
        }
        $scope.formCancel = function(clickEvent) {
            // Set back to pristine.
            $scope.mealDetails.$setPristine();
            // Since Angular 1.3, set back to untouched state.
            $scope.mealDetails.$setUntouched();
            $scope.baseMealPrice  = '';
            $scope.taxRate = '';
            $scope.tipPercent = '';
        }
        $scope.formReset = function(clickEvent) {
            // Set back to pristine.
            $rootScope.mealDetails.$setPristine();
            // Since Angular 1.3, set back to untouched state.
            $rootScope.mealDetails.$setUntouched();
            $rootScope.baseMealPrice  = '';
            $rootScope.taxRate = '';
            $rootScope.tipPercent = '';
            $rootScope.customerSubTotal = '';
            $rootScope.customerTip =  '';
            $rootScope.customerTotal = '';
            $rootScope.earningsTipTotalCount = 0;
            $rootScope.earningsTipTotal = 0;
            $rootScope.earningsMealCount = 0;
            $rootScope.earningsAvgTip = 0;
        }
        $scope.submitMealDetails = function(){
            $rootScope.taxRateRound = roundedPercentage($rootScope.taxRate);
            $rootScope.tipPercentRound = roundedPercentage($rootScope.tipPercent);

            if ($scope.mealDetails.$valid) {
              //  console.log($scope.earningsTipTotal + ' by ' + $scope.earningsMealCount);
                $rootScope.customerSubTotal = $scope.baseMealPrice + ($rootScope.taxRateRound * $rootScope.baseMealPrice);
                $rootScope.customerTip = $rootScope.customerSubTotal * $rootScope.tipPercentRound;
                $rootScope.customerTotal = ($rootScope.customerSubTotal) + ($rootScope.customerTip) * $rootScope.tipPercentRound;
                //  $rootScope.customerTotal = $filter('currency')($rootScope.customerTotal);

                if (typeof $rootScope.earningsMealCount != 'undefined') {
                    $rootScope.earningsTipTotal = $scope.customerTip + $rootScope.earningsTipTotal;
                    $rootScope.earningsMealCount = $rootScope.earningsMealCount + 1;
                //  console.log($scope.earningsTipTotal + ' by ' + $scope.earningsMealCount);
                    $rootScope.earningsAvgTip = $rootScope.earningsTipTotal / $rootScope.earningsMealCount;
                }
                else {
                    $rootScope.earningsMealCount = 1;
                    $rootScope.earningsTipTotalCount = 0;
                    $rootScope.earningsTipTotal = $rootScope.earningsTipTotal + $rootScope.earningsTipTotalCount;
                    $rootScope.earningsAvgTip = $rootScope.earningsAvgTip;
                }
            }
        }
    })

    .config(function($routeProvider) {
          $routeProvider.when('/', {
            templateUrl : 'home.html',
            controller : 'inputCtrl'
          }).when('/new-meal/', {
            templateUrl : 'new-meal.html',
            controller : 'inputCtrl'
          }).when('/my-earnings/', {
            templateUrl : 'my-earnings.html',
            controller : 'inputCtrl'
          }).when('/error', {
    		    template : 'Error Page Not Found'
    	    })
      		.otherwise({
      			redirectTo : '/error'
      		});


    		});
