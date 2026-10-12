(function(){
  var H=140, NH=68, NW=156, Y0=44;
  var LANES=[
    {n:'Dirjen Pendidikan Tinggi, Sains, dan Teknologi'},
    {n:'Direktur Sumber Daya'},
    {n:'Analis Kebijakan Ahli'},
    {n:'Penelaah Teknis Kebijakan'},
    {n:'Pengolah Data dan Informasi'},
    {n:'Pimpinan PTN/LLDIKTI/Kementerian/Lembaga terkait'},
    {n:'Asesor Nasional Lektor Kepala dan Profesor', s:'Tim Asesor Nasional'},
    {n:'Pakar', s:'Tim Pleno'}
  ];
  var LW=[300,184,184,184,184,184,184,240];
  var X0=[], acc=0;
  LW.forEach(function(w,i){X0[i]=acc;acc+=w;});
  var CW=acc;
  var CX=function(l){return X0[l]+LW[l]/2;};
  var cy=function(r){return Y0+(r-1)*H+H/2;};
  var bnd=function(r){return Y0+r*H;};
  var CH=Y0+13*H+44;
  var TOTAL=55;
  var LC=['#883aed','#1919de','#0891B2','#0D9488','#DB2777','#4F46E5','#C026D3','#E11D48'];
  function hard(cols,soft){
    var n=cols.length;
    return 'linear-gradient(90deg,'+cols.map(function(c,i){
      var col=soft?'color-mix(in srgb,'+c+' 13%,#fff)':c;
      return col+' '+(i*100/n)+'% '+((i+1)*100/n)+'%';
    }).join(',')+')';
  }
  var spec=document.getElementById('spectrum');
  LC.forEach(function(c){var i=document.createElement('i');i.style.background=c;spec.appendChild(i);});

  var S={
    1:{t:'p',l:[1,1],r:1,short:'Buka periode penilaian',who:[1],tag:'Mulai',days:1,
       title:'Membuka periode penilaian uji kompetensi kenaikan jabatan akademik dosen lektor kepala dan profesor.',
       need:'Surat pemberitahuan pembukaan gelombang/periode penilaian.',
       out:'Pembukaan periode usulan pada sistem.'},
    2:{t:'p',l:[5,5],r:2,short:'Ajukan usulan di SISTER',who:[5],days:15,
       title:'Mengajukan usulan uji kompetensi kenaikan jabatan akademik dosen lektor kepala dan profesor di sistem (SISTER).',
       need:'Kelengkapan dokumen persyaratan usulan uji kompetensi kenaikan jabatan akademik dosen di SISTER.',
       out:'Usulan uji kompetensi kenaikan jabatan akademik dosen yang sudah diajukan di SISTER.'},
    3:{t:'d',l:[5,5],r:3,short:'Validasi dan pengesahan usulan',who:[5],days:2,
       title:'Melakukan validasi dan pengesahan usulan JAD di sistem (SISTER).',
       need:'Usulan uji kompetensi kenaikan jabatan akademik dosen yang sudah diajukan di SISTER.',
       out:'Usulan uji kompetensi kenaikan jabatan akademik dosen yang sudah disetujui Pimpinan PTN/LLDIKTI/KL.'},
    4:{t:'p',l:[1,4],r:4,grp:true,short:'Penugasan asesor secara acak',note:'Dikerjakan bersama',who:[1,2,3,4],days:2,
       title:'Penugasan 1 Asesor untuk penilaian usulan Lektor Kepala dan 2 Asesor untuk penilaian usulan Profesor berdasarkan bidang ilmu, dilakukan acak melalui sistem (SISTER).',
       need:'Daftar usulan ujikom JAD dan daftar tim asesor.',
       out:'Daftar asesor yang ditugaskan.'},
    5:{t:'d',l:[6,6],r:5,short:'Konfirmasi kesediaan asesor',who:[6],days:2,
       title:'Konfirmasi kesediaan asesor, notifikasi melalui SISTER.',
       need:'Daftar tim asesor yang bersedia ditugaskan.',
       out:'Surat tugas tim asesor yang ditugaskan.'},
    6:{t:'d',l:[6,6],r:6,short:'Penilaian oleh asesor',who:[6],days:15,
       title:'Melakukan penilaian uji kompetensi kenaikan jabatan akademik dosen oleh asesor.',
       need:'Dokumen portofolio persyaratan usulan kenaikan jabatan akademik dosen di SISTER dan surat tugas tim asesor.',
       out:'Hasil rekomendasi penilaian asesor.'},
    7:{t:'p',l:[2,4],r:7,grp:true,short:'Evaluasi beda penilaian (split decision)',note:'Dikerjakan bersama',who:[2,3,4],days:2,
       title:'Evaluasi hasil penilaian jika ditemukan ada beda penilaian (split decision) untuk usulan Profesor dari aspek substansi, ditindaklanjuti Asesor 3 berdasarkan rumpun ilmu yang dipilih secara random oleh sistem (SISTER). Split administrasi, atau substansi yang beda penilaiannya hanya terdiri dari 1-2 komponen, masuk pleno.',
       need:'Hasil rekomendasi penilaian asesor untuk usulan Profesor.',
       out:'Daftar pemetaan usulan dengan hasil beda penilaian (split decision) untuk usulan Profesor yang sudah disetujui Direktur.'},
    8:{t:'d',l:[6,6],r:8,short:'Konfirmasi asesor ke-3',who:[6],days:1,
       title:'Konfirmasi kesediaan asesor ketiga dan notifikasi melalui SISTER, kondisi split decision.',
       need:'Daftar tim asesor yang bersedia ditugaskan sebagai asesor ke-3.',
       out:'Surat tugas tim asesor ke-3 yang ditugaskan.'},
    9:{t:'d',l:[6,6],r:9,short:'Penilaian oleh asesor ke-3',who:[6],days:3,
       title:'Melakukan penilaian uji kompetensi kenaikan jabatan akademik profesor oleh Asesor ke-3 (kondisi split decision).',
       need:'Daftar hasil penilaian profesor oleh asesor 1 dan 2 dan surat tugas tim asesor ke-3.',
       out:'Hasil rekomendasi penilaian asesor ke-3.'},
    10:{t:'d',l:[7,7],r:10,short:'Telaah hasil dan pleno akhir',who:[7],days:7,
       title:'Memeriksa/menelaah hasil penilaian uji kompetensi kenaikan jabatan akademik profesor dan melakukan konfirmasi ulang ke asesor jika ditemukan hasil penilaian yang tidak sesuai ketentuan, serta melakukan pleno akhir.',
       need:'Hasil rekomendasi penilaian tim asesor.',
       out:'Berita acara hasil pleno penilaian kenaikan JAD.'},
    11:{t:'d',l:[1,1],r:11,short:'Tetapkan sertifikat Lektor Kepala dan validasi Profesor',who:[1],days:2,
       title:'1) Menetapkan sertifikasi kompetensi hasil penilaian uji kompetensi kenaikan jabatan akademik lektor kepala; <br> 2) Memvalidasi hasil penilaian uji kompetensi profesor.',
       need:'Berita acara hasil pleno penilaian kenaikan JAD.',
       out:'Sertifikat uji kompetensi kenaikan jabatan akademik dosen lektor kepala atau data hasil validasi rekomendasi profesor.'},
    12:{t:'d',l:[0,0],r:12,short:'Validasi dan sertifikat Profesor',who:[0],days:2,
       title:'Memvalidasi dan menetapkan sertifikat uji kompetensi hasil penilaian uji kompetensi kenaikan jabatan akademik profesor.',
       need:'Berita acara hasil pleno penilaian kenaikan JAD dan data hasil validasi rekomendasi profesor.',
       out:'Sertifikat uji kompetensi kenaikan jabatan akademik profesor.'},
    13:{t:'p',l:[5,5],r:13,short:'Terima hasil penilaian',who:[5],tag:'Selesai',days:1,
       title:'Menerima hasil penilaian uji kompetensi melalui sistem (SISTER).',
       need:'Hasil penilaian.',
       out:'Publikasi hasil penilaian di SISTER.'}
  };

  var G={};
  Object.keys(S).forEach(function(k){
    var s=S[k], a=s.l[0], b=s.l[1], x, w;
    if(a===b){w=NW;x=CX(a)-NW/2;}else{x=X0[a]+14;w=X0[b]+LW[b]-14-x;}
    var c=cy(s.r);
    G[k]={x:x,w:w,y:c-NH/2,h:NH,cx:x+w/2,cy:c,r:x+w,b:c+NH/2,t:c-NH/2};
  });

  var E=[];
  function add(from,to,kind,txt,pts,lab){
    if(kind==='b'&&/^(Ya|Direkomendasikan)/.test(txt))kind='g';
    var key=from+'-'+to;
    var main=(kind==='b'&&/^(1-2|2-3|4-5)$/.test(key))||(kind==='g'&&/^(3-4|5-6|6-10|10-11|11-12|11-13|12-13)$/.test(key));
    var tier='both';
    if((from>=7&&from<=9)||from===12||key==='11-12'||key==='6-7')tier='prof';
    if(key==='11-13'&&kind==='g')tier='lk';
    E.push({from:from,to:to,kind:kind,txt:txt,pts:pts,lab:lab,main:main,tier:tier});
  }
  var g=G, c7=CX(7);
  var ch=function(id){return g[id].b+40;};
  var Yn=g[10].t-14, Yb=ch(9), Y6=ch(6), Y3=ch(3), Y4=ch(4), Y10=ch(10);

  add(1,2,'b','',[[g[1].cx,g[1].b],[g[1].cx,bnd(1)],[g[2].cx,bnd(1)],[g[2].cx,g[2].t]]);
  add(2,3,'b','',[[g[2].cx,g[2].b],[g[3].cx,g[3].t]]);
  add(3,2,'r','Tidak',[[g[3].r,g[3].cy],[g[3].r+60,g[3].cy],[g[3].r+60,g[2].cy],[g[2].r,g[2].cy]],true);
  add(3,4,'b','Ya',[[g[3].cx,g[3].b],[g[3].cx,Y3],[CX(3),Y3],[CX(3),g[4].t]],true);
  add(4,5,'b','',[[CX(3),g[4].b],[CX(3),Y4],[g[5].cx,Y4],[g[5].cx,g[5].t]]);
  add(5,4,'r','Tidak',[[g[5].x,g[5].cy],[g[4].x-22,g[5].cy],[g[4].x-22,g[4].cy],[g[4].x,g[4].cy]],true);
  add(5,6,'b','Ya',[[g[5].cx,g[5].b],[g[6].cx,g[6].t]],true);
  add(6,7,'b','Beda penilaian (split decision)',[[g[6].x,g[6].cy],[CX(3),g[6].cy],[CX(3),g[7].t]],true);
  add(6,10,'r','Belum direkomendasikan',[[g[6].r,g[6].cy],[c7+40,g[6].cy],[c7+40,g[10].t]],true);
  add(6,10,'b','Direkomendasikan',[[g[6].cx,g[6].b],[g[6].cx,Y6],[c7,Y6],[c7,g[10].t]],true);
  add(7,8,'b','Beda penilaian substansi',[[g[7].r,g[7].cy],[g[8].cx,g[7].cy],[g[8].cx,g[8].t]],true);
  add(7,10,'b','Beda penilaian administrasi dan substansi 1–2 komponen',[[CX(4),g[7].b],[CX(4),Yn],[c7-40,Yn],[c7-40,g[10].t]],{w:210});
  add(8,7,'r','Tidak',[[g[8].x,g[8].cy],[g[7].x-22,g[8].cy],[g[7].x-22,g[7].cy],[g[7].x,g[7].cy]],true);
  add(8,9,'b','Ya',[[g[8].cx,g[8].b],[g[9].cx,g[9].t]],true);
  add(9,10,'r','Belum direkomendasikan',[[g[9].r,g[9].cy],[c7+40,g[9].cy],[c7+40,g[10].t]],{w:122});
  add(9,10,'b','Direkomendasikan',[[g[9].cx,g[9].b],[g[9].cx,Yb],[c7,Yb],[c7,g[10].t]],true);
  add(10,11,'r','Belum direkomendasikan',[[g[10].x,g[10].cy],[CX(1)-34,g[10].cy],[CX(1)-34,g[11].t]],true);
  add(10,11,'b','Direkomendasikan',[[g[10].cx,g[10].b],[g[10].cx,Y10],[CX(1)+34,Y10],[CX(1)+34,g[11].t]],true);
  add(11,12,'b','Direkomendasikan – Usulan Profesor',[[g[11].x,g[11].cy],[CX(0),g[11].cy],[CX(0),g[12].t]],{w:134});
  add(11,13,'b','Direkomendasikan – Usulan Lektor Kepala',[[g[11].r,g[11].cy],[g[13].r+34,g[11].cy],[g[13].r+34,g[13].cy],[g[13].r,g[13].cy]],true);
  add(11,13,'r','Belum direkomendasikan – Usulan Lektor Kepala dan Profesor',[[g[11].cx,g[11].b],[g[11].cx,g[12].cy],[CX(5),g[12].cy],[CX(5),g[13].t]],{w:160});
  add(12,13,'r','Belum direkomendasikan – Usulan Profesor',[[g[12].r,g[12].cy],[CX(5),g[12].cy],[CX(5),g[13].t]],{w:134});
  add(12,13,'b','Direkomendasikan – Usulan Profesor',[[CX(0),g[12].b],[CX(0),g[13].cy],[g[13].x,g[13].cy]],{w:134});

    var NS='http://www.w3.org/2000/svg';
  var app=document.querySelector('.app'),
      heads=document.getElementById('heads'), canvas=document.getElementById('canvas'),
      stage=document.getElementById('stage'), board=document.getElementById('board'),
      wrap=document.getElementById('boardwrap'), panel=document.getElementById('panel'),
      detail=document.getElementById('detail');
  var panelOpenTimer=null;

  stage.style.width=CW+'px';
  canvas.style.width=CW+'px'; canvas.style.height=CH+'px';

  LANES.forEach(function(ln,i){
    var h=document.createElement('div');
    h.className='lh'; h.style.width=LW[i]+'px'; h.style.setProperty('--c',LC[i]);
    h.textContent=ln.n;
    if(ln.s){var sm=document.createElement('small');sm.textContent=ln.s;h.appendChild(sm);}
    heads.appendChild(h);
    var l=document.createElement('div');
    l.className='lane'; l.style.setProperty('--c',LC[i]); l.style.left=X0[i]+'px'; l.style.width=LW[i]+'px';
    canvas.appendChild(l);
  });

  var svg=document.createElementNS(NS,'svg');
  svg.setAttribute('class','wires'); svg.setAttribute('width',CW); svg.setAttribute('height',CH);
  svg.setAttribute('aria-hidden','true');
  svg.innerHTML='<defs>'+
    '<marker id="ah-b" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path class="ah b" d="M0,1 L9.5,5 L0,9 z"/></marker>'+
    '<marker id="ah-r" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path class="ah r" d="M0,1 L9.5,5 L0,9 z"/></marker><marker id="ah-g" viewBox="0 0 10 10" refX="8.5" refY="5" markerWidth="12" markerHeight="12" markerUnits="userSpaceOnUse" orient="auto"><path class="ah g" d="M0,1 L9.5,5 L0,9 z"/></marker></defs>';
  canvas.appendChild(svg);
  var gAlt=document.createElementNS(NS,'g'), gMain=document.createElementNS(NS,'g');
  svg.appendChild(gAlt); svg.appendChild(gMain);

  function roundPath(p,r){
    var d='M'+p[0][0]+' '+p[0][1];
    for(var i=1;i<p.length-1;i++){
      var a=p[i-1], b=p[i], c=p[i+1];
      var l1=Math.hypot(a[0]-b[0],a[1]-b[1]), l2=Math.hypot(c[0]-b[0],c[1]-b[1]);
      var rr=Math.min(r,l1/2,l2/2);
      var ax=b[0]+(a[0]-b[0])/l1*rr, ay=b[1]+(a[1]-b[1])/l1*rr;
      var bx=b[0]+(c[0]-b[0])/l2*rr, by=b[1]+(c[1]-b[1])/l2*rr;
      d+=' L'+ax+' '+ay+' Q'+b[0]+' '+b[1]+' '+bx+' '+by;
    }
    var z=p[p.length-1];
    return d+' L'+z[0]+' '+z[1];
  }

  E.forEach(function(e){
    var p=document.createElementNS(NS,'path');
    p.setAttribute('d',roundPath(e.pts,9));
    p.setAttribute('class','edge '+e.kind+(e.main?' main':' alt'));
    p.setAttribute('marker-end','url(#ah-'+e.kind+')');
    (e.main?gMain:gAlt).appendChild(p); e.el=p;
    if(e.lab){
      var l=document.createElement('div');
      l.className='lab '+e.kind; l.textContent=e.txt;
      if(e.lab.w){l.style.width=e.lab.w+'px';l.style.whiteSpace='normal';}
      canvas.appendChild(l); e.lel=l;
    }
  });

  /* label: tepat di atas garis, dekat kotak keputusan */
  function placeLabels(){
    E.forEach(function(e){
      if(!e.lel)return;
      var p0=e.pts[0], p1=e.pts[1];
      var dx=p1[0]-p0[0], dy=p1[1]-p0[1], len=Math.hypot(dx,dy), ux=dx/len, uy=dy/len;
      var w=e.lel.offsetWidth, h=e.lel.offsetHeight;
      var off=9+Math.abs(ux)*w/2+Math.abs(uy)*h/2;
      e.lel.style.left=(p0[0]+ux*off)+'px';
      e.lel.style.top=(p0[1]+uy*off)+'px';
    });
  }

  var nodeEls={};
  Object.keys(S).forEach(function(k){
    var s=S[k], q=G[k], dec=s.t==='d';
    var b=document.createElement('button');
    b.type='button';
    b.className='node'+(dec?' dec':'')+(s.grp?' grp':'');
    b.style.left=q.x+'px'; b.style.top=q.y+'px'; b.style.width=q.w+'px'; b.style.height=q.h+'px';
    b.setAttribute('data-id',k);
    if(s.grp){var gc=s.who.map(function(i){return LC[i];});b.style.setProperty('--gbg',hard(gc,true));b.style.setProperty('--grad',hard(gc,false));}
    else{b.style.setProperty('--c',LC[s.who[0]]);}
    b.setAttribute('aria-label','Langkah '+k+', '+(dec?'keputusan':'proses')+': '+s.short);
    var badge=dec?'<span class="bd"><span>'+k+'</span></span>':'<span class="bp">'+k+'</span>';
    b.innerHTML=badge+'<span class="t">'+s.short+'</span>'+(s.note?'<span class="note">'+s.note+'</span>':'')+
      (s.tag?'<span class="tag '+(k==='1'?'up':'down')+'">'+s.tag+'</span>':'');
    canvas.appendChild(b); nodeEls[k]=b;
  });

  /* panel */
  var sel=null, Z=1;
  var isMobile=function(){return window.matchMedia('(max-width:900px)').matches;};

  function badgeHTML(k){
    return S[k].t==='d'?'<span class="mb d"><span>'+k+'</span></span>':'<span class="mb p">'+k+'</span>';
  }
  function render(id){
    var s=S[id], dec=s.t==='d';
    var outs=E.filter(function(e){return e.from==id;});
    var ins=[]; E.forEach(function(e){if(e.to==id&&ins.indexOf(e.from)<0)ins.push(e.from);});
    var h='<div class="pbar" style="background:'+hard(s.who.map(function(i){return LC[i];}),false)+'"></div><div class="p-head">'+badgeHTML(id)+
      '<div class="p-eyebrow">Langkah '+id+' dari 13 · '+(dec?'Keputusan':'Proses')+'</div>'+
      '<button type="button" class="p-close" id="pclose" aria-label="Tutup detail">×</button></div>'+
      '<h2 class="p-title">'+s.title+'</h2>'+
      '<div class="sec"><h3>Pelaksana</h3><div class="chips">'+
        s.who.map(function(i){return '<span class="chip" style="--c:'+LC[i]+'">'+LANES[i].n+(LANES[i].s?' ('+LANES[i].s+')':'')+'</span>';}).join('')+
      '</div></div>'+
      '<div class="sec"><h3>Kelengkapan</h3><p>'+s.need+'</p></div>'+
      '<div class="sec"><h3>Waktu</h3><div class="days"><b>'+s.days+'</b><span>hari</span></div>'+
        '<div class="meter" role="img" aria-label="'+s.days+' dari '+TOTAL+' hari"><i style="width:'+Math.max(4,s.days/TOTAL*100)+'%;background:'+LC[s.who[0]]+'"></i></div>'+
        '<div class="meter-n">Bagian dari total '+TOTAL+' hari pada SOP</div></div>'+
      '<div class="sec"><h3>Output</h3><p>'+s.out+'</p></div>'+
      '<div class="sec"><h3>'+(dec?'Hasil keputusan':'Dilanjutkan ke')+'</h3><div class="nexts">'+
        outs.map(function(e){
          var lbl=e.txt||'Lanjut';
          return '<button type="button" class="go '+e.kind+'" data-go="'+e.to+'"><i class="dot"></i><span class="gl">'+lbl+'<span class="gtag '+(e.main?'m':'a')+'">'+(e.main?'Ideal':'Alternatif')+'</span></span><span class="gt">Langkah '+e.to+' · '+S[e.to].short+'</span></button>';
        }).join('')+
        (id==13?'<div class="go end" style="cursor:default"><i class="dot"></i><span class="gl">Selesai</span><span class="gt">Hasil penilaian dipublikasikan di SISTER</span></div>':'')+
      '</div></div>'+
      (ins.length?'<div class="sec froms">Datang dari langkah '+ins.map(function(i){return '<button type="button" data-go="'+i+'">'+i+'</button>';}).join(', ')+'</div>':'');
    detail.innerHTML=h;
    panel.scrollTop=0;
  }

  function select(id){
    var openingPanel=!app.classList.contains('has-selection');
    sel=String(id);
    stage.style.width=(CW/Z)+'px';
    Object.keys(nodeEls).forEach(function(k){nodeEls[k].classList.toggle('sel',k===sel);});
    E.forEach(function(e){
      var on=String(e.from)===sel, inn=String(e.to)===sel&&!on, dim=!on&&!inn;
      e.el.classList.toggle('on',on); e.el.classList.toggle('in',inn); e.el.classList.toggle('dim',dim);
      if(e.lel){e.lel.classList.toggle('dim',dim);}
    });
    wrap.classList.add('has-sel');
    panel.classList.add('has');
    app.classList.add('has-selection');
    render(sel);
    try{history.replaceState(null,'','#l'+sel);}catch(err){}
    if(openingPanel&&!isMobile()){
      if(panelOpenTimer)clearTimeout(panelOpenTimer);
      panelOpenTimer=setTimeout(function(){
        panelOpenTimer=null;
        if(sel)focusNode(sel);
      },350);
    }else if(!panelOpenTimer){
      requestAnimationFrame(function(){focusNode(sel);});
    }
  }
  function clear(){
    if(panelOpenTimer){clearTimeout(panelOpenTimer);panelOpenTimer=null;}
    sel=null;
    Object.keys(nodeEls).forEach(function(k){nodeEls[k].classList.remove('sel');});
    E.forEach(function(e){e.el.classList.remove('on','in','dim');if(e.lel)e.lel.classList.remove('dim');});
    wrap.classList.remove('has-sel');
    panel.classList.remove('has');
    app.classList.remove('has-selection');
    stage.style.width=CW+'px';
    try{history.replaceState(null,'',location.pathname+location.search);}catch(err){}
  }
  function focusNode(id){
    var reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
    var boardRect=board.getBoundingClientRect(), visibleHeight=board.clientHeight;
    if(isMobile()&&panel.classList.contains('has')&&getComputedStyle(panel).position==='fixed'){
      visibleHeight=Math.max(0,Math.min(visibleHeight,window.innerHeight-panel.offsetHeight-boardRect.top-board.clientTop));
    }
    var zoom=parseFloat(stage.style.zoom)||1;
    var nodeRect=nodeEls[id].getBoundingClientRect();
    var centerX=boardRect.left+board.clientLeft+board.clientWidth/2;
    var visibleTop=boardRect.top+board.clientTop+heads.getBoundingClientRect().height;
    var centerY=visibleTop+Math.max(0,visibleHeight-heads.getBoundingClientRect().height)/2;
    var maxScrollX=Math.max(0,board.scrollWidth-board.clientWidth);
    var maxScroll=Math.max(0,board.scrollHeight-board.clientHeight);
    board.scrollTo({
      left:Math.max(0,Math.min(maxScrollX,board.scrollLeft+(nodeRect.left+nodeRect.width/2-centerX)*zoom)),
      top:Math.max(0,Math.min(maxScroll,board.scrollTop+(nodeRect.top+nodeRect.height/2-centerY)*zoom)),
      behavior:reduce?'auto':'smooth'
    });
  }

  canvas.addEventListener('click',function(ev){
    var n=ev.target.closest('.node'); if(!n)return;
    var id=n.getAttribute('data-id');
    if(sel===id){clear();}else{select(id);}
  });
  board.addEventListener('click',function(ev){
    if(sel&&!ev.target.closest('.node')){clear();}
  });
  detail.addEventListener('click',function(ev){
    if(ev.target.closest('#pclose')){clear();return;}
    var b=ev.target.closest('[data-go]');
    if(b){select(b.getAttribute('data-go'));}
  });
  document.addEventListener('keydown',function(ev){if(ev.key==='Escape'&&sel){clear();}});


  /* filter alur dan jenjang */
  var F={flow:'all',tier:'all'};
  var statusEl=document.getElementById('status');
  function applyFilter(){
    var act={};
    E.forEach(function(e){
      var ok=(F.flow==='all'||(F.flow==='main')===e.main)&&(F.tier==='all'||e.tier==='both'||e.tier===F.tier);
      e.ok=ok;
      e.el.classList.toggle('off',!ok);
      if(e.lel)e.lel.classList.toggle('off',!ok);
      if(ok){act[e.from]=1;act[e.to]=1;}
    });
    var cnt=0;
    Object.keys(nodeEls).forEach(function(k){
      var on=!!act[k]; if(on)cnt++;
      nodeEls[k].classList.toggle('off',!on);
    });
    statusEl.textContent='Menampilkan '+cnt+' dari 13 langkah';
  }
  document.querySelector('.toolbar').addEventListener('click',function(ev){
    var b=ev.target.closest('.seg button'); if(!b)return;
    var grp=b.parentNode.getAttribute('data-group');
    F[grp]=b.getAttribute('data-v');
    Array.prototype.forEach.call(b.parentNode.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    applyFilter();
  });
  applyFilter();

  /* zoom */
  var zval=document.getElementById('zval');
  function setZoom(z){
    Z=Math.min(1.6,Math.max(0.3,z));
    stage.style.zoom=Z;
    stage.style.width=(sel?CW/Z:CW)+'px';
    zval.textContent=Math.round(Z*100)+'%';
  }
  document.getElementById('zout').addEventListener('click',function(){setZoom(Z/1.15);});
  document.getElementById('zin').addEventListener('click',function(){setZoom(Z*1.15);});
  document.getElementById('zfit').addEventListener('click',function(){setZoom((board.clientWidth-2)/CW);board.scrollTo({left:0,top:0});});
  placeLabels();
  setZoom(isMobile()?0.85:1);
  if(document.fonts&&document.fonts.ready){
    document.fonts.ready.then(function(){var z=Z;stage.style.zoom=1;placeLabels();stage.style.zoom=z;});
  }

    var m=/^#l(\d+)$/.exec(location.hash||'');
  if(m&&S[m[1]]){select(m[1]);}
})();
