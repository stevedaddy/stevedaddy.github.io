

describe('Test input form', function() {
    var $compile, $scope, $templateCache, $document, template,
        html = '<opt-in><div class="brand-logo"></div></opt-in>',
        mockHtml = '<div class="container"> <div class="row"> <div class="col-xs-12 col-sm-6 col-sm-offset-3"> <div class="opt-in"><div ng-transclude></div> <h1>Simple Login Form</h1> <form name="createProjectForm" ng-submit="createProjectForm.$valid && createProjectForm.submit()" novalidate> <div class="form-group" ng-class="{ \'has-error\' : createProjectForm.name.$invalid && !createProjectForm.name.$pristine }"> <label for="name">First Name:</label> <input type="text" class="form-control" name="name" id="name" placeholder="First Name" required data-ng-minlength="3" data-ng-model="project.name"> <span class="help-block" ng-show="createProjectForm.name.$dirty && createProjectForm.name.$error.required">The name field is required.</span> <span class="help-block" ng-show="createProjectForm.name.$error.minlength">The name must be at least 3 characters.</span> </div> <div class="form-group" ng-class="{\'has-error\': createProjectForm.lastName.$invalid && !createProjectForm.lastName.$pristine}"> <label for="lastName">Last Name:</label> <input type="text" class="form-control" name="lastName" id="lastName" placeholder="Last Name" required data-ng-minlength="3" data-ng-model="project.lastName"> <span class="help-block" ng-show="createProjectForm.lastName.$dirty && createProjectForm.lastName.$error.required">The name field is required.</span> <span class="help-block" ng-show="createProjectForm.lastName.$error.minlength">The name must be at least 3 characters.</span> </div> <div class="form-group" ng-class="{\'has-error\': createProjectForm.email.$invalid && !createProjectForm.email.$pristine}"> <label for="email">Email:</label> <input type="email" class="form-control" name="email" id="email" placeholder="you@email.com" required data-ng-minlength="3" data-ng-model="project.email"> <span class="help-block" ng-show="createProjectForm.email.$dirty && createProjectForm.email.$error.required">The email field is required.</span> <span class="help-block" ng-show="createProjectForm.email.$dirty && createProjectForm.email.$error.email">Your email is invalid.</span> </div> <div class="form-group"> <button ng-disabled="createProjectForm.$invalid" type="submit" class="btn btn-primary pull-right" value="Login" title="Login"> <span>Login</span> </button> </div> </form> </div> </div> </div></div>';

    beforeEach(module('MyApp'));

    beforeEach(inject(function(_$compile_, _$rootScope_, _$templateCache_, _$document_){
        $document = _$document_;
        $compile = _$compile_;
        $scope = _$rootScope_.$new();
        $templateCache = _$templateCache_;
        template = $templateCache.put('loginView.html', mockHtml);
    }));

    var createDirective = function () {
        var elm = angular.element(html);
        $compile(elm)($scope);
        document.body.appendChild(elm[0]);
        $scope.form = elm[0];
        $scope.$digest();
        return elm[0];
    };
    function setDir(thisSelector) {
        var dirElement = angular.element(html);
        $compile(dirElement)($scope);
        $scope.$digest();
        this.thisElement = angular.element(dirElement[0].querySelector(thisSelector));
        return this;
    };


    describe('Inputs should exsist', function () {
        it('should have a form', function () {
            var element = createDirective();
            expect($(element).find('form').length).toBe(1);
            document.body.removeChild(element);
        });
        it('should have 3 inputs', function () {
            var element = createDirective();
            expect($(element).find('input').length).toBe(3);
            document.body.removeChild(element);
        });
        it('should have a first name input', function () {
            var element = createDirective();
            expect($(element).find("input#lastName").length).toBe(1);
            document.body.removeChild(element);
        });
        it('should have a last name input', function () {
            var element = createDirective();
            expect($(element).find('input#lastName').length).toBe(1);
            document.body.removeChild(element);
        });
        it('should have an email input', function () {
            var element = createDirective();
            expect($(element).find('input#email').length).toBe(1);
            document.body.removeChild(element);
        });
    });

    describe('Validation should work', function () {
        it('Input:name should be invalid with less than 3 chars', function () {
            var e = setDir('#name');
            e.thisElement.val('S').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(false);
        });
        it('Input:name should be valid with more than 3 chars', function () {
            var e = setDir('#name');
            e.thisElement.val('Steve').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(true);
        });

        it('Input:lastName should be invalid with less than 3 chars', function () {
            var e = setDir('#lastName');
            e.thisElement.val('S').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(false);
        });
        it('Input:lastName should be valid with more than 3 chars', function () {
            var e = setDir('#lastName');
            e.thisElement.val('Steve').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(true);
        });


        it('Input:email should be invalid with anything but an email address', function () {
            var e = setDir('#email');
            e.thisElement.val('S').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(false);
        });
        it('Input:email should be invalid with anything but an email address', function () {
            var e = setDir('#email');
            e.thisElement.val('stevethewebguy@gmail.com').triggerHandler('input');
            $scope.$apply();
            expect(e.thisElement.hasClass('ng-valid')).toEqual(true);
        });
    });
});

