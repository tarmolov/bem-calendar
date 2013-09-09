module.exports = function (bh) {

    bh.match('form', function (ctx) {
        ctx.tag('form');
        ctx.js(true);
    });

};
