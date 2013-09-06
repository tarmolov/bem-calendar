modules.define(
    'model',
    [
        'inherit',
        'events',
        'utils__compare',
        'model_type_list'
    ],
    function (
        provide,
        inherit,
        events,
        isEqual,
        ListModel
    ) {

    var Model = inherit(events.Emitter, {
        __constructor: function (attributes) {
            this.__base();
            this._attributes = attributes || {};
            this._init();
        },

        _init: function () {
            Object.keys(this._attributes).map(function (key) {
                var item = this._attributes[key];
                if (typeof item  === 'object') {
                    this._attributes[key] = Array.isArray(item) ?
                        new ListModel(item.map(function (i) {
                            return new Model(i);
                        })) :
                        new Model(item);
                    this._attributes[key].on('change', this._onNestedModelChanged, this);
                }
            }.bind(this));
        },

        _onNestedModelChanged: function () {
            this.emit('change');
        },

        set: function (name, value) {
            var fields;

            if (typeof name === 'string') {
                fields = {};
                fields[name] = value;
            } else {
                fields = name;
            }
            var isChanged = this._setFields(name, value);

            if (isChanged) {
                this.emit('change');
            }
        },

        _setField: function (name, value) {
            var oldValue = this.get(name);

            if (!isEqual(oldValue, value)) {
                this._attributes[name] = value;
                this.emit('change:' + name, {
                    oldValue: oldValue,
                    newValue: value
                });
                return name;
            }
            return false;
        },

        _setFields: function (fields) {
            return Object.keys(fields).filter(function (key) {
                return Boolean(this._setField(key, fields[key]));
            }.bind(this)).length;
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
    });

    provide(Model);

});
