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

    /**
     * Model
     * It works only with elementary types like Number, Boolean, and etc.
     * All objects will be transoforms to Model; all arrays — to ListModel.
     * @augments events.Emitter
     */
    var Model = inherit(events.Emitter, {
        __constructor: function (attributes) {
            this.__base.apply(this, arguments);
            this._attributes = attributes || {};
            this._isChanged = false;
            this._setAttributes(this._attributes);
        },

        /**
         * Gets property by name
         * @param {String} name
         */
        get: function (name) {
            return this._attributes[name];
        },

        /**
         * Sets an attributes or attributes
         * When you set attributes the model will fire change event for each changed attrbutes
         * and only single change event for changing model
         * @param {String|Object} name
         * @param {*} value
         * @example
         * var model = new Model();
         * model.set('foo', 1);
         * @example
         * var model = new Model();
         * model.set({
         *     foo: 1,
         *     bar: 2
         * });
         */
        set: function (name, value) {
            var attributes;

            if (typeof name === 'string') {
                attributes = {};
                attributes[name] = value;
            } else {
                attributes = name;
            }
            this._setAttributes(attributes);

            if (this._isChanged) {
                this.emit('change');
                this._isChanged = false;
            }
        },

        /**
         * Sets attributes
         * @param {Object} attributes
         */
        _setAttributes: function (attributes) {
            Object.keys(attributes).forEach(function (key) {
                this._setAttribute(key, attributes[key]);
            }, this);
        },

        /**
         * Sets attribute
         * @param {String} name
         * @param {*} value
         */
        _setAttribute: function (name, value) {
            var oldValue = this.get(name);
            var newValue = this._getNewValue(value);

            if (!isEqual(oldValue, newValue)) {
                if (this.isModel(oldValue) || this.isListModel(oldValue)) {
                    oldValue.un('change', this._onNestedModelChanged, this);
                }
                this._attributes[name] = newValue;
                this.emit('change:' + name);
                if (this.isModel(newValue) || this.isListModel(newValue)) {
                    newValue.on('change', this._onNestedModelChanged, this);
                }
                this._isChanged = true;
            }
        },

        /**
         * Transforms value to model or model list if needed
         * @param {*} value
         * @returns {*} newValue
         */
        _getNewValue: function (value) {
            switch (Boolean(true)) {
                case value instanceof Model:
                case value instanceof ListModel:
                    return value;
                case Array.isArray(value):
                    return new ListModel(value.map(function (i) {
                        return new Model(i);
                    }));
                case typeof value === 'object':
                    return new Model(value);
                default:
                    return value;
            }
        },

        /**
         * @returns {Boolean} isModel
         */
        isModel: function (model) {
            return model instanceof Model;
        },

        /**
         * @returns {Boolean} isListModel
         */
        isListModel: function (model) {
            return model instanceof ListModel;
        },

        _onNestedModelChanged: function () {
            this.emit('change');
        },

        /**
         * Returns model data as json
         * @returns {JSON} json
         */
        toJSON: function () {
            var json = {};
            Object.keys(this._attributes).forEach(function (key) {
                var item = this._attributes[key];
                if (this.isModel(item) || this.isListModel(item)) {
                    json[key] = item.toJSON();
                } else {
                    json[key] = item;
                }
            }, this);
            return json;
        }
    });

    provide(Model);

});
