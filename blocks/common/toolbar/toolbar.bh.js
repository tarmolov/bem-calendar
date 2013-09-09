module.exports = function (bh) {

    bh.match('toolbar', function (ctx) {
        ctx.mix([
            {block: 'bemview'}
        ]);
    });

};
