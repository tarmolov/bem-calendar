modules.define('sandbox', ['inherit', 'events'], function (provide, inherit, events) {

    /**
     * Sandbox
     * @implements ISandbox
     */
    provide(inherit(events.Emitter, {
        __constructor: function (app) {
            this.__base.apply(this, arguments);
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
