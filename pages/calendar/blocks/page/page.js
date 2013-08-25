modules.require(['app', 'dom'], function (Application, dom) {

    dom.ready.then(function () {
        /*jshint unused:false*/
        var app = new Application();
    });

});
