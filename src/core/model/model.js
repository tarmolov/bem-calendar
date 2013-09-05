modules.define('model', ['inherit', 'events', 'utils__compare'], function (provide, inherit, events, isEqual) {

    provide(inherit(events.Emitter, {
        __constructor: function (attributes) {
            this.__base();
            this._attributes = attributes || {};
        },

        set: function (name, value) {
            var oldValue = this.get(name);

            if (!isEqual(oldValue, value)) {
                this._attributes[name] = value;
                this.emit('change:' + name, {
                    oldValue: oldValue,
                    newValue: value
                });
                this.emit('change');
            }
        },

        get: function (name) {
            return this._attributes[name];
        },

        toJSON: function () {
            var json = {};
            Object.keys(this._attributes).forEach(function (key) {
                var item = this._attributes[key];
                if (typeof item === 'object' && item.toJSON) {
                    json[key] = item.toJSON();
                } else {
                    json[key] = item;
                }
            }.bind(this));
            return json;
        }
    }));

});
