module.exports = {
    options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        noempty: true,
        nonew: true,
        undef: true,
        unused: true,
        trailing: true,
        maxlen: 120,
        quotmark: 'single'
    },
    groups: {
        client: {
            options: {
                browser: true,
                predef: ['modules']
            },
            includes: [
                'blocks/{common,components,core,}/**/*.js',
                'pages/*/blocks/**/*.js'
            ],
            excludes: [
                'blocks/vendors/**',
                'blocks/{common,components,core,}/**/*.{bh,deps,test}.js',
                'pages/*/blocks/**/*.{bh,deps,test}.js'
            ]
        },

        'bh templates': {
            options: {
                predef: ['module']
            },
            includes: [
                'blocks/{common,components,core}/**/*.bh.js',
                'pages/*/blocks/**/*.bh.js'
            ]
        },

        tests: {
            options: {
                browser: true,
                predef: [
                    'modules',
                    'describe',
                    'it',
                    'before',
                    'beforeEach',
                    'after',
                    'afterEach'
                ],
                expr: true // for should asserts
            },
            includes: [
                'blocks/{common,components,core}/**/*.test.js',
                'pages/*/blocks/**/*.test.js'
            ]
        }
    }
};
