modules.define('model_type_list', ['inherit', 'events'], function (provide, inherit, events) {

    provide(inherit(events.Emitter, {
        __constructor: function () {
            this.__base.apply(this, arguments);
            this._models = [];
        },

        add: function (model) {
            this._models.push(model);
        },

        remove: function (model) {
        },

        get: function (index) {
        },

        filter: function (callback) {
            return this._models.filter(callback);
        },

        map: function (callback) {
            return this._models.map(callback);
        },

        length: function () {
            return this._models.length;
        }
    }));

});
