modules.define('utils__date', function (provide) {

    var MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    provide({
        /**
         * Returns month name by index
         * @param {Number} index
         */
        getMonthName: function (index) {
            return MONTH_NAMES[index];
        },

        /**
         * Returns month index by name
         * @param {String} name Name of month
         */
        getMonthNumber: function (name) {
            var monthName = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
            return MONTH_NAMES.indexOf(monthName);
        },

        /**
         * Returns name of week day by index
         * @param {Number} day Day index
         */
        getWeekDayName: function (day) {
            return DAYS[day];
        },

        /**
         * Returns number of days for date
         * @param {Number} month
         * @param {Number} year
         */
        daysInMonth: function (month, year) {
            return new Date(year, ++month, 0).getDate();
        },

        /**
         * Reset time for date
         * @param {Date} date
         * @param {Boolean} toMonthStart Resets date to first day of month
         */
        normalize: function (date, toMonthStart) {
            if (toMonthStart) {
                date.setDate(1);
            }
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        },

        /**
         * Formate date as a string
         * @param {Date} d
         */
        formatDate: function (d) {
            var date = typeof d === 'number' ? new Date(d) : d;
            return this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
    });

});
