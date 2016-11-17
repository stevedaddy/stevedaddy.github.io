(function(){
    var catalogApp = angular.module('catalogApp', ['ngAnimate', "ui.router", "angular.filter", 'anim-in-out', 'angular-flexslider', 'toastr'])
        .value('lodash', _)
        .run(function(dataService){
            dataService.importProducts();
        });


}());