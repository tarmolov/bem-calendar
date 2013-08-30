modules.define(
    'test',
    ['component-manager', 'jquery', 'should', 'sinon'],
    function (provide, ComponentManager, $, should, sinon) {

    describe('ComponentManager', function () {
        it('should register components', function () {
            var manager = new ComponentManager();
            var Component1 = {start: $.noop, isStarted: $.noop};
            manager.register('component1', Component1);
            manager.register('component1', Component1);
            manager.register('component2', Component1);
            manager._length().should.be.equal(2);
        });

        it('should start a component', function () {
            var manager = new ComponentManager();
            var Component1 = {start: sinon.spy(), isStarted: $.noop};
            var isStarted = sinon.stub(Component1, 'isStarted').returns(false);

            manager.register('component1', Component1);
            manager.start('component1', 'sandbox');
            isStarted.returns(true);
            Component1.start.callCount.should.equal(1);
            Component1.start.calledWithExactly('sandbox').should.be.true;
            Component1.isStarted().should.be.true;
        });

        it('should\'t start a component twice', function () {
            var manager = new ComponentManager();
            var Component1 = {start: sinon.spy(), isStarted: $.noop};
            var isStarted = sinon.stub(Component1, 'isStarted').returns(false);

            manager.register('component1', Component1);
            manager.start('component1', 'sandbox');
            isStarted.returns(true);
            manager.start('component1', 'sandbox');

            Component1.start.callCount.should.equal(1);
        });

        it('should stop a component', function () {
            var manager = new ComponentManager();
            var Component1 = {stop: sinon.spy(), isStarted: $.noop};
            var isStarted = sinon.stub(Component1, 'isStarted').returns(true);

            manager.register('component1', Component1);
            manager.stop('component1');
            isStarted.returns(false);
            Component1.stop.callCount.should.equal(1);
            Component1.isStarted().should.be.false;
        });

        it('should\'t stop a component twice', function () {
            var manager = new ComponentManager();
            var Component1 = {stop: sinon.spy(), isStarted: $.noop};
            var isStarted = sinon.stub(Component1, 'isStarted').returns(true);

            manager.register('component1', Component1);
            isStarted.returns(true);
            manager.stop('component1');
            isStarted.returns(false);
            manager.stop('component1');

            Component1.stop.callCount.should.equal(1);
        });

        it('should start all components', function () {
            var manager = new ComponentManager();
            var start = sinon.spy();
            manager.register('component1', {start: start, isStarted: $.noop});
            manager.register('component2', {start: start, isStarted: $.noop});
            manager.register('component3', {start: start, isStarted: $.noop});
            manager.startAll('sandbox');
            start.callCount.should.equal(3);
            start.alwaysCalledWithExactly('sandbox').should.be.true;
        });

        it('should stop all components', function () {
            var manager = new ComponentManager();
            var stop = sinon.spy();
            var isStarted = function () {
                return true;
            };
            manager.register('component1', {stop: stop, isStarted: isStarted});
            manager.register('component2', {stop: stop, isStarted: isStarted});
            manager.register('component3', {stop: stop, isStarted: isStarted});
            manager.stopAll('sandbox');
            stop.callCount.should.equal(3);
        });
    });

    provide();
});
