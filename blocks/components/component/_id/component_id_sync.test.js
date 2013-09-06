modules.define(
    'test',
    ['component_id_sync', 'sandbox', 'model', 'sinon'],
    function (provide, SyncComponent, Sandbox, Model, sinon) {

    describe('SyncComponent', function () {
        var component;
        var model;
        var sandbox;
        var getDomElement;

        beforeEach(function () {
            sandbox = new Sandbox();
            model = new Model();
            getDomElement = sinon.stub(sandbox, 'getModel').returns(model);
            component = new SyncComponent();
        });

        it('should save model to localstorage', function () {
            var _onModelChanged = sinon.spy(component, '_onModelChanged');
            var setValue = sinon.spy(localStorage, 'setItem');
            component.start(sandbox);
            model.set('test', 1);
            _onModelChanged.callCount.should.equal(1);
            setValue.callCount.should.equal(1);
        });

        it('should returns data from localstorage', function () {
            var data = {test: 2};
            localStorage.setItem('bem-calendar', JSON.stringify(data));
            JSON.stringify(SyncComponent.getData()).should.be.equal(JSON.stringify(data));
        });
    });

    provide();
});
