modules.define('main', ['i-bem__dom'], function (provide, DOM) {

    provide(DOM.decl('main', {}, {
        getBEMJSON: function () {
            return {
                block: 'main',
                content: [
                    {block: 'navigation', content: [
                        {
                            block: 'button',
                            mods: {theme: 'shadow'},
                            mix: [{block: 'navigation', elem: 'left'}]
                        },
                        {elem: 'title', content: 'March 2013'},
                        {
                            block: 'button',
                            mods: {theme: 'shadow'},
                            mix: [{block: 'navigation', elem: 'right'}]
                        },
                        {
                            block: 'button',
                            mods: {theme: 'shadow'},
                            mix: [{block: 'navigation', elem: 'today'}],
                            content: 'Today'
                        }
                    ]},
                    {block: 'calendar', content: [
                        {elem: 'row', content: [
                            {elem: 'cell', content: 'Monday, 25'},
                            {elem: 'cell', content: 'Tuesday, 26'},
                            {elem: 'cell', content: 'Wednesday, 27'},
                            {elem: 'cell', content: 'Thursday, 28'},
                            {elem: 'cell', content: 'Friday, 1'},
                            {elem: 'cell', mods: {state: 'selected'}, content: 'Saturday, 2'},
                            {elem: 'cell', content: 'Sunday, 3'},
                        ]},
                        {elem: 'row', content: [
                            {elem: 'cell', content: '4'},
                            {elem: 'cell', content: '5'},
                            {elem: 'cell', content: '6'},
                            {elem: 'cell', content: '7'},
                            {elem: 'cell', content: '8'},
                            {elem: 'cell', content: '9'},
                            {elem: 'cell', content: '10'},
                        ]},
                        {elem: 'row', content: [
                            {elem: 'cell', content: '11'},
                            {elem: 'cell', content: '12'},
                            {elem: 'cell', content: '13'},
                            {elem: 'cell', content: '14'},
                            {elem: 'cell', content: '15'},
                            {elem: 'cell', content: '16'},
                            {elem: 'cell', content: '17'},
                        ]},
                        {elem: 'row', content: [
                            {elem: 'cell', content: '18'},
                            {elem: 'cell', content: '19'},
                            {elem: 'cell', content: '20'},
                            {elem: 'cell', content: '21'},
                            {elem: 'cell', content: '22'},
                            {elem: 'cell', content: '23'},
                            {elem: 'cell', content: '24'}
                        ]},
                        {elem: 'row', content: [
                            {elem: 'cell', content: '25'},
                            {elem: 'cell', content: '26'},
                            {elem: 'cell', content: '27'},
                            {elem: 'cell', content: '28'},
                            {elem: 'cell', content: '29'},
                            {elem: 'cell', content: '30'},
                            {elem: 'cell', content: '31'}
                        ]}
                    ]}
                ]
            };
        }
    }));

});
