modules.define('search', ['i-bem__dom', 'jquery', 'bh'], function (provide, DOM, $, bh) {

    provide(DOM.decl('search', {}, {
        create: function () {
            return DOM.init($(bh.apply({
                block: 'search', placeholder: 'Event, date, or participant'
            }))).bem(this.getName());
        }
    }));

});
