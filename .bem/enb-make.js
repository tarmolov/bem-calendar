module.exports = function (config) {
    config.nodes('pages/*');

    config.nodeMask(/pages\/.*/, function (nodeConfig) {
        nodeConfig.addTechs([
            [require('enb/techs/file-provider'), {target: '?.bemjson.js'}],
            require('enb/techs/bemdecl-from-bemjson'),
            require('enb/techs/files'),
            [ require('enb/techs/levels'), { levels: getLevels(config) } ],
            require('enb-modules/techs/deps-with-modules'),
            [require('enb/techs/browser-js'), {target: '?.browser.js'}],
            [require('enb-modules/techs/prepend-modules'), {source: '?.browser.js', target: '?.modules.js'}],
            [require('bh/techs/bh-server'), {jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [require('bh/techs/bh-client-module'), {target: '?.bh.client.js', jsAttrName: 'data-bem', jsAttrScheme: 'json'}],
            [require('enb/techs/file-merge'), {sources: ['?.modules.js', '?.bh.client.js'], target: '?.js'}],
            require('enb/techs/css'),
            require('enb/techs/html-from-bemjson')
        ]);

        nodeConfig.addTargets(['_?.js', '_?.css', '?.html']);

        nodeConfig.mode('development', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/borschik'), {sourceTarget: '?.js', destTarget: '_?.js', minify: false}],
                [require('enb/techs/file-copy'), {sourceTarget: '?.css', destTarget: '_?.css'}]
           ]);
       });
        nodeConfig.mode('production', function(nodeConfig) {
            nodeConfig.addTechs([
                [require('enb/techs/borschik'), {sourceTarget: '?.js', destTarget: '_?.js'}],
                [require('enb/techs/borschik'), {sourceTarget: '?.css', destTarget: '_?.css', freeze: 'yes'}]
           ]);
        });
    });

    config.node('test', function (nodeConfig) {
        nodeConfig.addTechs([
            require('enb/techs/files'),
            [require('enb/techs/levels'), {levels: getLevels()}],
            [require('enb/techs/bemdecl-test'), {target: 'test.bemdecl.js'}],
            [require('enb/techs/js-test'), {fileMask: getTestFileMask()}],
            [require('enb-modules/techs/deps-with-modules'), {sourceSuffixes: ['vanilla.js', 'js', 'test.js']}],
            [require('enb/techs/browser-js'), {target: '?.browser.js'}],
            [require('bh/techs/bh-client-module'), {target: '?.bh.client.js', jsAttrName: 'data-bem', jsAttrScheme: 'json' }],
            [require('enb-modules/techs/prepend-modules'), {source: '?.browser.js', target: '?.modules.js'}],
            [require('enb/techs/file-merge'), {sources: ['?.modules.js', '?.bh.client.js'], target: '?.js'}],
            [require('enb/techs/file-provider'), {target: 'test.html'}],
            [require('enb/techs/file-provider'), {target: 'mocha.js'}],
            [require('enb/techs/file-provider'), {target: 'mocha.css'}],
            [require('enb/techs/file-provider'), {target: 'chai.js'}],
            [require('enb/techs/file-provider'), {target: 'sinon.js'}]
        ]);

        nodeConfig.addTargets([
            '?.js',
            '?.test.js'
        ]);
    });

    function getLevels() {
        return [
            'blocks/vendors/bem-core/common.blocks',
            'blocks/vendors/bem-core/desktop.blocks',
            'blocks/common',
            'blocks/core',
            'blocks/components'
        ].map(config.resolvePath.bind(config));
    }

    function getTestFileMask() {
        var tests = process.env.TEST_CASES;
        if (tests) {
            var filesForMask = tests.split(' ')
                .map(function (test) {
                    return test
                        .replace(/\//g, '\\/')
                        .replace(/\./g, '\\.') +
                        '$';
                })
                .join('|');
            var fileMask = new RegExp(filesForMask);
        }
        return fileMask || /^((?!vendors).)*$/;
    }

};
