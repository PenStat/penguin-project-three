if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return s[e]||(r=new Promise((async r=>{if("document"in self){const s=document.createElement("script");s.src=e,document.head.appendChild(s),s.onload=r}else importScripts(e),r()}))),r.then((()=>{if(!s[e])throw new Error(`Module ${e} didn’t register its module`);return s[e]}))},r=(r,s)=>{Promise.all(r.map(e)).then((e=>s(1===e.length?e[0]:e)))},s={require:Promise.resolve(r)};self.define=(r,i,d)=>{s[r]||(s[r]=Promise.resolve().then((()=>{let s={};const n={uri:location.origin+r.slice(1)};return Promise.all(i.map((r=>{switch(r){case"exports":return s;case"module":return n;default:return e(r)}}))).then((e=>{const r=d(...e);return s.default||(s.default=r),s}))})))}}define("./sw.js",["./workbox-d9ace124"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"2bf2e7e3.js",revision:"45268b4aba0d6c88263aa5a62470061d"},{url:"51f22ddb.js",revision:"320dcdb341130b444e75abf9e75414ba"},{url:"53128d44.js",revision:"ef7edf9cc87f218158c14910f3352a7d"},{url:"78af3006.js",revision:"8763e21a9ab9934da899efb8d8644dfa"},{url:"dc274115.js",revision:"ff4781fc148cc62035abef3137d07294"},{url:"index.html",revision:"d25947f3c92a24dd6d28337736e4701d"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("/index.html")))}));
//# sourceMappingURL=sw.js.map
