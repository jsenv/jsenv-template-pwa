System.register([],(function(e,t){"use strict";var n,r,o,i,a,s,l,c,u,d,p,v,g,w,f,m,h,b;function k(e,t,n){return n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)}function y(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}function P(e,t,n){if(n)return t?t(e()):e();try{var r=Promise.resolve(e());return t?r.then(t):r}catch(e){return Promise.reject(e)}}function E(e,t){var n=e();return n&&n.then?n.then(t):t(n)}function L(e,t){try{var n=e()}catch(e){return t(e)}return n&&n.then?n.then(void 0,t):n}return{setters:[],execute:function(){var M;n=()=>{let e=[];return{listen:function(t){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.once,o=void 0!==r&&r;if(o){const e=t;t=function(){a(),e(...arguments)}}e=[...e,t];let i=!1;const a=()=>{if(i)return;i=!0;const n=[];let r=e.length,o=!0;for(;r--;){const i=e[r];o&&i===t?o=!1:n.push(i)}e=n};return a},emit:function(){for(var t=arguments.length,n=new Array(t),r=0;r<t;r++)n[r]=arguments[r];e.forEach((e=>{e(...n)}))}}},r=(e,t,n)=>(e.addEventListener(t,n),()=>{e.removeEventListener(t,n)}),o=(e,t)=>{const n=new MessageChannel,r=n.port1,o=n.port2;return new Promise(((n,i)=>{r.onmessage=function(e){"rejected"===e.data.status?i(e.data.value):n(e.data.value)},e.postMessage(t,[o])}))},i=window.navigator.serviceWorker,a=Boolean(i)&&"https:"===document.location.protocol,s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.logsEnabled,s=void 0!==t&&t,l=e.autoReloadAfterUpdate,u=void 0===l||l;const d=function(){s&&console.log(...arguments)};if(!a)return{hasRegistered:()=>!1,setRegistrationPromise:()=>{},unregister:()=>{},sendMessage:()=>{},getUpdate:()=>null,listenUpdateChange:()=>{},checkForUpdate:()=>{}};let p=null;const v=e=>{p=e};let g=null;const w={current:()=>{}};let f=null;const m=n(),h=e=>{f&&f===e?d("we already know this service worker is updating"):(d(e?"found a worker updating (worker state is: ".concat(e.state,")"):"set update to null"),f=e,m.emit())};return u&&r(i,"controllerchange",c),{hasRegistered:()=>Boolean(g),setRegistrationPromise:y((function(e){if(p)throw new Error("setRegistrationPromise already called");let t=!1;return w.current=()=>{t=!0},g=e,k(g,(function(e){const n=e.installing,o=e.waiting,i=e.active;v(n||o||i);const a=r(e,"updatefound",(()=>{d("browser notifies use an worker is installing"),e.installing!==n?h(e.installing):d("it's not an worker update, it's first time worker registers")}));t?(e.unregister(),a()):w.current=()=>{e.unregister(),a()}}))})),unregister:()=>{v(null),h(null),g=null,w.current()},sendMessage:e=>{if(p)return o(p,e);console.warn("no service worker script to send message to")},getUpdate:()=>{if(!f)return null;const e=e=>{if(f)return o(f,e);console.warn("ignore sendMessage call because service worker script is no longer updating")};return{shouldBecomeNavigatorController:i.controller===f,navigatorWillReload:u,sendMessage:e,activate:y((function(){let t=!1,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},o=n.onActivating,a=void 0===o?()=>{}:o,s=n.onActivated,l=void 0===s?()=>{}:s,d=n.onBecomesNavigatorController,g=void 0===d?()=>{}:d;const w=f,m=w.state,b=()=>new Promise((e=>{const t=r(f,"statechange",(()=>{"activating"===f.state&&(v(f),a()),"activated"===f.state&&(v(f),l(),t(),e())}))}));return E((function(){if("installed"===m||"activating"===m)return"installed"===m&&e({action:"skipWaiting"}),"activating"===m&&v(f),P(b,(function(){if(i.controller===p){const e=r(i,"controllerchange",(()=>{e(),g()}))}h(null),u&&c(),t=!0}))}),(function(e){if(t)return e;v(f),g(),h(null),u&&c()}))}))}},listenUpdateChange:e=>m.listen(e),checkForUpdate:y((function(){return g?k(g,(function(e){return L((function(){return k(e.update(),(function(e){const t=e.installing;if(t)return d("a service worker script is installing"),h(t),!0;const n=e.waiting;return n?(d("a service worker script is waiting to activate"),h(n),!0):(d("no update found"),!1)}))}),(function(t){return d("error while updating service worker script. Script will be unregistered.\n--- error stack ---\n".concat(t.stack)),e.unregister(),!1}))})):(console.warn('"setRegistrationPromise" must be called before "checkForUpdate"'),!1)}))}},l=!1,c=()=>{l||(l=!0,window.location.reload())},d={get:()=>window.navigator.standalone||window.matchMedia("(display-mode: standalone)").matches,listen:e=>{const t=window.matchMedia("(display-mode: standalone)");return t.addListener(e),()=>{t.removeListener(e)}}},p=!1,(u=e=>(window.addEventListener("appinstalled",e),()=>{window.removeEventListener("appinstalled",e)}))((()=>{p=!0})),v={isAvailable:()=>!!window.beforeinstallpromptEvent&&(!d.get()&&!p),listenAvailabilityChange:e=>{let t=v.isAvailable();const n=()=>{const n=v.isAvailable();n!==t&&(t=n,e(n))},r=g((e=>{window.beforeinstallpromptEvent=e,n()})),o=d.listen((()=>{n()})),i=u((()=>{p=!0,n()}));return()=>{r(),o(),i()}},prompt:(M=function(){return window.beforeinstallpromptEvent?(window.beforeinstallpromptEvent.prompt(),e=window.beforeinstallpromptEvent.userChoice,t=function(e){return"accepted"===e.outcome},n?t?t(e):e:(e&&e.then||(e=Promise.resolve(e)),t?e.then(t):e)):(console.warn("cannot prompt add to home screen: window.beforeinstallpromptEvent is missing"),!1);var e,t,n},function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];try{return Promise.resolve(M.apply(this,e))}catch(e){return Promise.reject(e)}})},g=e=>r(window,"beforeinstallprompt",e),w=e=>{const t=document.createElement("button");t.disabled=!v.isAvailable(),t.innerHTML="Add to home screen",e.appendChild(t),t.onclick=()=>{v.prompt()},v.listenAvailabilityChange((()=>{t.disabled=!v.isAvailable()}))},f=s(),m=e=>{if(!a)return;(window.requestIdleCallback||requestAnimationFrame)((()=>{f.setRegistrationPromise(window.navigator.serviceWorker.register(new URL("/jsenv-template-pwa/service_worker.es5.js",t.meta.url),{type:"classic"}))})),h(e)},h=e=>{const t=document.createElement("button");t.innerHTML="Check update";const n=document.createElement("p");e.appendChild(t),e.appendChild(n),t.onclick=function(e){return function(){for(var t=[],n=0;n<arguments.length;n++)t[n]=arguments[n];try{return Promise.resolve(e.apply(this,t))}catch(e){return Promise.reject(e)}}}((function(){return t.disabled=!0,n.innerHTML="checking for update",e=f.checkForUpdate(),r=function(e){e||(t.disabled=!1,n.innerHTML="No update available")},o?r?r(e):e:(e&&e.then||(e=Promise.resolve(e)),r?e.then(r):e);var e,r,o})),f.listenUpdateChange((()=>{const e=f.getUpdate();e?(n.innerHTML="Update available <button>Activate update</button>",n.querySelector("button").onclick=()=>{n.querySelector("button").disabled=!0,e.activate()}):n.innerHTML=""}))},b=e=>{w(e),m(e)},()=>"Welcome",e("render",(e=>{let n=e.appNode;const r=new URL(__v__("/jsenv-template-pwa/other/logo.png"),t.meta.url);n.innerHTML="\n<img src=".concat(r,' width="64" height="64" alt="jsenv logo" />\n<p>').concat("Welcome","</p>"),b(n)}))}}}));