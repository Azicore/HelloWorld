/*
 * hello_world-0.1.0.js [Built at 2017-01-07 19:14:33+0900]
 * Copyright(c) 2016-2017 Azicore (http://azisava.sakura.ne.jp/js/libs/)
 * Released under the MIT license (http://opensource.org/licenses/mit-license.php)
 */

// --------------------------------------------------------------------------------
// hello_world.js

(function() {
    'use strict';
    var AzisavaLibs = window.AzisavaLibs || (window.AzisavaLibs = {});
    
    /**
     * Create HelloWorld object.
     * @constructor
     * @memberof AzisavaLibs
     * @classdesc HelloWorld class
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld = function(val) {
        /**
         * A message.
         * @type {string}
         */
        this.message = 'Hello, world!';
        /**
         * A value.
         * @type {number}
         */
        this.val = val;
    };
    /**
     * Get HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     * @return {string} HelloWorld message
     */
    AzisavaLibs.HelloWorld.prototype.get = function(val) {
        this.val = val;
        return this.message;
    };
    /**
     * Print HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld.prototype.print = function(val) {
        this.val = val;
        console.log(this.message);
    };
    /**
     * Alert HelloWorld.
     * @memberof AzisavaLibs
     * @param {string} val - A value.
     */
    AzisavaLibs.HelloWorld.prototype.alert = function(val) {
        this.val = val;
        alert(this.message);
    };
    
})();

// --------------------------------------------------------------------------------
// hoge_fuga.js

(function() {
    'use strict';
    var AzisavaLibs = window.AzisavaLibs || (window.AzisavaLibs = {});
    
    /**
     * Create HogeFuga object.
     * @constructor
     * @memberof AzisavaLibs
     * @classdesc HogeFuga class
     * @param {number} a - The first value.
     * @param {number} b - The second value.
     */
    AzisavaLibs.HogeFuga = function(a, b) {
        /**
         * The first value.
         * @type {number}
         */
        this.a = a;
        /**
         * The second value.
         * @type {number}
         */
        this.b = b;
    };
    /**
     * Returns sum of the values.
     * @memberof AzisavaLibs
     * @return {number} Sum of the values.
     */
    AzisavaLibs.HogeFuga.prototype.sum = function() {
        return this.a + this.b;
    };
})();
