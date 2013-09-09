module.exports = function (bh) {

    bh.match('form', function (ctx) {
        ctx.mix([
            {block: 'bemview'}
        ]);
        ctx.tag('form');
        ctx.js(true);
    });

};
