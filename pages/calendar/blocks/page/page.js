modules.define('page', ['i-bem__dom'], function (provide, DOM) {

    provide(DOM.decl('page', {
        onSetMod: {
            js: function () {
                modules.require(['app'], function (Application) {
                    /*jshint unused:false*/
                    var app = new Application(this);
                }.bind(this));
            }
        },

        /**
         * @param {BEMBlock} view
         */
        appendView: function (view) {
            DOM.append(this.domElem, view.domElem);
        }
    }));

});

/**
 * It's a little hack
 *
 * We should require page for run application or
 * we could define page as i-bem__dom module
 * (but it's tricky)
 */
modules.require(['page'], function () {});
