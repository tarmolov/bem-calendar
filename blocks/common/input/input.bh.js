module.exports = function (bh) {

    bh.match('input', function (ctx) {
        ctx.tag('input');
        ctx.js(true);
        ctx.attr('placeholder', ctx.param('placeholder') || '');
        ctx.attr('value', ctx.content());
    });

};
