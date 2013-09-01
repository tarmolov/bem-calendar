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
            }
        },

        get: function (name) {
            return this._attributes[name];
        }
    }));

});
