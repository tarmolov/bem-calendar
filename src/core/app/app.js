modules.define('app', ['inherit', 'layout'], function (provide, inherit, layout) {

    var Application = inherit({
        __constructor: function (rootBlock) {
            this._rootBlock = rootBlock;
            this._layout = layout.create();
            this._rootBlock.appendView(this._layout);
        }
    });

    provide(Application);

});
