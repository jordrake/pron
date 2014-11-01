/* jshint strict: true */
/* global define, exports, require, jQuery */

//CommonJS, AMD or browser for jQuery plugins provided by https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js

(function (factory) {
    "use strict";

    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        factory(require('jquery'));
    } else {
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    /**
     * @param {(string|string[])} jQuery event(s)
     * @returns {jQuery.Deferred} jQuery promise
     */
    function pron() {
        var promises = [],
            events = Array.prototype.slice.call(arguments),
            /*jshint validthis: true */
            elements = this;

        $.each(events, function (idx, event) {
            var promise = $.Deferred();
            $.each(elements, function (idx, ele) {
                $(ele).one(event, function () {
                    var data = Array.prototype.slice.call(arguments);
                    promise.resolve(data);
                });
            });
            promises.push(promise);
        });

        return $.when.apply(null, promises);
    }

    $.fn.pron = pron;
}));
