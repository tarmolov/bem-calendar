modules.define('model_type_list', ['inherit', 'events'], function (provide, inherit, events) {

    provide(inherit(events.Emitter, {
        __constructor: function (models) {
            this.__base.apply(this, arguments);
            this._models = [];

            if (models) {
                models.forEach(this.add, this);
            }
        },

        add: function (model) {
            this._models.push(model);
            model.on('change', this._onNestedModelChanged, this);
            this.emit('change');
        },

        remove: function (model) {
            var index = this._getIndexByItem(model);
            this._models.splice(index, 1);
            model.un('change', this._onNestedModelChanged, this);
            this.emit('change');
        },

        get: function (index) {
            return this._models[index];
        },

        _onNestedModelChanged: function () {
            this.emit('change');
        },

        _getIndexByItem: function (item) {
            for (var i = 0; i < this._models.length; i++) {
                if (this._models[i] === item) {
                    return i;
                }
            }
            return -1;
        },

        filter: function (callback) {
            return this._models.filter(callback);
        },

        map: function (callback) {
            return this._models.map(callback);
        },

        length: function () {
            return this._models.length;
        },

        toJSON: function () {
            return this._models.map(function (model) {
                return model.toJSON();
            });
        }
    }));

});
