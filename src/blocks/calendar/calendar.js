modules.define('calendar', ['i-bem__dom', 'jquery', 'bh', 'utils__date'], function (provide, DOM, $, bh, dateUtils) {

    var COLLS_NUMBER = 7;

    function getCellWithWeekDayJSON(date, isCurrent) {
        return {
            elem: 'cell',
            mods: {
                state: isCurrent && 'seleted'
            },
            content: dateUtils.getWeekDayName(date.getDay()) + ', ' + date.getDate()
        };
    }

    function getCellJSON(date, isCurrent) {
        return {
            elem: 'cell',
            mods: {
                state: isCurrent && 'seleted'
            },
            content: date.getDate()
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

    function getRowsJSON(currentDate, selectedDate) {
        var bemjson = [];
        var row = [];
        var daysFromPrevMonth = getDaysFromPrevMonth(currentDate);
        var date = getStartDate(currentDate, daysFromPrevMonth);
        var endDate = getEndDate(currentDate, daysFromPrevMonth);
        var endOfFirstWeek = getEndOfFirstWeek(date);
        var isCurrent;
        while (date < endDate) {
            isCurrent = date.getTime() === selectedDate.getTime();
            if (date < endOfFirstWeek) {
                row.push(getCellWithWeekDayJSON(date, isCurrent));
            } else {
                row.push(getCellJSON(date, isCurrent));
            }
            if (row.length === COLLS_NUMBER) {
                bemjson.push(getRowJSON(row));
                row = [];
            }
            date.setDate(date.getDate() + 1);
        }

        return bemjson;
    }

    provide(DOM.decl('calendar', {}, {
        create: function (options) {
            return DOM.init($(bh.apply({
                block: 'calendar',
                content: getRowsJSON(options.currentDate, options.selectedDate)
            }))).bem(this.getName());
        }
    }));

});
