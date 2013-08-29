module.exports = function (bh) {

    bh.match('calendar', function (ctx) {
        ctx.tag('table');
        ctx.js(true);
    });

    bh.match('calendar__row', function (ctx) {
        ctx.tag('tr');
    });

    bh.match('calendar__cell', function (ctx) {
        ctx.tag('td');
    });

};
