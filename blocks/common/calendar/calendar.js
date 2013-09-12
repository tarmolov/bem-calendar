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
        // Show only first event
        return events.length ?
            events.map(function (event) {
                return EventView.getBEMJSON(event);
            })[0] :
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
                {
                    elem: 'cell-title',
                    content: dateUtils.getWeekDayName(date.getDay()) + ', ' + date.getDate()
                },
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
                {
                    elem: 'cell-title',
                    content: date.getDate()
                },
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
        var daysInCurrentMonth = dateUtils.daysInMonth(currentDate.getMonth(), currentDate.getFullYear());
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
            return event.get('date') === date.getTime();
        });
    }

    function getRowsJSON(model) {
        var currentDate = dateUtils.normalize(new Date(model.get('currentDate')), true);
        var selectedDate = dateUtils.normalize(new Date(model.get('selectedDate')));
        var events = model.get('events') || [];
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

    /**
     * Calendar
     * @augments IBemView
     */
    provide(DOM.decl('calendar', {
        onSetMod: {
            js: {
                inited: function () {
                    EventView.on(this.domElem, 'delete', this._onEventDelete, this);
                }
            }
        },

        destruct: function () {
            this.__base.apply(this, arguments);

            EventView.un(this.domElem, 'delete', this._onEventDelete, this);
            this._model = null;
        },

        _onEventDelete: function (e, eventModel) {
            this._model.get('events').remove(eventModel);
        },

        /**
         * Adds new event in calendar
         */
        _onCellClick: function (e) {
            var options = this.elemParams($(e.currentTarget));
            var model = new Model(options);
            this._model.get('events').add(model);
            this.openPopup(model, true);
        },

        /**
         * Opens popup for event by model
         * @param {Model} model Event model
         * @param {Boolean} disableAutoSwitching Disable autoswitching to month in the model
         */
        openPopup: function (model, disableAutoSwitching) {
            if (!disableAutoSwitching) {
                var eventDate = dateUtils.normalize(new Date(model.get('date')), true);
                this._model.set('currentDate', eventDate.getTime());
            }

            var event = this.findBlocksInside('event').filter(function (event) {
                return event.params.date === model.get('date');
            })[0];

            if (event) {
                event.openPopup();
            }
        },

        getModel: function () {
            return this._model;
        },

        setModel: function (model) {
            this._model = model;
            if (this._model) {
                this._model.un('change', this.update, this);
            }
            this._model.on('change', this.update, this);
            this.update();
        },

        _setModelsToEvents: function () {
            var events = this._model.get('events');
            this.findBlocksInside('event').forEach(function (eventView) {
                var model = events.filter(function (event) {
                    return eventView.params.date === event.get('date');
                })[0];

                if (model) {
                    eventView.setModel(model);
                }
            });
        },

        update: function () {
            var bemjson = getRowsJSON(this._model);

            DOM.update(this.domElem, bh.apply({
                block: 'calendar',
                elem: 'content',
                content: bemjson
            }));

            this._setModelsToEvents();
            this.bindTo(this.findElem('cell'), 'click', this._onCellClick);
        }
    }, {
        create: function (model, options) {
            var bemjson = this.getBEMJSON(model, options);
            var block = DOM.init($(bh.apply(bemjson))).bem(this.getName());
            block.setModel(model);
            return block;
        },

        getBEMJSON: function () {
            return {
                block: 'calendar',
                content: {
                    elem: 'content'
                }
            };
        }
    }));

});
