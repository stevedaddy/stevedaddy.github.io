(function(){
    angular.module('catalogApp')
        .controller('ProductCtrl', function($scope, $state, $stateParams, dataService, $rootScope){
            $scope.product = $scope.product || $stateParams.productId;
            $scope.product = dataService.productByProductId($stateParams.productId);
              //console.log($scope.product);
                if($scope.product) {
                    $scope.productBy = dataService.productByProductUrl($scope.product.ProductUrl);
                    $rootScope.requestedPage = $scope.product.ProductUrl;
                     //   console.log($scope.product.ProductUrl);
                     //   console.log($scope.productBy);
                        if(dataService.productByProductUrl($scope.product.ProductUrl)){
                            if ($rootScope.requestPolling != false){
                                $scope.requestPolling = true;
                                $rootScope.requestPolling = $scope.requestPolling;
                            }
                        }
                }
                else{
                    $state.go('catalog', {}, {location: false});
                }
        });
}());