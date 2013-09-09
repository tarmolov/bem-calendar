modules.define(
    'test',
    ['i-bem__dom', 'bh'],
    function (provide, DOM, bh) {

    describe('search', function () {
        describe('when bh has built bemjson', function () {
            it('should contain input', function () {
                bh.processBemJson({block: 'search'}).content.filter(function (block) {
                    return block.block === 'input';
                }).length.should.be.equal(1);
            });

            it('should contain icon', function () {
                bh.processBemJson({block: 'search'}).content.filter(function (block) {
                    return block.block === 'icon';
                }).length.should.be.equal(1);
            });
        });
    });

    provide();
});
