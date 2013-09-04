modules.define('i-bem__dom', function (provide, DOM) {

    DOM.decl('button', {
        onSetMod: {
            js: {
                inited: function () {
                    this.bindTo('click', function () {
                        this.emit('click');
                    });
                    this.bindTo('mousedown', function () {
                        this.setMod('pressed', 'yes');
                    });
                    this.bindTo('mouseup mouseout', function () {
                        this.delMod('pressed');
                    });
                }
            }
        }
    });

    provide(DOM);

});
