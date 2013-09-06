modules.define(
    'component_id_toolbar',
    [
        'inherit',
        'component',
        'toolbar',
        'i-bem__dom'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        ToolBarView,
        DOM
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base();

            this._sandbox = sandbox;
            this._element = sandbox.getDomElement(this);
            this._view = ToolBarView.create(sandbox.getModel());
            this._view.on('create', this._onCreate, this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            DOM.destruct(this._view.domElem);

            this._view = null;
            this._element = null;
        },

        _onCreate: function (e, model) {
            this._sandbox.emit('new-event', model);
        }
    }, {
        getName: function () {
            return 'toolbar';
        }
    }));

});
