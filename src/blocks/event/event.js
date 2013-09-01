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

        create: function () {
            return DOM.init($(bh.apply({
                block: 'event',
            }))).bem(this.getName());
        }
    }));

});
