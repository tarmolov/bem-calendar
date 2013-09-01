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
            this.__base();
            this._element = sandbox.getDomElement(this);
            this._model = new Model({
                currentDate: sandbox.getCurrentDate(),
                selectedDate: sandbox.getSelectedDate(),
                events: sandbox.getEvents()
            });
            this._view = CalendarView.create({
                currentDate: this._model.get('currentDate'),
                selectedDate: this._model.get('selectedDate'),
                events: this._model.get('events')
            });
            this._element.append(this._view.domElem);

            sandbox.on('change-current-date', this._onCurrentDateChanged, this);

            this._view.on('create-event', function (e, data) {
                var event = EventView.create(data.options).domElem;
                data.cellNode.append(event);
                this._model.get('events').push(data.options); // FIXME: add a right way to manipulate a list
            }, this);
        },

        _onCurrentDateChanged: function (e, currentDate) {
            console.log(this._model.get('events'));
            this._view.update({
                currentDate: currentDate,
                selectedDate: this._model.get('selectedDate'),
                events: this._model.get('events')
            });
        }
    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
