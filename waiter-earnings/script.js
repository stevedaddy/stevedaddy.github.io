angular.module('waiterEarnings', [])
    .filter('percentage', ['$filter', function($filter) {
        return function(input, decimals) {
            return $filter('number')(input*100, decimals)+'%';
        };
    }])
    //.filter('currency', ['$filter', function($filter) {
    //
    //}])

    .controller('inputCtrl', function($scope){
        $scope.phtaxRatePrice = '0.00';
      //  $scope.taxRatePrice = $scope.taxRate * $scope.baseMealPrice;

        roundedPercentage = function(myValue){
            return myValue * .01;
            //var result = ((myValue/totalValue))
            //return Math.round(result, 2);
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
        }

        $scope.submitMealDetails = function(){
            // console.log($scope.data);
            $scope.taxRateRound = roundedPercentage($scope.taxRate);
            $scope.tipPercentRound = roundedPercentage($scope.tipPercent);
           // console.log($scope.taxRateRounded);


            if( $scope.mealDetails.$valid ) {
                console.log('The form is valid');
             //   $scope.formTab = '!formTab';
                $scope.customerSubTotal = $scope.baseMealPrice + ($scope.taxRateRound * $scope.baseMealPrice);
                $scope.customerTip =  $scope.customerSubTotal * $scope.tipPercentRound;
                $scope.customerTotal = ($scope.customerSubTotal) + ($scope.customerTip) * $scope.tipPercentRound;
              //  $scope.customerTotal = $filter('currency')($scope.customerTotal);
            } else {
                // console.log('The form is invalid');
            }
        }
    });