modules.define(
    'test',
    ['component_id_sync', 'sandbox', 'model', 'sinon'],
    function (provide, SyncComponent, Sandbox, Model, sinon) {

    describe('component_id_sync', function () {
        /*jshint unused:false*/
        var component;
        var model;
        var sandbox;
        var getDomElement;
        var getItem = sinon.stub(localStorage, 'getItem').returns('{"test":2}');
        var setItem = sinon.stub(localStorage, 'setItem');

        beforeEach(function () {
            sandbox = new Sandbox();
            model = new Model();
            getDomElement = sinon.stub(sandbox, 'getModel').returns(model);
            component = new SyncComponent();
        });

        it('should save model to localstorage', function () {
            var _onModelChanged = sinon.spy(component, '_onModelChanged');
            component.start(sandbox);
            model.set('test', 1);
            _onModelChanged.callCount.should.equal(1);
            setItem.callCount.should.equal(1);
        });

        it('should returns correct data from localstorage', function () {
            var data = SyncComponent.getData();
            data.test.should.be.equal(2);
            data.currentDate.should.be.a('number');
            data.selectedDate.should.be.a('number');
            data.events.length.should.be.equal(0);
        });
    });

    provide();
});
