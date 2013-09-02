modules.define(
    'navigation-component',
    [
        'inherit',
        'base-component',
        'navigation'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        NavigationView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            var model = sandbox.getModel();
            this._view = NavigationView.create(model);
            this._element = sandbox.getDomElement(this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            this._view.destruct();
            this._view = null;
            this._element = null;
        }
    }, {
        getName: function () {
            return 'navigation';
        }
    }));

});
