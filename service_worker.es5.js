
self.serviceWorkerUrls = {
  "/jsenv-template-pwa/index.html": {
    "versioned": false,
    "version": "251eec80"
  },
  "/jsenv-template-pwa/other/favicon.png?v=25e95a00": {
    "versioned": true
  },
  "/jsenv-template-pwa/other/pwa.webmanifest": {
    "versioned": false,
    "version": "8f56819d"
  },
  "/jsenv-template-pwa/other/logo.png?v=25e95a00": {
    "versioned": true
  },
  "/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2?v=cc46322d": {
    "versioned": true
  },
  "/jsenv-template-pwa/css/app.css?v=e37e2d0a": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/app_loader.es5.js?as_js_classic&v=83c7e74e": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/app.es5.js?as_js_classic&v=2abda219": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/s.js?v=e95730e3": {
    "versioned": true
  },
  "/jsenv-template-pwa/other/pwa_icon_192.png?v=574c1c76": {
    "versioned": true
  },
  "/jsenv-template-pwa/other/pwa_icon_512.png?v=d2dd96fd": {
    "versioned": true
  },
  "/jsenv-template-pwa/other/maskable_icon_192.png?v=c20be9d4": {
    "versioned": true
  }
};

var __versionMappings__ = {
  "/jsenv-template-pwa/js/app_loader.es5.js": "/jsenv-template-pwa/js/app_loader.es5.js?as_js_classic&v=83c7e74e",
  "/jsenv-template-pwa/css/app.css": "/jsenv-template-pwa/css/app.css?v=e37e2d0a",
  "/jsenv-template-pwa/js/app.es5.js": "/jsenv-template-pwa/js/app.es5.js?as_js_classic&v=2abda219",
  "/jsenv-template-pwa/other/logo.png": "/jsenv-template-pwa/other/logo.png?v=25e95a00",
  "/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2": "/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2?v=cc46322d"
};
var __envGlobal__ = typeof self === 'undefined' ? global : self;
__envGlobal__.__v__ = function (specifier) {
  return __versionMappings__[specifier] || specifier
};
!function(e,n){if("function"==typeof define&&define.amd)define([],n);else if("undefined"!=typeof exports)n();else{n(),e.service_workerEs5={}}}("undefined"!=typeof globalThis?globalThis:"undefined"!=typeof self?self:this,(function(){"use strict";function e(e,n){(null==n||n>e.length)&&(n=e.length);for(var r=new Array(n),t=0;t<n;t++)r[t]=e[t];return r}function n(n,r){if(n){if("string"==typeof n)return e(n,r);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?e(n,r):void 0}}var r=r=>(n=>{if(Array.isArray(n))return e(n)})(r)||function(e){if("undefined"!=typeof Symbol&&null!=e[Symbol.iterator]||null!=e["@@iterator"])return Array.from(e)}(r)||n(r)||(()=>{throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")})();var t=(e,r)=>(e=>{if(Array.isArray(e))return e})(e)||function(e,n){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var t,o,a=[],i=!0,c=!1;try{for(r=r.call(e);!(i=(t=r.next()).done)&&(a.push(t.value),!n||a.length!==n);i=!0);}catch(e){c=!0,o=e}finally{try{i||null==r.return||r.return()}finally{if(c)throw o}}return a}}(e,r)||n(e,r)||(()=>{throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")})(),o=(e,n,r)=>(n in e?Object.defineProperty(e,n,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[n]=r,e);function a(e,n){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var t=Object.getOwnPropertySymbols(e);n&&(t=t.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),r.push.apply(r,t)}return r}function i(e){for(var n=1;n<arguments.length;n++){var r=null!=arguments[n]?arguments[n]:{};n%2?a(Object(r),!0).forEach((function(n){o(e,n,r[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(r,n))}))}return e}var c="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?e=>typeof e:e=>e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e;function u(e,n,r){return r?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e)}function l(e,n){try{var r=e()}catch(e){return n(e)}return r&&r.then?r.then(void 0,n):r}function f(){}function s(e){if(e&&e.then)return e.then(f)}function d(e){return function(){for(var n=[],r=0;r<arguments.length;r++)n[r]=arguments[r];try{return Promise.resolve(e.apply(this,n))}catch(e){return Promise.reject(e)}}}function h(e,n){if(!n)return e&&e.then?e.then(f):Promise.resolve()}function v(e,n){return e&&e.then?e.then(n):n(e)}function p(e){var n=e();if(n&&n.then)return n.then(f)}function g(e,n){var r=e();return r&&r.then?r.then(n):n(r)}self.initJsenvServiceWorker=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.logLevel,r=void 0===n?"warn":n,o=e.logsBackgroundColor,a=void 0===o?"#ffdc00":o,f=e.cachePrefix,w=void 0===f?"jsenv":f,m=e.urlsConfig,O=void 0===m?{"/":{}}:m,P=e.shouldHandleRequest,k=void 0===P?function(e,n){var r=n.requestWasCachedOnInstall;return("GET"===e.method||"HEAD"===e.method)&&r}:P,S=e.shouldCleanOnActivate,T=void 0===S?function(e,n,r){return!r.requestWasCachedOnInstall}:S,A=e.navigationPreloadEnabled,R=void 0!==A&&A,x=e.actions,I=void 0===x?{ping:function(){return"pong"}}:x;if("object"!==c(O))throw new TypeError("urlsConfig should be an object, got ".concat(O));if("string"!=typeof w)throw new TypeError("cachePrefix should be a string, got ".concat(w));if(0===w.length)throw new TypeError("cachePrefix must not be empty");if("function"!=typeof T)throw new TypeError("shouldCleanOnActivate should be a function, got ".concat(T));if("function"!=typeof k)throw new TypeError("shouldHandleRequest should be a function, got ".concat(k));if("string"!=typeof r)throw new TypeError("logLevel should be a boolean, got ".concat(r));if("string"!=typeof a)throw new TypeError("logsBackgroundColor should be a string, got ".concat(a));if("boolean"!=typeof R)throw new TypeError("navigationPreloadEnabled should be a boolean, got ".concat(R));var q=b({cachePrefix:w}),W=y({logLevel:r,logsBackgroundColor:a}),L=j(),M=E({urlsConfig:O,urlResolver:L}),D=M.urlsToCacheOnInstall,U=M.urlsToReloadOnInstall,B=M.urlMapping;W.info("cache key: ".concat(q)),self.addEventListener("install",(function(e){e.waitUntil(H(e))}));var H=d((function(){return W.info("install start"),s(l((function(){var e=D.length,n=0;return u(Promise.all(D.map(d((function(e){return s(l((function(){var r=U.includes(e),t=new Request(e,i({},r?{cache:"reload"}:{}));return h(_(t,{oncache:function(){n+=1}}))}),(function(n){W.warn("cannot put ".concat(e," in cache due to error while fetching: ").concat(n.stack))})))})))),(function(){n===e?W.info("install done (".concat(e," urls added in cache)")):W.info("install done (".concat(n,"/").concat(e," urls added in cache)"))}))}),(function(e){W.error("install error: ".concat(e.stack))})))}));self.addEventListener("fetch",(function(e){var n=J(e.request);if(k(n,{requestWasCachedOnInstall:D.includes(n.url)})){var r=K(n,e);r&&e.respondWith(r)}}));var K=d((function(e,n){var r=!1;return W.debug("received fetch event for ".concat(e.url)),v(l((function(){return u(self.caches.match(e),(function(t){return t?(W.debug("respond with response from cache for ".concat(e.url)),r=!0,t):u(n.preloadResponse,(function(n){if(n)return W.debug("respond with preloaded response for ".concat(e.url)),r=!0,n}))}))}),(function(n){W.warn("error while trying to use cache for ".concat(e.url),n.stack);var t=fetch(e);return r=!0,t})),(function(n){return r?n:(W.debug("no cache for ".concat(e.url,", fetching it")),_(e))}))})),J=function(e){if(Object.prototype.hasOwnProperty.call(B,e.url)){var n=B[e.url];return W.debug("redirect request from ".concat(e.url," to ").concat(n)),C(e,n)}return e};self.addEventListener("activate",(function(e){var n=G(e);n&&e.waitUntil(n)}));var G=d((function(){return W.info("activate start"),u(Promise.all([N(),V(),$()]),(function(){W.info("activate done")}))})),N=d((function(){return p((function(){if(R&&self.registration.navigationPreload)return h(self.registration.navigationPreload.enable())}))})),V=d((function(){return u(self.caches.open(q),(function(e){return u(e.keys(),(function(n){return h(Promise.all(n.map(d((function(n){return u(e.match(n),(function(r){return p((function(){if(T(r,n,{requestWasCachedOnInstall:D.includes(n.url)}))return W.info("delete ".concat(n.url)),h(e.delete(n))}))}))})))))}))}))})),$=d((function(){return u(self.caches.keys(),(function(e){return h(Promise.all(e.map(d((function(e){return p((function(){if(e!==q&&e.startsWith(w))return W.info("delete cache ".concat(e)),h(self.caches.delete(e))}))})))))}))}));self.addEventListener("message",d((function(e){var n=e.data;if("object"===c(n)){var r=n.action,t=I[r];if(t){var o,a,i=n.payload;return v(l((function(){return u(t(i,{cacheName:q}),(function(e){o="resolved",a=e}))}),(function(e){o="rejected",a=e})),(function(){e.ports[0].postMessage({status:o,value:a})}))}}}))),I=i({skipWaiting:function(){self.skipWaiting()},refreshCacheKey:d((function(e){return e=L.resolve(e),u(_(new Request(e,{cache:"reload"})),(function(e){return e.status}))})),addCacheKey:d((function(e){return e=L.resolve(e),u(_(e),(function(e){return e.status}))})),removeCacheKey:d((function(e){return e=L.resolve(e),u(self.caches.open(q),(function(n){return u(n.delete(e))}))}))},I);var _=d((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.oncache;return u(Promise.all([F(e),Q()]),(function(n){var o=!1,a=t(n,2),i=a[0],c=a[1];return g((function(){if(200===i.status)return W.debug("fresh response found for ".concat(e.url,", put it in cache and respond with it")),u(z(i),(function(n){var t=c.put(e,n);return g((function(){if(r)return u(t,(function(){r()}))}),(function(){return o=!0,i}))}))}),(function(n){return o?n:(W.warn("cannot put ".concat(e.url," in cache due to response status (").concat(i.status,")")),i)}))}))})),z=d((function(e){var n=e.clone();return e.redirected?u("body"in n?Promise.resolve(n.body):n.blob(),(function(e){return new Response(e,{headers:n.headers,status:n.status,statusText:n.statusText})})):n})),F=d((function(e){var n=new AbortController,r=n.signal;return l((function(){return u(fetch(e,{signal:r}))}),(function(e){throw n.abort(),e}))})),Q=d((function(){return self.caches.open(q)}))};var y=function(e){var n=e.logLevel,t=e.logsBackgroundColor,o=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return["%csw","background: ".concat(t,"; color: black; padding: 1px 3px; margin: 0 1px")].concat(n)},a=function(e){return function(){var n;return(n=console)[e].apply(n,r(o.apply(void 0,arguments)))}},i=a("debug"),c=a("info"),u=a("warn"),l=a("error"),f=function(){};if("debug"===n)return{debug:i,info:c,warn:u,error:l};if("info"===n)return{debug:f,info:c,warn:u,error:l};if("warn"===n)return{debug:f,info:f,warn:u,error:l};if("error"===n)return{debug:f,info:f,warn:f,error:l};if("off"===n)return{debug:f,info:f,warn:f,error:f};throw new Error("unknown logLevel, got ".concat(n))},b=function(e){var n=e.cachePrefix;return"".concat(n).concat(P())},w=Math.pow(36,4),m=function(){var e=self.crypto;if(e){var n=Math.pow(2,32)-1;return function(){return Math.abs(e.getRandomValues(new Uint32Array(1))[0]/n)}}return Math.random}(),O=function(){return e=(m()*w<<0).toString(36),n=4,(r="000000000".concat(e)).substr(r.length-n);var e,n,r},P=function(){var e=(new Date).getTime().toString(36),n="".concat(O()).concat(O());return"".concat(e).concat(n)},j=function(){return{resolve:function(e){return String(new URL(e,self.location))}}},E=function(e){var n=e.urlsConfig,r=e.urlResolver,t=[],o=[],a={},i=[];return Object.keys(n).forEach((function(e){var c=r.resolve(e);if(!i.includes(c)){i.push(c);var u=n[e];u||(u={cache:!1}),!0===u&&(u={cache:!0});var l=u,f=l.cache,s=void 0===f||f,d=l.versioned,h=void 0!==d&&d,v=l.alias;s&&(t.push(c),h||o.push(c)),v&&(a[c]=r.resolve(v))}})),{urlsToCacheOnInstall:t,urlsToReloadOnInstall:o,urlMapping:a}},C=d((function(e,n){if("navigate"!==e.mode)return new Request(n,e);var r=e.clone(),t=r.body,o=r.credentials,a=r.headers,i=r.integrity,c=r.referrer,l=r.referrerPolicy;return u(t?Promise.resolve(t):r.blob(),(function(e){return new Request(n,{body:e,credentials:o,headers:a,integrity:i,referrer:c,referrerPolicy:l,mode:"same-origin",redirect:"manual"})}))}));self.initJsenvServiceWorker({cachePrefix:"pwa-template",urlsConfig:self.serviceWorkerUrls||{}})}));