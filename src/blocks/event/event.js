modules.define('event', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    provide(DOM.decl('event', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('click', this._onClick, this);
                }
            }
        },

        _onClick: function (e) {
            e.stopPropagation();
        }
    }, {
        create: function (options) {
            var bemjson = this.getBEMJSON(options);
            return DOM.init($(bh.apply(bemjson))).bem(this.getName());
        },

        getBEMJSON: function (data) {
            return {
                block: 'event',
                js: data
            };
        }
    }));

});
