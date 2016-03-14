angular.module('waiterEarnings', [])
    .filter('percentage', ['$filter', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input*100, decimals)+'%';
        };
    }])
    .controller('inputCtrl', function($scope){
    //should I set these as constants?
        $scope.phtaxRatePrice = 0;
        $scope.customerSubTotal = 0;
        $scope.customerTip = 0;
        $scope.customerTotal = 0;
        $scope.earningsTipTotalCount = 0;
        $scope.earningsTipTotal = 0;
        $scope.earningsAvgTip = 0;

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
            $scope.mealDetails.$setPristine();
            // Since Angular 1.3, set back to untouched state.
            $scope.mealDetails.$setUntouched();
            $scope.baseMealPrice  = '';
            $scope.taxRate = '';
            $scope.tipPercent = '';
            $scope.customerSubTotal = '';
            $scope.customerTip =  '';
            $scope.customerTotal = '';
            $scope.earningsTipTotalCount = 0;
            $scope.earningsTipTotal = 0;
            $scope.earningsMealCount = 0;
            $scope.earningsAvgTip = 0;
        }
        $scope.submitMealDetails = function(){
            $scope.taxRateRound = roundedPercentage($scope.taxRate);
            $scope.tipPercentRound = roundedPercentage($scope.tipPercent);

            if ($scope.mealDetails.$valid) {
                console.log('The form is valid');
                $scope.customerSubTotal = $scope.baseMealPrice + ($scope.taxRateRound * $scope.baseMealPrice);
                $scope.customerTip = $scope.customerSubTotal * $scope.tipPercentRound;
                $scope.customerTotal = ($scope.customerSubTotal) + ($scope.customerTip) * $scope.tipPercentRound;
                //  $scope.customerTotal = $filter('currency')($scope.customerTotal);

                if (typeof $scope.earningsMealCount != 'undefined') {
                    $scope.earningsTipTotal = $scope.customerTip + $scope.earningsTipTotal;
                    $scope.earningsMealCount = $scope.earningsMealCount + 1;
                  //console.log($scope.earningsTipTotal + ' by ' + $scope.earningsMealCount);
                    $scope.earningsAvgTip = $scope.earningsTipTotal / $scope.earningsMealCount;
                }
                else {
                    $scope.earningsMealCount = 1;
                    $scope.earningsTipTotalCount = 0;
                    $scope.earningsTipTotal = $scope.earningsTipTotal + $scope.earningsTipTotalCount;
                    $scope.earningsAvgTip = $scope.earningsAvgTip;
                }
            }
        }
    });