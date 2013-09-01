modules.define('event', ['i-bem__dom', 'jquery', 'bh', 'popup'], function (provide, DOM, $, bh, Popup) {

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
            if (this._popup) {
                this._popup.destruct();
            }
            this._popup = Popup.create({
                direction: 'right',
                content: this.params.date
            });
            this._popup.show(this.domElem);
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
