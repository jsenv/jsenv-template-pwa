function n(){}function e(e,r){return function(n,e,r){if(r)return e?e(n()):n();try{var t=Promise.resolve(n());return e?t.then(e):t}catch(n){return Promise.reject(n)}}(e,n,r)}System.register(["./unsupportedIterableToArray.js"],(function(n,r){"use strict";var t;return{setters:[function(n){t=n.u}],execute:function(){try{var n,o,i,u=function(n,e,r){return r?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)},c=function(n){return function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];try{return Promise.resolve(n.apply(this,e))}catch(n){return Promise.reject(n)}}},s=function(){},a=function(n,e){return function(n){if(Array.isArray(n))return n}(n)||function(n,e){var r=null==n?null:"undefined"!=typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(null!=r){var t,o,i=[],u=!0,c=!1;try{for(r=r.call(n);!(u=(t=r.next()).done)&&(i.push(t.value),!e||i.length!==e);u=!0);}catch(n){c=!0,o=n}finally{try{u||null==r.return||r.return()}finally{if(c)throw o}}return i}}(n,e)||t(n,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()},l=window.requestIdleCallback?function(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},e=n.timeout,r=void 0===e?60:e;return new Promise((function(n){window.requestIdleCallback(n,{timeout:r})}))}:function(){return new Promise((function(n){window.requestAnimationFrame(n)}))},f=c((function(){return u(Promise.all([n(),i()]),(function(n){var e=a(n,2)[1];return function(n,e,r){try{var t=Promise.resolve(n());return e?t.then(e):t}catch(n){return Promise.reject(n)}}(l,(function(){e.render(),window.splashscreen.appIsReady()}))}))}));return n=c((function(){return u(Promise.race([o(),new Promise((function(n){return setTimeout(n,400)}))]),(function(){window.splashscreen.takeOver();var n=function(n){document.querySelector("#splashscreen_message").innerHTML=n};return n("Loading banana..."),u(new Promise((function(n){setTimeout(n,800)})),(function(){return n("Loading gorilla..."),u(new Promise((function(n){setTimeout(n,1e3)})),(function(){return n("Loading the entire jungle..."),function(n,e){return n&&n.then?n.then(s):Promise.resolve()}(new Promise((function(n){setTimeout(n,1200)})))}))}))}))})),o=c((function(){var n,e,t=!1;return n=function(n,e){try{var r=n()}catch(n){return e()}return r&&r.then?r.then(void 0,e):r}((function(){return u(function(n){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).crossOrigin;return new Promise((function(r,t){var o=document.createElement("link");o.rel="stylesheet",o.onload=r,o.onerror=t,o.href=n,o.crossOrigin=e,document.head.appendChild(o)}))}(new URL(System.resolve("./assets/boot-9c6848bb.css",r.meta.url),r.meta.url),{crossOrigin:!0}),(function(){}))}),(function(){t=!0})),e=function(n){return t?n:u(document.fonts.ready,(function(){}))},n&&n.then?n.then(e):e(n)})),i=c((function(){return u(r.import("./aapp.js"),(function(n){return n}))})),e(f)}catch(n){return Promise.reject(n)}}}}));
//# sourceMappingURL=sboboot-242aa0ac.js.map