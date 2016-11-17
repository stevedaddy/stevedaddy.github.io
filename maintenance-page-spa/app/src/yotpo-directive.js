(function(){
    angular.module('catalogApp')
    .directive('yotpo', function ($document, $timeout) {
        return {
            restrict: 'AE',
            link: function() {
                function loadWidget() {
                    var e = document.createElement("script");

                    e.type = "text/javascript",
                        e.async = true,
                        e.src = "//staticw2.yotpo.com/5V1JjFE0H9IbFZ7pw1lFdiG15fSS81to6JC3E5ty/widget.js",
                        e.id = "5V1JjFE0H9IbFZ7pw1lFdiG15fSS81to6JC3E5ty";

                    var t = document.getElementsByTagName("script")[0];
                    t.parentNode.insertBefore(e,t);
                }

                loadWidget();

                if (typeof yotpo !== 'undefined') {
                    $timeout(function () {
                        yotpo.initWidgets();
                    }, 500)

                }
            }
        }
    });
}());