System.register([],(function(e,t){"use strict";return{execute:function(){const a=!1,s=async(e,{timeout:t=1e3,onCssReady:a=(()=>{}),onFontsReady:s=(()=>{})}={})=>{const o=(async()=>{try{await n(e),a(),s&&(await document.fonts.ready,s())}catch(e){return}})();return Promise.race([o,new Promise((e=>{setTimeout(e,t)}))])},n=(e,{crossOrigin:t}={})=>new Promise(((a,s)=>{const n=document.createElement("link");n.rel="stylesheet",n.onload=a,n.onerror=s,n.href=e,n.crossOrigin=t,document.head.appendChild(n)})),o=window.requestIdleCallback?({timeout:e=60}={})=>new Promise((t=>{window.requestIdleCallback(t,{timeout:e})})):()=>new Promise((e=>{window.requestAnimationFrame(e)})),i=(e("loadApp",(async({updateSplashscreenText:e})=>{const n=s(new URL(System.resolve("./assets/app_loader.css",t.meta.url)),{timeout:400,onCssReady:()=>{a},onFontsReady:()=>{a}}),r=i({onJsReady:()=>{}}),m=s(new URL(System.resolve("./assets/app.css",t.meta.url)),{onCssReady:()=>{a}});await n,await e("Loading banana..."),await new Promise((e=>{setTimeout(e,800)})),e("Loading gorilla..."),await new Promise((e=>{setTimeout(e,1e3)})),e("Loading the entire jungle..."),await new Promise((e=>{setTimeout(e,1200)}));(await r).render(),await m,await o()})),async({onJsReady:e=(()=>{})})=>{const a=await t.import("./app.js");return e(),a})}}}));

//# sourceMappingURL=app_loader_702228f7.js.map