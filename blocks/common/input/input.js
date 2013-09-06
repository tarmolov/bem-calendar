modules.define('i-bem__dom', function (provide, DOM) {

    DOM.decl('input', {

        setValue: function (value) {
            this.domElem.val(value);
        },

        getValue: function () {
            return this.domElem.val();
        },

    });

    provide(DOM);

});
