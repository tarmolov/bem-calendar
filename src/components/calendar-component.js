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
            this._element.append(CalendarView.create({
                currentDate: sandbox.getModel().get('currentDate'),
                selectedDate: sandbox.getModel().get('selectedDate')
            }).domElem);
        }
    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
