modules.define(
    'test',
    ['utils__compare'],
    function (provide, compare) {

    describe('utils__compare', function () {
        it('should compare integer numbers', function () {
            compare(123, 123).should.be.true;
            compare(123, 12).should.be.false;
        });

        it('should compare float numbers', function () {
            compare(0.000005, 0.000005).should.be.true;
            compare(123.3, 0.75).should.be.false;
        });

        it('should returns true for the same object', function () {
            var a;
            var b;
            a = b = {test: 1};
            compare(a, b).should.be.true;
        });
    });

    provide();
});
