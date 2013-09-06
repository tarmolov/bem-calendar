module.exports = function (bh) {

    bh.match('input_type_textarea', function (ctx) {
        ctx.tag('textarea');
    });

};
