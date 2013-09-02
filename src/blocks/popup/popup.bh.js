module.exports = function (bh) {

    bh.match('popup', function (ctx) {
        ctx.content(
            [].concat(ctx.content(), {
                elem: 'close',
                content: '&times;'
            }),
            true
        );
    });

};
