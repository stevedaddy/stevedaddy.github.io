(function(){
    angular.module('catalogApp')
        .controller('ErrorCtrl', function($scope, $state, dataService, $rootScope) {
            $scope.getProducts = dataService.getProducts();
            $scope.getCatalog = dataService.getCatalog();
            $rootScope.requestPolling = false;
            console.log('real 404');
            // In your main controller
            $rootScope.$on('animStart', function ($event, element, speed) {
                // do something
            });

            $rootScope.$on('animEnd', function ($event, element, speed) {
                // do something
            });

        });
}());