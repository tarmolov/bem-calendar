modules.define(
    'component_id_search',
    [
        'inherit',
        'component',
        'search'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        SearchView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this);
            this._element.append(SearchView.create().domElem);
        }
    }, {
        getName: function () {
            return 'search';
        }
    }));

});
