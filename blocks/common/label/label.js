modules.define('i-bem__dom', function (provide, DOM) {

    DOM.decl('label', {

        setText: function (text) {
            this.domElem.text(text);
        },

        getText: function () {
            return this.domElem.text();
        }

    });

    provide(DOM);

});
