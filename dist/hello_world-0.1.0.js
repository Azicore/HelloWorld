/*
 * hello_world-0.1.0.js [2017-01-07 02:49:33+0900]
 * Copyright(c) 2016-2017 @Azicore (http://azisava.sakura.ne.jp/)
 * Released under the MIT license (http://opensource.org/licenses/mit-license.php)
 */


/* global AzisavaLibs:true */

AzisavaLibs = window.AzisavaLibs || {};
(function() {
    'use strict';

    /**
     * Create HelloWorld object.
     * @constructor
     * @classdesc HelloWorld class
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld = function(val) {
        this.message = 'Hello, world!';
        this.val = val;
    };
    AzisavaLibs.HelloWorld.prototype = {
        /**
         * Get HelloWorld.
         * @param {string} val - A value.
         * @return {string} HelloWorld message
         */
        get: function(val) {
            this.val = val;
            return this.message;
        },
        /**
         * Print HelloWorld.
         * @param {string} val - A value.
         */
        print: function(val) {
            this.val = val;
            console.log(this.message);
        },
        /**
         * Alert HelloWorld.
         * @param {string} val - A value.
         */
        alert: function(val) {
            this.val = val;
            alert(this.message);
        }
    };

//    if (module && typeof module.exports !== 'undefined') {
//        module.exports = AzisavaLibs.HelloWorld;
//    } else if (window && typeof window.HelloWorld === 'undefined') {
//        window.HelloWorld = AzisavaLibs.HelloWorld;
//    }

})();
