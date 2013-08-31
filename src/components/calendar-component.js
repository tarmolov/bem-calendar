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

        _id: 'calendar',

        start: function (sandbox) {
            this.__base();
            this._element = sandbox.getDomElement(this._id);
            this._element.append(CalendarView.create().domElem);
        }
    }));

});
