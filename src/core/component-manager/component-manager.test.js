modules.define(
    'test',
    ['component-manager', 'jquery', 'should', 'sinon'],
    function (provide, ComponentManager, $, should, sinon) {

    describe('ComponentManager', function () {
        var manager;
        var isStarted;
        var start;
        var stop;
        var Component1;

        beforeEach(function () {
            manager = new ComponentManager();
            isStarted = sinon.stub().returns(false);
            start = sinon.spy();
            stop = sinon.spy();
            Component1 = function () {
                this.start = start;
                this.isStarted = isStarted;
                this.stop = stop;
            };
        });

        it('should register components', function () {
            manager.register('component1', Component1);
            manager.register('component1', Component1);
            manager.register('component2', Component1);
            Object.keys(manager._registeredComponents).length.should.be.equal(2);
        });

        it('should start a component', function () {
            manager.register('component1', Component1);
            manager.start('component1', 'sandbox');
            start.callCount.should.equal(1);
            start.calledWithExactly('sandbox').should.be.true;
        });

        it('should\'t start a component twice', function () {
            manager.register('component1', Component1);
            manager.start('component1', 'sandbox');
            isStarted.returns(true);
            manager.start('component1', 'sandbox');
            start.callCount.should.equal(1);
        });

        it('should stop a component', function () {
            manager.register('component1', Component1);
            isStarted.returns(true);
            manager.stop('component1');
            isStarted.returns(false);
            stop.callCount.should.equal(1);
        });

        it('should\'t stop a component twice', function () {
            manager.register('component1', Component1);
            isStarted.returns(true);
            manager.stop('component1');
            isStarted.returns(false);
            manager.stop('component1');
            stop.callCount.should.equal(1);
        });

        it('should start all components', function () {
            manager.register('component1', Component1);
            manager.register('component2', Component1);
            manager.register('component3', Component1);
            manager.startAll('sandbox');
            start.callCount.should.equal(3);
            start.alwaysCalledWithExactly('sandbox').should.be.true;
        });

        it('should stop all components', function () {
            manager.register('component1', Component1);
            manager.register('component2', Component1);
            manager.register('component3', Component1);
            isStarted.returns(true);
            manager.stopAll('sandbox');
            stop.callCount.should.equal(3);
        });
    });

    provide();
});
