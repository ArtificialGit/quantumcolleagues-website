/* QuantumColleagues shared faces engine. Mounts any element with [data-qc-faces].
   Two-layer load: brand-colour tiles fill fast, faces fade in on top. Fetch once + cache. */
(function(){
  var CFG={
    key:'Z6ZRySOZMoCnXJ-wFM8yAGUhEG_6bOpGO9CW5htqSS4',
    cacheKey:'qcFaces_v3',
    cacheAgeMs:604800000,
    queries:['elderly woman smiling portrait','elderly man smiling portrait','grandmother portrait','grandfather face','young woman smiling face','young man smiling face','black woman smiling portrait','black man smiling portrait','asian woman smiling portrait','asian man smiling portrait','middle aged woman portrait','middle aged man portrait','happy senior citizen portrait','young adult smiling portrait','south asian person portrait','older couple smiling'],
    perPage:30,
    imgParams:'?w=170&h=170&fit=crop&crop=faces&auto=format&q=80',
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
    poolPromise=Promise.all(CFG.queries.map(function(q){ return fetch('https://api.unsplash.com/search/photos?query='+encodeURIComponent(q)+'&per_page='+CFG.perPage+'&content_filter=high&client_id='+CFG.key).then(function(r){return r.json();}).then(function(d){return (d.results||[]).map(function(p){return p.urls.raw+CFG.imgParams;});}).catch(function(){return[];}); })).then(function(res){ var f=[].concat.apply([],res); f=f.filter(function(v,i,a){return a.indexOf(v)===i;}); if(f.length){ try{ localStorage.setItem(CFG.cacheKey,JSON.stringify({t:Date.now(),f:f})); }catch(e){} } return f; });
    return poolPromise;
  }
  function mount(el){
    var tileSize=parseInt(el.getAttribute('data-tile')||CFG.tile,10)||CFG.tile;
    var tiles=[], pool=[];
    function pick(){ return pool.length?pool[Math.floor(Math.random()*pool.length)]:null; }
    function build(){
      el.innerHTML=''; tiles=[];
      var rect=el.getBoundingClientRect(); var w=rect.width||window.innerWidth, h=rect.height||tileSize;
      var cols=Math.max(1,Math.ceil(w/tileSize)), rows=Math.max(1,Math.ceil(h/tileSize));
      el.style.display='grid'; el.style.gridTemplateColumns='repeat('+cols+',1fr)'; el.style.gridAutoRows=tileSize+'px'; el.style.gap='2px';
      for(var i=0;i<cols*rows;i++){
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
    var rt; window.addEventListener('resize',function(){ clearTimeout(rt); rt=setTimeout(build,250); });
    loadPool().then(function(f){ pool=f; paintFaces(); setTimeout(shift,1800); });
  }
  function init(){ var els=document.querySelectorAll('[data-qc-faces]'); for(var i=0;i<els.length;i++) mount(els[i]); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();