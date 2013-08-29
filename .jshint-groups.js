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
                'src/{blocks,controllers}/**/*.js',
                'pages/*/blocks/**/*.js'
            ],
            excludes: [
                'src/vendors/**',
                'src/{blocks,controllers}/**/*.{bh,deps,test}.js',
                'pages/*/blocks/**/*.{bh,deps,test}.js'
            ]
        },

        'bh templates': {
            options: {
                predef: ['module']
            },
            includes: [
                'src/{blocks,controllers}/**/*.bh.js',
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
                'src/{blocks,controllers}/**/*.test.js'
            ]
        }
    }
};
