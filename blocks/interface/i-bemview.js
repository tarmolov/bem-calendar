/*jshint unused:false*/

/**
 * @class BEM View Interface
 * @abstract
 */
var IBemView = function () {};

IBemView.prototype = {
    /**
     * @param {Model} model
     */
    setModel: function (model) {},

    /**
     * @returns {Model} model
     */
    getModel: function () {},

    /**
     * Redraw view
     */
    update: function () {}
};

/**
 * Create view
 * @param {Model} model
 * @returns {BEMBlock} block
 */
IBemView.create = function (model) {};

/**
 * Get BEM JSON for building block
 * @param {Model|Object} model or options
 * @returns {JSON} bemjson
 */
IBemView.getBEMJSON = function (model) {};
