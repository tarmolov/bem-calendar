modules.define(
    'test',
    ['i-bem__dom', 'jquery', 'bh', 'sinon'],
    function (provide, DOM, $, bh, sinon) {

    describe('button', function () {
        describe('when button has been inited', function () {
            var button;

            beforeEach(function () {
                button = DOM.init($(bh.apply({block: 'button'}))).bem('button');
            });

            afterEach(function () {
                DOM.destruct(button.domElem);
            });

            it('should fire click event', function () {
                var onClick = sinon.spy();
                button.on('click', onClick);
                button.domElem.click();

                onClick.callCount.should.be.equal(1);
            });
        });

        describe('when bh has built bemjson', function () {
            it('should have `button` tag', function () {
                bh.processBemJson({block: 'button'}).tag.should.be.equal('button');
            });

            it('should have `js` attr', function () {
                bh.processBemJson({block: 'button'}).js.should.be.true;
            });
        });

    });

    provide();
});
