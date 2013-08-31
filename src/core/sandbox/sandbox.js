modules.define('sandbox', ['inherit', 'events'], function (provide, inherit, events) {

    provide(inherit(events.Emitter, {
        __constructor: function (app) {
            this._app = app;
        },

        getDomElement: function (component) {
            var id = component.__self.getName();
            return this._app.getPlaceholderElement(id);
        },

        getModel: function () {
            return this._app.getModel();
        }
    }));

});
