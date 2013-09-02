modules.define(
    'calendar',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'utils__date',
        'event',
        'model'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        dateUtils,
        EventView,
        Model
    ) {

    var COLLS_NUMBER = 7;

    function getEventsJSON(events) {
        return events.length ?
            events.map(function (event) {
                return EventView.getBEMJSON(event);
            }) :
            '';
    }

    function getCellWithWeekDayJSON(date, isCurrent, events) {
        return {
            elem: 'cell',
            mods: {
                current: isCurrent && 'yes'
            },
            js: {
                date: date.getTime()
            },
            content: [].concat(
                dateUtils.getWeekDayName(date.getDay()) + ', ' + date.getDate(),
                getEventsJSON(events)
            )
        };
    }

    function getCellJSON(date, isCurrent, events) {
        return {
            elem: 'cell',
            mods: {
                current: isCurrent && 'yes'
            },
            js: {
                date: date.getTime()
            },
            content: [].concat(
                date.getDate(),
                getEventsJSON(events)
            )
        };
    }

    function getRowJSON(content) {
        return {
            elem: 'row',
            content: content
        };
    }

    function getDaysFromPrevMonth(currentDate) {
        var currentDay = currentDate.getDay();
        return !currentDay ? 6 : currentDay - 1;
    }

    function getStartDate(currentDate, daysFromPrevMonth) {
        var startDate = new Date(currentDate);
        startDate.setDate(startDate.getDate() - daysFromPrevMonth);
        return startDate;
    }

    function getEndDate(currentDate, daysFromPrevMonth) {
        var daysInCurrentMonth = dateUtils.daysInMonth(currentDate);
        var daysFromNextMonth = 7 - (daysInCurrentMonth + daysFromPrevMonth) % COLLS_NUMBER;
        var endDate = new Date(currentDate);
        endDate.setDate(endDate.getDate() + daysInCurrentMonth + daysFromNextMonth);
        return endDate;
    }

    function getEndOfFirstWeek(startDate) {
        var endOfWeek = new Date(startDate);
        endOfWeek.setDate(endOfWeek.getDate() + COLLS_NUMBER);
        return endOfWeek;
    }

    function filterEventsByMonth(events, date) {
        return events.filter(function (event) {
            return event.date === date.getTime();
        });
    }

    function getRowsJSON(model) {
        var currentDate = dateUtils.normalize(model.get('currentDate'));
        var selectedDate = dateUtils.normalize(model.get('selectedDate'));
        var events = model.get('events');
        var daysFromPrevMonth = getDaysFromPrevMonth(currentDate);
        var date = getStartDate(currentDate, daysFromPrevMonth);
        var endDate = getEndDate(currentDate, daysFromPrevMonth);
        var endOfFirstWeek = getEndOfFirstWeek(date);

        var bemjson = [];
        var row = [];
        var isCurrent;
        var filteredEvents;
        while (date < endDate) {
            isCurrent = date.getTime() === selectedDate.getTime();
            filteredEvents = filterEventsByMonth(events, date);
            if (date < endOfFirstWeek) {
                row.push(getCellWithWeekDayJSON(date, isCurrent, filteredEvents));
            } else {
                row.push(getCellJSON(date, isCurrent, filteredEvents));
            }
            if (row.length === COLLS_NUMBER) {
                bemjson.push(getRowJSON(row));
                row = [];
            }
            date.setDate(date.getDate() + 1);
        }

        return bemjson;
    }

    provide(DOM.decl('calendar', {
        onSetMod: {
            js: {
                inited: function () {
                    this._setUpListeners(); // FIXME: live events work only for block?
                }
            }
        },

        destruct: function () {
            this._base.apply(this, arguments);

            this._model.un('change:currentDate', this.update, this);
            this._model = null;
        },

        _setUpListeners: function () {
            this.bindTo(this.findElem('cell'), 'click', this._onCellClick);
        },

        _onCellClick: function (e) {
            var cellNode = $(e.target);
            var options = this.elemParams(cellNode);

            var model = new Model(options);
            var event = EventView.create(model).domElem;
            cellNode.append(event);
            this._model.get('events').push(model); // FIXME: add a right way to manipulate a list
        },

        _setModel: function (model) {
            this._model = model;
            model.on('change:currentDate', this.update, this);
            this.update();
        },

        update: function () {
            var bemjson = getRowsJSON(this._model);
            DOM.update(this.domElem, bh.apply({
                block: 'calendar',
                elem: 'content',
                content: bemjson
            }));
            this._setUpListeners();
        }
    }, {
        create: function (model) {
            var block = DOM.init($(bh.apply({
                block: 'calendar',
                content: {
                    elem: 'content',
                }
            }))).bem(this.getName());
            block._setModel(model);
            return block;
        }
    }));

});
