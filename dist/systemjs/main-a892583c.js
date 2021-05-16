System.register([],(function(n,e){"use strict";return{execute:function(){var n=function(n,e,t){return n.addEventListener(e,t),function(){n.removeEventListener(e,t)}},t=function(){return window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches},r=function(n){var e=window.matchMedia("(display-mode: standalone)");return e.addListener(n),function(){e.removeListener(n)}};var o,i=(o=function(){return window.beforeinstallpromptEvent?(window.beforeinstallpromptEvent.prompt(),n=window.beforeinstallpromptEvent.userChoice,e=function(n){return"accepted"===n.outcome},t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)):(console.warn("cannot promptAddToHomescreen: window.beforeinstallpromptEvent is missing"),!1);var n,e,t},function(){for(var n=[],e=0;e<arguments.length;e++)n[e]=arguments[e];try{return Promise.resolve(o.apply(this,n))}catch(n){return Promise.reject(n)}}),a=function(){return Boolean(window.beforeinstallpromptEvent)},l=function(n){var e=n.beforeinstallpromptEventAvailableOnWindow,t=n.displayModeIsStandalone,r=n.appInstalledEvent;return!!e&&(!t&&!r)},c=function(e){return n(window,"beforeinstallprompt",e)};function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=new Array(e),r=0;r<e;r++)t[r]=n[r];return t}var s=function(n){return function(n){if(Array.isArray(n))return u(n)}(n)||function(n){if("undefined"!=typeof Symbol&&null!=n[Symbol.iterator]||null!=n["@@iterator"])return Array.from(n)}(n)||function(n,e){if(n){if("string"==typeof n)return u(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);return"Object"===t&&n.constructor&&(t=n.constructor.name),"Map"===t||"Set"===t?Array.from(n):"Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)?u(n,e):void 0}}(n)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()};function d(n,e,t){return t?e?e(n):n:(n&&n.then||(n=Promise.resolve(n)),e?n.then(e):n)}var f=window.navigator.serviceWorker;function v(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(n.apply(this,e))}catch(n){return Promise.reject(n)}}}function p(n,e,t){if(t)return e?e(n()):n();try{var r=Promise.resolve(n());return e?r.then(e):r}catch(n){return Promise.reject(n)}}function m(n,e){var t=n();return t&&t.then?t.then(e):e(t)}var w,h=Boolean(f)&&"https:"===document.location.protocol,b=null,g=null,y=(w=[],{listen:function(n){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=e.once,r=void 0!==t&&t;if(r){var o=n;n=function(){a(),o.apply(void 0,arguments)}}w=[].concat(s(w),[n]);var i=!1,a=function(){if(!i){i=!0;for(var e=[],t=w.length,r=!0;t--;){var o=w[t];r&&o===n?r=!1:e.push(o)}w=e}};return a},emit:function(){for(var n=arguments.length,e=new Array(n),t=0;t<n;t++)e[t]=arguments[t];w.forEach((function(n){n.apply(void 0,e)}))}}),E=function(n){g&&g===n||(n&&"found a worker updating (worker state is: ".concat(n.state,")"),g=n,y.emit())},A=v((function(){return b?d(b,(function(n){return d(n.update(),(function(n){var e=n.installing;if(e)return E(e),!0;var t=n.waiting;return!!t&&(E(t),!0)}))})):(console.warn("registerServiceWorker must be called before checkServiceWorkerUpdate can be used"),!1)})),M=function(n){if(g)return function(n,e){var t=new MessageChannel,r=t.port1,o=t.port2;return new Promise((function(t,i){r.onmessage=function(n){"rejected"===n.data.status?i(n.data.value):t(n.data.value)},n.postMessage(e,[o])}))}(g,n);console.warn("no service worker updating to send message to")},S=v((function(n){if(!g)throw new Error("no service worker update to activate");return k(g,n)})),k=v((function(e){var t=!1,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=r.onActivating,i=void 0===o?function(){}:o,a=r.onActivated,l=void 0===a?function(){}:a,c=r.onBecomesNavigatorController,u=void 0===c?function(){}:c,s=e.state,d=function(){return new Promise((function(t){var r=n(e,"statechange",(function(){"activating"===e.state&&i(),"activated"===e.state&&(l(),r(),t())}))}))};return m((function(){if("installed"===s||"activating"===s)return"installed"===s&&M({action:"skipWaiting"}),p(d,(function(){if(f.controller)var e=n(f,"controllerchange",(function(){e(),u(),E(null),I()}));else E(null),I();t=!0}))}),(function(n){if(t)return n;u(),E(null),I()}))})),L=!0,P=!1,I=function(){P||(P=!0,window.location.reload())};h&&n(f,"controllerchange",I);var W=document.createElement("button");function j(n,e,t){if(t)return e?e(n()):n();try{var r=Promise.resolve(n());return e?r.then(e):r}catch(n){return Promise.reject(n)}}W.disabled=!0,W.innerHTML="Add to home screen",document.body.appendChild(W),W.onclick=function(){i()},function(n){var e,o=!1,i=function(t){var r=t.beforeinstallpromptEventAvailableOnWindow,i=t.displayModeIsStandalone,a=l({beforeinstallpromptEventAvailableOnWindow:r,displayModeIsStandalone:i,appInstalledEvent:o});a!==e&&(e=a,n(a))};i({beforeinstallpromptEventAvailableOnWindow:a(),displayModeIsStandalone:t()});var u=c((function(n){window.beforeinstallpromptEvent=n,i({beforeinstallpromptEventAvailableOnWindow:!0,displayModeIsStandalone:t()})})),s=r((function(){i({beforeinstallpromptEventAvailableOnWindow:a(),displayModeIsStandalone:t()})})),d=function(n){return window.addEventListener("appinstalled",n),function(){window.removeEventListener("appinstalled",n)}}((function(){o=!0,i({beforeinstallpromptEventAvailableOnWindow:a(),displayModeIsStandalone:t()})}))}((function(n){W.disabled=!n})),(requestIdleCallback||requestAnimationFrame)((function(){!function(e){var t=(arguments.length>1&&void 0!==arguments[1]?arguments[1]:{}).scope;if(!h)return function(){};var r=!1,o=function(){},i=function(){};d(b=f.register(e,{scope:t}),(function(e){if(o=function(){e.unregister()},r)o();else{var t=e.installing;e.waiting,e.active,i=n(e,"updatefound",(function(){e.installing!==t&&E(e.installing)}))}}))}("/service-worker.js")}));function C(n){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(n.apply(this,e))}catch(n){return Promise.reject(n)}}}function O(){}h&&function(){var n=document.createElement("button");n.innerHTML="Check update";var e,t=document.createElement("p");document.body.appendChild(n),document.body.appendChild(t),n.onclick=C((function(){return n.disabled=!0,t.innerHTML="checking for update",j(A,(function(e){e||(n.disabled=!1,t.innerHTML="No update available")}))})),e=function(){Boolean(g?{shouldBecomeNavigatorController:Boolean(f.controller),navigatorWillReload:L}:null)?(t.innerHTML="Update available <button>Activate update</button>",t.querySelector("button").onclick=C((function(){return t.querySelector("button").disabled=!0,j(S,O,n);var n}))):t.innerHTML=""},y.listen(e)}();var T=new URL(System.resolve("./assets/favicon-25e95a00.png",e.meta.url),e.meta.url);document.querySelector("#app").innerHTML="\n\n<img src=".concat(T,' width="64" />\n\n<p>').concat("Welcome","</p>"),window.splashscreen.remove()}}}));

//# sourceMappingURL=main-a892583c.js.map