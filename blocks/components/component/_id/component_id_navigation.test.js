modules.define(
    'test',
    ['component_id_navigation', 'jquery', 'sandbox', 'model', 'sinon'],
    function (provide, NavigationComponent, $, Sandbox, Model, sinon) {

    describe('NavigationComponent', function () {
        var component;
        var domElem;
        var model;
        var sandbox;
        var getDomElement;

        beforeEach(function () {
            domElem = $('<div/>');
            sandbox = new Sandbox();
            model = new Model();
            getDomElement = sinon.stub(sandbox, 'getDomElement').returns(domElem);
            getDomElement = sinon.stub(sandbox, 'getModel').returns(model);
            component = new NavigationComponent();
        });

        describe('when start', function () {
            it('should create view', function () {
                domElem.html().should.be.empty;
                component.start(sandbox);
                domElem.html().should.be.ok;
            });
        });

        describe('when stop', function () {
            it('should remove view', function () {
                component.start(sandbox);
                component.stop();
                domElem.html().should.be.empty;
            });
        });
    });

    provide();
});
