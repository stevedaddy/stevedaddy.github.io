describe("myDirective", function() {
    var el, scope, controller;

    beforeEach(inject(function($compile, $rootScope) {

            el = angular.element("<my-directive></my-directive>");
        $compile(el)($rootScope.$new());
        $rootScope.$digest();


        controller = el.controller("myDirective");

            scope = el.isolateScope() || el.scope();
    }))

    it("should do something to the scope", function() {
        expect(scope.isInitialized).toBeDefined()
    })
})