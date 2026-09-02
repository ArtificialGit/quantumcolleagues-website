const CACHE="career-beyond-v5.13.0";
const ASSETS=["./career-beyond.html","./qc_logo_topbar.png","./qc_logo_navy.png","./manifest.json","./cb-icon-192.png","./cb-icon-512.png"];
self.addEventListener("install",e=>{ e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())); });
self.addEventListener("activate",e=>{ e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())); });
self.addEventListener("fetch",e=>{
  if(e.request.method!=="GET") return;
  if(!e.request.url.startsWith(self.location.origin)) return;
  const isPage = e.request.mode==="navigate" || e.request.destination==="document";
  if(isPage){
    /* network-first: fresh page on every visit, cache only when offline */
    e.respondWith(fetch(e.request).then(r=>{ if(r&&r.ok){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>caches.match(e.request)));
    return;
  }
  /* assets stay cache-first with background refresh */
  e.respondWith(caches.match(e.request).then(hit=>{
    const net=fetch(e.request).then(r=>{ if(r&&r.ok){ const cp=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,cp)); } return r; }).catch(()=>hit);
    return hit||net;
  }));
});
