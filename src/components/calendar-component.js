modules.define(
    'calendar-component',
    [
        'inherit',
        'base-component',
        'calendar'
    ],
    function (
        provide,
        inherit,
        BaseComponent,
        CalendarView
    ) {

    provide(inherit(BaseComponent, {
        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this);
            this._model = sandbox.getModel();
            this._view = CalendarView.create({
                currentDate: this._model.get('currentDate'),
                selectedDate: this._model.get('selectedDate')
            });
            this._element.append(this._view.domElem);

            sandbox.getModel().on('change:currentDate', this._onCurrentDateChanged, this);
        },

        _onCurrentDateChanged: function () {
            this._view.update({
                currentDate: this._model.get('currentDate'),
                selectedDate: this._model.get('selectedDate')
            });
        }
    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
