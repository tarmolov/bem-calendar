modules.define('i-bem__dom', function (provide, DOM) {

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
        }
    });

    provide(DOM);

});
