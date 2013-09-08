modules.define('model_type_list', ['inherit', 'events'], function (provide, inherit, events) {

    /**
     * List of models
     * List works only with models
     * @augments events.Emitter
     */
    provide(inherit(events.Emitter, {
        __constructor: function (models) {
            this.__base.apply(this, arguments);
            this._models = [];

            if (models) {
                models.forEach(this.add, this);
            }
        },

        /**
         * Adds a model to the list
         * @param {Model} model
         */
        add: function (model) {
            this._models.push(model);
            model.on('change', this._onChanged, this);
            this._onChanged();
        },

        /**
         * Removes a model from the list
         * @param {Model} model
         */
        remove: function (model) {
            var index = this._getIndexByItem(model);
            this._models.splice(index, 1);
            model.un('change', this._onChanged, this);
            this._onChanged();
        },

        /**
         * Returns list item
         * @param {Number} index
         * @returns {Model} item
         */
        getItemByIndex: function (index) {
            return this._models[index];
        },

        /**
         * Returns index for list item
         * @param {Model} item
         * @returns {Number} index
         */
        _getIndexByItem: function (item) {
            for (var i = 0; i < this._models.length; i++) {
                if (this._models[i] === item) {
                    return i;
                }
            }
            return -1;
        },

        _onChanged: function () {
            this.emit('change');
        },

        /**
         * @param {Function} callback
         * @returns {Model[]} filteredModels
         */
        filter: function (callback) {
            return this._models.filter(callback);
        },

        /**
         * Returns number of items
         * @returns {Number} length
         */
        length: function () {
            return this._models.length;
        },

        /**
         * Returns list data as json
         * @returns {JSON} json
         */
        toJSON: function () {
            return this._models.map(function (model) {
                return model.toJSON();
            });
        }
    }));

});
