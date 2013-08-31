modules.define(
    'toolbar-component',
    [
        'inherit',
        'base-component',
        'toolbar'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        ToolBarView
    ) {

    provide(inherit(BaseComponent, {

        _id: 'toolbar',

        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this._id);
            this._element.append(ToolBarView.create().domElem);
        }
    }));

});
