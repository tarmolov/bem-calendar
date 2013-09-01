modules.define(
    'test',
    ['component-manager', 'jquery', 'should', 'sinon'],
    function (provide, ComponentManager, $, should, sinon) {

    describe('ComponentManager', function () {
        var manager;
        var isStarted;
        var start;
        var stop;
        var getName;
        var Component1;

        beforeEach(function () {
            manager = new ComponentManager();
            isStarted = sinon.stub().returns(false);
            getName = sinon.stub().returns('component1');
            start = sinon.spy();
            stop = sinon.spy();
            Component1 = function () {
                this.start = start;
                this.isStarted = isStarted;
                this.stop = stop;
            };
            Component1.getName = getName;
            manager.register(Component1);
        });

        it('should register components', function () {
            Object.keys(manager._registeredComponents).length.should.be.equal(1);
        });

        it('should start a component', function () {
            manager.start('component1', 'sandbox');
            start.callCount.should.equal(1);
            start.calledWithExactly('sandbox').should.be.true;
        });

        it('should\'t start a component twice', function () {
            manager.start('component1', 'sandbox');
            isStarted.returns(true);
            manager.start('component1', 'sandbox');
            start.callCount.should.equal(1);
        });

        it('should stop a component', function () {
            isStarted.returns(true);
            manager.stop('component1');
            isStarted.returns(false);
            stop.callCount.should.equal(1);
        });

        it('should\'t stop a component twice', function () {
            isStarted.returns(true);
            manager.stop('component1');
            isStarted.returns(false);
            manager.stop('component1');
            stop.callCount.should.equal(1);
        });

        it('should start all components', function () {
            manager.register(Component1);
            manager.startAll('sandbox');
            start.callCount.should.equal(1);
            start.alwaysCalledWithExactly('sandbox').should.be.true;
        });

        it('should stop all components', function () {
            manager.register(Component1);
            isStarted.returns(true);
            manager.stopAll('sandbox');
            stop.callCount.should.equal(1);
        });
    });

    provide();
});
