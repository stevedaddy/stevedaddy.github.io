describe('FILTER: kms', function(){ 
// You can put anything in the string here,
// I like declaring FILTER: myFilterName, but it 
// could be just the filter name.

var testTheFilter;
// This variable does not have to match the describe name, call it what you wish,
// but use this variable in any it blocks below.

beforeEach(module('ccApp')); // Include app - boilerplate.

beforeEach(inject(function(kmsFilter){
	// If your test variable name is the same as 'actualFilterNameFilter' then you would 
	// use this name '_actualFilterNameFilter_' with underscores; The Angularjs injector will
	// remove the underscores for you.
	// IMPORTANT PART: The important part here is the trailing 'Filter' name. This is how Angularjs
	// Knows to grab the filter title "actualFilterName" in this case.
  testTheFilter = kmsFilter;
}));
 // This is where you actually include the filter for testing.
 // Use the underscores if your variable name is the exact same as the injected parameter.
 // This is where you would use your variable name from above.

  it('It should add sq km to the end of the numeber', function(){
    expect(testTheFilter(127)).toEqual('127 sq km');
  });
  //always test the bad case as well as the good one.
   it('It should add sq km to the end of the numeber', function(){
    expect(testTheFilter('steve')).toEqual('You must enter a number.');
  });
});

//test country list import from api2 factroy
describe("FACTORY: api2", function () {
    beforeEach(module('ccApp'));

    var api, httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
            httpBackend = $injector.get('$httpBackend');
            api2 = $injector.get('api2');
        })
    });

    describe('importCountries', function () {
        it("should return a list of countries", inject(function () {
            httpBackend.expectGET('http://api.geonames.org/countryInfo?type=JSON&username=stzy').respond([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            api2.importCountries(function (result) {
                expect(result).toEqual([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            });
            httpBackend.flush();
        }))
    })
});

//test country capitals, counrty info, and neighbors functions in api factory
describe("FACTORY: api searchThisCountryInfo", function () {
    beforeEach(module('ccApp'));

    var api, httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
           	httpBackend = $injector.get('$httpBackend');
            api = $injector.get('api');
            stateParams = $injector.get('$stateParams');
        })
    });

    describe('searchNeighbors', function () {
        it("should return a list of countries", inject(function ($stateParams) {
            httpBackend.expectGET('http://api.geonames.org/neighboursJSON?username=stzy').respond([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            api.searchNeighbors(function (result) {
                expect(result).toEqual([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            });
            httpBackend.flush();
        }))
    })
});
describe("FACTORY: api searchThisCountryInfo", function () {
    beforeEach(module('ccApp'));

    var api, httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
           	httpBackend = $injector.get('$httpBackend');
            api = $injector.get('api');
            stateParams = $injector.get('$stateParams');
        })
    });

    describe('searchThisCountryInfo', function () {
        it("should return a list of countries", inject(function ($stateParams) {
            httpBackend.expectGET('http://api.geonames.org/neighboursJSON?username=stzy').respond([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            api.searchNeighbors(function (result) {
                expect(result).toEqual([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            });
            httpBackend.flush();
        }))
    })
});
describe("FACTORY: api searchCapitals", function () {
    beforeEach(module('ccApp'));

    var api, httpBackend;
    beforeEach(function () {
        angular.mock.inject(function ($injector) {
           	httpBackend = $injector.get('$httpBackend');
            api = $injector.get('api');
            stateParams = $injector.get('$stateParams');
        })
    });

    describe('searchCapitals', function () {
        it("should return a list of countries", inject(function ($stateParams) {
            httpBackend.expectGET('http://api.geonames.org/neighboursJSON?username=stzy').respond([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            api.searchNeighbors(function (result) {
                expect(result).toEqual([{"countryName":"Andorra","currencyCode":"EUR","fipsCode":"AN","countryCode":"AD","isoNumeric":"020","north":42.65604389629997,"capital":"Andorra la Vella","continentName":"Europe","areaInSqKm":"468.0","languages":"ca","isoAlpha3":"AND","continent":"EU","south":42.42849259876837,"east":1.7865427778319827,"geonameId":3041565,"west":1.4071867141112762,"population":"84000"},{"countryName":"United Arab Emirates","currencyCode":"AED","fipsCode":"AE","countryCode":"AE","isoNumeric":"784","north":26.08415985107422,"capital":"Abu Dhabi","continentName":"Asia","areaInSqKm":"82880.0","languages":"ar-AE,fa,en,hi,ur","isoAlpha3":"ARE","continent":"AS","south":22.633329391479492,"east":56.38166046142578,"geonameId":290557,"west":51.58332824707031,"population":"4975593"},{"countryName":"Afghanistan","currencyCode":"AFN","fipsCode":"AF","countryCode":"AF","isoNumeric":"004","north":38.483418,"capital":"Kabul","continentName":"Asia","areaInSqKm":"647500.0","languages":"fa-AF,ps,uz-AF,tk","isoAlpha3":"AFG","continent":"AS","south":29.377472,"east":74.879448,"geonameId":1149361,"west":60.478443,"population":"29121286"},{"countryName":"Antigua and Barbuda","currencyCode":"XCD","fipsCode":"AC","countryCode":"AG","isoNumeric":"028","north":17.729387,"capital":"St. John's","continentName":"North America","areaInSqKm":"443.0","languages":"en-AG","isoAlpha3":"ATG","continent":"NA","south":16.996979,"east":-61.672421,"geonameId":3576396,"west":-61.906425,"population":"86754"},{"countryName":"Anguilla","currencyCode":"XCD","fipsCode":"AV","countryCode":"AI","isoNumeric":"660","north":18.283424,"capital":"The Valley","continentName":"North America","areaInSqKm":"102.0","languages":"en-AI","isoAlpha3":"AIA","continent":"NA","south":18.166815,"east":-62.971359,"geonameId":3573511,"west":-63.172901,"population":"13254"},{"countryName":"Albania","currencyCode":"ALL","fipsCode":"AL","countryCode":"AL","isoNumeric":"008","north":42.665611,"capital":"Tirana","continentName":"Europe","areaInSqKm":"28748.0","languages":"sq,el","isoAlpha3":"ALB","continent":"EU","south":39.648361,"east":21.068472,"geonameId":783754,"west":19.293972,"population":"2986952"}]);
            });
            httpBackend.flush();
        }))
    })
});
