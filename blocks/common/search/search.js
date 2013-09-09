modules.define('search', ['i-bem__dom'], function (provide, DOM) {

    /**
     * Search.
     * @mixin bemview
     */
    provide(DOM.decl('search', {}, {
        getBEMJSON: function () {
            return {
                block: 'search', placeholder: 'Event, date, or participant'
            };
        }
    }));

});
