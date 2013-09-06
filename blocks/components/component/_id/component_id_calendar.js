modules.define(
    'component_id_calendar',
    [
        'inherit',
        'component',
        'model',
        'calendar',
        'i-bem__dom'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        Model,
        CalendarView,
        DOM
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            this._sandbox = sandbox;
            this._model = sandbox.getModel();
            this._view = CalendarView.create(this._model);
            sandbox.on('new-event', this._onNewEvent, this);
            this._model.on('change', this._view.update, this._view);
            this._element = sandbox.getDomElement(this);
            this._element.append(this._view.domElem);
        },

        stop: function () {
            this.__base.apply(this, arguments);

            this._model.un('change', this._view.update, this._view);
            this._sandbox.un('new-event', this._onNewEvent, this);

            DOM.destruct(this._view.domElem);
            this._view = null;
            this._element = null;
            this._sandbox = null;
            this._model = null;
        },

        _onNewEvent: function (e, eventModel) {
            this._model.get('events').add(eventModel);
            this._view.openPopup(eventModel);
        }

    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
