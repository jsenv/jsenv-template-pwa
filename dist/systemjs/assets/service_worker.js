
self.generatedUrlsConfig = {
  "app_loader-bced8497.css": {
    "versioned": true
  },
  "app-0f239860.css": {
    "versioned": true
  },
  "logo-25e95a00.png": {
    "versioned": true
  },
  "": {
    "versioned": false,
    "version": "9ff05afe"
  },
  "../app_loader-12e66e45.js": {
    "versioned": true
  },
  "../app-1fe6980a.js": {
    "versioned": true
  },
  "../main.prod.html": {
    "versioned": false,
    "version": "683ad76b"
  },
  "favicon-25e95a00.png": {
    "versioned": true
  },
  "pwa.webmanifest": {
    "versioned": false,
    "version": "5e89d247"
  },
  "pwa_icon_192-574c1c76.png": {
    "versioned": true
  },
  "pwa_icon_512-d2dd96fd.png": {
    "versioned": true
  },
  "maskable_icon_192-c20be9d4.png": {
    "versioned": true
  },
  "roboto_v27_latin_regular-cc46322d.woff2": {
    "versioned": true
  }
}
self.config={},self.config.cachePrefix="jsenv",self.generatedUrlsConfig=self.generatedUrlsConfig||{},self.config.manualUrlsConfig={"/":{}},self.config.shouldHandleRequest=(e,{requestWasCachedOnInstall:t})=>("GET"===e.method||"HEAD"===e.method)&&t,self.config.shouldCleanOnActivate=(e,t,{requestWasCachedOnInstall:n})=>!n,self.config.logLevel="warn",self.config.logsBackgroundColor="#ffdc00",self.config.navigationPreloadEnabled=!1,self.config.actions={ping:()=>"pong"},self.config.cachePrefix="pwa-template";const assertContextLooksGood=()=>{const{generatedUrlsConfig:e}=self;if(void 0===e)self.generatedUrlsConfig={};else if("object"!=typeof e)throw new TypeError(`self.generatedUrlsConfig should be an object, got ${e}`);if(void 0===typeof config)throw new Error("config is not in scope, be sure to import sw.preconfig.js before sw.jsenv.js");const{manualUrlsConfig:t}=config;if("object"!=typeof t)throw new TypeError(`config.manualUrlsConfig should be an array, got ${t}`);const{cachePrefix:n}=config;if("string"!=typeof n)throw new TypeError(`config.cachePrefix should be a string, got ${n}`);if(0===n.length)throw new TypeError("config.cachePrefix must not be empty");const{shouldCleanOnActivate:r}=config;if("function"!=typeof r)throw new TypeError(`config.shouldCleanOnActivate should be a function, got ${r}`);const{shouldHandleRequest:o}=config;if("function"!=typeof o)throw new TypeError(`config.shouldHandleRequest should be a function, got ${o}`);const{logLevel:a}=config;if("string"!=typeof a)throw new TypeError(`config.logLevel should be a boolean, got ${a}`);const{logsBackgroundColor:s}=config;if("string"!=typeof s)throw new TypeError(`config.logsBackgroundColor should be a string, got ${s}`);const{navigationPreloadEnabled:l}=config;if("boolean"!=typeof l)throw new TypeError(`config.navigationPreloadEnabled should be a boolean, got ${l}`)},getUtil=()=>{const e={};e.createLogger=({logLevel:e,logsBackgroundColor:t})=>{const n=e=>(...n)=>console[e](...((...e)=>["%csw",`background: ${t}; color: black; padding: 1px 3px; margin: 0 1px`,...e])(...n)),r=n("debug"),o=n("info"),a=n("warn"),s=n("error"),l=()=>{};if("debug"===e)return{debug:r,info:o,warn:a,error:s};if("info"===e)return{debug:l,info:o,warn:a,error:s};if("warn"===e)return{debug:l,info:l,warn:a,error:s};if("error"===e)return{debug:l,info:l,warn:l,error:s};if("off"===e)return{debug:l,info:l,warn:l,error:l};throw new Error(`unknown logLevel, got ${e}`)},e.resolveUrl=e=>String(new URL(e,self.location));{e.responseUsesLongTermCaching=e=>{const n=e.headers.get("cache-control"),r=t(n);return r&&r>0};const t=e=>{if(!e||0===e.length)return null;const t=e.match(/([a-zA-Z][a-zA-Z_-]*)\s*(?:=(?:"([^"]*)"|([^ \t",;]*)))?/g)||[],r={};return Array.from(t).forEach((e=>{const t=e.split("=",2),[n]=t;let o=null;t.length>1&&(o=t[1].trim()),r[n.toLowerCase()]=o})),n(r["max-age"])},n=e=>{if(!e)return null;const t=Number.parseInt(e,10);return!Number.isFinite(t)||t<0?null:t}}{e.getCacheName=({cachePrefix:e})=>`${e}${l()}`;const t=36,n=4,r=Math.pow(t,n),o=(e,t)=>{var n=`000000000${e}`;return n.substr(n.length-t)},a=(()=>{const{crypto:e}=self;if(e){const t=Math.pow(2,32)-1;return()=>Math.abs(e.getRandomValues(new Uint32Array(1))[0]/t)}return Math.random})(),s=()=>o((a()*r<<0).toString(t),n),l=()=>`${(new Date).getTime().toString(t)}${`${s()}${s()}`}`}{e.readUrlConfig=()=>{const n={...self.generatedUrlsConfig,...config.manualUrlsConfig},r=[],o=[],a={};return t(n,((t,n)=>{n||(n={cache:!1}),!0===n&&(n={cache:!0});const{cache:s=!0,versioned:l=!1,alias:c}=n;s&&(r.push(t),l||o.push(t)),c&&(a[t]=e.resolveUrl(c))})),{urlsToCacheOnInstall:r,urlsToReloadOnInstall:o,urlMapping:a}};const t=(t,n)=>{const r=[];Object.keys(t).forEach((o=>{const a=e.resolveUrl(o);r.includes(a)||(r.push(a),n(a,t[o]))}))}}return e.redirectRequest=async(e,t)=>{const{mode:n}=e;if("navigate"!==n)return new Request(t,e);const r=e.clone(),{body:o,credentials:a,headers:s,integrity:l,referrer:c,referrerPolicy:i}=r,g=o?Promise.resolve(o):r.blob(),f=await g;return new Request(t,{body:f,credentials:a,headers:s,integrity:l,referrer:c,referrerPolicy:i,mode:"same-origin",redirect:"manual"})},e};assertContextLooksGood();const util=getUtil(),cacheName=util.getCacheName(config),logger=util.createLogger(config),{urlsToCacheOnInstall:urlsToCacheOnInstall,urlsToReloadOnInstall:urlsToReloadOnInstall,urlMapping:urlMapping}=util.readUrlConfig(config);logger.info(`cache key: ${cacheName}`);const install=async()=>{logger.info("install start");try{const e=urlsToCacheOnInstall.length;let t=0;await Promise.all(urlsToCacheOnInstall.map((async e=>{try{const n=urlsToReloadOnInstall.includes(e),r=new Request(e,{...n?{cache:"reload"}:{}});await fetchAndCache(r,{oncache:()=>{t+=1}})}catch(t){logger.warn(`cannot put ${e} in cache due to error while fetching: ${t.stack}`)}}))),t===e?logger.info(`install done (${e} urls added in cache)`):logger.info(`install done (${t}/${e} urls added in cache)`)}catch(e){logger.error(`install error: ${e.stack}`)}};self.addEventListener("install",(e=>{e.waitUntil(install())}));const handleRequest=async(e,t)=>{logger.debug(`received fetch event for ${e.url}`);try{const n=await self.caches.match(e);if(n)return logger.debug(`respond with response from cache for ${e.url}`),n;const r=await t.preloadResponse;if(r)return logger.debug(`respond with preloaded response for ${e.url}`),r}catch(t){return logger.warn(`error while trying to use cache for ${e.url}`,t.stack),fetch(e)}return logger.debug(`no cache for ${e.url}, fetching it`),fetchAndCache(e)},remapRequest=e=>{if(Object.prototype.hasOwnProperty.call(urlMapping,e.url)){const t=urlMapping[e.url];return logger.debug(`redirect request from ${e.url} to ${t}`),util.redirectRequest(e,t)}return e};self.addEventListener("fetch",(e=>{const t=remapRequest(e.request);if(config.shouldHandleRequest(t,{requestWasCachedOnInstall:urlsToCacheOnInstall.includes(t.url)})){const n=handleRequest(t,e);n&&e.respondWith(n)}}));const activate=async()=>{logger.info("activate start"),await Promise.all([enableNavigationPreloadIfPossible(),deleteOtherUrls(),deleteOtherCaches()]),logger.info("activate done")},enableNavigationPreloadIfPossible=async()=>{config.navigationPreloadEnabled&&self.registration.navigationPreload&&await self.registration.navigationPreload.enable()},deleteOtherUrls=async()=>{const e=await self.caches.open(cacheName),t=await e.keys();await Promise.all(t.map((async t=>{const n=await e.match(t);config.shouldCleanOnActivate(n,t,{requestWasCachedOnInstall:urlsToCacheOnInstall.includes(t.url)})&&(logger.info(`delete ${t.url}`),await e.delete(t))})))},deleteOtherCaches=async()=>{const e=await self.caches.keys();await Promise.all(e.map((async e=>{e!==cacheName&&e.startsWith(config.cachePrefix)&&(logger.info(`delete cache ${e}`),await self.caches.delete(e))})))};self.addEventListener("activate",(e=>{const t=activate();t&&e.waitUntil(t)}));const actions={skipWaiting:()=>{self.skipWaiting()},refreshCacheKey:async e=>{e=util.resolveUrl(e);return(await fetchAndCache(new Request(e,{cache:"reload"}))).status},addCacheKey:async e=>{e=util.resolveUrl(e);return(await fetchAndCache(e)).status},removeCacheKey:async e=>{e=util.resolveUrl(e);const t=await self.caches.open(cacheName);return await t.delete(e)},...config.actions};self.addEventListener("message",(async e=>{const{data:t}=e;if("object"!=typeof t)return;const{action:n}=t,r=actions[n];if(!r)return;const{payload:o}=t;let a,s;try{const e=await r(o,{cacheName:cacheName});a="resolved",s=e}catch(e){a="rejected",s=e}e.ports[0].postMessage({status:a,value:s})}));const fetchAndCache=async(e,{oncache:t}={})=>{const[n,r]=await Promise.all([fetchUsingNetwork(e),getCache()]);if(200===n.status){logger.debug(`fresh response found for ${e.url}, put it in cache and respond with it`);const o=await responseToResponseForCache(n),a=r.put(e,o);return t&&(await a,t()),n}return logger.warn(`cannot put ${e.url} in cache due to response status (${n.status})`),n},responseToResponseForCache=async e=>{const t=e.clone();if(!e.redirected)return t;const n="body"in t?Promise.resolve(t.body):t.blob(),r=await n;return new Response(r,{headers:t.headers,status:t.status,statusText:t.statusText})},fetchUsingNetwork=async e=>{const t=new AbortController,{signal:n}=t;try{return await fetch(e,{signal:n})}catch(e){throw t.abort(),e}},getCache=async()=>await self.caches.open(cacheName);
//# sourceMappingURL=service_worker.js-e8400a0e.map
