System.register([], function (exports) {
  'use strict';

  return {
    execute: function execute() {
      exports({
        a: arrayLikeToArray,
        u: unsupportedIterableToArray
      });
      /* eslint-disable no-eq-null, eqeqeq */

      function arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        var arr2 = new Array(len);

        for (var i = 0; i < len; i++) {
          arr2[i] = arr[i];
        }

        return arr2;
      }
      /* eslint-disable consistent-return */


      function unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return arrayLikeToArray(o, minLen);
      }
    }
  };
});
//# sourceMappingURL=unsupportedIterableToArray-8cbfb09a.js.map