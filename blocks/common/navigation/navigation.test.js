modules.define(
    'test',
    ['navigation', 'i-bem__dom', 'model'],
    function (provide, Navigation, DOM, Model) {

    describe('navigation', function () {
        var navigation;
        var model;
        var currentDate = new Date(2013, 8, 1).getTime();
        var prevDate = new Date(2013, 7, 1).getTime();
        var nextDate = new Date(2013, 9, 1).getTime();

        beforeEach(function () {
            model = new Model({
                currentDate: currentDate
            });
            navigation = Navigation.create(model);
        });

        afterEach(function () {
            DOM.destruct(navigation.domElem);
        });

        it('should handle prev click', function () {
            navigation.findBlockInside('left', 'button').domElem.click();
            model.get('currentDate').should.be.equal(prevDate);
        });

        it('should handle next click', function () {
            navigation.findBlockInside('right', 'button').domElem.click();
            model.get('currentDate').should.be.equal(nextDate);
        });

        it('should handle today click', function () {
            navigation.findBlockInside('right', 'button').domElem.click();
            navigation.findBlockInside('today', 'button').domElem.click();
            model.get('currentDate').should.be.not.equal(nextDate);
        });
    });

    provide();
});
