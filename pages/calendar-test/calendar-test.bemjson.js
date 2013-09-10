function createPlaceholder(id) {
    return {
        elem: id,
        mix: [
            {block: 'placeholder', mods: {id: id}}
        ]
    };
}

module.exports = {
    block: 'page',
    title: 'BEM Calendar',
    styles: [
        {elem: 'css', url: '_calendar-test.css'}
    ],
    scripts: [
        {elem: 'js', url: '_calendar-test.js'}
    ],
    content: [
        {
            block: 'head',
            content: [
                createPlaceholder('toolbar'),
                createPlaceholder('search')
            ]
        },
        {
            block: 'main',
            content: [
                createPlaceholder('navigation'),
                createPlaceholder('calendar')
            ]
        }
    ]
}
