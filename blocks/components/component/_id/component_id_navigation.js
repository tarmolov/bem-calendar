modules.define(
    'component_id_navigation',
    [
        'inherit',
        'component',
        'navigation',
        'i-bem__dom'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        NavigationView,
        DOM
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            this._view = NavigationView.create(sandbox.getModel());
            this._element = sandbox.getDomElement(this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            DOM.destruct(this._view.domElem);

            this._view = null;
            this._element = null;
        }
    }, {
        getName: function () {
            return 'navigation';
        }
    }));

});
