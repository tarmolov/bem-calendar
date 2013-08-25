module.exports = function (bh) {

    bh.match('page', function (ctx) {
        return [
            {elem: 'doctype', content: ctx.param('doctype') || '<!DOCTYPE HTML>'},
            {
                elem: 'html',
                content: [
                    {
                        tag: 'head',
                        content: [
                            [
                                {
                                    elem: 'meta',
                                    attrs: {charset: 'utf-8'}
                                },
                                {
                                    elem: 'title',
                                    content: ctx.param('title')
                                },
                                ctx.param('favicon') &&
                                    {
                                        elem: 'favicon',
                                        url: ctx.param('favicon')
                                    }
                            ],
                            ctx.param('head')
                        ]
                    },
                    ctx.json()
                ]
            }
        ];
    });

    bh.match('page', function (ctx) {
        ctx.tag('body');
    });

    bh.match('page__html', function (ctx) {
        ctx.tag('html');
        ctx.bem(false);
    });

    bh.match('page__title', function (ctx) {
        ctx.tag('title');
        ctx.bem(false);
    });

    bh.match('page__head', function (ctx) {
        ctx.tag('head');
        ctx.bem(false);
    });

    bh.match('page__meta', function (ctx) {
        ctx.tag('meta');
        ctx.bem(false);
    });

    bh.match('page__doctype', function (ctx) {
        return ctx.content();
    });

    bh.match('page__favicon', function (ctx) {
        ctx.tag('link');
        ctx.attr('rel', 'shortcut icon');
        ctx.attr('href', ctx.param('url'));
        ctx.bem(false);
    });

    bh.match('page__js', function (ctx) {
        ctx.tag('script');
        ctx.attr('src', ctx.param('url'));
        ctx.bem(false);
    });

    bh.match('page__css', function (ctx) {
        var url = ctx.param('url');

        ctx.bem(false);

        if (url) {
            ctx.tag('link');
            ctx.attr('rel', 'stylesheet');
            ctx.attr('href', url);
        } else {
            ctx.tag('style');
        }

        var ie = ctx.param('ie');
        if (ie) {
            if (ie === true) {
                return [6, 7, 8, 9].map(function (v) {
                    return {
                        elem: 'css',
                        url: url + '.ie' + v + '.css', ie: 'IE ' + v
                    };
                });
            } else {
                var hideRule = !ie ?
                    ['gt IE 9', '<!-->', '<!--'] :
                    ie === '!IE' ?
                        [ie, '<!-->', '<!--'] :
                        [ie, '', ''];
                return [
                    '<!--[if ' + hideRule[0] + ']>',
                    hideRule[1],
                    ctx.content(),
                    hideRule[2],
                    '<![endif]-->'
                ];
            }
        }
    });

};
