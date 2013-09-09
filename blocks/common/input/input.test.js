modules.define(
    'test',
    ['i-bem__dom', 'jquery', 'bh'],
    function (provide, DOM, $, bh) {

    describe('input', function () {
        describe('when input has been inited', function () {
            var input;

            beforeEach(function () {
                input = DOM.init($(bh.apply({block: 'input'}))).bem('input');
            });

            afterEach(function () {
                DOM.destruct(input.domElem);
            });

            it('should set and get value', function () {
                input.getValue().should.be.equal('');
                input.setValue('test');
                input.getValue().should.be.equal('test');
            });
        });

        describe('when bh has built bemjson', function () {
            it('should have `input` tag', function () {
                bh.processBemJson({block: 'input'}).tag.should.be.equal('input');
            });

            it('should have `js` attr', function () {
                bh.processBemJson({block: 'input'}).js.should.be.true;
            });

            it('should set value', function () {
                bh.processBemJson({block: 'input', content: 'test'}).content.should.be.equal('test');
            });
        });

    });

    provide();
});
