'use strict';

/* ─── DATA ─── */
const MOVIES = [
  // BOLLYWOOD
  {id:1,  title:'Kantara',              genre:'Action/Drama',       lang:'Hindi',    dur:'2h 30m', rating:8.5, seats:45, cat:'bollywood', isNew:false,
   img:'image/kantara.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:2,  title:'Stree 3',              genre:'Horror/Comedy',      lang:'Hindi',    dur:'2h 10m', rating:8.1, seats:38, cat:'bollywood', isNew:true,
   img:'image/stree3.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:3,  title:'Animal Park',          genre:'Action/Thriller',    lang:'Hindi',    dur:'2h 45m', rating:7.9, seats:29, cat:'bollywood', isNew:true,
   img:'image/Anima.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:4,  title:'Jolly LLB 3',          genre:'Comedy/Drama',       lang:'Hindi',    dur:'2h 15m', rating:7.8, seats:52, cat:'bollywood', isNew:false,
   img:'image/JollyLLB3.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:5,  title:'Dunki 2',              genre:'Drama/Comedy',       lang:'Hindi',    dur:'2h 20m', rating:7.5, seats:61, cat:'bollywood', isNew:false,
   img:'image/Dunki.jpg',
   price:{reg:150,prem:250,vip:350}},
  // HOLLYWOOD
  {id:6,  title:'Dune: Part Two',       genre:'Sci-Fi/Action',      lang:'English',  dur:'2h 45m', rating:8.9, seats:63, cat:'hollywood', isNew:false,
   img:'image/dune2.jpg',
   price:{reg:200,prem:350,vip:500}},
  {id:7,  title:'Oppenheimer',          genre:'Biography/Thriller', lang:'English',  dur:'3h 00m', rating:9.2, seats:41, cat:'hollywood', isNew:false,
   img:'image/oppenheimer.jpg',
   price:{reg:200,prem:350,vip:500}},
  {id:8,  title:'Final Destination 7',  genre:'Horror/Thriller',    lang:'English',  dur:'1h 54m', rating:8.3, seats:57, cat:'hollywood', isNew:true,
   img:'image/Final Destination.jpg',
   price:{reg:200,prem:350,vip:500}},
  {id:9,  title:'Mission: Impossible 8',genre:'Action/Adventure',   lang:'English',  dur:'2h 43m', rating:8.7, seats:48, cat:'hollywood', isNew:true,
   img:'image/Mission.jpg',
   price:{reg:200,prem:350,vip:500}},
  {id:10, title:'Avatar 3',             genre:'Sci-Fi/Fantasy',     lang:'English',  dur:'3h 10m', rating:8.5, seats:35, cat:'hollywood', isNew:true,
   img:'image/Avatar 3.jpg',
   price:{reg:250,prem:400,vip:600}},
  {id:11, title:'sunny sanskari ki tulsi kumari',        genre:'Drama/Comedy',     lang:'Hindi',  dur:'2h 22m', rating:7.6, seats:44, cat:'hollywood', isNew:true,
   img:'image/sunny.jpg',
   price:{reg:200,prem:350,vip:500}},
  {id:12, title:'Dhurandhar',    genre:'Action/Adventure',   lang:'Hindi',  dur:'4h 28m', rating:8.4, seats:50, cat:'hollywood', isNew:true,
   img:'image/spiderman-nexus.jpg',
   price:{reg:200,prem:350,vip:500}},
  // SOUTH INDIAN
  {id:13, title:'KGF: Chapter 3',       genre:'Action',             lang:'Kannada',  dur:'2h 58m', rating:9.1, seats:52, cat:'south', isNew:true,
   img:'image/kgf3.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:14, title:'RRR 2',                genre:'Action/Drama',       lang:'Telugu',   dur:'3h 07m', rating:9.3, seats:44, cat:'south', isNew:true,
   img:'image/RRR.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:15, title:'Pushpa: The Rule',     genre:'Action/Drama',       lang:'Telugu',   dur:'3h 00m', rating:8.7, seats:40, cat:'south', isNew:false,
   img:'image/pushpa.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:16, title:'Kalki 2898 AD',        genre:'Sci-Fi/Action',      lang:'Telugu',   dur:'2h 58m', rating:8.9, seats:33, cat:'south', isNew:true,
   img:'image/kalki.jpg',
   price:{reg:180,prem:280,vip:400}},
  {id:17, title:'Vikram 2',             genre:'Action/Thriller',    lang:'Tamil',    dur:'2h 55m', rating:8.8, seats:36, cat:'south', isNew:false,
   img:'image/Vikram.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:18, title:'Leo 2',                genre:'Action/Thriller',    lang:'Tamil',    dur:'2h 48m', rating:8.4, seats:55, cat:'south', isNew:false,
   img:'image/leo.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:19, title:'Manjummel Boys 2',     genre:'Thriller/Drama',     lang:'Malayalam',dur:'2h 25m', rating:8.6, seats:39, cat:'south', isNew:false,
   img:'image/Manjummel Boys 2.jpg',
   price:{reg:150,prem:250,vip:350}},
  {id:20, title:'Salaar 2',             genre:'Action',             lang:'Telugu',   dur:'2h 50m', rating:8.0, seats:50, cat:'south', isNew:true,
   img:'image/salaar2.jpg',
   price:{reg:150,prem:250,vip:350}},
];

const COMING = [
  {title:'Cars 4',             date:'Aug 2026', img:'image/cars4.jpg'},
  {title:'Border 2',           date:'Jan 2027', img:'image/border2.jpg'},
  {title:'Harry Potter Legacy',date:'Dec 2026', img:'image/harry-potter-legacy.jpg'},
  {title:'Dhurandhar',         date:'Oct 2026', img:'image/dhurandhar.jpg'},
  {title:'Baahubali 3',        date:'Nov 2026', img:'image/baahubali3.jpg'},
  {title:'Avengers: Doomsday', date:'May 2026', img:'image/avengers-doomsday.jpg'},
];

const OFFERS = [
  {icon:'fa-graduation-cap', title:'Student Special',  desc:'20% off all shows with valid student ID on weekdays.',          code:'STUDENT20'},
  {icon:'fa-calendar-week',  title:'Weekend Bliss',    desc:'Buy 2 seats, get 1 free on Saturday and Sunday screenings.',    code:'WEEKEND3'},
  {icon:'fa-credit-card',    title:'Card Rewards',     desc:'15% cashback on HDFC, ICICI and Axis credit & debit cards.',    code:'CASHBACK15'},
  {icon:'fa-users',          title:'Group Booking',    desc:'₹50 off per ticket when booking 5 or more seats at once.',      code:'GROUP50'},
  {icon:'fa-birthday-cake',  title:'Birthday Treat',   desc:'Free premium popcorn combo on your birthday. Show ID at entry.',code:'BDAY2026'},
  {icon:'fa-sun',            title:'Morning Show',     desc:'Flat 30% off on all shows before noon, every single day.',      code:'EARLYBIRD'},
];

const SHOWS = ['10:00 AM','12:30 PM','03:15 PM','06:00 PM','09:00 PM','11:45 PM'];
const ROWS  = ['A','B','C','D','E','F','G','H','I'];
const SEATS_PER = 12;

/* ─── STATE ─── */
let curMovie   = null;
let selSeats   = [];
let booked     = [];
let step       = 1;
let selShow    = '';
let bData      = {};
let selUPI     = '';
let selWallet  = '';
let cdTimer    = null;
let toastTimer = null;

/* ═══════════════════════════════════
   AURORA BACKGROUND
═══════════════════════════════════ */
(function aurora(){
  const c   = document.getElementById('aurora');
  const ctx = c.getContext('2d');
  let W, H, t = 0;
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  resize(); window.addEventListener('resize', resize);
  function draw(){
    ctx.clearRect(0,0,W,H);
    const orbs = [
      {x:.15, y:.3,  r:.4, col:'rgba(124,58,237,'},
      {x:.8,  y:.15, r:.35,col:'rgba(201,168,76,'},
      {x:.5,  y:.7,  r:.3, col:'rgba(232,100,122,'},
    ];
    orbs.forEach((o,i)=>{
      const px = (o.x + Math.sin(t*.0008+i)*0.07) * W;
      const py = (o.y + Math.cos(t*.0006+i)*0.06) * H;
      const rad= o.r * Math.min(W,H);
      const g  = ctx.createRadialGradient(px,py,0,px,py,rad);
      g.addColorStop(0, o.col+'0.18)');
      g.addColorStop(1, o.col+'0)');
      ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    });
    t++; requestAnimationFrame(draw);
  }
  draw();
})();

/* ═══════════════════════════════════
   HERO REEL STRIP
═══════════════════════════════════ */
(function buildReel(){
  const wrap = document.getElementById('heroReel');
  const COL_COUNT = Math.ceil(window.innerWidth / 140) + 1;
  const imgs = MOVIES.map(m=>m.img);
  for(let c=0; c<COL_COUNT; c++){
    const col = document.createElement('div');
    col.className = 'reel-col';
    col.style.setProperty('--dur', (18+c*4)+'s');
    // duplicate for seamless loop
    const pool = [...imgs, ...imgs];
    pool.sort(()=>Math.random()-.5);
    const doubled = [...pool, ...pool];
    doubled.forEach(src=>{
      const img = document.createElement('img');
      img.src = src; img.loading = 'lazy'; img.alt='';
      img.onerror = ()=>{ img.style.background='#1a1a28'; };
      col.appendChild(img);
    });
    wrap.appendChild(col);
  }
})();

/* ═══════════════════════════════════
   TICKER
═══════════════════════════════════ */
(function buildTicker(){
  const items = [
    '4K LASER PROJECTION','DOLBY ATMOS SOUND','LUXURY RECLINERS',
    '20 FILMS NOW SHOWING','IN-SEAT DINING','DOLBY VISION HDR',
    'BOOK IN 60 SECONDS','INSTANT E-TICKETS','PREMIUM CONCESSIONS',
  ];
  const track = document.getElementById('tickerTrack');
  const all   = [...items,...items,...items];
  track.innerHTML = all.map(i=>`<span class="t-item"><span class="t-dot">◆</span>${i}</span>`).join('');
})();

/* ═══════════════════════════════════
   NAV SCROLL + LINKS
═══════════════════════════════════ */
window.addEventListener('scroll',()=>{
  document.getElementById('siteHeader').classList.toggle('solid', window.scrollY > 40);
});
document.getElementById('ham').addEventListener('click', function(){
  this.classList.toggle('open');
  document.getElementById('mobNav').classList.toggle('open');
});
function closeMob(){
  document.getElementById('ham').classList.remove('open');
  document.getElementById('mobNav').classList.remove('open');
}
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const t = document.querySelector(a.getAttribute('href'));
    if(t){ e.preventDefault(); t.scrollIntoView({behavior:'smooth',block:'start'}); closeMob(); }
  });
});

/* ═══════════════════════════════════
   SEARCH
═══════════════════════════════════ */
document.getElementById('searchBtn').addEventListener('click',()=>{
  const d = document.getElementById('searchDrop');
  d.classList.toggle('open');
  if(d.classList.contains('open')) setTimeout(()=>document.getElementById('searchInp').focus(),200);
});
document.getElementById('searchClose')?.addEventListener('click',()=>{
  document.getElementById('searchDrop').classList.remove('open');
});
document.getElementById('searchInp').addEventListener('input', function(){
  const q = this.value.trim().toLowerCase();
  const hits = document.getElementById('searchHits');
  if(!q){ hits.innerHTML=''; return; }
  const res = MOVIES.filter(m=>
    m.title.toLowerCase().includes(q)||
    m.genre.toLowerCase().includes(q)||
    m.lang.toLowerCase().includes(q)
  ).slice(0,8);
  if(!res.length){ hits.innerHTML='<span class="s-empty">No films found</span>'; return; }
  hits.innerHTML = res.map(m=>`
    <span class="s-chip" onclick="openBooking(${m.id});document.getElementById('searchDrop').classList.remove('open')">
      <img src="${m.img}" alt="${m.title}" onerror="this.style.display='none'">
      ${m.title} <span style="color:var(--ink3);font-size:.68rem">· ${m.lang}</span>
    </span>`).join('');
});

/* ═══════════════════════════════════
   REVEAL OBSERVER
═══════════════════════════════════ */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{threshold:.1});
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ═══════════════════════════════════
   ANIMATED COUNTERS
═══════════════════════════════════ */
const counterObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(!e.isIntersecting) return;
    const el = e.target;
    const target = +el.dataset.target;
    let cur = 0; const step = Math.ceil(target/60);
    const t = setInterval(()=>{
      cur = Math.min(cur+step, target);
      el.textContent = cur;
      if(cur>=target) clearInterval(t);
    },22);
    counterObs.unobserve(el);
  });
},{threshold:.5});
document.querySelectorAll('.big-num[data-target],.counter[data-target]').forEach(el=>counterObs.observe(el));

/* ═══════════════════════════════════
   RENDER FILMS
═══════════════════════════════════ */
let curCat  = 'all';
let curSort = 'default';

function getFilms(){
  let list = curCat==='all' ? [...MOVIES] : MOVIES.filter(m=>m.cat===curCat);
  if(curSort==='rating') list.sort((a,b)=>b.rating-a.rating);
  else if(curSort==='az') list.sort((a,b)=>a.title.localeCompare(b.title));
  else if(curSort==='seats') list.sort((a,b)=>b.seats-a.seats);
  return list;
}

function renderFilms(){
  const grid = document.getElementById('filmGrid');
  const list = getFilms();
  document.getElementById('countTag').innerHTML =
    `<strong>${list.length}</strong> film${list.length!==1?'s':''} found`;
  grid.innerHTML = '';
  list.forEach((m,i)=>{
    const pct = Math.min(100,Math.round((m.seats/80)*100));
    const card = document.createElement('div');
    card.className = 'film-card reveal';
    card.style.transitionDelay = `${i*35}ms`;
    card.innerHTML = `
      <div class="fc-poster">
        <img src="${m.img}" alt="${m.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/420x630/13132b/c9a84c?text=${encodeURIComponent(m.title)}'">
        <div class="fc-overlay">
          <div class="fc-play"><i class="fas fa-play"></i></div>
          <button class="fc-quick" onclick="openBooking(${m.id});event.stopPropagation()">Book Now</button>
        </div>
        <div class="fc-badges">
          <span class="fc-badge b-rating"><i class="fas fa-star"></i> ${m.rating}</span>
          <span class="fc-badge b-lang">${m.lang}</span>
          ${m.isNew?'<span class="fc-badge b-new">NEW</span>':''}
        </div>
      </div>
      <div class="fc-body">
        <div class="fc-title">${m.title}</div>
        <div class="fc-meta"><span><i class="fas fa-clock"></i> ${m.dur}</span><span><i class="fas fa-film"></i> ${m.genre.split('/')[0]}</span></div>
        <span class="fc-genre">${m.genre}</span>
        <div class="fc-seats-bar"><div class="fc-seats-fill" style="width:${pct}%"></div></div>
        <div class="fc-seats-txt"><strong>${m.seats}</strong> seats available</div>
        <button class="fc-book" onclick="openBooking(${m.id})"><i class="fas fa-ticket-alt"></i> Book Tickets</button>
      </div>`;
    grid.appendChild(card);
    revObs.observe(card);
  });
}

// FIX: Changed from document.getElementById('filters') to document.querySelector('.filter-row')
document.querySelector('.filter-row').addEventListener('click', e => {
  const btn = e.target.closest('.filt'); if(!btn) return;
  document.querySelectorAll('.filt').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  curCat = btn.dataset.cat;
  renderFilms();
});

document.getElementById('sortSel').addEventListener('change',e=>{
  curSort = e.target.value; renderFilms();
});

/* ═══════════════════════════════════
   COMING SOON
═══════════════════════════════════ */
function renderComing(){
  const row = document.getElementById('comingRow');
  COMING.forEach(m=>{
    const c = document.createElement('div');
    c.className = 'coming-card';
    c.innerHTML = `
      <div class="cc-img">
        <img src="${m.img}" alt="${m.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x450/0d0d1a/c9a84c?text=${encodeURIComponent(m.title)}'">
        <div class="cc-veil"></div>
      </div>
      <div class="cc-body">
        <h4>${m.title}</h4>
        <div class="cc-date"><i class="fas fa-calendar-alt"></i> ${m.date}</div>
        <span class="cc-badge">Coming Soon</span>
      </div>`;
    row.appendChild(c);
  });
}

/* ═══════════════════════════════════
   OFFERS
═══════════════════════════════════ */
function renderOffers(){
  const row = document.getElementById('offersRow');
  OFFERS.forEach(o=>{
    const c = document.createElement('div');
    c.className = 'offer-card reveal';
    c.innerHTML = `
      <div class="oc-icon"><i class="fas ${o.icon}"></i></div>
      <h3>${o.title}</h3>
      <p>${o.desc}</p>
      <span class="oc-code" onclick="copyCode(this,'${o.code}')">${o.code}</span>`;
    row.appendChild(c);
    revObs.observe(c);
  });
}
function copyCode(el, code){
  navigator.clipboard.writeText(code).catch(()=>{});
  showToast('✅',`Code "${code}" copied!`);
}

/* ═══════════════════════════════════
   NEWSLETTER
═══════════════════════════════════ */
function subscribeNL(){
  const v = document.getElementById('nlEmail').value.trim();
  const ok= document.getElementById('nlOk');
  if(!v||!v.includes('@')){ ok.textContent='Please enter a valid email.'; ok.style.color='var(--rose)'; return; }
  ok.textContent='You\'re subscribed! 🎬'; ok.style.color='var(--gold)';
  document.getElementById('nlEmail').value='';
}

/* ═══════════════════════════════════
   MODAL CORE
═══════════════════════════════════ */
function openModal(eyebrow, title, contentHTML){
  document.getElementById('modalEyebrow').textContent = eyebrow;
  document.getElementById('modalTitle').textContent   = title;
  document.getElementById('modalContent').innerHTML   = contentHTML;
  document.getElementById('modalBack').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  document.getElementById('modalBack').classList.remove('open');
  document.body.style.overflow = '';
  if(cdTimer){ clearInterval(cdTimer); cdTimer=null; }
}
document.getElementById('closeBtn').addEventListener('click', closeModal);
document.getElementById('modalBack').addEventListener('click', e=>{
  if(e.target===document.getElementById('modalBack')) closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ─── Steps bar ─── */
function renderSteps(){
  const defs = ['Select Seats','Payment','Confirmation'];
  let html = '';
  defs.forEach((lbl,i)=>{
    const n = i+1;
    const done = step>n, active = step===n;
    html += `<div class="step-item ${active?'active':''} ${done?'done':''}">
      <div class="step-num">${done?'<i class="fas fa-check"></i>':n}</div>
      <div class="step-lbl">${lbl}</div>
    </div>`;
    if(i<defs.length-1)
      html += `<div class="step-line ${done?'done':''}"></div>`;
  });
  document.getElementById('stepsBar').innerHTML = html;
}

/* ═══════════════════════════════════
   STEP 1 — SEAT SELECTION
═══════════════════════════════════ */
function openBooking(id){
  curMovie  = MOVIES.find(m=>m.id===id);
  selSeats  = [];
  booked    = genBooked();
  selShow   = '';
  step      = 1;
  renderSteps();
  openModal('SELECT SEATS', curMovie.title, buildSeatHTML());
  renderSeatMap();
}

function genBooked(){
  const arr=[], n=Math.floor(Math.random()*25)+12;
  while(arr.length<n){
    const r=ROWS[Math.floor(Math.random()*ROWS.length)];
    const s=Math.floor(Math.random()*SEATS_PER)+1;
    const id=`${r}${s}`; if(!arr.includes(id)) arr.push(id);
  }
  return arr;
}

function rowType(r){
  if(['A','B','C'].includes(r)) return{t:'reg', label:'Regular', price:curMovie.price.reg};
  if(['D','E','F'].includes(r)) return{t:'prem',label:'Premium', price:curMovie.price.prem};
  return                              {t:'vip', label:'VIP',     price:curMovie.price.vip};
}

function buildSeatHTML(){
  const m = curMovie;
  const showBtns = SHOWS.map((s,i)=>{
    const hf = i===3; // fake one housefull
    return `<button class="t-btn${hf?' hf':''}" onclick="pickShow(this,'${s}')" ${hf?'disabled':''}>${s}${hf?' · HOUSEFULL':''}</button>`;
  }).join('');
  return `
  <div class="show-info">
    <img src="${m.img}" alt="${m.title}" onerror="this.style.display='none'">
    <div class="show-info-txt">
      <h3>${m.title}</h3>
      <p><i class="fas fa-clock"></i> ${m.dur} &nbsp;|&nbsp; <i class="fas fa-language"></i> ${m.lang} &nbsp;|&nbsp; <i class="fas fa-star" style="color:var(--gold)"></i> ${m.rating}/10</p>
    </div>
  </div>
  <div class="timing-section">
    <h4>Choose a show time</h4>
    <div class="timings-row">${showBtns}</div>
  </div>
  <div class="screen-wrap"><div class="screen-el">▬ &nbsp; S C R E E N &nbsp; ▬</div></div>
  <div class="seat-legend">
    <span class="leg-item"><span class="leg-sq" style="background:#2d6bc4"></span>Regular ₹${m.price.reg}</span>
    <span class="leg-item"><span class="leg-sq" style="background:#b5730a"></span>Premium ₹${m.price.prem}</span>
    <span class="leg-item"><span class="leg-sq" style="background:#c94b7a"></span>VIP ₹${m.price.vip}</span>
    <span class="leg-item"><span class="leg-sq" style="background:#10b981"></span>Selected</span>
    <span class="leg-item"><span class="leg-sq" style="background:#2a2a3a;opacity:.5"></span>Booked</span>
  </div>
  <div class="seats-scroll">
    <div class="seat-grid" id="seatGrid"></div>
  </div>
  <div class="book-bar">
    <div class="bs-seats">
      <h5>Your Seats</h5>
      <div class="bs-tags" id="bsTags"><span style="color:var(--ink3);font-size:.75rem;font-family:var(--ff-mono)">None selected</span></div>
    </div>
    <div class="bs-price">
      <div class="lbl">TOTAL</div>
      <div class="val" id="bsTotal">₹0</div>
    </div>
    <button class="proceed" id="proceedBtn" disabled onclick="goToPayment()">
      Continue <i class="fas fa-arrow-right"></i>
    </button>
  </div>`;
}

function pickShow(btn, show){
  document.querySelectorAll('.t-btn').forEach(b=>b.classList.remove('sel'));
  btn.classList.add('sel'); selShow = show;
}

function renderSeatMap(){
  const grid = document.getElementById('seatGrid'); if(!grid) return;
  ROWS.forEach(row=>{
    const div = document.createElement('div'); div.className='s-row';
    const lbl = document.createElement('div'); lbl.className='s-lbl'; lbl.textContent=row;
    div.appendChild(lbl);
    const {t} = rowType(row);
    for(let i=1;i<=SEATS_PER;i++){
      if(i===7){ const g=document.createElement('div'); g.className='s-gap'; div.appendChild(g); }
      const s=document.createElement('div');
      const id=`${row}${i}`;
      s.className=`seat ${t}`;
      s.textContent=i;
      s.dataset.id=id; s.dataset.row=row;
      if(booked.includes(id)) s.classList.add('bk');
      s.addEventListener('click', seatClick);
      div.appendChild(s);
    }
    grid.appendChild(div);
  });
}

function seatClick(e){
  const s=e.currentTarget; if(s.classList.contains('bk')) return;
  const id=s.dataset.id, row=s.dataset.row;
  const {t,label,price}=rowType(row);
  if(s.classList.contains('sel')){
    s.classList.remove('sel'); selSeats=selSeats.filter(x=>x.id!==id);
  } else {
    if(selSeats.length>=10){showToast('⚠️','Max 10 seats per booking');return;}
    s.classList.add('sel'); selSeats.push({id,row,t,label,price});
  }
  refreshBar();
}

function refreshBar(){
  const total=selSeats.reduce((a,s)=>a+s.price,0);
  const tags=document.getElementById('bsTags');
  const tv=document.getElementById('bsTotal');
  const btn=document.getElementById('proceedBtn');
  if(!tags) return;
  tags.innerHTML=selSeats.length
    ? selSeats.map(s=>`<span class="bs-tag ${s.t}">${s.id}</span>`).join('')
    : '<span style="color:var(--ink3);font-size:.75rem;font-family:var(--ff-mono)">None selected</span>';
  tv.textContent=`₹${total}`;
  btn.disabled=selSeats.length===0;
}

/* ═══════════════════════════════════
   STEP 2 — PAYMENT GATEWAY
═══════════════════════════════════ */
function goToPayment(){
  if(!selShow){ showToast('⚠️','Please select a show time first'); return; }
  const ticketPrice=selSeats.reduce((a,s)=>a+s.price,0);
  const convFee=selSeats.length*5;
  const sub=ticketPrice+convFee;
  const gst=+(sub*.18).toFixed(2);
  const grand=+(sub+gst).toFixed(2);
  bData={movie:curMovie, seats:selSeats, show:selShow, ticketPrice, convFee, gst, grand};
  step=2; renderSteps();
  document.getElementById('modalTitle').textContent='Secure Checkout';
  document.getElementById('modalEyebrow').textContent='PAYMENT GATEWAY';
  document.getElementById('modalContent').innerHTML=buildPayHTML();
  initPayUI();
}

function buildPayHTML(){
  const {movie,seats,ticketPrice,convFee,gst,grand,show}=bData;
  const byType={};
  seats.forEach(s=>{if(!byType[s.t])byType[s.t]=[];byType[s.t].push(s.id);});
  const chips=Object.entries(byType).map(([t,ids])=>
    `<span class="ord-chip" style="background:${t==='vip'?'#c94b7a':t==='prem'?'#b5730a':'#2d6bc4'}">${t.toUpperCase()}: ${ids.join(', ')}</span>`
  ).join('');

  return `<div class="pay-wrap">
  <!-- ORDER SUMMARY -->
  <div class="order-sum">
    <div class="ord-movie">
      <img src="${movie.img}" alt="${movie.title}" onerror="this.style.display='none'">
      <div class="ord-info">
        <h3>${movie.title}</h3>
        <p><i class="fas fa-clock"></i> ${show}<br><i class="fas fa-language"></i> ${movie.lang}<br><i class="fas fa-chair"></i> ${seats.length} seat${seats.length>1?'s':''}</p>
      </div>
    </div>
    <div class="ord-seats">
      <div class="lbl">Seats</div>
      <div class="ord-chips">${chips}</div>
    </div>
    <div class="ord-lines">
      <div class="line"><span>Tickets (${seats.length})</span><span>₹${ticketPrice}</span></div>
      <div class="line"><span>Convenience fee</span><span>₹${convFee}</span></div>
      <div class="line"><span>GST @18%</span><span>₹${gst}</span></div>
      <div class="line total"><span>Total Payable</span><span>₹${grand}</span></div>
    </div>
    <div class="ord-saving"><i class="fas fa-shield-alt"></i> Secured by 256-bit SSL encryption · PCI DSS compliant</div>
  </div>

  <!-- PAYMENT PANEL -->
  <div class="pay-panel">
    <div class="pay-panel-hd">
      <h3>Choose Payment Method</h3>
      <p>RAZORPAY SECURE GATEWAY · ALL CARDS ACCEPTED</p>
    </div>
    <div class="method-tabs">
      <button class="m-tab active" data-pane="card"><i class="fas fa-credit-card"></i> Card</button>
      <button class="m-tab" data-pane="upi"><i class="fas fa-mobile-alt"></i> UPI</button>
      <button class="m-tab" data-pane="qr"><i class="fas fa-qrcode"></i> QR Pay</button>
      <button class="m-tab" data-pane="wallet"><i class="fas fa-wallet"></i> Wallet</button>
    </div>

    <!-- CARD -->
    <div class="pane active" id="pane-card">
      <div class="card-brands">
        <i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i>
        <i class="fab fa-cc-amex"></i><i class="fab fa-cc-rupay"></i>
      </div>
      <div class="fg">
        <label>Card Number</label>
        <input id="iCN" maxlength="19" placeholder="1234  5678  9012  3456" autocomplete="cc-number">
        <div class="e-msg" id="eCN"></div>
      </div>
      <div class="fg">
        <label>Cardholder Name</label>
        <input id="iName" placeholder="JOHN DOE" autocomplete="cc-name">
        <div class="e-msg" id="eName"></div>
      </div>
      <div class="fg-2">
        <div class="fg">
          <label>Expiry (MM/YY)</label>
          <input id="iExp" maxlength="5" placeholder="MM/YY" autocomplete="cc-exp">
          <div class="e-msg" id="eExp"></div>
        </div>
        <div class="fg">
          <label>CVV / CVC</label>
          <input id="iCVV" type="password" maxlength="4" placeholder="•••" autocomplete="cc-csc">
          <div class="e-msg" id="eCVV"></div>
        </div>
      </div>
    </div>

    <!-- UPI -->
    <div class="pane" id="pane-upi">
      <div class="upi-apps">
        ${[
          {icon:'🇬',name:'Google Pay'},
          {icon:'📱',name:'PhonePe'},
          {icon:'💳',name:'Paytm'},
          {icon:'📦',name:'Amazon Pay'},
          {icon:'🇮🇳',name:'BHIM UPI'},
          {icon:'➕',name:'Other UPI'},
        ].map(u=>`<div class="upi-app" onclick="pickUPI(this,'${u.name}')"><div class="ua-icon">${u.icon}</div>${u.name}</div>`).join('')}
      </div>
      <label class="fg" style="margin-top:.5rem">
        <span style="display:block;font-family:var(--ff-mono);font-size:.68rem;letter-spacing:.12em;color:var(--ink3);text-transform:uppercase;margin-bottom:.4rem">Or enter UPI ID</span>
      </label>
      <div class="upi-manual">
        <input id="iUPI" placeholder="yourname@okhdfcbank" type="text">
        <button class="upi-verify" onclick="verifyUPI()">Verify</button>
      </div>
    </div>

    <!-- QR -->
    <div class="pane" id="pane-qr">
      <div class="qr-area">
        <div class="qr-img-wrap">
          <img src="https://api.qrserver.com/v1/create-qr-code/?size=170x170&color=0d0d1a&bgcolor=ffffff&data=${encodeURIComponent(`upi://pay?pa=cinemax@okhdfc&pn=CINEMAX&am=${bData.grand}&cu=INR`)}"
               alt="QR Code"
               onerror="this.parentElement.innerHTML='<div style=padding:1rem;text-align:center;color:#999;font-size:.75rem>Scan with UPI app</div>'">
        </div>
        <div class="qr-amt">₹${grand}</div>
        <div class="qr-hint">SCAN TO PAY · VALID FOR 10 MINUTES</div>
        <div class="qr-steps">
          <p><i class="fas fa-check-circle"></i> Open GPay, PhonePe, Paytm or any UPI app</p>
          <p><i class="fas fa-check-circle"></i> Tap "Scan QR" and point your camera</p>
          <p><i class="fas fa-check-circle"></i> Confirm ₹${grand} and tap Pay</p>
        </div>
      </div>
    </div>

    <!-- WALLET -->
    <div class="pane" id="pane-wallet">
      <div class="wallet-items">
        ${[
          {icon:'💳',name:'Paytm Wallet',   bal:'₹500'},
          {icon:'📱',name:'PhonePe Wallet', bal:'₹1,200'},
          {icon:'📦',name:'Amazon Pay',      bal:'₹350'},
          {icon:'🏦',name:'Mobikwik',        bal:'₹800'},
        ].map(w=>`<div class="wal-row" onclick="pickWallet(this,'${w.name}')"><div class="wal-ic">${w.icon}</div><div class="wal-name">${w.name}</div><div class="wal-bal">${w.bal}</div></div>`).join('')}
      </div>
    </div>

    <div class="pay-foot">
      <div class="ssl"><i class="fas fa-lock"></i> Razorpay · 100% Secure Payment</div>
      <button class="pay-btn" id="payBtn" onclick="processPayment()">
        <i class="fas fa-lock"></i> Pay ₹${grand}
      </button>
    </div>
  </div>
</div>`;
}

function initPayUI(){
  document.querySelectorAll('.m-tab').forEach(tab=>{
    tab.addEventListener('click',()=>{
      document.querySelectorAll('.m-tab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.pane').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`pane-${tab.dataset.pane}`).classList.add('active');
    });
  });
  // auto-format card number
  const cn=document.getElementById('iCN');
  if(cn) cn.addEventListener('input',e=>{
    let v=e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value=v.replace(/(.{4})/g,'$1  ').trim();
  });
  const ex=document.getElementById('iExp');
  if(ex) ex.addEventListener('input',e=>{
    let v=e.target.value.replace(/\D/g,'').slice(0,4);
    if(v.length>=3) v=v.slice(0,2)+'/'+v.slice(2);
    e.target.value=v;
  });
  const cv=document.getElementById('iCVV');
  if(cv) cv.addEventListener('input',e=>{ e.target.value=e.target.value.replace(/\D/g,'').slice(0,4); });
}

function pickUPI(el,name){ document.querySelectorAll('.upi-app').forEach(a=>a.classList.remove('sel')); el.classList.add('sel'); selUPI=name; }
function verifyUPI(){
  const v=(document.getElementById('iUPI')||{}).value||'';
  if(v&&v.includes('@')) showToast('✅',`UPI verified: ${v}`);
  else showToast('❌','Enter a valid UPI ID');
}
function pickWallet(el,name){ document.querySelectorAll('.wal-row').forEach(r=>r.classList.remove('sel')); el.classList.add('sel'); selWallet=name; }

function validateCard(){
  const fs=[
    {id:'iCN', eid:'eCN', fn:v=>v.replace(/\s/g,'').length===16, msg:'Enter valid 16-digit card number'},
    {id:'iName',eid:'eName',fn:v=>v.trim().length>=2, msg:'Enter cardholder name'},
    {id:'iExp', eid:'eExp', fn:v=>/^\d{2}\/\d{2}$/.test(v), msg:'Enter expiry as MM/YY'},
    {id:'iCVV', eid:'eCVV', fn:v=>v.length>=3, msg:'Enter 3 or 4 digit CVV'},
  ];
  let ok=true;
  fs.forEach(f=>{
    const el=document.getElementById(f.id), err=document.getElementById(f.eid);
    if(!el||!err) return;
    const v=f.fn(el.value);
    el.classList.toggle('err',!v); err.textContent=v?'':f.msg;
    if(!v) ok=false;
  });
  return ok;
}

function processPayment(){
  const activePane=document.querySelector('.m-tab.active').dataset.pane;
  if(activePane==='card'&&!validateCard()) return;
  if(activePane==='wallet'&&!selWallet){showToast('⚠️','Select a wallet first');return;}
  const btn=document.getElementById('payBtn');
  btn.innerHTML='<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled=true;
  // Simulate gateway response (2s)
  setTimeout(()=>{
    bData.bookingId='CX'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).substr(2,4).toUpperCase();
    bData.payMethod=activePane.toUpperCase();
    bData.payDate=new Date().toISOString();
    step=3; renderSteps(); showSuccess();
  },2000);
}

/* ═══════════════════════════════════
   STEP 3 — SUCCESS
═══════════════════════════════════ */
function showSuccess(){
  const {movie,seats,grand,bookingId,show}=bData;
  const date=new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const seatIds=seats.map(s=>s.id).join(', ');

  document.getElementById('modalTitle').textContent='Booking Confirmed';
  document.getElementById('modalEyebrow').textContent='BOOKING CONFIRMATION';
  document.getElementById('modalContent').innerHTML=`
  <div class="succ-view">
    <div class="succ-ring"><i class="fas fa-check"></i></div>
    <div class="succ-title">Payment <em>Successful!</em></div>
    <p class="succ-sub">Your tickets are confirmed. See you at the cinema! 🍿</p>
    <div class="e-ticket">
      <div class="et-head">
        <div class="et-brand">
          <h4>CINEMAX</h4>
          <p>E-Ticket · ${date} · ${show}</p>
        </div>
        <span class="et-confirmed">✔ CONFIRMED</span>
      </div>
      <div class="et-mid">
        <div class="et-movie">
          <h3>${movie.title}</h3>
          <p><i class="fas fa-clock"></i> ${movie.dur} &nbsp;|&nbsp; <i class="fas fa-language"></i> ${movie.lang}<br>
          <i class="fas fa-chair"></i> ${seatIds}<br>
          <i class="fas fa-desktop"></i> Screen 1 — Dolby Atmos</p>
        </div>
        <div class="et-count">
          <div class="et-count-num">${seats.length}</div>
          <div class="et-count-lbl">SEAT${seats.length>1?'S':''}</div>
        </div>
      </div>
      <div class="et-foot">
        <div class="et-amount">₹${grand}</div>
        <div class="et-bc">|||| ${bookingId.slice(-10)} ||||</div>
      </div>
    </div>
    <div class="bid-row">
      <span class="bid-lbl">BOOKING REF</span>
      <strong class="bid-val">${bookingId}</strong>
      <button class="cp-btn" onclick="copyBID('${bookingId}')"><i class="fas fa-copy"></i></button>
    </div>
    <div class="succ-btns">
      <button class="btn-outline" onclick="printTicket()"><i class="fas fa-print"></i> Print Ticket</button>
      <button class="btn-gold btn-sm" onclick="downloadTicket()"><i class="fas fa-download"></i> Download</button>
      <button class="btn-outline" onclick="closeModal()"><i class="fas fa-home"></i> Home</button>
    </div>
    <div class="cd-msg"><i class="fas fa-clock"></i>&nbsp; Closing in <span id="cdSec">10</span>s</div>
  </div>`;

  confetti();
  let sec=10;
  cdTimer=setInterval(()=>{
    sec--; const el=document.getElementById('cdSec'); if(el) el.textContent=sec;
    if(sec<=0){clearInterval(cdTimer);cdTimer=null;closeModal();}
  },1000);
}

function copyBID(id){
  navigator.clipboard.writeText(id).catch(()=>{
    const t=document.createElement('textarea');t.value=id;document.body.appendChild(t);t.select();document.execCommand('copy');document.body.removeChild(t);
  });
  showToast('✅','Booking ID copied!');
}

/* ═══════════════════════════════════
   PRINT TICKET
═══════════════════════════════════ */
function printTicket(){
  const {movie,seats,grand,bookingId,convFee,gst,ticketPrice,payMethod,payDate,show}=bData;
  const date=new Date(payDate||Date.now()).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});
  const byType={};
  seats.forEach(s=>{if(!byType[s.t])byType[s.t]=[];byType[s.t].push(s.id);});
  const seatRows=Object.entries(byType).map(([t,ids])=>{
    const up=t==='vip'?movie.price.vip:t==='prem'?movie.price.prem:movie.price.reg;
    return `<tr><td>${t.toUpperCase()} Seats</td><td>${ids.join(', ')}</td><td>${ids.length} × ₹${up}</td><td>₹${ids.length*up}</td></tr>`;
  }).join('');
  const chipColors={reg:'#2d6bc4',prem:'#b5730a',vip:'#c94b7a'};
  const seatChips=seats.map(s=>`<span style="display:inline-block;margin:3px;padding:4px 12px;border-radius:50px;background:${chipColors[s.t]};color:#fff;font-size:.75rem;font-weight:700">${s.id}</span>`).join('');

  const w=window.open('','_blank','width=820,height=750,scrollbars=yes');
  if(!w){showToast('⚠️','Pop-ups blocked — allow pop-ups for this site');return;}
  w.document.write(`<!DOCTYPE html>
<html><head><meta charset="UTF-8"><title>CINEMAX Ticket – ${movie.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,600;1,300&family=Inter:wght@400;500;600&family=Space+Mono&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Inter',sans-serif;background:#f0eee8;padding:24px;display:flex;justify-content:center;min-height:100vh;align-items:flex-start}
.ticket{max-width:740px;width:100%;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.15)}
.strip{height:7px;background:linear-gradient(90deg,#c9a84c,#e8c96a,#c94b7a,#c9a84c)}
.t-head{background:linear-gradient(135deg,#0d0d1a,#1a1828);padding:28px 32px;text-align:center;color:#fff}
.logo{font-family:'Space Mono',monospace;font-size:1.6rem;font-weight:700;letter-spacing:.2em;color:#e8c96a;margin-bottom:4px}
.t-head p{font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.2em;color:#8888a8;text-transform:uppercase}
.movie-bk{background:linear-gradient(135deg,#c9a84c,#e8c96a);border-radius:14px;padding:22px;margin:20px 24px;color:#000;position:relative;overflow:hidden}
.movie-bk::after{content:'🎬';position:absolute;right:-8px;bottom:-12px;font-size:80px;opacity:.08}
.movie-bk h1{font-family:'Cormorant Garamond',serif;font-size:1.85rem;font-weight:600;margin-bottom:8px}
.movie-bk p{font-size:.82rem;opacity:.8}
.info-g{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 24px 20px}
.ib{background:#f8f7f2;border-radius:10px;padding:12px}
.ib-l{font-family:'Space Mono',monospace;font-size:.6rem;letter-spacing:.12em;text-transform:uppercase;color:#94a3b8;margin-bottom:3px}
.ib-v{font-size:.92rem;font-weight:600;color:#0d0d1a}
.seats-s{margin:0 24px 20px;background:#f8f7f2;border-radius:12px;padding:16px}
.seats-s h3{font-family:'Space Mono',monospace;font-size:.7rem;letter-spacing:.12em;text-transform:uppercase;color:#c9a84c;margin-bottom:10px}
table{width:100%;border-collapse:collapse;margin:0 24px 20px;width:calc(100% - 48px)}
th{background:#f8f7f2;padding:10px;text-align:left;font-family:'Space Mono',monospace;font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;color:#64748b}
td{padding:9px 10px;border-bottom:1px solid #f1f5f9;font-size:.83rem;color:#0d0d1a}
.tr-tot td{font-weight:700;font-size:.95rem;color:#c9a84c;border-top:2px solid #e2e8f0;border-bottom:none}
.t-foot{background:#f8f7f2;padding:20px 28px;text-align:center;border-top:2px dashed #e2e8f0;position:relative}
.t-foot::before,.t-foot::after{content:'';position:absolute;width:20px;height:20px;background:#f0eee8;border-radius:50%;top:-10px}
.t-foot::before{left:-10px}.t-foot::after{right:-10px}
.bc{font-family:'Space Mono',monospace;font-size:1.45rem;letter-spacing:.18em;color:#c9a84c;margin:10px 0}
.ref{font-family:'Space Mono',monospace;font-size:.75rem;color:#64748b;margin-bottom:5px}
.thanks{font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:600;color:#0d0d1a;margin-bottom:4px}
.note{font-size:.7rem;color:#94a3b8;line-height:1.5}
.act{text-align:center;padding:16px;border-top:1px solid #f1f5f9}
.pbtn{background:linear-gradient(135deg,#c9a84c,#e8c96a);color:#000;border:none;padding:10px 28px;border-radius:50px;font-size:.88rem;font-weight:700;cursor:pointer;margin-right:8px;letter-spacing:.04em}
.cbtn{background:#f1f5f9;color:#64748b;border:none;padding:10px 20px;border-radius:50px;font-size:.88rem;font-weight:600;cursor:pointer}
@media print{body{background:#fff;padding:0}.ticket{box-shadow:none;border-radius:0}.act{display:none}.strip,.movie-bk{-webkit-print-color-adjust:exact;print-color-adjust:exact}}
</style></head><body>
<div class="ticket">
  <div class="strip"></div>
  <div class="t-head">
    <div class="logo">CINEMAX</div>
    <p>Premium Cinema Experience &nbsp;·&nbsp; Official E-Ticket</p>
  </div>
  <div class="movie-bk">
    <h1>${movie.title}</h1>
    <p>⏱ ${movie.dur} &nbsp;|&nbsp; 🌐 ${movie.lang} &nbsp;|&nbsp; ⭐ ${movie.rating}/10 &nbsp;|&nbsp; 🎭 ${movie.genre}</p>
  </div>
  <div class="info-g">
    <div class="ib"><div class="ib-l">Date</div><div class="ib-v">${date}</div></div>
    <div class="ib"><div class="ib-l">Show Time</div><div class="ib-v">${show}</div></div>
    <div class="ib"><div class="ib-l">Screen</div><div class="ib-v">Screen 1 · Dolby</div></div>
    <div class="ib"><div class="ib-l">Seats</div><div class="ib-v">${seats.length} Seat${seats.length>1?'s':''}</div></div>
    <div class="ib"><div class="ib-l">Payment</div><div class="ib-v">${payMethod||'CARD'}</div></div>
    <div class="ib"><div class="ib-l">Status</div><div class="ib-v" style="color:#10b981">✔ Confirmed</div></div>
  </div>
  <div class="seats-s">
    <h3>Your Seats</h3>
    <div>${seatChips}</div>
  </div>
  <table>
    <thead><tr><th>Category</th><th>Seats</th><th>Rate</th><th>Amount</th></tr></thead>
    <tbody>
      ${seatRows}
      <tr><td>Convenience Fee</td><td>—</td><td>${seats.length} × ₹5</td><td>₹${convFee}</td></tr>
      <tr><td>GST (18%)</td><td>—</td><td>—</td><td>₹${gst}</td></tr>
      <tr class="tr-tot"><td colspan="3">Total Paid</td><td>₹${grand}</td></tr>
    </tbody>
  </table>
  <div class="t-foot">
    <div class="thanks">Thank you for choosing CINEMAX</div>
    <div class="bc">|||| ${bookingId.slice(-10)} ||||</div>
    <div class="ref">Booking ID: ${bookingId}</div>
    <p class="note">Please arrive 15 minutes before show time. This e-ticket is your entry pass — no physical ticket required.<br>For assistance: support@cinemax.in &nbsp;|&nbsp; +91 98765 43210</p>
  </div>
  <div class="act">
    <button class="pbtn" onclick="window.print()">🖨 Print</button>
    <button class="cbtn" onclick="window.close()">✕ Close</button>
  </div>
</div>
<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),600));<\/script>
</body></html>`);
  w.document.close();
}

/* ═══════════════════════════════════
   DOWNLOAD TICKET
═══════════════════════════════════ */
function downloadTicket(){
  const {movie,seats,grand,bookingId,show}=bData;
  const blob=new Blob([`<!DOCTYPE html><html><head><meta charset="UTF-8"><title>CINEMAX – ${movie.title}</title></head><body style="font-family:Arial;max-width:600px;margin:2rem auto;padding:2rem;border:2px solid #c9a84c;border-radius:12px"><h1 style="color:#c9a84c">🎬 CINEMAX — E-Ticket</h1><hr><h2>${movie.title}</h2><p>${movie.dur} | ${movie.lang} | ⭐ ${movie.rating}</p><p><strong>Show:</strong> ${show}</p><p><strong>Seats:</strong> ${seats.map(s=>s.id).join(', ')}</p><p><strong>Total:</strong> ₹${grand}</p><p><strong>Booking ID:</strong> ${bookingId}</p><p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p><hr><p style="color:#888;font-size:.8rem">Arrive 15 min early. Enjoy the film!</p></body></html>`],{type:'text/html'});
  const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=`CINEMAX-${bookingId}.html`;a.click();URL.revokeObjectURL(a.href);
  showToast('✅','Ticket downloaded!');
}

/* ═══════════════════════════════════
   CONFETTI
═══════════════════════════════════ */
function confetti(){
  const box=document.getElementById('confBox'); box.innerHTML='';
  const cols=['#c9a84c','#e8c96a','#ec4899','#10b981','#3ecfcf','#fff','#8b5cf6'];
  for(let i=0;i<100;i++){
    const p=document.createElement('div');
    const sz=Math.random()*12+4;
    p.className='cp';
    p.style.cssText=`left:${Math.random()*100}%;width:${sz}px;height:${sz}px;background:${cols[~~(Math.random()*cols.length)]};border-radius:${Math.random()>.5?'50%':'3px'};animation-duration:${Math.random()*2.5+1.5}s;animation-delay:${Math.random()*.7}s;`;
    box.appendChild(p);
  }
  setTimeout(()=>box.innerHTML='',5000);
}

/* ═══════════════════════════════════
   TOAST
═══════════════════════════════════ */
function showToast(icon,msg){
  if(toastTimer) clearTimeout(toastTimer);
  const t=document.getElementById('toast');
  document.getElementById('toastIcon').textContent=icon;
  document.getElementById('toastMsg').textContent=msg;
  t.classList.add('show');
  toastTimer=setTimeout(()=>t.classList.remove('show'),3300);
}

/* ═══════════════════════════════════
   EXPERIENCE MODAL (ghost)
═══════════════════════════════════ */
function openExpModal(){
  document.getElementById('experience').scrollIntoView({behavior:'smooth'});
}

/* ═══════════════════════════════════
   INIT
═══════════════════════════════════ */
document.addEventListener('DOMContentLoaded',()=>{
  renderFilms();
  renderComing();
  renderOffers();
});