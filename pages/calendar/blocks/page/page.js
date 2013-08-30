modules.define('i-bem__dom', function (provide, DOM) {

    DOM.decl('page', {
        onSetMod: {
            js: {
                inited: function () {
                    modules.require(['app'], function (Application) {
                        /*jshint unused:false*/
                        var app = new Application(this);
                    }.bind(this));
                }
            }
        },

        /**
         * @param {BEMBlock} view
         */
        appendView: function (view) {
            DOM.append(this.domElem, view.domElem);
        }
    });

    provide(DOM);

});
