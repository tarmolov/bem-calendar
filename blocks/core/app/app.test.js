modules.define(
    'test',
    ['app', 'i-bem__dom', 'jquery', 'bh'],
    function (provide, Application, DOM, $, bh) {

    describe('app', function () {
        var app;
        var rootBlock;

        beforeEach(function () {
            rootBlock = DOM.init($(bh.apply({block: 'root'}))).bem('root');
            app = new Application(rootBlock);
        });

        it('should restart application', function () {
            var model = app.getModel();
            app.restart();
            model.should.not.be.equal(app.getModel());
        });
    });

    provide();
});
