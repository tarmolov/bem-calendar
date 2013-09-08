modules.define(
    'test',
    ['component_id_toolbar', 'jquery', 'sandbox', 'model', 'sinon'],
    function (provide, ToolbarComponent, $, Sandbox, Model, sinon) {

    describe('component_id_toolbar', function () {
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
            component = new ToolbarComponent();
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

        it('should sent a notify into sandbox for new event', function () {
            var data = new Model();
            var spy = sinon.spy();
            sandbox.on('new-event', spy);
            component.start(sandbox);
            component._view.emit('create', data);
            spy.callCount.should.equal(1);
            spy.getCall(0).args[1].should.be.equal(data);
        });

        it('should sent a notify into sandbox for force-event', function () {
            var spy = sinon.spy();
            sandbox.on('force-update', spy);
            component.start(sandbox);
            component._view.emit('update');
            spy.callCount.should.equal(1);
        });
    });

    provide();
});
