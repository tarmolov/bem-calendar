modules.define(
    'test',
    ['i-bem__dom', 'jquery', 'bh', 'sinon'],
    function (provide, DOM, $, bh, sinon) {

    describe('form', function () {
        describe('when input has been inited', function () {
            var form;

            beforeEach(function () {
                form = DOM.init($(bh.apply({block: 'form'}))).bem('form');
            });

            afterEach(function () {
                DOM.destruct(form.domElem);
            });

            it('should emit submit event', function () {
                var onSubmit = sinon.spy();
                form.on('submit', onSubmit);
                form.domElem.submit();
                onSubmit.callCount.should.be.equal(1);
            });
        });

        describe('when bh has built bemjson', function () {
            it('should have `form` tag', function () {
                bh.processBemJson({block: 'form'}).tag.should.be.equal('form');
            });

            it('should have `js` attr', function () {
                bh.processBemJson({block: 'form'}).js.should.be.true;
            });
        });

    });

    provide();
});
