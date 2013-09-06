modules.define(
    'component_id_search',
    [
        'inherit',
        'component',
        'search',
        'i-bem__dom'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        SearchView,
        DOM
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            this._element = sandbox.getDomElement(this);
            this._view = SearchView.create();
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            DOM.destruct(this._view.domElem);

            this._element = null;
            this._view = null;
        },
    }, {
        getName: function () {
            return 'search';
        }
    }));

});
