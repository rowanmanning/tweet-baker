/* global define */
(function (root) {
    'use strict';

    var bake = {};

    // AMD
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return bake;
        });
    }
    // CommonJS
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = bake;
    }
    // Script tag
    else {
        root.bake = bake;
    }

} (this));