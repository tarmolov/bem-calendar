modules.define(
    'search',
    [
        'i-bem__dom',
        'jquery',
        'bh'
    ],
    function (
        provide,
        DOM,
        $,
        bh
    ) {

    /**
     * Search.
     * @augments IBemView
     */
    provide(DOM.decl('search', {
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

        getBEMJSON: function () {
            return {
                block: 'search', placeholder: 'Event, date, or participant'
            };
        }
    }));

});
