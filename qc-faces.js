/* QuantumColleagues faces engine — PEXELS variant (preview). Mounts [data-qc-faces]. */
(function(){
  var CFG={
    key:'GhhdBKKzQf8PVUiLtVnZbSktDSzrFTZraHDFfNepamJERSYpyVvxsHCy',
    cacheKey:'qcFacesPexels_v1',
    cacheAgeMs:604800000,
    queries:['elderly woman smiling portrait','elderly man smiling portrait','grandmother portrait','grandfather face','young woman smiling face','young man smiling face','black woman smiling portrait','black man smiling portrait','asian woman smiling portrait','asian man smiling portrait','middle aged woman portrait','middle aged man portrait','happy senior citizen portrait','young adult smiling portrait','south asian person portrait','older person smiling face'],
    perPage:30,
    imgParams:'?auto=compress&cs=tinysrgb&fit=crop&w=220&h=220',
    tile:82,
    dark:['#050830','#0a0f38','#0d1240','#12194f','#141c52','#1C3E5E','#22305f','#2b3566','#2D648C','#274f7a','#2D8C6F','#256f58','#1F6B53','#164a3a','#3a4a7a'],
    light:['#6B6E8A','#E8F5EF','#c9e8dd','#8fbfae'],
    lightChance:0.15
  };
  var poolPromise=null;
  function pickColor(){ return Math.random()<CFG.lightChance?CFG.light[Math.floor(Math.random()*CFG.light.length)]:CFG.dark[Math.floor(Math.random()*CFG.dark.length)]; }
  function loadPool(){
    if(poolPromise) return poolPromise;
    try{ var raw=localStorage.getItem(CFG.cacheKey); if(raw){ var o=JSON.parse(raw); if(o&&o.t&&(Date.now()-o.t)<CFG.cacheAgeMs&&o.f&&o.f.length>40){ poolPromise=Promise.resolve(o.f); return poolPromise; } } }catch(e){}
    poolPromise=Promise.all(CFG.queries.map(function(q){ return fetch('https://api.pexels.com/v1/search?query='+encodeURIComponent(q)+'&per_page='+CFG.perPage+'&orientation=portrait',{headers:{Authorization:CFG.key}}).then(function(r){return r.json();}).then(function(d){return (d.photos||[]).map(function(p){return p.src.original+CFG.imgParams;});}).catch(function(){return[];}); })).then(function(res){ var f=[].concat.apply([],res); f=f.filter(function(v,i,a){return a.indexOf(v)===i;}); if(f.length){ try{ localStorage.setItem(CFG.cacheKey,JSON.stringify({t:Date.now(),f:f})); }catch(e){} } return f; });
    return poolPromise;
  }
  function mount(el){
    var tileSize=parseInt(el.getAttribute('data-tile')||CFG.tile,10)||CFG.tile;
    var tiles=[], pool=[], lastCols=0, lastRows=0, t0=Date.now();
    function pick(){ return pool.length?pool[Math.floor(Math.random()*pool.length)]:null; }
    function dims(){ var r=el.getBoundingClientRect(); var w=r.width||window.innerWidth, h=r.height||tileSize; return [Math.max(1,Math.ceil(w/tileSize)), Math.max(1,Math.ceil(h/tileSize))]; }
    function build(){
      var d=dims(); lastCols=d[0]; lastRows=d[1];
      el.innerHTML=''; tiles=[];
      el.style.display='grid'; el.style.gridTemplateColumns='repeat('+d[0]+',1fr)'; el.style.gridAutoRows=tileSize+'px'; el.style.gap='2px';
      for(var i=0;i<d[0]*d[1];i++){
        var t=document.createElement('div'); t.style.cssText='position:relative;background:'+pickColor()+';opacity:0;transition:opacity .4s ease;';
        var f=document.createElement('div'); f.style.cssText='position:absolute;inset:0;background-size:cover;background-position:center;opacity:0;transition:opacity .7s ease;';
        t.appendChild(f); el.appendChild(t); tiles.push({t:t,f:f});
        (function(tt){ setTimeout(function(){ tt.style.opacity='1'; }, Math.random()*700); })(t);
      }
      if(pool.length) paintFaces();
    }
    function paintFaces(){ tiles.forEach(function(o){ setTimeout(function(){ var u=pick(); if(!u)return; o.f.style.backgroundImage='url('+u+')'; requestAnimationFrame(function(){ o.f.style.opacity='1'; }); }, 500+Math.random()*2600); }); }
    function shift(){ if(pool.length&&tiles.length){ var o=tiles[Math.floor(Math.random()*tiles.length)]; o.f.style.opacity='0'; setTimeout(function(){ o.f.style.backgroundImage='url('+pick()+')'; o.f.style.opacity='1'; },700); } setTimeout(shift,1600+Math.random()*1400); }
    build();
    var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(function(){ if(Date.now()-t0<900) return; var d=dims(); if(d[0]!==lastCols||d[1]!==lastRows) build(); },350); });
    loadPool().then(function(f){ pool=f; paintFaces(); setTimeout(shift,1800); });
  }
  function init(){ var els=document.querySelectorAll('[data-qc-faces]'); for(var i=0;i<els.length;i++) mount(els[i]); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();