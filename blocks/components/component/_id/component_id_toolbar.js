modules.define(
    'component_id_toolbar',
    [
        'inherit',
        'component',
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
            this._sandbox = sandbox;
            this._element = sandbox.getDomElement(this);
            this._model = sandbox.getModel();
            this._view = ToolBarView.create(this._model);
            this._view.on('create', this._onCreate, this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            this._view.destruct();
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
