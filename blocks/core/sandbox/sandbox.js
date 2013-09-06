modules.define('sandbox', ['inherit', 'events'], function (provide, inherit, events) {

    provide(inherit(events.Emitter, {
        __constructor: function (app) {
            this.__base();
            this._app = app;
            this._model = this._app.getModel();
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
