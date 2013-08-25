modules.define('app', ['inherit'], function (provide, inherit) {

    var Application = inherit({
        __constructor: function () {
            /*jshint devel:true*/
            console.log('constructor');
        }
    });

    provide(Application);

});
