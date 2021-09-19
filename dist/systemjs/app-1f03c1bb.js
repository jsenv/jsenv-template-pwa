function n(n){return function(n){if(Array.isArray(n))return e(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,t){if(!n)return;if("string"==typeof n)return e(n,t);var r=Object.prototype.toString.call(n).slice(8,-1);"Object"===r&&n.constructor&&(r=n.constructor.name);if("Map"===r||"Set"===r)return Array.from(n);if("Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r))return e(n,t)}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}System.register([],(function(e,t){"use strict";return{execute:function(){var r=function(n,e,t){return n.addEventListener(e,t),function(){n.removeEventListener(e,t)}},o=function(n){return window.addEventListener("appinstalled",n),function(){window.removeEventListener("appinstalled",n)}},i=!1;o((function(){i=!0}));var a,c={isAvailable:function(){return!!window.beforeinstallpromptEvent&&!(window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches)&&!i},listenAvailabilityChange:function(n){var e=c.isAvailable(),t=function(){var t=c.isAvailable();t!==e&&(e=t,n(t))},r=u((function(n){window.beforeinstallpromptEvent=n,t()})),a=function(n){var e=window.matchMedia("(display-mode: standalone)");return e.addListener(n),function(){e.removeListener(n)}}((function(){t()})),l=o((function(){i=!0,t()}));return function(){r(),a(),l()}},prompt:(a=function(){return window.beforeinstallpromptEvent?(window.beforeinstallpromptEvent.prompt(),e=function(n){return"accepted"===n.outcome},(n=window.beforeinstallpromptEvent.userChoice)&&n.then||(n=Promise.resolve(n)),e?n.then(e):n):(console.warn("cannot prompt add to home screen: window.beforeinstallpromptEvent is missing"),!1);var n,e},function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];try{return Promise.resolve(a.apply(this,n))}catch(n){return Promise.reject(n)}})},u=function(n){return r(window,"beforeinstallprompt",n)};function l(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}var s=window.navigator.serviceWorker;function f(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(n.apply(this,e))}catch(n){return Promise.reject(n)}}}function d(n,e,t){if(t)return e?e(n()):n();try{var r=Promise.resolve(n());return e?r.then(e):r}catch(n){return Promise.reject(n)}}function v(n,e){var t=n();return t&&t.then?t.then(e):e(t)}var p=Boolean(s)&&"https:"===document.location.protocol,m=null,h=null,w=function(){var e=[];return{listen:function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r.once,i=void 0!==o&&o;if(i){var a=t;t=function(){u(),a.apply(void 0,arguments)}}e=[].concat(n(e),[t]);var c=!1,u=function(){if(!c){c=!0;for(var n=[],r=e.length,o=!0;r--;){var i=e[r];o&&i===t?o=!1:n.push(i)}e=n}};return u},emit:function(){for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];e.forEach((function(n){n.apply(void 0,t)}))}}}(),g=function(n){h&&h===n||(n&&"found a worker updating (worker state is: ".concat(n.state,")"),h=n,w.emit())},b=f((function(){return m?l(m,(function(n){return l(n.update(),(function(n){var e=n.installing;if(e)return g(e),!0;var t=n.waiting;return!!t&&(g(t),!0)}))})):(console.warn("registerServiceWorker must be called before checkServiceWorkerUpdate can be used"),!1)})),y=function(n){if(h)return function(n,e){var t=new MessageChannel,r=t.port1,o=t.port2;return new Promise((function(t,i){r.onmessage=function(n){"rejected"===n.data.status?i(n.data.value):t(n.data.value)},n.postMessage(e,[o])}))}(h,n);console.warn("no service worker updating to send message to")},A=f((function(n){if(!h)throw new Error("no service worker update to activate");return k(h,n)})),k=f((function(n){var e=!1,t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=t.onActivating,i=void 0===o?function(){}:o,a=t.onActivated,c=void 0===a?function(){}:a,u=t.onBecomesNavigatorController,l=void 0===u?function(){}:u,f=n.state,p=function(){return new Promise((function(e){var t=r(n,"statechange",(function(){"activating"===n.state&&i(),"activated"===n.state&&(c(),t(),e())}))}))};return v((function(){if("installed"===f||"activating"===f)return"installed"===f&&y({action:"skipWaiting"}),d(p,(function(){if(s.controller)var n=r(s,"controllerchange",(function(){n(),l(),g(null),L()}));else g(null),L();e=!0}))}),(function(n){if(e)return n;l(),g(null),L()}))})),E=!1,L=function(){E||(E=!0,window.location.reload())};function P(n,e,t){if(t)return e?e(n()):n();try{var r=Promise.resolve(n());return e?r.then(e):r}catch(n){return Promise.reject(n)}}function C(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(n.apply(this,e))}catch(n){return Promise.reject(n)}}}function M(){}p&&r(s,"controllerchange",L);var S=function(n){var e=document.createElement("button");e.innerHTML="Check update";var t,r=document.createElement("p");n.appendChild(e),n.appendChild(r),e.onclick=C((function(){return e.disabled=!0,r.innerHTML="checking for update",P(b,(function(n){n||(e.disabled=!1,r.innerHTML="No update available")}))})),t=function(){Boolean(h?{shouldBecomeNavigatorController:Boolean(s.controller),navigatorWillReload:true}:null)?(r.innerHTML="Update available <button>Activate update</button>",r.querySelector("button").onclick=C((function(){return r.querySelector("button").disabled=!0,P(A,M,undefined)}))):r.innerHTML=""},w.listen(t)},j=function(n){(function(n){var e=document.createElement("button");e.disabled=!c.isAvailable(),e.innerHTML="Add to home screen",n.appendChild(e),e.onclick=function(){c.prompt()},c.listenAvailabilityChange((function(){e.disabled=!c.isAvailable()}))})(n),function(n){p&&((window.requestIdleCallback||requestAnimationFrame)((function(){!function(n){var e=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).scope;if(!p)return function(){};var t=!1,o=function(){};l(m=s.register(n,{scope:e}),(function(n){if(o=function(){n.unregister()},t)o();else{var e=n.installing;n.waiting,n.active,r(n,"updatefound",(function(){n.installing!==e&&g(n.installing)}))}}))}("/service_worker.js")})),S(n))}(n)},T=document.querySelector("#app");e("render",(function(){T.innerHTML="\n\n<img src=".concat(new URL(System.resolve("./assets/logo-25e95a00.png",t.meta.url),t.meta.url),' width="64" />\n\n<p>').concat("Welcome","</p>"),j(T)}))}}}));
//# sourceMappingURL=app-1f03c1bb.js.map