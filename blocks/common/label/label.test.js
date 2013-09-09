modules.define(
    'test',
    ['i-bem__dom', 'jquery', 'bh'],
    function (provide, DOM, $, bh) {

    describe('label', function () {
        var label;

        beforeEach(function () {
            label = DOM.init($(bh.apply({block: 'label'}))).bem('label');
        });

        afterEach(function () {
            DOM.destruct(label.domElem);
        });

        it('should set and get value', function () {
            label.getText().should.be.equal('');
            label.setText('test');
            label.getText().should.be.equal('test');
        });

    });

    provide();
});
