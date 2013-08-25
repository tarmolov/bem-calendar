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
                'blocks/{core,common}/**/*.js',
                'pages/*/blocks/**/*.js'
            ],
            excludes: [
                'blocks/vendors/**',
                'blocks/{core,common}/**/*.{bh,deps,test}.js',
                'pages/*/blocks/**/*.{bh,deps,test}.js',
                'blocks/{core,common}/**/*.i18n/**'
            ]
        },

        'bh templates': {
            options: {
                predef: ['module']
            },
            includes: [
                'blocks/{core,common}/**/*.bh.js',
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
                'blocks/{core,common,desktop}/**/*.test.js'
            ]
        }
    }
};
