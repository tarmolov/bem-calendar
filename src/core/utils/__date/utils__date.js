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
        }
    });

});
