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
        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this);
            this._element.append(ToolBarView.create().domElem);
        }
    }, {
        getName: function () {
            return 'toolbar';
        }
    }));

});
