modules.define(
    'test',
    ['component'],
    function (provide, BaseComponent) {

    describe('component', function () {
        var component;

        beforeEach(function () {
            component = new BaseComponent();
        });

        it('should be stopped by default', function () {
            component.isStarted().should.be.false;
        });

        it('should start', function () {
            component.start();
            component.isStarted().should.be.true;
        });

        it('should stop', function () {
            component.start();
            component.stop();
            component.isStarted().should.be.false;
        });
    });

    provide();
});
