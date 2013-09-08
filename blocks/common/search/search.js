modules.define('search', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    /**
     * Search.
     * @augments IBemView
     */
    provide(DOM.decl('search', {
        update: function () {},

        setModel: function (model) {
            this._model = model;
            this.update();
        },

        getModel: function () {
            return this._model;
        }
    }, {
        create: function () {
            var bemjson = this.getBEMJSON();
            return DOM.init($(bh.apply(bemjson))).bem(this.getName());
        },

        getBEMJSON: function () {
            return {
                block: 'search', placeholder: 'Event, date, or participant'
            };
        }
    }));

});
