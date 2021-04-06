self.generatedUrlsConfig={"assets/app-00d2bd90.css":{versioned:!0},"assets/favicon-25e95a00.png":{versioned:!0},"assets/main-cce50a8c.css":{versioned:!0},"assets/pwa-icon-574c1c76.png":{versioned:!0},"assets/pwa.webmanifest":{versioned:!1,version:"0f3bbf19"},"assets/s-42cee136.js":{versioned:!0},"importmap.prod-7b60ecb7.importmap":{versioned:!0},"main-4d81b92f.js":{versioned:!0},"main.prod.html":{versioned:!1,version:"f031c122"}},self.config={};const{config:config}=self;config.cachePrefix="jsenv",config.manualUrlsConfig={"/":{}},config.shouldHandleRequest=(e,{requestWasCachedOnInstall:n})=>("GET"===e.method||"HEAD"===e.method)&&n,config.shouldCleanOnActivate=(e,n,{requestWasCachedOnInstall:t})=>!t,config.logLevel="warn",config.logsBackgroundColor="#ffdc00",config.navigationPreloadEnabled=!1,config.actions={ping:()=>"pong"},config.cachePrefix="pwa-template";const assertContextLooksGood=()=>{const{generatedUrlsConfig:e}=self;if(void 0===e)self.generatedUrlsConfig={};else if("object"!=typeof e)throw new TypeError(`self.generatedUrlsConfig should be an object, got ${e}`);if(void 0===typeof config)throw new Error("config is not in scope, be sure to import sw.preconfig.js before sw.jsenv.js");const{manualUrlsConfig:n}=config;if("object"!=typeof n)throw new TypeError(`config.manualUrlsConfig should be an array, got ${n}`);const{cachePrefix:t}=config;if("string"!=typeof t)throw new TypeError(`config.cachePrefix should be a string, got ${t}`);if(0===t.length)throw new TypeError("config.cachePrefix must not be empty");const{shouldCleanOnActivate:o}=config;if("function"!=typeof o)throw new TypeError(`config.shouldCleanOnActivate should be a function, got ${o}`);const{shouldHandleRequest:r}=config;if("function"!=typeof r)throw new TypeError(`config.shouldHandleRequest should be a function, got ${r}`);const{logLevel:a}=config;if("string"!=typeof a)throw new TypeError(`config.logLevel should be a boolean, got ${a}`);const{logsBackgroundColor:s}=config;if("string"!=typeof s)throw new TypeError(`config.logsBackgroundColor should be a string, got ${s}`);const{navigationPreloadEnabled:c}=config;if("boolean"!=typeof c)throw new TypeError(`config.navigationPreloadEnabled should be a boolean, got ${c}`)},getUtil=()=>{const e={};e.createLogger=({logLevel:e,logsBackgroundColor:n})=>{const t=e=>(...t)=>console[e](...((...e)=>["%csw",`background: ${n}; color: black; padding: 1px 3px; margin: 0 1px`,...e])(...t)),o=t("debug"),r=t("info"),a=t("warn"),s=t("error"),c=()=>{};if("debug"===e)return{debug:o,info:r,warn:a,error:s};if("info"===e)return{debug:c,info:r,warn:a,error:s};if("warn"===e)return{debug:c,info:c,warn:a,error:s};if("error"===e)return{debug:c,info:c,warn:c,error:s};if("off"===e)return{debug:c,info:c,warn:c,error:c};throw new Error(`unknown logLevel, got ${e}`)},e.resolveUrl=e=>String(new URL(e,self.location));{e.responseUsesLongTermCaching=e=>{const t=e.headers.get("cache-control"),o=n(t);return o&&o>0};const n=e=>{if(!e||0===e.length)return null;const n=e.match(/([a-zA-Z][a-zA-Z_-]*)\s*(?:=(?:"([^"]*)"|([^ \t",;]*)))?/g)||[],o={};return Array.from(n).forEach((e=>{const n=e.split("=",2),[t]=n;let r=null;n.length>1&&(r=n[1].trim()),o[t.toLowerCase()]=r})),t(o["max-age"])},t=e=>{if(!e)return null;const n=Number.parseInt(e,10);return!Number.isFinite(n)||n<0?null:n}}{e.getCacheName=({cachePrefix:e})=>`${e}${c()}`;const n=36,t=4,o=Math.pow(n,t),r=(e,n)=>{var t=`000000000${e}`;return t.substr(t.length-n)},a=(()=>{const{crypto:e}=self;if(e){const n=Math.pow(2,32)-1;return()=>Math.abs(e.getRandomValues(new Uint32Array(1))[0]/n)}return Math.random})(),s=()=>r((a()*o<<0).toString(n),t),c=()=>`${(new Date).getTime().toString(n)}${`${s()}${s()}`}`}{e.readUrlConfig=()=>{const t={...self.generatedUrlsConfig,...config.manualUrlsConfig},o=[],r=[],a={};return n(t,((n,t)=>{t||(t={cache:!1}),!0===t&&(t={cache:!0});const{cache:s=!0,versioned:c=!1,alias:l}=t;s&&(o.push(n),c||r.push(n)),l&&(a[n]=e.resolveUrl(l))})),{urlsToCacheOnInstall:o,urlsToReloadOnInstall:r,urlMapping:a}};const n=(n,t)=>{const o=[];Object.keys(n).forEach((r=>{const a=e.resolveUrl(r);o.includes(a)||(o.push(a),t(a,n[r]))}))}}return e.redirectRequest=async(e,n)=>{const{mode:t}=e;if("navigate"!==t)return new Request(n,e);const o=e.clone(),{body:r,credentials:a,headers:s,integrity:c,referrer:l,referrerPolicy:i}=o,g=r?Promise.resolve(r):o.blob(),f=await g;return new Request(n,{body:f,credentials:a,headers:s,integrity:c,referrer:l,referrerPolicy:i,mode:"same-origin",redirect:"manual"})},e};assertContextLooksGood();const util=getUtil(),cacheName=util.getCacheName(config),logger=util.createLogger(config),{urlsToCacheOnInstall:urlsToCacheOnInstall,urlsToReloadOnInstall:urlsToReloadOnInstall,urlMapping:urlMapping}=util.readUrlConfig(config);logger.info(`cache key: ${cacheName}`);const install=async()=>{logger.info("install start");try{const e=urlsToCacheOnInstall.length;let n=0;await Promise.all(urlsToCacheOnInstall.map((async e=>{try{const t=urlsToReloadOnInstall.includes(e),o=new Request(e,{...t?{cache:"reload"}:{}});await fetchAndCache(o,{oncache:()=>{n+=1}})}catch(n){logger.warn(`cannot put ${e} in cache due to error while fetching: ${n.stack}`)}}))),n===e?logger.info(`install done (${e} urls added in cache)`):logger.info(`install done (${n}/${e} urls added in cache)`)}catch(e){logger.error(`install error: ${e.stack}`)}};self.addEventListener("install",(e=>{e.waitUntil(install())}));const handleRequest=async(e,n)=>{logger.debug(`received fetch event for ${e.url}`);try{const t=await self.caches.match(e);if(t)return logger.debug(`respond with response from cache for ${e.url}`),t;const o=await n.preloadResponse;if(o)return logger.debug(`respond with preloaded response for ${e.url}`),o}catch(n){return logger.warn(`error while trying to use cache for ${e.url}`,n.stack),fetch(e)}return logger.debug(`no cache for ${e.url}, fetching it`),fetchAndCache(e)},remapRequest=e=>{if(Object.prototype.hasOwnProperty.call(urlMapping,e.url)){const n=urlMapping[e.url];return logger.debug(`redirect request from ${e.url} to ${n}`),util.redirectRequest(e,n)}return e};self.addEventListener("fetch",(e=>{const n=remapRequest(e.request);if(config.shouldHandleRequest(n,{requestWasCachedOnInstall:urlsToCacheOnInstall.includes(n.url)})){const t=handleRequest(n,e);t&&e.respondWith(t)}}));const activate=async()=>{logger.info("activate start"),await Promise.all([enableNavigationPreloadIfPossible(),deleteOtherUrls(),deleteOtherCaches()]),logger.info("activate done")},enableNavigationPreloadIfPossible=async()=>{config.navigationPreloadEnabled&&self.registration.navigationPreload&&await self.registration.navigationPreload.enable()},deleteOtherUrls=async()=>{const e=await self.caches.open(cacheName),n=await e.keys();await Promise.all(n.map((async n=>{const t=await e.match(n);config.shouldCleanOnActivate(t,n,{requestWasCachedOnInstall:urlsToCacheOnInstall.includes(n.url)})&&(logger.info(`delete ${n.url}`),await e.delete(n))})))},deleteOtherCaches=async()=>{const e=await self.caches.keys();await Promise.all(e.map((async e=>{e!==cacheName&&e.startsWith(config.cachePrefix)&&(logger.info(`delete cache ${e}`),await self.caches.delete(e))})))};self.addEventListener("activate",(e=>{const n=activate();n&&e.waitUntil(n)}));const actions={skipWaiting:()=>{self.skipWaiting()},refreshCacheKey:async e=>{e=util.resolveUrl(e);return(await fetchAndCache(new Request(e,{cache:"reload"}))).status},addCacheKey:async e=>{e=util.resolveUrl(e);return(await fetchAndCache(e)).status},removeCacheKey:async e=>{e=util.resolveUrl(e);const n=await self.caches.open(cacheName);return await n.delete(e)},...config.actions};self.addEventListener("message",(async e=>{const{data:n}=e;if("object"!=typeof n)return;const{action:t}=n,o=actions[t];if(!o)return;const{payload:r}=n;let a,s;try{const e=await o(r,{cacheName:cacheName});a="resolved",s=e}catch(e){a="rejected",s=e}e.ports[0].postMessage({status:a,value:s})}));const fetchAndCache=async(e,{oncache:n}={})=>{const[t,o]=await Promise.all([fetchUsingNetwork(e),getCache()]);if(200===t.status){logger.debug(`fresh response found for ${e.url}, put it in cache and respond with it`);const r=await responseToResponseForCache(t),a=o.put(e,r);return n&&(await a,n()),t}return logger.warn(`cannot put ${e.url} in cache due to response status (${t.status})`),t},responseToResponseForCache=async e=>{const n=e.clone();if(!e.redirected)return n;const t="body"in n?Promise.resolve(n.body):n.blob(),o=await t;return new Response(o,{headers:n.headers,status:n.status,statusText:n.statusText})},fetchUsingNetwork=async e=>{const n=new AbortController,{signal:t}=n;try{return await fetch(e,{signal:t})}catch(e){throw n.abort(),e}},getCache=async()=>await self.caches.open(cacheName);
//# sourceMappingURL=service-worker.js.map