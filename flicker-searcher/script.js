angular.module('flickerSearcher', ['ngAnimate'])
.config(function($httpProvider) {
	$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];
})
.controller('inputCtrl', ['$scope', '$http', '$sce' ,function($scope, $http, $sce){
  $scope.embedUrl = "http://www.youtube.com/embed/";

  $scope.trustSrc = function(src) {
  	  return $sce.trustAsResourceUrl(src);
  	};

	$scope.searchFlicker = function(searcher) {

  	$scope.searcher = searcher;

	  var url = "https://api.flickr.com/services/rest";
	  var request = {
      method: 'flickr.photos.search',
      api_key: "931379d9b6ef90c6afadec74eb33df82",
      tags: $scope.searcher,
      format: 'json',
      nojsoncallback: 1
	  };

	  $http({
		  method: 'GET',
		  url: url,
		  params: request
	  })
	  .then(function(response) {
    //  console.log(response);
		  $scope.results = response.data.photos.photo;
    //  console.log($scope.results);
	  },
	  function(response) {
		  alert('error');
	  });
  };



  $scope.ph_searcher = 'Enter a tag to search for';
  $scope.submit = function(){
      if( $scope.searchForm.$valid ) {
        // $scope.searcher = '';
        //$scope.ph_searcher = '';
      } else {
          // console.log('The form is invalid');
      }
  }

}]);
