
self.serviceWorkerUrls = {
  "/jsenv-template-pwa/index.html": {
    "versioned": false,
    "version": "42c365bc"
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
  "/jsenv-template-pwa/js/app_loader.es5.js?as_js_classic&v=8e2dd9e5": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/app.es5.js?as_js_classic&v=a0ba258a": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/s.js?v=8924cbe6": {
    "versioned": true
  },
  "/jsenv-template-pwa/js/babel_helpers.es5.js?as_js_classic&v=50061f09": {
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

;(function() {

var __versionMappings__ = {
  "/jsenv-template-pwa/js/app_loader.es5.js": "/jsenv-template-pwa/js/app_loader.es5.js?as_js_classic&v=8e2dd9e5",
  "/jsenv-template-pwa/css/app.css": "/jsenv-template-pwa/css/app.css?v=e37e2d0a",
  "/jsenv-template-pwa/js/app.es5.js": "/jsenv-template-pwa/js/app.es5.js?as_js_classic&v=a0ba258a",
  "/jsenv-template-pwa/js/babel_helpers.es5.js": "/jsenv-template-pwa/js/babel_helpers.es5.js?as_js_classic&v=50061f09",
  "/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2": "/jsenv-template-pwa/other/roboto_v27_latin_regular.woff2?v=cc46322d",
  "/jsenv-template-pwa/other/logo.png": "/jsenv-template-pwa/other/logo.png?v=25e95a00"
};
self.__v__ = function (specifier) {
  return __versionMappings__[specifier] || specifier
};

})();

!function(){const e=Object.create(null),n=Object.create(null);let t=0;const r={},o="object"==typeof document,c=self,i=!o&&"function"==typeof c.WorkerGlobalScope&&c instanceof c.WorkerGlobalScope,a=i&&"function"==typeof self.skipWaiting;c.System=r;let s=c.location.href.split("#")[0].split("?")[0];const u=s.lastIndexOf("/");-1!==u&&(s=s.slice(0,u+1));const l=(e,n)=>new URL(e,n).href;if(o){const e=document.querySelector("base[href]");e&&(s=e.href),r.register=(e,r)=>{if(!document.currentScript)throw new Error("unexpected call to System.register (document.currentScript is undefined)");if(document.currentScript.__s__)return n[document.currentScript.src]=[e,r],null;const o=document.currentScript.src||`${window.location.href}__inline_script__${++t}`;return n[o]=[e,r],f(o)},r.instantiate=e=>{const n=o(e);return new Promise((function(t,r){let o,c;const i=e=>{o=e.filename,c=e.error};window.addEventListener("error",i),n.addEventListener("error",(()=>{window.removeEventListener("error",i),r(`An error occured while loading url with <script> for ${e}`)})),n.addEventListener("load",(()=>{window.removeEventListener("error",i),document.head.removeChild(n),o===e?r(c):t()})),document.head.appendChild(n)}))};const o=e=>{const n=document.createElement("script");return n.async=!0,e.indexOf(`${self.location.origin}/`)&&(n.crossOrigin="anonymous"),n.__s__=!0,n.src=e,n}}if(i){const e=[];if(a){const n=["message","install","activate","fetch"],t={},r=new Promise((n=>{e.push(n)}));n.forEach((n=>{const o=[];self.addEventListener(n,(e=>{const n=t[e.type];n?n(e):(o.push(e),e.waitUntil(r))})),e.push((()=>{if(o.length){const e=t[o[0].type];e&&o.forEach((n=>{e(n)})),o.length=0}}))}));const o=self.addEventListener;self.addEventListener=function(e,r,c){return n.indexOf(e)>-1?(t[e]=r,null):o.call(self,e,r,c)}}else{["message"].forEach((n=>{var t=[],r=e=>{t.push(e)};self.addEventListener(n,r),e.push((()=>{self.removeEventListener(n,r),t.forEach((function(e){self.dispatchEvent(e)})),t.length=0}))}))}r.register=async(t,o)=>{r.register=()=>{throw new Error("unexpected call to System.register (called outside url instantiation)")};const c=self.location.href;n[c]=[t,o];const i=await f(c);return e.forEach((e=>{e()})),e.length=0,i},r.instantiate=async e=>{const t=await self.fetch(e,{credentials:"same-origin"});if(!t.ok)throw Error(`Failed to fetch module at ${e}`);let o=await t.text();o.indexOf("//# sourceURL=")<0&&(o+=`\n//# sourceURL=${e}`);const c=r.register;r.register=(t,r)=>{n[e]=[t,r]},(0,self.eval)(o),r.register=c}}const f=(e,n)=>{const t=l(e,n),r=d(t,n);return r.completionPromise||h(r)},d=(t,o)=>{const c=e[t];if(c)return c;const i={url:t};e[t]=i;const a=[];i.importerSetters=a;const s=w();return i.namespace=s,i.instantiatePromise=(async()=>{try{let e=n[t];if(!e){const c=r.instantiate(t,o);c&&await c,e=n[t]}if(!e)throw new Error(`System.register() not called after executing ${t}`);const c=(e,n)=>{i.hoistedExports=!0;let t=!1;if("string"==typeof e){const r=e,o=n;r in s&&s[r]===o||(s[r]=o,t=!0)}else Object.keys(e).forEach((n=>{const r=e[n];n in s&&s[n]===r||(s[n]=r,t=!0)})),e&&e.__esModule&&(s.__esModule=e.__esModule);return t&&a.forEach((e=>{e&&e(s)})),n},[u,l]=e,{setters:d,execute:h=(()=>{})}=l(c,{import:e=>f(e,t),meta:m(t)});i.deps=u,i.setters=d,i.execute=h}catch(e){i.error=e,i.execute=null}})(),i.linkPromise=(async()=>{await i.instantiatePromise;const e=await Promise.all(i.deps.map((async(e,n)=>{const r=i.setters[n],o=l(e,t),c=d(o,t);return c.instantiatePromise&&await c.instantiatePromise,r&&(c.importerSetters.push(r),!c.hoistedExports&&c.instantiatePromise||r(c.namespace)),c})));i.dependencyLoads=e})(),i},h=async e=>(e.completionPromise=(async()=>(await p(e,e,{}),await v(e,{}),e.namespace))(),e.completionPromise),p=async(e,n,t)=>{if(!t[e.url]){t[e.url]=!0;try{e.linkPromise&&await e.linkPromise,await Promise.all(e.dependencyLoads.map((e=>p(e,n,t))))}catch(n){if(e.error)throw n;throw e.execute=null,n}}},v=async(e,n)=>{if(n[e.url])return;if(n[e.url]=!0,!e.execute){if(e.error)throw e.error;return void(e.executePromise&&await e.executePromise)}const t=[];e.dependencyLoads.forEach((r=>{try{const e=v(r,n);e&&t.push(e)}catch(n){throw e.execute=null,e.error=n,n}})),t.length&&await Promise.all(t);try{const n=e.execute.call(g);if(n)return void(e.executePromise=n.then((()=>{e.executePromise=null,e.completionPromise=e.namespace}),(n=>{throw e.executePromise=null,e.error=n,n})));e.instantiatePromise=null,e.linkPromise=null,e.completionPromise=e.namespace}catch(n){throw e.error=n,n}finally{e.execute=null}},g=Object.freeze(Object.create(null)),m=e=>({url:e,resolve:(e,n)=>l(e,n)}),w="undefined"!=typeof Symbol&&Symbol.toStringTag?()=>{const e=Object.create(null);return Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),e}:()=>Object.create(null)}(),System.register([__v__("/jsenv-template-pwa/js/babel_helpers.es5.js")],(function(e,n){"use strict";var t,r,o,c,i,a,s,u,l,f,d,h,p,v;function g(e,n,t){return t?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e)}function m(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}function w(){}function y(e){if(e&&e.then)return e.then(w)}function b(e){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{return Promise.resolve(e.apply(this,n))}catch(e){return Promise.reject(e)}}}function P(e,n){if(!n)return e&&e.then?e.then(w):Promise.resolve()}function E(e,n){return e&&e.then?e.then(n):n(e)}function x(e){var n=e();if(n&&n.then)return n.then(w)}function k(e,n){var t=e();return t&&t.then?t.then(n):n(t)}return{setters:[function(e){t=e._,r=e.a,o=e.b,c=e.c}],execute:function(){self.initJsenvServiceWorker=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.logLevel,c=void 0===n?"warn":n,s=e.logsBackgroundColor,u=void 0===s?"#ffdc00":s,l=e.cachePrefix,f=void 0===l?"jsenv":l,d=e.urlsConfig,w=void 0===d?{"/":{}}:d,L=e.shouldHandleRequest,O=void 0===L?function(e,n){var t=n.requestWasCachedOnInstall;return("GET"===e.method||"HEAD"===e.method)&&t}:L,S=e.shouldCleanOnActivate,C=void 0===S?function(e,n,t){return!t.requestWasCachedOnInstall}:S,_=e.navigationPreloadEnabled,j=void 0!==_&&_,T=e.actions,R=void 0===T?{ping:function(){return"pong"}}:T;if("object"!==t(w))throw new TypeError("urlsConfig should be an object, got ".concat(w));if("string"!=typeof f)throw new TypeError("cachePrefix should be a string, got ".concat(f));if(0===f.length)throw new TypeError("cachePrefix must not be empty");if("function"!=typeof C)throw new TypeError("shouldCleanOnActivate should be a function, got ".concat(C));if("function"!=typeof O)throw new TypeError("shouldHandleRequest should be a function, got ".concat(O));if("string"!=typeof c)throw new TypeError("logLevel should be a boolean, got ".concat(c));if("string"!=typeof u)throw new TypeError("logsBackgroundColor should be a string, got ".concat(u));if("boolean"!=typeof j)throw new TypeError("navigationPreloadEnabled should be a boolean, got ".concat(j));var W=a({cachePrefix:f}),q=i({logLevel:c,logsBackgroundColor:u}),M=h(),I=p({urlsConfig:w,urlResolver:M}),U=I.urlsToCacheOnInstall,A=I.urlsToReloadOnInstall,$=I.urlMapping;q.info("cache key: ".concat(W)),self.addEventListener("install",(function(e){e.waitUntil(B(e))}));var B=b((function(){return q.info("install start"),y(m((function(){var e=U.length,n=0;return g(Promise.all(U.map(b((function(e){return y(m((function(){var t=A.includes(e),o=new Request(e,r({},t?{cache:"reload"}:{}));return P(F(o,{oncache:function(){n+=1}}))}),(function(n){q.warn("cannot put ".concat(e," in cache due to error while fetching: ").concat(n.stack))})))})))),(function(){n===e?q.info("install done (".concat(e," urls added in cache)")):q.info("install done (".concat(n,"/").concat(e," urls added in cache)"))}))}),(function(e){q.error("install error: ".concat(e.stack))})))}));self.addEventListener("fetch",(function(e){var n=H(e.request);if(O(n,{requestWasCachedOnInstall:U.includes(n.url)})){var t=G(n,e);t&&e.respondWith(t)}}));var G=b((function(e,n){var t=!1;return q.debug("received fetch event for ".concat(e.url)),E(m((function(){return g(self.caches.match(e),(function(r){return r?(q.debug("respond with response from cache for ".concat(e.url)),t=!0,r):g(n.preloadResponse,(function(n){if(n)return q.debug("respond with preloaded response for ".concat(e.url)),t=!0,n}))}))}),(function(n){q.warn("error while trying to use cache for ".concat(e.url),n.stack);var r=fetch(e);return t=!0,r})),(function(n){return t?n:(q.debug("no cache for ".concat(e.url,", fetching it")),F(e))}))})),H=function(e){if(Object.prototype.hasOwnProperty.call($,e.url)){var n=$[e.url];return q.debug("redirect request from ".concat(e.url," to ").concat(n)),v(e,n)}return e};self.addEventListener("activate",(function(e){var n=K(e);n&&e.waitUntil(n)}));var K=b((function(){return q.info("activate start"),g(Promise.all([D(),J(),z()]),(function(){q.info("activate done")}))})),D=b((function(){return x((function(){if(j&&self.registration.navigationPreload)return P(self.registration.navigationPreload.enable())}))})),J=b((function(){return g(self.caches.open(W),(function(e){return g(e.keys(),(function(n){return P(Promise.all(n.map(b((function(n){return g(e.match(n),(function(t){return x((function(){if(C(t,n,{requestWasCachedOnInstall:U.includes(n.url)}))return q.info("delete ".concat(n.url)),P(e.delete(n))}))}))})))))}))}))})),z=b((function(){return g(self.caches.keys(),(function(e){return P(Promise.all(e.map(b((function(e){return x((function(){if(e!==W&&e.startsWith(f))return q.info("delete cache ".concat(e)),P(self.caches.delete(e))}))})))))}))}));self.addEventListener("message",b((function(e){var n=e.data;if("object"===t(n)){var r=n.action,o=R[r];if(o){var c,i,a=n.payload;return E(m((function(){return g(o(a,{cacheName:W}),(function(e){c="resolved",i=e}))}),(function(e){c="rejected",i=e})),(function(){e.ports[0].postMessage({status:c,value:i})}))}}}))),R=r({skipWaiting:function(){self.skipWaiting()},refreshCacheKey:b((function(e){return e=M.resolve(e),g(F(new Request(e,{cache:"reload"})),(function(e){return e.status}))})),addCacheKey:b((function(e){return e=M.resolve(e),g(F(e),(function(e){return e.status}))})),removeCacheKey:b((function(e){return e=M.resolve(e),g(self.caches.open(W),(function(n){return g(n.delete(e))}))}))},R);var F=b((function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.oncache;return g(Promise.all([V(e),Q()]),(function(n){var r=!1,c=o(n,2),i=c[0],a=c[1];return k((function(){if(200===i.status)return q.debug("fresh response found for ".concat(e.url,", put it in cache and respond with it")),g(N(i),(function(n){var o=a.put(e,n);return k((function(){if(t)return g(o,(function(){t()}))}),(function(){return r=!0,i}))}))}),(function(n){return r?n:(q.warn("cannot put ".concat(e.url," in cache due to response status (").concat(i.status,")")),i)}))}))})),N=b((function(e){var n=e.clone();return e.redirected?g("body"in n?Promise.resolve(n.body):n.blob(),(function(e){return new Response(e,{headers:n.headers,status:n.status,statusText:n.statusText})})):n})),V=b((function(e){var n=new AbortController,t=n.signal;return m((function(){return g(fetch(e,{signal:t}))}),(function(e){throw n.abort(),e}))})),Q=b((function(){return self.caches.open(W)}))},i=function(e){var n=e.logLevel,t=e.logsBackgroundColor,r=function(){for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return["%csw","background: ".concat(t,"; color: black; padding: 1px 3px; margin: 0 1px")].concat(n)},o=function(e){return function(){var n;return(n=console)[e].apply(n,c(r.apply(void 0,arguments)))}},i=o("debug"),a=o("info"),s=o("warn"),u=o("error"),l=function(){};if("debug"===n)return{debug:i,info:a,warn:s,error:u};if("info"===n)return{debug:l,info:a,warn:s,error:u};if("warn"===n)return{debug:l,info:l,warn:s,error:u};if("error"===n)return{debug:l,info:l,warn:l,error:u};if("off"===n)return{debug:l,info:l,warn:l,error:l};throw new Error("unknown logLevel, got ".concat(n))},a=function(e){var n=e.cachePrefix;return"".concat(n).concat(d())},36,4,s=Math.pow(36,4),u=function(e,n){var t="000000000".concat(e);return t.substr(t.length-n)},l=function(){var e=self.crypto;if(e){var n=Math.pow(2,32)-1;return function(){return Math.abs(e.getRandomValues(new Uint32Array(1))[0]/n)}}return Math.random}(),f=function(){return u((l()*s<<0).toString(36),4)},d=function(){var e=(new Date).getTime().toString(36),n="".concat(f()).concat(f());return"".concat(e).concat(n)},h=function(){return{resolve:function(e){return String(new URL(e,self.location))}}},p=function(e){var n=e.urlsConfig,t=e.urlResolver,r=[],o=[],c={},i=[];return Object.keys(n).forEach((function(e){var a=t.resolve(e);if(!i.includes(a)){i.push(a);var s=n[e];s||(s={cache:!1}),!0===s&&(s={cache:!0});var u=s,l=u.cache,f=void 0===l||l,d=u.versioned,h=void 0!==d&&d,p=u.alias;f&&(r.push(a),h||o.push(a)),p&&(c[a]=t.resolve(p))}})),{urlsToCacheOnInstall:r,urlsToReloadOnInstall:o,urlMapping:c}},v=b((function(e,n){if("navigate"!==e.mode)return new Request(n,e);var t=e.clone(),r=t.body,o=t.credentials,c=t.headers,i=t.integrity,a=t.referrer,s=t.referrerPolicy;return g(r?Promise.resolve(r):t.blob(),(function(e){return new Request(n,{body:e,credentials:o,headers:c,integrity:i,referrer:a,referrerPolicy:s,mode:"same-origin",redirect:"manual"})}))})),self.initJsenvServiceWorker({cachePrefix:"pwa-template",urlsConfig:self.serviceWorkerUrls||{}})}}}));