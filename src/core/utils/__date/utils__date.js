modules.define('utils__date', function (provide) {

    var MONTH_NAMES = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    provide({
        formatMonth: function (date) {
            return MONTH_NAMES[date.getMonth()] + ' ' + date.getFullYear();
        }
    });

});
