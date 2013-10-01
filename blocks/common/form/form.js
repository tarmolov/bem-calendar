modules.define('i-bem__dom', ['jquery', 'bh'], function (provide, $, bh, DOM) {

    DOM.decl('form', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('submit', this._onSubmit, this);
                }
            }
        },

        _onSubmit: function (e) {
            e.preventDefault();
            this.emit('submit');
        },

        /**
         * Check form state.
         * Returns false if the form isn't filled
         * @return {Boolean}
         */
        isEmpty: function () {},

        update: function () {},

        getModel: function () {
            return this._model;
        },

        setModel: function (model) {
            this._model = model;
            this.update();
        }
    }, {
        create: function (model, options) {
            var bemjson = this.getBEMJSON(model, options);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block.setModel(model);
            return block;
        },

        getBEMJSON: function (model, options) {
            /*jshint unused:false*/
        }
    });

    provide(DOM);

});
