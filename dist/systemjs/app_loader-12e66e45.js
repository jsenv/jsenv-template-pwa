System.register([],(function(e,n){"use strict";return{execute:function(){function t(e){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{return Promise.resolve(e.apply(this,n))}catch(e){return Promise.reject(e)}}}function r(e,n,t){return t?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e)}function o(){}function i(e){var n=e();if(n&&n.then)return n.then(o)}function u(e,n){try{var t=e()}catch(e){return n(e)}return t&&t.then?t.then(void 0,n):t}function s(e){if(e&&e.then)return e.then(o)}const c=t((function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=n.timeout,c=void 0===o?1e3:o,f=n.onCssReady,l=void 0===f?()=>{}:f,d=n.onFontsReady,m=void 0===d?()=>{}:d;const h=t((function(){return s(u((function(){return r(a(e),(function(){return l(),i((function(){if(m)return r(document.fonts.ready,(function(){m()}))}))}))}),(function(){})))}))();return Promise.race([h,new Promise((e=>{setTimeout(e,c)}))])})),a=function(e){let n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},t=n.crossOrigin;return new Promise(((n,r)=>{const o=document.createElement("link");o.rel="stylesheet",o.onload=n,o.onerror=r,o.href=e,o.crossOrigin=t,document.head.appendChild(o)}))},f=window.requestIdleCallback?function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=e.timeout,t=void 0===n?60:n;return new Promise((e=>{window.requestIdleCallback(e,{timeout:t})}))}:()=>new Promise((e=>{window.requestAnimationFrame(e)}));function l(e,n,t){return t?n?n(e):e:(e&&e.then||(e=Promise.resolve(e)),n?e.then(n):e)}function d(e){return function(){for(var n=[],t=0;t<arguments.length;t++)n[t]=arguments[t];try{return Promise.resolve(e.apply(this,n))}catch(e){return Promise.reject(e)}}}e("loadApp",d((function(e){let t=e.updateSplashscreenText;const r=c(new URL(System.resolve("./assets/app_loader.css",n.meta.url)),{timeout:400,onCssReady:()=>{},onFontsReady:()=>{}}),o=m({onJsReady:()=>{}}),i=c(new URL(System.resolve("./assets/app.css",n.meta.url)),{onCssReady:()=>{}});return l(r,(function(){return l(t("Loading banana..."),(function(){return l(new Promise((e=>{setTimeout(e,800)})),(function(){return t("Loading gorilla..."),l(new Promise((e=>{setTimeout(e,1e3)})),(function(){return t("Loading the entire jungle..."),l(new Promise((e=>{setTimeout(e,1200)})),(function(){return l(o,(function(e){return e.render(),l(i,(function(){return function(e,n,t){if(t)return n?n(e()):e();try{var r=Promise.resolve(e());return n?r.then(n):r}catch(e){return Promise.reject(e)}}(f,(function(){}))}))}))}))}))}))}))}))})));const m=d((function(e){let t=e.onJsReady,r=void 0===t?()=>{}:t;return l(n.import("./app.js"),(function(e){return r(),e}))}))}}}));

//# sourceMappingURL=app_loader-12e66e45.js.map