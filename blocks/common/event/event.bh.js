module.exports = function (bh) {

    bh.match('event', function (ctx) {
        ctx.mix([
            {block: 'bemview'}
        ]);
        ctx.js(true);
    });

};
