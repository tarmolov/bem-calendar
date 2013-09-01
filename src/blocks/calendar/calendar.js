modules.define(
    'calendar',
    [
        'i-bem__dom',
        'jquery',
        'bh',
        'utils__date',
        'event'
    ],
    function (
        provide,
        DOM,
        $,
        bh,
        dateUtils,
        EventView
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

    function getRowsJSON(options) {
        var currentDate = dateUtils.normalize(options.currentDate);
        var selectedDate = dateUtils.normalize(options.selectedDate);
        var events = options.events;
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

        _setUpListeners: function () {
            this.bindTo(this.findElem('cell'), 'click', this._onCellClick);
        },

        _onCellClick: function (e) {
            var cellNode = $(e.target);
            var options = this.elemParams(cellNode);
            this.emit('create-event', {
                options: options,
                cellNode: cellNode
            });
        },

        update: function (options) {
            var bemjson = getRowsJSON(options);
            DOM.update(this.domElem, bh.apply({
                block: 'calendar',
                elem: 'content',
                content: bemjson
            }));
            this._setUpListeners();
        }
    }, {
        create: function (options) {
            return DOM.init($(bh.apply({
                block: 'calendar',
                content: {
                    elem: 'content',
                    content: getRowsJSON(options)
                }
            }))).bem(this.getName());
        }
    }));

});
