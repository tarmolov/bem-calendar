modules.define('base-component', ['inherit'], function (provide, inherit) {

    provide(inherit({

        start: function (sandbox) {
            this._isStarted = true;
        },

        stop: function () {
            this._isStarted = false;
        },

        isStarted: function () {
            return this._isStarted;
        }
    }));

});
