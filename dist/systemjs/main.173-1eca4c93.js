function t(){}function e(e,n){return function(t,e,n){if(n)return e?e(t()):t();try{var r=Promise.resolve(t());return e?r.then(e):r}catch(t){return Promise.reject(t)}}(e,t,n)}System.register([],(function(t,n){"use strict";return{execute:function(){try{var t,r,o,i,c,u=function(){},s=function(t,e){if(!e)return t&&t.then?t.then(u):Promise.resolve()},a=function(t){return function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];try{return Promise.resolve(t.apply(this,e))}catch(t){return Promise.reject(t)}}};return window.splashscreen={takeOver:function(){},appIsReady:function(){}},t=document.querySelector("#app"),r=document.querySelector("#splashscreen"),o=a((function(){var e=Date.now(),o=!1,c=a((function(){return r.setAttribute("data-splashout",""),s(new Promise((function(t){setTimeout((function(){o=!1,t()}),300)})))})),u=function(){t.removeAttribute("data-booting"),r.style.display="none",o=!1},f=setTimeout((function(){r.setAttribute("data-splashin",""),o=!0}),300),h=setTimeout((function(){i("booting_is_slow")}),2500);return window.splashscreen.takeOver=function(){clearTimeout(h)},window.splashscreen.appIsReady=a((function(){if(clearTimeout(f),clearTimeout(h),o){var t,n,r=e+300,i=Date.now()-r;return t=function(){return function(t,e,n){try{var r=Promise.resolve(t());return e?r.then(e):r}catch(t){return Promise.reject(t)}}(c,(function(){u()}))},(n=function(){if(i<650){var t=650-i;return s(new Promise((function(e){setTimeout(e,t)})))}}())&&n.then?n.then(t):t()}u()})),function(t,e){try{var n=t()}catch(t){return e(t)}return n&&n.then?n.then(void 0,e):n}((function(){return i("booting_start"),s(n.import("./sboboot.js"))}),(function(t){throw clearTimeout(h),i("booting_error",{errorStack:t.stack||"<No stack associated with this error> (Check devtools to get more info)"}),t}))})),i=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},n=document.querySelector("#splashscreen_message");n.innerHTML="";var r=document.querySelector("#".concat(t)),o=r.cloneNode(!0);c(o,e),n.appendChild(o)},c=function t(e,n){"#text"!==e.nodeName?Array.from(e.childNodes).forEach((function(e){t(e,n)})):e.textContent=e.textContent.replace(/\${(\w*)}/g,(function(t,e){return n.hasOwnProperty(e)?n[e]:""}))},e(o)}catch(t){return Promise.reject(t)}}}}));
//# sourceMappingURL=main.173-1eca4c93.js.map