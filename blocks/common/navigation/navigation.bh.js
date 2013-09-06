module.exports = function (bh) {

    bh.match('navigation__title', function (ctx) {
        ctx.tag('span');
    });

    bh.match('navigation__left', function (ctx) {
        ctx.tag('span');
    });

};
