(function(){
    angular.module('catalogApp')
    .controller('CatalogCtrl', function($scope, $state, $stateParams, dataService, lodash, $rootScope, $window, $timeout) {
            $scope.getProducts = dataService.getProducts();
            $scope.getCatalog = dataService.getCatalog();
            $scope.catByCatUrl = dataService.catByCatUrl();

            //SIMULATE ANY REQUEST PAGE
            //var simulateRequestUrl = 'http://numeproducts.com';
            //SIMULATE ANY REQUEST PAGE
            //var simulateRequestUrl = 'http://numeproducts.com/styling-tools/flat-irons';
            //var simulateRequestUrl = 'http://numeproducts.com/durrrrr';
            //$scope.catByCatUrl.push(simulateRequestUrl);

            //SIMULATE ANY REQUEST PAGE
           // $scope.requestedPage = simulateRequestUrl;

            //console.log($state.$current.self.name);

           $rootScope.requestedPage = $rootScope.requestedPage || $window.location.href;
           $scope.requestedPage = $rootScope.requestedPage;
            //SIMULATE ANY REQUEST PAGE
            //$rootScope.requestedPage = simulateRequestUrl || $window.location.href;

            var requestedPage = $scope.requestedPage;

            // WHATS up with the back button animation?
            //breakpoints, wtf

            // can I handle 404's coming back from my promise? should I?
            // how should I do the proxy request for the json file on s3? cors?

            // run-sequence gulp-sass gulp-angulartemplatecache

            // THIS IS INFURATING, how do i do this with lodash?? why won't it work like the others from the dataservice?
            isRequestInListOfCats = jQuery.inArray(requestedPage, $scope.catByCatUrl);

            if(isRequestInListOfCats != -1) {
                console.log('Requested: ' + requestedPage);
                console.log('Is in list of cats?: ' + isRequestInListOfCats);
                if (isRequestInListOfCats != -1) {
                    if ($rootScope.requestPolling != false) {
                        $scope.requestPolling = true;
                        $rootScope.requestPolling = $scope.requestPolling;
                    }
                }
            }
        // In your main controller
        $rootScope.$on('animStart', function ($event, element, speed) {
            // do something

        });

        $rootScope.$on('animEnd', function ($event, element, speed) {
            // do something

        });
        $rootScope.$on("$stateChangeStart", function() {
            if(!$rootScope.whichState){
                //if product detail ctrl jump to scroll position
                $rootScope.scrollValue = jQuery(window).scrollTop();
               // console.log('set scroll value: ' + $rootScope.scrollValue);
               // alert($state['current'].controller);
            }
        });

        $scope.$on('$stateChangeSuccess', function () {
            //this varible on the rootscope will only return true if loaded by the product-detail state.
            $rootScope.whichState = $state.is('product-details');
            //if not product detail ctrl log scroll position
            if(!$rootScope.whichState) {
               // console.log('scrolled to: ' + $rootScope.scrollValue);
                $timeout(function () {
                    jQuery(window).scrollTop($rootScope.scrollValue);
                }, 650);
            }
        });


    });
}());