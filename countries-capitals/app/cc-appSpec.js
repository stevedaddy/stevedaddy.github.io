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
