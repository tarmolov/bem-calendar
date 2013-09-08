modules.define('utils__compare', function (provide) {

    var toString = Object.prototype.toString;

    function isFloat(n) {
        return typeof n === 'number' && n % 1 !== 0;
    }

    function compareFloats(a, b) {
        return Math.abs(a - b) < 0.000001;
    }

    /**
     * Simple comparative method
     */
    provide(function (a, b) {
        switch (Boolean(true)) {
            case toString.apply(a) !== toString.apply(b):
                return false;
            case isFloat(a):
                return compareFloats(a, b);
            default:
                return a === b;
        }
    });

});
