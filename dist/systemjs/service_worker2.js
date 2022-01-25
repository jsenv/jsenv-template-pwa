
self.generatedUrlsConfig = {
  "assets/app_0f239860.css": {
    "versioned": true
  },
  "assets/app_loader_1482518a.css": {
    "versioned": true
  },
  "assets/favicon_25e95a00.png": {
    "versioned": true
  },
  "assets/logo_25e95a00.png": {
    "versioned": true
  },
  "assets/maskable_icon_192_c20be9d4.png": {
    "versioned": true
  },
  "assets/pwa_icon_192_574c1c76.png": {
    "versioned": true
  },
  "assets/pwa_icon_512_d2dd96fd.png": {
    "versioned": true
  },
  "assets/pwa.webmanifest": {
    "versioned": false,
    "version": "22a51684"
  },
  "assets/roboto_v27_latin_regular_cc46322d.woff2": {
    "versioned": true
  },
  "app_0ee83b05.js": {
    "versioned": true
  },
  "app_loader_702228f7.js": {
    "versioned": true
  },
  "main.prod.html": {
    "versioned": false,
    "version": "57f7a270"
  }
};
self.initJsenvServiceWorker=({logLevel:e="warn",logsBackgroundColor:r="#ffdc00",cachePrefix:t="jsenv",manualUrlsConfig:a={"/":{}},shouldHandleRequest:n=((e,{requestWasCachedOnInstall:r})=>("GET"===e.method||"HEAD"===e.method)&&r),shouldCleanOnActivate:o=((e,r,{requestWasCachedOnInstall:t})=>!t),navigationPreloadEnabled:s=!1,actions:c={ping:()=>"pong"}}={})=>{void 0===self.generatedUrlsConfig&&(self.generatedUrlsConfig={});const l=self.generatedUrlsConfig;if("object"!=typeof l)throw new TypeError(`self.generatedUrlsConfig should be an object, got ${l}`);if("object"!=typeof a)throw new TypeError(`manualUrlsConfig should be an object, got ${a}`);if("string"!=typeof t)throw new TypeError(`cachePrefix should be a string, got ${t}`);if(0===t.length)throw new TypeError("cachePrefix must not be empty");if("function"!=typeof o)throw new TypeError(`shouldCleanOnActivate should be a function, got ${o}`);if("function"!=typeof n)throw new TypeError(`shouldHandleRequest should be a function, got ${n}`);if("string"!=typeof e)throw new TypeError(`logLevel should be a boolean, got ${e}`);if("string"!=typeof r)throw new TypeError(`logsBackgroundColor should be a string, got ${r}`);if("boolean"!=typeof s)throw new TypeError(`navigationPreloadEnabled should be a boolean, got ${s}`);const i=getCacheName({cachePrefix:t}),u=createLogger({logLevel:e,logsBackgroundColor:r}),d=createUrlResolver(),{urlsToCacheOnInstall:f,urlsToReloadOnInstall:h,urlMapping:g}=createUrlActions({generatedUrlsConfig:l,manualUrlsConfig:a,urlResolver:d});u.info(`cache key: ${i}`),self.addEventListener("install",(e=>{e.waitUntil(w(e))}));const w=async()=>{u.info("install start");try{const e=f.length;let r=0;await Promise.all(f.map((async e=>{try{const t=h.includes(e),a=new Request(e,{...t?{cache:"reload"}:{}});await C(a,{oncache:()=>{r+=1}})}catch(r){u.warn(`cannot put ${e} in cache due to error while fetching: ${r.stack}`)}}))),r===e?u.info(`install done (${e} urls added in cache)`):u.info(`install done (${r}/${e} urls added in cache)`)}catch(e){u.error(`install error: ${e.stack}`)}};self.addEventListener("fetch",(e=>{const r=y(e.request);if(n(r,{requestWasCachedOnInstall:f.includes(r.url)})){const t=p(r,e);t&&e.respondWith(t)}}));const p=async(e,r)=>{u.debug(`received fetch event for ${e.url}`);try{const t=await self.caches.match(e);if(t)return u.debug(`respond with response from cache for ${e.url}`),t;const a=await r.preloadResponse;if(a)return u.debug(`respond with preloaded response for ${e.url}`),a}catch(r){return u.warn(`error while trying to use cache for ${e.url}`,r.stack),fetch(e)}return u.debug(`no cache for ${e.url}, fetching it`),C(e)},y=e=>{if(Object.prototype.hasOwnProperty.call(g,e.url)){const r=g[e.url];return u.debug(`redirect request from ${e.url} to ${r}`),redirectRequest(e,r)}return e};self.addEventListener("activate",(e=>{const r=b(e);r&&e.waitUntil(r)}));const b=async()=>{u.info("activate start"),await Promise.all([v(),m(),$()]),u.info("activate done")},v=async()=>{s&&self.registration.navigationPreload&&await self.registration.navigationPreload.enable()},m=async()=>{const e=await self.caches.open(i),r=await e.keys();await Promise.all(r.map((async r=>{const t=await e.match(r);o(t,r,{requestWasCachedOnInstall:f.includes(r.url)})&&(u.info(`delete ${r.url}`),await e.delete(r))})))},$=async()=>{const e=await self.caches.keys();await Promise.all(e.map((async e=>{e!==i&&e.startsWith(t)&&(u.info(`delete cache ${e}`),await self.caches.delete(e))})))};self.addEventListener("message",(async e=>{const{data:r}=e;if("object"!=typeof r)return;const{action:t}=r,a=c[t];if(!a)return;const{payload:n}=r;let o,s;try{const e=await a(n,{cacheName:i});o="resolved",s=e}catch(e){o="rejected",s=e}e.ports[0].postMessage({status:o,value:s})})),c={skipWaiting:()=>{self.skipWaiting()},refreshCacheKey:async e=>{e=d.resolve(e);return(await C(new Request(e,{cache:"reload"}))).status},addCacheKey:async e=>{e=d.resolve(e);return(await C(e)).status},removeCacheKey:async e=>{e=d.resolve(e);const r=await self.caches.open(i);return await r.delete(e)},...c};const C=async(e,{oncache:r}={})=>{const[t,a]=await Promise.all([P(e),R()]);if(200===t.status){u.debug(`fresh response found for ${e.url}, put it in cache and respond with it`);const n=await k(t),o=a.put(e,n);return r&&(await o,r()),t}return u.warn(`cannot put ${e.url} in cache due to response status (${t.status})`),t},k=async e=>{const r=e.clone();if(!e.redirected)return r;const t="body"in r?Promise.resolve(r.body):r.blob(),a=await t;return new Response(a,{headers:r.headers,status:r.status,statusText:r.statusText})},P=async e=>{const r=new AbortController,{signal:t}=r;try{return await fetch(e,{signal:t})}catch(e){throw r.abort(),e}},R=async()=>await self.caches.open(i)};const createLogger=({logLevel:e,logsBackgroundColor:r})=>{const t=e=>(...t)=>console[e](...((...e)=>["%csw",`background: ${r}; color: black; padding: 1px 3px; margin: 0 1px`,...e])(...t)),a=t("debug"),n=t("info"),o=t("warn"),s=t("error"),c=()=>{};if("debug"===e)return{debug:a,info:n,warn:o,error:s};if("info"===e)return{debug:c,info:n,warn:o,error:s};if("warn"===e)return{debug:c,info:c,warn:o,error:s};if("error"===e)return{debug:c,info:c,warn:c,error:s};if("off"===e)return{debug:c,info:c,warn:c,error:c};throw new Error(`unknown logLevel, got ${e}`)},getCacheName=({cachePrefix:e})=>`${e}${generateCacheId()}`,base=36,blockSize=4,discreteValues=Math.pow(36,4),pad=(e,r)=>{var t=`000000000${e}`;return t.substr(t.length-r)},getRandomValue=(()=>{const{crypto:e}=self;if(e){const r=Math.pow(2,32)-1;return()=>Math.abs(e.getRandomValues(new Uint32Array(1))[0]/r)}return Math.random})(),randomBlock=()=>{return e=(getRandomValue()*discreteValues<<0).toString(36),r=4,(t=`000000000${e}`).substr(t.length-r);var e,r,t},generateCacheId=()=>`${(new Date).getTime().toString(36)}${`${randomBlock()}${randomBlock()}`}`,createUrlResolver=()=>({resolve:e=>String(new URL(e,self.location))}),createUrlActions=({generatedUrlsConfig:e,manualUrlsConfig:r,urlResolver:t})=>{const a={...e,...r},n=[],o=[],s={},c=[];return Object.keys(a,(e=>{const r=t.resolve(e);if(c.includes(r))return;c.push(r);let l=a[e];l||(l={cache:!1}),!0===l&&(l={cache:!0});const{cache:i=!0,versioned:u=!1,alias:d}=l;i&&(n.push(r),u||o.push(r)),d&&(s[r]=t.resolve(d))})),{urlsToCacheOnInstall:n,urlsToReloadOnInstall:o,urlMapping:s}},redirectRequest=async(e,r)=>{const{mode:t}=e;if("navigate"!==t)return new Request(r,e);const a=e.clone(),{body:n,credentials:o,headers:s,integrity:c,referrer:l,referrerPolicy:i}=a,u=n?Promise.resolve(n):a.blob(),d=await u;return new Request(r,{body:d,credentials:o,headers:s,integrity:c,referrer:l,referrerPolicy:i,mode:"same-origin",redirect:"manual"})};self.initJsenvServiceWorker({cachePrefix:"pwa-template"});
//# sourceMappingURL=assets/service_worker.js_82944f6c.map
