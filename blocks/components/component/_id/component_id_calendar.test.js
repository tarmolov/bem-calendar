modules.define(
    'test',
    ['component_id_calendar', 'jquery', 'sandbox', 'model', 'sinon', 'i-bem__dom'],
    function (provide, CalendarComponent, $, Sandbox, Model, sinon, DOM) {

    describe('CalendarComponent', function () {
        var component;
        var domElem;
        var model;
        var sandbox;
        var getDomElement;

        beforeEach(function () {
            domElem = $('<div/>');
            sandbox = new Sandbox();
            model = new Model({
                events: []
            });
            getDomElement = sinon.stub(sandbox, 'getDomElement').returns(domElem);
            getDomElement = sinon.stub(sandbox, 'getModel').returns(model);
            component = new CalendarComponent();
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

        describe('when model has been changed', function () {
            it('should update view', function () {
                component.start(sandbox);
                // Indirect check
                // We cannot use spy on component._view.update because
                // it has been already wrapped as event handler
                var update = sinon.spy(DOM, 'update');
                model.set('test', 1);
                update.callCount.should.equal(1);
            });
        });

        describe('when sandbox emitted new-event', function () {
            it('should open popup for this event', function () {
                component.start(sandbox);
                var update = sinon.spy(component._view, 'openPopup');
                sandbox.emit('new-event', new Model({}));
                update.callCount.should.equal(1);
            });
        });
    });

    provide();
});