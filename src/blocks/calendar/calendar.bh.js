module.exports = function (bh) {

    bh.match('calendar', function (ctx) {
        ctx.tag('table');
        ctx.js(true);
    });

    bh.match('calendar__content', function (ctx) {
        ctx.tag('tbody');
    });

    bh.match('calendar__row', function (ctx) {
        ctx.tag('tr');
    });

    bh.match('calendar__cell', function (ctx) {
        ctx.tag('td');
        /**
         * Firefox and Opera don't support position:relative for table cells
         */
        ctx.content({
            elem: 'cell-inner',
            content: ctx.content()
        }, true);
    });

};
