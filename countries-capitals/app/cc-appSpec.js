//test for kms filter
describe('Filter: kms', function() {
    var kmsFilter;
    beforeEach(module('ccApp'));
    beforeEach(inject(function(_kmsFilter_) {
        kmsFilter = _kmsFilter_;
    }));
    it('should be able to uppercase an entire input', function() {
        expect(kmsFilter(127)).toBe(127 + ' sq km');
        expect(kmsFilter(333)).toBe(333 + ' sq km');
    });
});
//describe('app: ccApp', function() {
//    beforeEach(module('ccApp'));
//    var $controller;
//    beforeEach(inject(function(_$controller_) {
//        $controller = _$controller_;
//    }));
//    // Factory of interest is called MyFactory
//    describe('factory: api2', function() {
//        var factory = null;
//        beforeEach(inject(function(api2) {
//            factory = api2;
//        }))
//        // Setup the mock service in an anonymous module.
//        beforeEach(module(function ($provide) {
//            $provide.value('importCountries', {
//                someVariable: 1
//            });
//        }));
//        it('Should define methods', function() {
//            expect(factory.importCountries).toBeDefined();
//           // expect(factory.importCountries).toBe();
//
//           // expect(api2.beAwesome).toEqual(jasmine.any(Function))
//        });
//    });
//});
//
//describe('http', function() {
//
//    beforeEach(module('ccApp'));
//
//    var api;
//    var $httpBackend;
//
//    beforeEach(inject(function(_api_, _$httpBackend_) {
//        api = _api_;
//        $httpBackend = _$httpBackend_;
//    }));
//
//    describe('when sending a message', function() {
//        beforeEach(function() {
//            $httpBackend.expectGET('http://api.geonames.org/countryInfo?country=US&type=JSON&username=stzy',  {"Accept":"application/json, text/plain, */*"})
//                .respond(200, {countryCode: 'US'});
//
//            api.searchThisCountryInfo('US');
//            $httpBackend.flush();
//        });
//
//        it('should send an HTTP POST request', function() {
//            $httpBackend.verifyNoOutstandingExpectation();
//            $httpBackend.verifyNoOutstandingRequest();
//        });
//    });
//});
//describe("api2", function() {
//    beforeEach(module('ccApp'));
//
//    it('should query the backend when the username is checked',
//        inject(function(api2, $rootScope, $httpBackend) {
//            $httpBackend.expect('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=stzy');
//            var status = false;
//            api2.importCountries().then(function() {
//                status = true;
//            });
//            $rootScope.$digest();
//            $httpBackend.flush();
//            expect(status).toBe(true);
//            $httpBackend.verifyNoOutstandingRequest();
//        }));
//});
it('should demonstrate using when (200 status)', inject(function($http, $httpBackend) {
    var $scope = {};
    /* HOW DO I INJECT THIS??? */
    $http.get('http://api.geonames.org/countryInfo?type=JSON&username=stzy')
        .success(function(data, status, headers, config) {
            $scope.valid = true;
            $scope.response = data;
        })
        .error(function(data, status, headers, config) {
            $scope.valid = false;
        });
    /* End */
    cacheData = [{"continent":"EU","capital":"Andorra la Vella","languages":"ca","geonameId":3041565,"south":42.42849259876837,"isoAlpha3":"AND","north":42.65604389629997,"fipsCode":"AN","population":"84000","east":1.7865427778319827,"isoNumeric":"020","areaInSqKm":"468.0","countryCode":"AD","west":1.4071867141112762,"countryName":"Andorra","continentName":"Europe","currencyCode":"EUR"},
    {"continent":"AS","capital":"Abu Dhabi","languages":"ar-AE,fa,en,hi,ur","geonameId":290557,"south":22.633329391479492,"isoAlpha3":"ARE","north":26.08415985107422,"fipsCode":"AE","population":"4975593","east":56.38166046142578,"isoNumeric":"784","areaInSqKm":"82880.0","countryCode":"AE","west":51.58332824707031,"countryName":"United Arab Emirates","continentName":"Asia","currencyCode":"AED"},
    {"continent":"AS","capital":"Kabul","languages":"fa-AF,ps,uz-AF,tk","geonameId":1149361,"south":29.377472,"isoAlpha3":"AFG","north":38.483418,"fipsCode":"AF","population":"29121286","east":74.879448,"isoNumeric":"004","areaInSqKm":"647500.0","countryCode":"AF","west":60.478443,"countryName":"Afghanistan","continentName":"Asia","currencyCode":"AFN"},
    {"continent":"NA","capital":"St. John's","languages":"en-AG","geonameId":3576396,"south":16.996979,"isoAlpha3":"ATG","north":17.729387,"fipsCode":"AC","population":"86754","east":-61.672421,"isoNumeric":"028","areaInSqKm":"443.0","countryCode":"AG","west":-61.906425,"countryName":"Antigua and Barbuda","continentName":"North America","currencyCode":"XCD"},
    {"continent":"NA","capital":"The Valley","languages":"en-AI","geonameId":3573511,"south":18.166815,"isoAlpha3":"AIA","north":18.283424,"fipsCode":"AV","population":"13254","east":-62.971359,"isoNumeric":"660","areaInSqKm":"102.0","countryCode":"AI","west":-63.172901,"countryName":"Anguilla","continentName":"North America","currencyCode":"XCD"},
    {"continent":"EU","capital":"Tirana","languages":"sq,el","geonameId":783754,"south":39.648361,"isoAlpha3":"ALB","north":42.665611,"fipsCode":"AL","population":"2986952","east":21.068472,"isoNumeric":"008","areaInSqKm":"28748.0","countryCode":"AL","west":19.293972,"countryName":"Albania","continentName":"Europe","currencyCode":"ALL"},
    {"continent":"AS","capital":"Yerevan","languages":"hy","geonameId":174982,"south":38.830528,"isoAlpha3":"ARM","north":41.301834,"fipsCode":"AM","population":"2968000","east":46.772435045159995,"isoNumeric":"051","areaInSqKm":"29800.0","countryCode":"AM","west":43.44978,"countryName":"Armenia","continentName":"Asia","currencyCode":"AMD"},
    {"continent":"AF","capital":"Luanda","languages":"pt-AO","geonameId":3351879,"south":-18.042076,"isoAlpha3":"AGO","north":-4.376826,"fipsCode":"AO","population":"13068161","east":24.082119,"isoNumeric":"024","areaInSqKm":"1246700.0","countryCode":"AO","west":11.679219,"countryName":"Angola","continentName":"Africa","currencyCode":"AOA"}];
    var ids = [];
    var idso = [];
    for (key in cacheData) {
        for (countryCode in cacheData[key]) {
            thisPush = cacheData[key][countryCode,'countryCode'];
        }
        ids.push(thisPush);
    }
    for(key in cacheData) {
        for (countryCode in cacheData[key]) {
            thisPush = cacheData[key];
        }
        idso.push(thisPush);
    }
    $httpBackend
        .when('GET', 'http://api.geonames.org/countryInfo?type=JSON&username=stzy')
        .respond(200, cacheData);
    $httpBackend.flush();
    expect($scope.valid).toBe(true);
    expect($scope.response).toEqual(cacheData);
    expect($scope.response).toEqual(idso);
}));