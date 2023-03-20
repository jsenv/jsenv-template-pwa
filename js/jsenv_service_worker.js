self.__sw__={};const sw=self.__sw__;{const e={};self.addEventListener("message",(async t=>{const{data:o,ports:n}=t;if("object"!=typeof o)return;const{action:a}=o,s=e[a];if(!s)return;const{payload:c}=o;let r,l;try{const e=await s(c);r="resolved",l=e}catch(e){r="rejected",l=e}n[0].postMessage({actionResultStatus:r,actionResultValue:l})})),sw.registerActions=t=>{Object.assign(e,t)}}sw.init=({name:e="jsenv",version:t="1",meta:o={},logLevel:n="warn",logBackgroundColor:a="#ffdc00",logColor:s="#000000",resources:c={"/":{}},actions:r={},install:l=(()=>{}),activate:i=(()=>{})}={})=>{if("object"!=typeof c)throw new TypeError("resources should be an object, got ".concat(c));if("string"!=typeof e)throw new TypeError("name should be a string, got ".concat(e));if(0===e.length)throw new TypeError("name must not be empty");if("string"!=typeof n)throw new TypeError("logLevel should be a boolean, got ".concat(n));if("string"!=typeof a)throw new TypeError("logBackgroundColor should be a string, got ".concat(a));if("string"!=typeof s)throw new TypeError("logColor should be a string, got ".concat(s));const u=createCacheName(e),d=u,f=createLogger({logLevel:n,logBackgroundColor:a,logColor:s});c=resolveResources(c),f.info("init (".concat(d,")")),sw.registerActions({inspect:()=>({name:e,version:t,resources:c,...o}),refreshCacheKey:async e=>{e=asAbsoluteUrl(e);const t=await self.caches.open(u),o=new Request(e,{cache:"reload"});return fetchAndPutInCache(o,t)},addCacheKey:async e=>{e=asAbsoluteUrl(e);const t=await self.caches.open(u),o=new Request(e);return fetchAndPutInCache(o,t)},removeCacheKey:async e=>{e=asAbsoluteUrl(e);const t=await self.caches.open(u);return await t.delete(e)},...r});{sw.registerActions({skipWaiting:()=>{self.skipWaiting()}}),self.addEventListener("install",(t=>{f.info("install (".concat(d,")"));const o=Promise.all([e(t),l(t)]);t.waitUntil(o)}));const e=async()=>{f.debug("open cache");const e=await self.caches.open(u),t=Object.keys(c),o=t.length;let n=0;await Promise.all(t.map((async t=>{const o=c[t],a=o.versionedUrl?new Request(o.versionedUrl):new Request(t,{cache:"reload"});try{const t=await fetchAndPutInCache(a,e);200===t.status?(f.info('put "'.concat(asRelativeUrl(a.url),'" into cache')),n+=1):f.warn("cannot put ".concat(a.url," into cache due to response status (").concat(t.status,")"))}catch(e){f.warn("cannot put ".concat(a.url," in cache due to error while fetching: ").concat(e.stack))}}))),n===o?f.info("install done (".concat(o," resources added in cache)")):f.info("install done (".concat(n,"/").concat(o," resources added in cache)"))}}{self.addEventListener("activate",(e=>{f.info("activate (".concat(d,")"));const o=Promise.all([t(e),i(e)]);e.waitUntil(o)})),sw.registerActions({claim:async()=>{await self.clients.claim()},postReloadAfterUpdateToClients:async()=>{(await self.clients.matchAll()).forEach((e=>{e.postMessage("reload_after_update")}))}});const t=async()=>{const t=await self.caches.keys();await Promise.all(t.map((async t=>{t!==u&&t.startsWith("".concat(e,"_"))&&(f.info('delete old cache "'.concat(t,'"')),await self.caches.delete(t))})))}}{self.addEventListener("fetch",(t=>{t.waitUntil(e(t))}));const e=async e=>{const o=e.request;if("GET"!==o.method&&"HEAD"!==o.method)return self.fetch(o);let n=!1;if(c[o.url])n=!0;else for(const e of Object.keys(c))if(c[e].versionedUrl===o.url){n=!0;break}if(!n)return self.fetch(o);const a=asRelativeUrl(o.url);if(f.debug('fetch "'.concat(a,'" (').concat(d,")")),"navigate"===o.mode){const o=e.preloadResponse;if(o){f.debug("preloadResponse available on navigation request, try to use it");const e=await t(o);if(e)return f.info("".concat(a," -> use preloaded response")),e;f.debug("cannot use preloadResponse")}}try{const t=e.request;f.debug("open ".concat(u," cache"));const o=await self.caches.open(u);f.debug("search response matching this request in cache");const n=await o.match(t);return n?(f.info("".concat(a," -> use cache")),n):(f.info("".concat(a," -> delegate to navigator")),self.fetch(t))}catch(e){return f.warn("error while trying to use cache for ".concat(a," -> delegate to navigator"),e.stack),self.fetch(o)}},t=async e=>{try{const t=await e;return t&&"error"===t.type?null:t}catch(e){return null}}}};const createCacheName=(()=>{const e=Math.pow(36,4),t=(()=>{const{crypto:e}=self;if(e){const t=Math.pow(2,32)-1;return()=>Math.abs(e.getRandomValues(new Uint32Array(1))[0]/t)}return Math.random})(),o=()=>{return o=(t()*e<<0).toString(36),n=4,(a="000000000".concat(o)).substr(a.length-n);var o,n,a};return e=>{const t=(new Date).getTime().toString(36),n="".concat(o()).concat(o());return"".concat(e,"_").concat(t).concat(n)}})(),createLogger=({logLevel:e,logBackgroundColor:t,logColor:o})=>{const n=e=>["%cjsenv%csw","background: orange; color: rgb(55, 7, 7); padding: 1px 3px; margin: 0 1px","background: ".concat(t,"; color: ").concat(o,"; padding: 1px 3px; margin: 0 1px"),...e];return{debug:(...t)=>{"debug"===e&&console.info(...n(t))},info:(...t)=>{"debug"!==e&&"info"!==e||console.info(...n(t))},warn:(...t)=>{"debug"!==e&&"info"!==e&&"warn"!==e||console.info(...n(t))},error:(...t)=>{"debug"!==e&&"info"!==e&&"warn"!==e&&"error"!==e||console.info(...n(t))},debugGroupCollapsed:(...t)=>{"debug"===e&&console.groupCollapsed(...n(t))},infoGroupCollapsed:(...t)=>{"debug"!==e&&"info"!==e||console.groupCollapsed(...n(t))},groupEnd:()=>console.groupEnd()}},asAbsoluteUrl=e=>String(new URL(e,self.location)),asRelativeUrl=e=>e.slice(self.location.origin.length),resolveResources=e=>{const t={};return Object.keys(e).forEach((o=>{const n=e[o],a=asAbsoluteUrl(o);n.versionedUrl&&(n.versionedUrl=asAbsoluteUrl(n.versionedUrl)),t[a]=n})),t},fetchAndPutInCache=async(e,t)=>{const o=await self.fetch(e);if(200===o.status){const n=await asResponseToPutInCache(o);await t.put(e,n)}return o},asResponseToPutInCache=async e=>{const t=e.clone();if(!e.redirected)return t;const o="body"in t?Promise.resolve(t.body):t.blob(),n=await o;return new Response(n,{headers:t.headers,status:t.status,statusText:t.statusText})};