modules.define('utils__date', function (provide) {

    var MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    var DAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    provide({
        getMonthName: function (month) {
            return MONTH_NAMES[month];
        },
        getWeekDayName: function (day) {
            return DAYS[day];
        },
        daysInMonth: function (date) {
            var year = date.getFullYear();
            var month = date.getMonth();
            return new Date(year, ++month, 0).getDate();
        },
        normalize: function (date) {
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            return date;
        },
        formatDate: function (d) {
            var date = typeof d === 'number' ? new Date(d) : d;
            return this.getMonthName(date.getMonth()) + ' ' + date.getDate() + ', ' + date.getFullYear();
        }
    });

});
