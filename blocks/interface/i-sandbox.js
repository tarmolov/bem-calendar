/*jshint unused:false*/

/**
 * @class Sandbox Interface
 * @param {Application} app
 */
var ISandbox = function (app) {};

ISandbox.prototype = {
    /**
     * Returns DOM node for component
     * @param {IComponent} component
     * @returns {jQuery} element
     */
    getDomElement: function (component) {},

    /**
     * Returns model
     * @returns {Model} model
     */
    getModel: function () {}
};
