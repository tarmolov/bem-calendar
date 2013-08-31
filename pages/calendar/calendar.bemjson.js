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
    head: [
        {elem: 'css', url: '_calendar.css'},
        {elem: 'js', url: '_calendar.js'}
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
