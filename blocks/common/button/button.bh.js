module.exports = function (bh) {

    bh.match('button', function (ctx) {
        ctx.tag('button');
        ctx.attr('type', ctx.param('type') || 'button');
        ctx.js(true);
    });

};
