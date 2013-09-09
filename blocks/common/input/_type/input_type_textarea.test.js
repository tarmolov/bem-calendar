modules.define(
    'test',
    ['i-bem__dom', 'jquery', 'bh'],
    function (provide, DOM, $, bh) {

    describe('input_type_textarea', function () {
        describe('when bh has built bemjson', function () {
            it('should have `textarea` tag', function () {
                bh.processBemJson({block: 'input', mods: {type: 'textarea'}}).tag.should.be.equal('textarea');
            });
        });

    });

    provide();
});
