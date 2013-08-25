module.exports = function (bh) {

    bh.match('search', function (ctx) {
        ctx.content([
            {
                block: 'icon',
                mix: [
                    {
                        block: 'search',
                        elem: 'icon'
                    }
                ],
                mods: {type: 'loupe'}
            },
            {
                block: 'input',
                mix: [
                    {
                        block: 'search',
                        elem: 'input'
                    }
                ],
                placeholder: ctx.param('placeholder')
            }
        ]);
    });

};
