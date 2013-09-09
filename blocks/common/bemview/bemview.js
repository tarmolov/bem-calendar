modules.define('i-bem__dom', ['jquery', 'bh'], function (provide, $, bh, DOM) {
/*jshint unused:false*/

    /**
     * BEW View
     * @augments IBemView
     */
    provide(DOM.decl('bemview', {
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

        getBEMJSON: function (model, options) {}
    }));

});
