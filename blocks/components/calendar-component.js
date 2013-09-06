modules.define(
    'calendar-component',
    [
        'inherit',
        'base-component',
        'model',
        'calendar',
        'event'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        Model,
        CalendarView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            this._model = sandbox.getModel();
            this._view = CalendarView.create(this._model);
            this._model.on('change', this._view.update, this._view);
            this._element = sandbox.getDomElement(this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            this._model.un('change', this._view.update, this._view);
            this._view.destruct();
            this._view = null;
            this._element = null;
            this._model = null;
        }

    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
