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
            this._element.append(CalendarView.create().domElem);
        }
    }, {
        getName: function () {
            return 'calendar';
        }
    }));

});
