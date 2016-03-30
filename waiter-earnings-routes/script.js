angular.module('waiterEarnings', ['ngRoute', 'ngAnimate'])
    .filter('percentage', ['$filter', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input*100, decimals)+'%';
        };
    }])

    .controller('inputCtrl', function($scope, $rootScope){

        $scope.customerSubTotal = 0;
        $scope.customerTip = 0;
        $scope.customerTotal = 0;
        $scope.earningsTipTotalCount = 0;
        $scope.earningsTipTotal = 0;
        $scope.earningsAvgTip = 0;
        //if tipArray exsists, leave it be, if not set it
        $rootScope.tipArray = ( typeof $rootScope.tipArray != 'undefined' && $rootScope.tipArray instanceof Array ) ? $rootScope.tipArray : [];

        // is this logical for the percent?
        roundedPercentage = function(myValue){
            return myValue * .01;
        }
        $scope.formCancel = function(clickEvent) {
            $scope.mealDetails.$setPristine();
            $scope.mealDetails.$setUntouched();
            $scope.baseMealPrice  = '';
            $scope.taxRate = '';
            $scope.tipPercent = '';
        }

        $scope.submitMealDetails = function(){
            $scope.taxRateRound = roundedPercentage($scope.taxRate);
            $scope.tipPercentRound = roundedPercentage($scope.tipPercent);

            if ($scope.mealDetails.$valid) {
                $scope.customerSubTotal = $scope.baseMealPrice + ($scope.taxRateRound * $scope.baseMealPrice);
                $scope.customerTip = $scope.customerSubTotal * $scope.tipPercentRound;
                $scope.customerTotal = ($scope.customerSubTotal) + ($scope.customerTip) * $scope.tipPercentRound;
                $rootScope.tipArray.push($scope.customerTip);
            }
        }
    })
    .controller('myEarnings', function($scope, $rootScope){
      $scope.phtaxRatePrice = 0;
      myTotal = 0;
      for(var i = 0, len = $rootScope.tipArray.length; i < len; i++) {
          myTotal += $rootScope.tipArray[i];
      }
     $scope.earningsTipTotal = myTotal;
     $scope.earningsMealCount = $rootScope.tipArray.length;
     $scope.earningsAvgTip = $scope.earningsTipTotal / $scope.earningsMealCount;

     $scope.formReset = function(clickEvent) {
         $rootScope.tipArray = [];
         $scope.earningsTipTotal = 0;
         $scope.earningsMealCount = 0;
         $scope.earningsAvgTip = 0;
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
            controller : 'myEarnings'
          }).when('/error', {
    		    template : 'Error Page Not Found'
    	    })
      		.otherwise({
      			redirectTo : '/error'
      		});


    		});
