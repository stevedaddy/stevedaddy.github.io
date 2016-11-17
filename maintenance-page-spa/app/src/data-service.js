(function(){
    angular.module('catalogApp')
        .factory('dataService', function($http, $q, lodash){
            var products = [],
                catalog = [];
            return {
                importProducts: importProducts,
                getProducts: getProducts,
                getCatalog: getCatalog,
                productByProductId: productByProductId,
                productByProductUrl: productByProductUrl,
                catByCatUrl: catByCatUrl
            };
            function importProducts() {
                return $http.get('./resources/catalog.json', {cache: true})
                    .then(function(response){
                        products = products.concat(response.data.Products);
                        catalog = catalog.concat(response.data.Categories);
                    });
            }
            function catByCatUrl(catUrl){
               return _.map(catalog, 'CategoryUrl');
                //  return lodash.find(catalog, {categoryUrl: categoryUrl});
            }
            function productByProductId(productId) {
                return lodash.find(products, {ProductUniqueID: productId});
            }
            function productByProductUrl(productUrl) {
                return lodash.find(products, {ProductUrl: productUrl});
            }
            function getProducts(){
                return products;
            }
            function getCatalog(){
                return catalog;
            }
        });
}())