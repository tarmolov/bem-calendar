modules.define('component', ['inherit'], function (provide, inherit) {

    /**
     * Base component
     * @implements IComponent
     */
    provide(inherit({
        _isStarted: false,

        start: function () {
            this._isStarted = true;
        },

        stop: function () {
            this._isStarted = false;
        },

        isStarted: function () {
            return this._isStarted;
        }
    }, {
        getName: function () {}
    }));

});
