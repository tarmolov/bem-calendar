modules.define(
    'test',
    ['component_id_search', 'jquery', 'sandbox', 'sinon'],
    function (provide, SearchComponent, $, Sandbox, sinon) {

    describe('SearchComponent', function () {
        var component;
        var domElem;
        var sandbox;
        var getDomElement;

        beforeEach(function () {
            domElem = $('<div/>');
            sandbox = new Sandbox();
            getDomElement = sinon.stub(sandbox, 'getDomElement').returns(domElem);
            component = new SearchComponent();
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
