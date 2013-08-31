modules.define(
    'search-component',
    [
        'inherit',
        'base-component',
        'search'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        SearchView
    ) {

    provide(inherit(BaseComponent, {

        _id: 'search',

        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this._id);
            this._element.append(SearchView.create().domElem);
        }
    }));

});
