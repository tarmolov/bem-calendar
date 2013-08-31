modules.define('i-bem__dom', function (provide, DOM) {

    DOM.decl('button', {}, {
        live: function () {
            this.liveBindTo('click', function () {
                this.emit('click');
            });
            this.liveBindTo('mousedown', function () {
                this.setMod('pressed', 'yes');
            });
            this.liveBindTo('mouseup mouseout', function () {
                this.delMod('pressed');
            });
        }
    });

    provide(DOM);

});
