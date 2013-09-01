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

        getCurrentDate: function () {
            return this._model.get('currentDate');
        },

        getSelectedDate: function () {
            return this._model.get('selectedDate');
        }
    }));

});
