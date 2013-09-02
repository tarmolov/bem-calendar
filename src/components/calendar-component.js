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
        CalendarView,
        EventView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base.apply(this, arguments);

            var model = sandbox.getModel();
            this._view = CalendarView.create(model);
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
            return 'calendar';
        }
    }));

});
