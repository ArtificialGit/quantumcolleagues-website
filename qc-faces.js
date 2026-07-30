/* QuantumColleagues faces engine — Pexels imagery, static pool. Mounts [data-qc-faces].
   2026-07-30: the Pexels API call and its key were removed. A key used from the browser
   is public by definition, because the browser has to send it to Pexels, so it could not
   be kept secret in this file. The image pool below was captured once from the same
   queries the engine used to run and is now held in the repo. Photos are still served
   from the Pexels CDN and the "Photos: Pexels" credit stays on every page that uses this.
   To refresh the pool, re-run the capture and replace the P array. */
(function(){
  var CFG={
    imgParams:'?auto=compress&cs=tinysrgb&fit=crop&w=220&h=220',
    tile:82,
    dark:['#050830','#0a0f38','#0d1240','#12194f','#141c52','#1C3E5E','#22305f','#2b3566','#2D648C','#274f7a','#2D8C6F','#256f58','#1F6B53','#164a3a','#3a4a7a'],
    light:['#6B6E8A','#E8F5EF','#c9e8dd','#8fbfae'],
    lightChance:0.15
  };
  /* A number means /photos/<n>/pexels-photo-<n>.jpeg.
     A string like '<n>.png' means the same path with that extension.
     A string containing a slash is a literal path after /photos/. */
  var P=[
    '18496/pexels-photo.jpg','34776/homeless-male-b-w-person.jpg',
    '38572/indians-portrait-man-human-38572.jpeg',236187,343123,719617,758857,953720,1262455,1329863,
    1389654,1484797,1820961,1961183,2379004,2469216,2616957,2691608,2764972,2764976,2970404,3068824,
    3110392,3130419,3316263,3760761,3831569,3831612,3831736,3970387,4018481,4045708,4078393,4429394,
    4490075,4558592,4584156,4584483,4584496,4584535,4584537,4584575,4584606,4588364,4661304,4894582,
    4967239,5085752,5149832,5178107,5190574,5257222,5257621,5271209,5386463,5424980,5496471,5538605,
    5698208,5715795,5864833,5960674,5960677,5962115,6057951,6102858,6108779,6121110,6293224,6345373,
    6471976,6527101,6566959,6688614,6870875,6873934,6874204,6888678,6975046,7016799,7047890,7061992,
    7118191,7225157,7276073,7322005,7322007,7322013,7322019,7322240,7322307,7322312,7417188,7432863,
    7529112,7544755,7544909,7552695,7561905,7562179,7580990,7586065,7705909,7779368,7826329,7867289,
    7867386,7867440,7938623,7959649,8058736,8136481,8172606,8217715,8332509,8332526,8489764,8508753,
    8528483,8528978,8543078,8560799,8560803,8638704,8727416,8727454,8727573,8727585,8791192,8806120,
    8819768,8834056,8899942,8900898,9104633,9205084,9275619,9345708,9374360,9375189,'9378975.png',
    9480053,9592569,9775679,10159246,10194768,10373740,10485608,10767946,10785695,10811860,11009434,
    11106824,11106825,11215214,11459125,11515380,11544207,11702660,11749490,11824358,11905784,12032892,
    12082344,12178724,12282963,12311572,12444396,12596735,12644996,12678500,12815752,12821964,12871437,
    12871449,12895422,12980901,13010864,13083465,13310928,13355384,13422861,13661483,13676799,13709825,
    '13889459.png',14081789,14271012,14299051,14319246,14319677,14500438,14672980,14691536,14712209,
    14715186,14796040,14816709,14827387,14935899,15005386,15007244,15026471,15102540,15237309,15255493,
    15286995,15474961,15672675,15779642,15803294,16160835,16294000,16511288,16769616,16852335,16890551,
    16955073,17015334,17130225,17290508,17297469,17299920,17477126,17481298,17503453,17527536,17586936,
    17630769,17660330,17697073,17738078,'17746329.png',18012939,18049649,18089516,18137274,18141009,
    18222677,18250064,18364415,18392646,18495886,18621130,18854138,18971588,19164195,19164200,19171755,
    19186828,19285888,19378766,19502588,19527158,19746166,19971491,19999458,19999995,20162384,20210675,
    20293949,20410513,20449228,20505114,20534595,20685791,20860654,21674912,22682090,23910890,24205642,
    24878935,24916863,25003297,25338458,25742761,27207829,27241067,27269933,27309469,27722033,
    '27826239.png',27830893,27863687,28315731,28513246,28582416,29086752,29260952,29361204,29373526,
    29521717,29601846,29660104,29693180,29819387,29991205,30109427,30119585,30208144,30210714,30235907,
    30484739,30521310,30705943,'30805619.png',31006570,31085315,31233910,31251702,31430969,31449274,
    31615335,31637723,31679357,31704057,31735315,31828937,31853116,31983857,32175147,'32189336.png',
    32222185,32222849,32312721,32330793,32360925,32423877,32556463,32658802,32776421,32974806,33146564,
    33157061,33323687,33323689,33323692,33418602,33462624,33544578,33666333,33686888,33699815,33716144,
    34144089,34379318,34504127,34604752,34630594,34684999,34685880,34706252,34765430,34775929,34881664,
    34973629,35027985,35031134,35037061,35037064,35037069,35050238,35173757,35255493,35278023,35351519,
    35495780,35495790,35495792,35545538,35555194,35565355,35622854,35748451,35753740,35759345,35880856,
    36005587,36010489,36014838,36061625,36151601,'36152109.png',36168096,36263167,36263265,36291553,
    36322503,36342206,36456377,36477131,36477144,36477146,36477294,36477296,36477301,36477302,36477303,
    36477309,36477311,36495983,36519726,36519727,36519739,36519747,36587234,36598723,36608598,36624984,
    36645884,36645890,36645905,36648544,36722809,36792488,36792557,36810447,36810448,36838814,36862122,
    36931386,36982713,37092196,37092197,37096852,37097128,37100624,37188052,37199637,37281839,37409945,
    37564851,37816931,37902787,37936476,37938577,38057777,38165826,38178448,38178737,38252281,38336188,
    38369796,38486782,38611358,38611361,38660511,38660512,38675974
  ];
  function src(e){
    var p;
    if(typeof e==='number'){ p=e+'/pexels-photo-'+e+'.jpeg'; }
    else if(e.indexOf('/')<0){ var d=e.split('.'); p=d[0]+'/pexels-photo-'+d[0]+'.'+d[1]; }
    else { p=e; }
    return 'https://images.pexels.com/photos/'+p+CFG.imgParams;
  }
  var POOL=P.map(src);
  function pickColor(){ return Math.random()<CFG.lightChance?CFG.light[Math.floor(Math.random()*CFG.light.length)]:CFG.dark[Math.floor(Math.random()*CFG.dark.length)]; }
  function mount(el){
    var tileSize=parseInt(el.getAttribute('data-tile')||CFG.tile,10)||CFG.tile;
    var tiles=[], pool=POOL, lastCols=0, lastRows=0, t0=Date.now();
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
    setTimeout(function(){ paintFaces(); setTimeout(shift,1800); },0);
  }
  function init(){ var els=document.querySelectorAll('[data-qc-faces]'); for(var i=0;i<els.length;i++) mount(els[i]); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
