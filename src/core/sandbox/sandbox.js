modules.define('sandbox', ['inherit', 'events'], function (provide, inherit, events) {

    provide(inherit(events.Emitter, {
        __constructor: function (app) {
            this._app = app;
        },

        getDomElement: function (id) {
            return this._app.getPlaceholderElement(id);
        }
    }));

});
