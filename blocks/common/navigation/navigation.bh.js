module.exports = function (bh) {

    bh.match('navigation', function (ctx) {
        ctx.mix([
            {block: 'bemview'}
        ]);
    });

    bh.match('navigation__title', function (ctx) {
        ctx.tag('span');
    });

    bh.match('navigation__left', function (ctx) {
        ctx.tag('span');
    });

};
