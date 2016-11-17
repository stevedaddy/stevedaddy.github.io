(function(){
    angular.module('catalogApp')
        .factory('pollRequestedPage', function($http, $timeout, $q, $rootScope, $window, toastr, $location){
            //console.log($rootScope.howLong);
            var leastWaitTime = 10000;
            $rootScope.howLong = $rootScope.howLong || leastWaitTime;

            return {
                checkSite : checkSite,
                startPolling : startPolling
            };

            function checkSite(howlong){
                //THE tests for broken/back online requests

                //SIMULATE SITE OFFLINE
               var requestedPage = $rootScope.requestedPage;
                var offLine = $location.search().online;
                var online = '';
                if(!offLine){
                    var online =  "no.";
                }
                var requestedPageRequestClean =  requestedPage.replace(/^https?\:\/\//i, online);

               $http.get('http://localhost:8080/proxy/'+ requestedPageRequestClean)
                //$http.get('http://localhost:8080/proxy/numeproducts.com/dddd')
                    .then(function(data) {
                        toastr.success('Looks like the page you requested: ' + $rootScope.requestedPage + ' is back online. ', 'Page found!', {
                            allowHtml: true,
                            closeButton: true,
                                onHidden: function() {
                                    console.log('foo');
                                    $window.location.assign($rootScope.requestedPage);
                                }
                        });

                    }, function(data){
                   //     console.log('The product they are viewing is still not returning a 400, do nothing');
                        $rootScope.$emit('howLong', howlong);

                        toastr.error('The page you requested: ' + $rootScope.requestedPage + ' is still offline. ', 'Be back soon!', {
                            allowHtml: true,
                            closeButton: true
                        });
                        intervalFunction(howlong);
                    });
            }

            function intervalFunction (howlong){
                $timeout(function() {
                }, howlong).then(function() {
                    if (howlong < 600000){
                        howlong = howlong * 2;
                    }
                    checkSite(howlong);
                });
            }

            function startPolling(waitTime){
                intervalFunction(waitTime);
            }
        });

}());