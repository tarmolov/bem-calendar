modules.define(
    'test',
    ['app', 'should'],
    function (provide, App, should) {

        describe('app', function () {
            it('should do something', function () {
                var app = new App();
                should.exist(app);
            });
        });

        provide();
    });
