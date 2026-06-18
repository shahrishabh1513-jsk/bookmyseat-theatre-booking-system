/* =============================================================
   BOXOFFICE — script.js
   Full-featured cinema booking: 20 movies, seat selection,
   4 payment methods (Card / UPI / QR / Wallet), print ticket
   ============================================================= */

'use strict';

/* ───────────────────────────────────────────────
   DATA
─────────────────────────────────────────────── */
const MOVIES = [
  /* ── Bollywood ── */
  { id:1,  title:'Kantara',              genre:'Action/Drama',       lang:'Hindi',       dur:'2h 30m', rating:8.5, seats:45, cat:'bollywood',
    img:'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:2,  title:'Stree 3',              genre:'Horror/Comedy',      lang:'Hindi',       dur:'2h 10m', rating:8.1, seats:38, cat:'bollywood',
    img:'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:true  },
  { id:3,  title:'Animal Park',          genre:'Action/Thriller',    lang:'Hindi',       dur:'2h 45m', rating:7.9, seats:29, cat:'bollywood',
    img:'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:true  },
  { id:4,  title:'Jolly LLB 3',          genre:'Comedy/Drama',       lang:'Hindi',       dur:'2h 15m', rating:7.8, seats:52, cat:'bollywood',
    img:'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:5,  title:'Dunki 2',              genre:'Drama/Comedy',       lang:'Hindi',       dur:'2h 20m', rating:7.5, seats:61, cat:'bollywood',
    img:'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },

  /* ── Hollywood ── */
  { id:6,  title:'Dune: Part Two',       genre:'Sci-Fi/Action',      lang:'English',     dur:'2h 45m', rating:8.9, seats:63, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1506318137071-a8e063b4bec0?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:false },
  { id:7,  title:'Oppenheimer',          genre:'Biography/Thriller', lang:'English',     dur:'3h 00m', rating:9.2, seats:41, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1523207911345-32501502db22?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:false },
  { id:8,  title:'Final Destination 7',  genre:'Horror/Thriller',    lang:'English',     dur:'1h 54m', rating:8.3, seats:57, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1509347528160-9a9e33742cdb?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:true  },
  { id:9,  title:'Mission: Impossible 8',genre:'Action/Adventure',   lang:'English',     dur:'2h 43m', rating:8.7, seats:48, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:true  },
  { id:10, title:'Avatar 3',             genre:'Sci-Fi/Fantasy',     lang:'English',     dur:'3h 10m', rating:8.5, seats:35, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=400&h=560&fit=crop&q=80',
    price:{reg:250,prem:400,vip:600}, isNew:true  },
  { id:11, title:'Thor: New Era',        genre:'Action/Fantasy',     lang:'English',     dur:'2h 22m', rating:7.6, seats:44, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:true  },
  { id:12, title:'Spider-Man: Nexus',    genre:'Action/Superhero',   lang:'English',     dur:'2h 28m', rating:8.4, seats:50, cat:'hollywood',
    img:'https://images.unsplash.com/photo-1620336655052-b57986f5a26a?w=400&h=560&fit=crop&q=80',
    price:{reg:200,prem:350,vip:500}, isNew:true  },

  /* ── South Indian ── */
  { id:13, title:'KGF: Chapter 3',       genre:'Action',             lang:'Kannada',     dur:'2h 58m', rating:9.1, seats:52, cat:'south',
    img:'https://images.unsplash.com/photo-1604514628550-37477afdf4e3?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:true  },
  { id:14, title:'RRR 2',                genre:'Action/Drama',       lang:'Telugu',      dur:'3h 07m', rating:9.3, seats:44, cat:'south',
    img:'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:true  },
  { id:15, title:'Pushpa: The Rule',     genre:'Action/Drama',       lang:'Telugu',      dur:'3h 00m', rating:8.7, seats:40, cat:'south',
    img:'https://images.unsplash.com/photo-1547036967-23d11aacaee0?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:16, title:'Kalki 2898 AD',        genre:'Sci-Fi/Action',      lang:'Telugu',      dur:'2h 58m', rating:8.9, seats:33, cat:'south',
    img:'https://images.unsplash.com/photo-1518709911915-712d5fd04677?w=400&h=560&fit=crop&q=80',
    price:{reg:180,prem:280,vip:400}, isNew:true  },
  { id:17, title:'Vikram 2',             genre:'Action/Thriller',    lang:'Tamil',       dur:'2h 55m', rating:8.8, seats:36, cat:'south',
    img:'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:18, title:'Leo 2',                genre:'Action/Thriller',    lang:'Tamil',       dur:'2h 48m', rating:8.4, seats:55, cat:'south',
    img:'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:19, title:'Manjummel Boys 2',     genre:'Thriller/Drama',     lang:'Malayalam',   dur:'2h 25m', rating:8.6, seats:39, cat:'south',
    img:'https://images.unsplash.com/photo-1598899134739-24c46f58b8c0?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:false },
  { id:20, title:'Salaar 2',             genre:'Action',             lang:'Telugu',      dur:'2h 50m', rating:8.0, seats:50, cat:'south',
    img:'https://images.unsplash.com/photo-1536240478700-b869ad10e128?w=400&h=560&fit=crop&q=80',
    price:{reg:150,prem:250,vip:350}, isNew:true  },
];

const COMING = [
  { title:'Cars 4',            date:'Aug 2026', img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=300&h=420&fit=crop&q=80' },
  { title:'Border 2',          date:'Jan 2027', img:'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=420&fit=crop&q=80' },
  { title:'Harry Potter: Legacy',date:'Dec 2026',img:'https://images.unsplash.com/photo-1551269901-5c5e14c25df7?w=300&h=420&fit=crop&q=80' },
  { title:'Dhurandhar',         date:'Oct 2026', img:'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?w=300&h=420&fit=crop&q=80' },
  { title:'Baahubali 3',        date:'Nov 2026', img:'https://images.unsplash.com/photo-1585647347483-22b66260dfff?w=300&h=420&fit=crop&q=80' },
  { title:'Avengers: Doomsday', date:'May 2026', img:'https://images.unsplash.com/photo-1635805737707-575885ab0820?w=300&h=420&fit=crop&q=80' },
];

const OFFERS = [
  { icon:'fa-graduation-cap', title:'Student Special',  desc:'20% off on all shows with valid student ID. Applicable on weekdays.',   code:'STUDENT20' },
  { icon:'fa-calendar-week',  title:'Weekend Bliss',    desc:'Buy 2 get 1 free on weekend screenings. Valid Sat–Sun only.',           code:'WEEKEND3'  },
  { icon:'fa-credit-card',    title:'Card Rewards',     desc:'15% cashback on HDFC & ICICI credit and debit cards.',                  code:'CASHBACK15'},
  { icon:'fa-users',          title:'Group Booking',    desc:'Book 5+ seats and get ₹50 off per ticket. Perfect for outings!',       code:'GROUP50'   },
  { icon:'fa-birthday-cake',  title:'Birthday Treat',   desc:'Free popcorn combo on your birthday. Show your ID at the counter.',    code:'BDAY2026'  },
  { icon:'fa-sun',            title:'Morning Show',     desc:'Flat 30% off on all shows before 12 PM every day of the week.',        code:'EARLYBIRD' },
];

const MARQUEE_ITEMS = [
  '🎬 4K Dolby Vision', '🔊 Dolby Atmos Sound', '💺 Luxury Recliner Seats',
  '🎟️ Instant E-Tickets', '🍿 Premium Concessions', '⭐ 20+ Movies Now Showing',
  '🏆 Award-Winning Films', '🌟 VIP Experience', '📱 Book on Any Device',
];

const SEAT_ROWS  = ['A','B','C','D','E','F','G','H','I'];
const SEATS_PER  = 12;

/* ───────────────────────────────────────────────
   STATE
─────────────────────────────────────────────── */
let selMovie    = null;
let selSeats    = [];
let bookedSeats = [];
let step        = 1;   // 1=seats 2=payment 3=success
let bData       = {};  // booking data passed through steps
let cdTimer     = null;
let selUPI      = '';
let selWallet   = '';

/* ───────────────────────────────────────────────
   PARTICLES
─────────────────────────────────────────────── */
(function initParticles(){
  const canvas = document.getElementById('particles');
  const ctx    = canvas.getContext('2d');
  let W, H, pts = [];

  function resize(){ W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
  resize();
  window.addEventListener('resize', resize);

  for(let i=0;i<90;i++) pts.push({
    x: Math.random()*2000, y: Math.random()*1200,
    r: Math.random()*2+.4, a: Math.random()*.45,
    s: Math.random()*.38+.1, hue: Math.random()<.5?275:320
  });

  (function draw(){
    ctx.clearRect(0,0,W,H);
    pts.forEach(p=>{
      p.y -= p.s;
      if(p.y < -4){ p.y = H+4; p.x = Math.random()*W; }
      ctx.beginPath();
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fillStyle = `hsla(${p.hue},70%,70%,${p.a})`;
      ctx.fill();
    });
    requestAnimationFrame(draw);
  })();
})();

/* ───────────────────────────────────────────────
   NAVBAR
─────────────────────────────────────────────── */
window.addEventListener('scroll', ()=>{
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  // highlight active nav link
  document.querySelectorAll('.nav-links a').forEach(a=>{
    const sec = document.querySelector(a.getAttribute('href'));
    if(sec){
      const r = sec.getBoundingClientRect();
      a.classList.toggle('active', r.top <= 90 && r.bottom > 90);
    }
  });
});

document.getElementById('hamburger').addEventListener('click', function(){
  this.classList.toggle('open');
  document.getElementById('mobileNav').classList.toggle('open');
});

function closeMobile(){
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileNav').classList.remove('open');
}

function scrollToSection(id){
  const el = document.getElementById(id);
  if(el) el.scrollIntoView({behavior:'smooth'});
}

/* ───────────────────────────────────────────────
   SMOOTH ANCHOR LINKS
─────────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const target = document.querySelector(a.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
  });
});

/* ───────────────────────────────────────────────
   MARQUEE
─────────────────────────────────────────────── */
(function buildMarquee(){
  const t   = document.getElementById('marqueeTrack');
  const all = [...MARQUEE_ITEMS,...MARQUEE_ITEMS,...MARQUEE_ITEMS];
  t.innerHTML = all.map(i=>`<span class="m-item"><i class="fas fa-circle" style="font-size:.4rem"></i>${i}</span>`).join('');
})();

/* ───────────────────────────────────────────────
   REVEAL ON SCROLL
─────────────────────────────────────────────── */
const revObs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('visible'); });
},{ threshold:.12 });
document.querySelectorAll('.reveal').forEach(el=>revObs.observe(el));

/* ───────────────────────────────────────────────
   RENDER MOVIES
─────────────────────────────────────────────── */
function renderMovies(cat='all'){
  const grid = document.getElementById('movieGrid');
  grid.innerHTML = '';
  const list = cat==='all' ? MOVIES : MOVIES.filter(m=>m.cat===cat);
  list.forEach((m,i)=>{
    const pct = Math.min(100, Math.round((m.seats/80)*100));
    const card = document.createElement('div');
    card.className = 'movie-card reveal';
    card.style.transitionDelay = `${i*40}ms`;
    card.innerHTML = `
      <div class="poster">
        <img src="${m.img}" alt="${m.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/400x560/13132b/8b5cf6?text=${encodeURIComponent(m.title)}'">
        <div class="poster-overlay">
          <div class="play-btn"><i class="fas fa-play"></i></div>
          <button class="overlay-book" onclick="openBooking(${m.id});event.stopPropagation()">Book Now</button>
        </div>
        <div class="movie-badges">
          <span class="badge badge-rating"><i class="fas fa-star"></i> ${m.rating}</span>
          <span class="badge badge-lang">${m.lang}</span>
          ${m.isNew ? '<span class="badge badge-new">NEW</span>' : ''}
        </div>
      </div>
      <div class="card-body">
        <div class="movie-title">${m.title}</div>
        <div class="movie-meta">
          <span><i class="fas fa-clock"></i> ${m.dur}</span>
          <span><i class="fas fa-film"></i> ${m.genre.split('/')[0]}</span>
        </div>
        <span class="movie-genre">${m.genre}</span>
        <div class="avail-bar"><div class="avail-fill" style="width:${pct}%"></div></div>
        <div class="avail-text"><strong>${m.seats}</strong> seats available</div>
        <button class="card-book-btn" onclick="openBooking(${m.id})">
          <i class="fas fa-ticket-alt"></i> Book Tickets
        </button>
      </div>`;
    grid.appendChild(card);
    revObs.observe(card);
  });
}

/* Filter tabs */
document.getElementById('filters').addEventListener('click', e=>{
  const btn = e.target.closest('.filter-btn');
  if(!btn) return;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  renderMovies(btn.dataset.cat);
});

/* ───────────────────────────────────────────────
   RENDER COMING SOON
─────────────────────────────────────────────── */
function renderComing(){
  const grid = document.getElementById('comingGrid');
  COMING.forEach(m=>{
    const c = document.createElement('div');
    c.className = 'coming-card reveal';
    c.innerHTML = `
      <div class="coming-poster">
        <img src="${m.img}" alt="${m.title}" loading="lazy"
             onerror="this.src='https://via.placeholder.com/300x420/13132b/8b5cf6?text=${encodeURIComponent(m.title)}'">
        <div class="coming-overlay"></div>
      </div>
      <div class="coming-body">
        <h4>${m.title}</h4>
        <div class="coming-date"><i class="fas fa-calendar-alt"></i> ${m.date}</div>
        <span class="soon-badge">Coming Soon</span>
      </div>`;
    grid.appendChild(c);
    revObs.observe(c);
  });
}

/* ───────────────────────────────────────────────
   RENDER OFFERS
─────────────────────────────────────────────── */
function renderOffers(){
  const grid = document.getElementById('offersGrid');
  OFFERS.forEach(o=>{
    const c = document.createElement('div');
    c.className = 'offer-card reveal';
    c.innerHTML = `
      <div class="offer-icon"><i class="fas ${o.icon}"></i></div>
      <h3>${o.title}</h3>
      <p>${o.desc}</p>
      <span class="offer-code">${o.code}</span>`;
    grid.appendChild(c);
    revObs.observe(c);
  });
}

/* ───────────────────────────────────────────────
   MODAL HELPERS
─────────────────────────────────────────────── */
function openModal(title, html){
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML    = html;
  document.getElementById('overlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  document.getElementById('overlay').classList.remove('open');
  document.body.style.overflow = '';
  if(cdTimer){ clearInterval(cdTimer); cdTimer=null; }
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('overlay').addEventListener('click', e=>{
  if(e.target === document.getElementById('overlay')) closeModal();
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ───────────────────────────────────────────────
   PROGRESS BAR HTML
─────────────────────────────────────────────── */
function progressHTML(){
  const s = step;
  const stepInfo = [
    { label:'Select Seats' },
    { label:'Payment'      },
    { label:'Confirm'      },
  ];
  let html = '<div class="progress">';
  stepInfo.forEach((si,i)=>{
    const n    = i+1;
    const done = s > n;
    const act  = s === n;
    html += `
      <div class="prog-step ${act?'active':''} ${done?'done':''}">
        <div class="prog-num">${done?'<i class="fas fa-check"></i>':n}</div>
        <div class="prog-label">${si.label}</div>
      </div>`;
    if(i < stepInfo.length-1)
      html += `<div class="prog-line ${done?'done':''}"></div>`;
  });
  html += '</div>';
  return html;
}

/* ───────────────────────────────────────────────
   STEP 1 — SEAT SELECTION
─────────────────────────────────────────────── */
function openBooking(id){
  selMovie    = MOVIES.find(m=>m.id===id);
  selSeats    = [];
  bookedSeats = genBooked();
  step        = 1;
  openModal(`🎬 ${selMovie.title}`, buildSeatsHTML());
  renderSeats();
}

function genBooked(){
  const arr = [], count = Math.floor(Math.random()*28)+12;
  while(arr.length < count){
    const r = SEAT_ROWS[Math.floor(Math.random()*SEAT_ROWS.length)];
    const n = Math.floor(Math.random()*SEATS_PER)+1;
    const id= `${r}${n}`;
    if(!arr.includes(id)) arr.push(id);
  }
  return arr;
}

function seatMeta(row){
  if(['A','B','C'].includes(row)) return { type:'reg',  label:'Regular', price:selMovie.price.reg  };
  if(['D','E','F'].includes(row)) return { type:'prem', label:'Premium', price:selMovie.price.prem };
  return                                 { type:'vip',  label:'VIP',     price:selMovie.price.vip  };
}

function buildSeatsHTML(){
  const m = selMovie;
  return `
  ${progressHTML()}
  <div class="seat-section">
    <!-- movie banner -->
    <div style="display:flex;gap:1rem;padding:1rem;background:rgba(255,255,255,.02);border-radius:16px;margin-bottom:1.5rem;border:1px solid var(--border)">
      <img src="${m.img}" alt="${m.title}" style="width:64px;height:64px;border-radius:10px;object-fit:cover;flex-shrink:0"
           onerror="this.src='https://via.placeholder.com/64/13132b/8b5cf6?text=🎬'">
      <div>
        <div style="font-weight:700;font-size:1.05rem;margin-bottom:.3rem">${m.title}</div>
        <div style="font-size:.78rem;color:var(--t2)"><i class="fas fa-clock"></i> ${m.dur} &nbsp;|&nbsp; <i class="fas fa-language"></i> ${m.lang} &nbsp;|&nbsp; <i class="fas fa-star" style="color:var(--gold)"></i> ${m.rating}</div>
        <div style="font-size:.75rem;color:var(--t3);margin-top:.25rem">Select up to 10 seats</div>
      </div>
    </div>

    <!-- screen -->
    <div class="screen-wrap"><div class="screen-el">▬ &nbsp; S C R E E N &nbsp; ▬</div></div>

    <!-- legend -->
    <div class="seat-legend">
      <div class="leg"><div class="leg-box" style="background:#3b82f6"></div>Regular ₹${m.price.reg}</div>
      <div class="leg"><div class="leg-box" style="background:#d97706"></div>Premium ₹${m.price.prem}</div>
      <div class="leg"><div class="leg-box" style="background:#ec4899"></div>VIP ₹${m.price.vip}</div>
      <div class="leg"><div class="leg-box" style="background:var(--green)"></div>Selected</div>
      <div class="leg"><div class="leg-box" style="background:#374151;opacity:.5"></div>Booked</div>
    </div>

    <!-- seats -->
    <div class="seats-scroll">
      <div class="seats-grid" id="seatsGrid"></div>
    </div>

    <!-- booking bar -->
    <div class="booking-bar">
      <div class="sel-info">
        <h4>Selected Seats</h4>
        <div class="sel-tags" id="selTags"><span style="color:var(--t3);font-size:.8rem">None selected yet</span></div>
      </div>
      <div class="price-sum">
        <div class="lbl">Total</div>
        <div class="val" id="totalVal">₹0</div>
      </div>
      <button class="proceed-btn" id="proceedBtn" disabled onclick="goToPayment()">
        Proceed to Pay <i class="fas fa-arrow-right"></i>
      </button>
    </div>
  </div>`;
}

function renderSeats(){
  const grid = document.getElementById('seatsGrid');
  SEAT_ROWS.forEach(row=>{
    const rowDiv = document.createElement('div');
    rowDiv.className = 'seat-row';
    const lbl = document.createElement('div');
    lbl.className = 'row-lbl'; lbl.textContent = row;
    rowDiv.appendChild(lbl);

    const { type } = seatMeta(row);
    for(let i=1;i<=SEATS_PER;i++){
      if(i===7){ const g=document.createElement('div'); g.className='seat-gap'; rowDiv.appendChild(g); }
      const s  = document.createElement('div');
      const id = `${row}${i}`;
      s.className = `seat ${type}`;
      s.textContent = i;
      s.dataset.id  = id;
      s.dataset.row = row;
      if(bookedSeats.includes(id)) s.classList.add('booked');
      s.addEventListener('click', handleSeat);
      rowDiv.appendChild(s);
    }
    grid.appendChild(rowDiv);
  });
}

function handleSeat(e){
  const s  = e.currentTarget;
  if(s.classList.contains('booked')) return;
  const id = s.dataset.id, row = s.dataset.row;
  const {type, label, price} = seatMeta(row);

  if(s.classList.contains('sel')){
    s.classList.remove('sel');
    selSeats = selSeats.filter(x=>x.id!==id);
  } else {
    if(selSeats.length>=10){ showToast('⚠️','Maximum 10 seats per booking'); return; }
    s.classList.add('sel');
    selSeats.push({id, row, type, label, price});
  }
  updateSeatBar();
}

function updateSeatBar(){
  const total = selSeats.reduce((a,s)=>a+s.price,0);
  const tags  = document.getElementById('selTags');
  const tv    = document.getElementById('totalVal');
  const btn   = document.getElementById('proceedBtn');
  if(!tags) return;

  tags.innerHTML = selSeats.length
    ? selSeats.map(s=>`<span class="stag ${s.type}">${s.id}</span>`).join('')
    : '<span style="color:var(--t3);font-size:.8rem">None selected yet</span>';
  tv.textContent   = `₹${total}`;
  btn.disabled     = selSeats.length === 0;
}

/* ───────────────────────────────────────────────
   STEP 2 — PAYMENT
─────────────────────────────────────────────── */
function goToPayment(){
  const ticketPrice = selSeats.reduce((a,s)=>a+s.price,0);
  const convFee     = selSeats.length * 5;
  const subtotal    = ticketPrice + convFee;
  const gst         = +(subtotal * 0.18).toFixed(2);
  const grand       = +(subtotal + gst).toFixed(2);
  bData = { movie:selMovie, seats:selSeats, ticketPrice, convFee, gst, grand };
  step  = 2;
  openModal('💳 Complete Payment', buildPaymentHTML());
  initPaymentUI();
}

function buildPaymentHTML(){
  const {movie,seats,ticketPrice,convFee,gst,grand} = bData;
  const byType = {};
  seats.forEach(s=>{ if(!byType[s.type]) byType[s.type]=[]; byType[s.type].push(s.id); });
  const chips = Object.entries(byType)
    .map(([t,ids])=>`<span class="stag ${t}">${t.toUpperCase()}: ${ids.join(', ')}</span>`).join('');

  return `
  ${progressHTML()}
  <div class="pay-grid">

    <!-- LEFT: summary -->
    <div class="pay-summary">
      <div class="mov-row">
        <img src="${movie.img}" alt="${movie.title}"
             onerror="this.src='https://via.placeholder.com/70/13132b/8b5cf6?text=🎬'">
        <div class="mov-info">
          <h3>${movie.title}</h3>
          <p><i class="fas fa-clock"></i> ${movie.dur}</p>
          <p><i class="fas fa-language"></i> ${movie.lang}</p>
        </div>
      </div>
      <div class="seat-preview">
        <div class="lbl" style="font-size:.8rem;color:var(--t2);margin-bottom:.5rem"><i class="fas fa-chair"></i> Selected Seats</div>
        <div class="seat-chips">${chips}</div>
      </div>
      <div class="price-breakdown">
        <div class="pr"><span>Ticket Price</span><span>₹${ticketPrice}</span></div>
        <div class="pr"><span>Convenience Fee (${seats.length}×₹5)</span><span>₹${convFee}</span></div>
        <div class="pr"><span>GST 18%</span><span>₹${gst}</span></div>
        <div class="pr total"><span>Grand Total</span><span>₹${grand}</span></div>
      </div>
      <div class="savings-row">
        <i class="fas fa-gift"></i>
        <div>
          <strong>You saved ₹${(convFee*0.1).toFixed(0)}!</strong><br>
          <span style="font-size:.78rem;color:var(--t2)">Membership discount applied</span>
        </div>
      </div>
    </div>

    <!-- RIGHT: payment methods -->
    <div class="pay-panel">
      <div class="pay-panel-head">
        <h3>Payment Methods</h3>
        <p>Secured by 256-bit SSL encryption <i class="fas fa-lock" style="color:var(--green)"></i></p>
      </div>

      <!-- tabs -->
      <div class="pay-tabs">
        <button class="ptab active" data-tab="card"><i class="fas fa-credit-card"></i> Card</button>
        <button class="ptab"        data-tab="upi" ><i class="fas fa-mobile-alt"></i> UPI</button>
        <button class="ptab"        data-tab="qr"  ><i class="fas fa-qrcode"></i> QR</button>
        <button class="ptab"        data-tab="wallet"><i class="fas fa-wallet"></i> Wallet</button>
      </div>

      <!-- CARD pane -->
      <div class="tab-pane active" id="pane-card">
        <div class="card-logos">
          <i class="fab fa-cc-visa"></i><i class="fab fa-cc-mastercard"></i>
          <i class="fab fa-cc-amex"></i><i class="fab fa-cc-discover"></i>
        </div>
        <div class="fg">
          <label><i class="fas fa-credit-card"></i> Card Number</label>
          <input id="iCardNum" maxlength="19" placeholder="1234  5678  9012  3456">
          <div class="err-msg" id="eCardNum"></div>
        </div>
        <div class="fg">
          <label><i class="fas fa-user"></i> Cardholder Name</label>
          <input id="iCardName" placeholder="JOHN DOE">
          <div class="err-msg" id="eCardName"></div>
        </div>
        <div class="fg-row">
          <div class="fg">
            <label><i class="fas fa-calendar"></i> Expiry (MM/YY)</label>
            <input id="iExpiry" maxlength="5" placeholder="MM/YY">
            <div class="err-msg" id="eExpiry"></div>
          </div>
          <div class="fg">
            <label><i class="fas fa-lock"></i> CVV</label>
            <input id="iCvv" type="password" maxlength="3" placeholder="•••">
            <div class="err-msg" id="eCvv"></div>
          </div>
        </div>
      </div>

      <!-- UPI pane -->
      <div class="tab-pane" id="pane-upi">
        <div class="upi-grid">
          ${[
            {icon:'🅶',name:'Google Pay'},
            {icon:'📱',name:'PhonePe'},
            {icon:'💳',name:'Paytm'},
            {icon:'📦',name:'Amazon Pay'},
            {icon:'🇮🇳',name:'BHIM UPI'},
            {icon:'➕',name:'Other UPI'},
          ].map(u=>`
            <div class="upi-opt" onclick="pickUPI(this,'${u.name}')">
              <div class="upi-icon">${u.icon}</div>${u.name}
            </div>`).join('')}
        </div>
        <label style="font-size:.8rem;color:var(--t2);display:block;margin-bottom:.45rem">Or enter UPI ID manually</label>
        <div class="upi-id-row">
          <input id="iUpiId" placeholder="yourname@okhdfcbank">
          <button class="upi-verify" onclick="verifyUPI()">Verify</button>
        </div>
      </div>

      <!-- QR pane -->
      <div class="tab-pane" id="pane-qr">
        <div class="qr-area">
          <div class="qr-box">
            <img src="https://api.qrserver.com/v1/create-qr-code/?size=175x175&color=7c3aed&bgcolor=ffffff&data=${encodeURIComponent(`upi://pay?pa=boxoffice@okhdfc&pn=BOXOFFICE&am=${bData.grand}&cu=INR`)}"
                 alt="QR Code"
                 onerror="this.parentElement.innerHTML='<div style=padding:1.5rem;text-align:center;color:#555;font-size:.75rem>QR not available.<br>Use another method.</div>'">
          </div>
          <p class="qr-hint">Scan with any UPI app &nbsp;•&nbsp; Amount: <strong>₹${grand}</strong></p>
          <div class="qr-steps">
            <p><i class="fas fa-check-circle"></i> Open any UPI app (GPay, PhonePe, Paytm…)</p>
            <p><i class="fas fa-check-circle"></i> Tap "Scan QR" and point camera at the code</p>
            <p><i class="fas fa-check-circle"></i> Verify amount ₹${grand} and confirm payment</p>
          </div>
        </div>
      </div>

      <!-- WALLET pane -->
      <div class="tab-pane" id="pane-wallet">
        <div class="wallet-list">
          ${[
            {icon:'💳',name:'Paytm Wallet',   bal:'₹500'},
            {icon:'📱',name:'PhonePe Wallet', bal:'₹1,200'},
            {icon:'📦',name:'Amazon Pay',      bal:'₹350'},
            {icon:'🏦',name:'Mobikwik',        bal:'₹750'},
          ].map(w=>`
            <div class="wallet-row" onclick="pickWallet(this,'${w.name}')">
              <div class="wicon">${w.icon}</div>
              <div class="wname">${w.name}</div>
              <div class="wbal">${w.bal}</div>
            </div>`).join('')}
        </div>
      </div>

      <!-- footer -->
      <div class="pay-foot">
        <div class="ssl-badge"><i class="fas fa-shield-alt"></i> 100% Secure &amp; Encrypted</div>
        <button class="pay-now" id="payNowBtn" onclick="processPayment()">
          <i class="fas fa-lock"></i> Pay ₹${grand}
        </button>
      </div>
    </div><!-- /pay-panel -->
  </div><!-- /pay-grid -->`;
}

function initPaymentUI(){
  // Tab switching
  document.querySelectorAll('.ptab').forEach(tab=>{
    tab.addEventListener('click', ()=>{
      document.querySelectorAll('.ptab').forEach(t=>t.classList.remove('active'));
      document.querySelectorAll('.tab-pane').forEach(p=>p.classList.remove('active'));
      tab.classList.add('active');
      document.getElementById(`pane-${tab.dataset.tab}`).classList.add('active');
    });
  });

  // Card number auto-spacing
  const cn = document.getElementById('iCardNum');
  if(cn) cn.addEventListener('input', e=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,16);
    e.target.value = v.replace(/(.{4})/g,'$1  ').trim();
  });
  // Expiry auto-slash
  const ex = document.getElementById('iExpiry');
  if(ex) ex.addEventListener('input', e=>{
    let v = e.target.value.replace(/\D/g,'').slice(0,4);
    if(v.length>=3) v = v.slice(0,2)+'/'+v.slice(2);
    e.target.value = v;
  });
  // CVV digits only
  const cv = document.getElementById('iCvv');
  if(cv) cv.addEventListener('input', e=>{ e.target.value = e.target.value.replace(/\D/g,'').slice(0,3); });
}

function pickUPI(el, name){
  document.querySelectorAll('.upi-opt').forEach(o=>o.classList.remove('sel'));
  el.classList.add('sel'); selUPI = name;
}
function verifyUPI(){
  const v = (document.getElementById('iUpiId')||{}).value||'';
  if(v && v.includes('@')) showToast('✅', `UPI ID verified: ${v}`);
  else showToast('❌', 'Enter a valid UPI ID (e.g. name@bank)');
}
function pickWallet(el, name){
  document.querySelectorAll('.wallet-row').forEach(r=>r.classList.remove('sel'));
  el.classList.add('sel'); selWallet = name;
}

/* ── Card validation ── */
function validateCard(){
  const fields = [
    { id:'iCardNum',  eid:'eCardNum',  check: v=>v.replace(/\s/g,'').length===16, msg:'Enter valid 16-digit card number'  },
    { id:'iCardName', eid:'eCardName', check: v=>v.trim().length>=2,              msg:'Enter cardholder name'               },
    { id:'iExpiry',   eid:'eExpiry',   check: v=>/^\d{2}\/\d{2}$/.test(v),       msg:'Enter expiry as MM/YY'               },
    { id:'iCvv',      eid:'eCvv',      check: v=>v.length===3,                    msg:'Enter 3-digit CVV'                   },
  ];
  let ok = true;
  fields.forEach(f=>{
    const el  = document.getElementById(f.id);
    const err = document.getElementById(f.eid);
    if(!el||!err) return;
    const valid = f.check(el.value);
    el.classList.toggle('err', !valid);
    err.textContent = valid ? '' : f.msg;
    if(!valid) ok = false;
  });
  return ok;
}

function processPayment(){
  const activeTab = document.querySelector('.ptab.active').dataset.tab;
  if(activeTab==='card' && !validateCard()) return;
  if(activeTab==='wallet' && !selWallet){ showToast('⚠️','Please select a wallet'); return; }

  const btn = document.getElementById('payNowBtn');
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing…';
  btn.disabled  = true;

  setTimeout(()=>{
    bData.bookingId  = 'BOX'+Date.now().toString(36).toUpperCase()+Math.random().toString(36).substr(2,5).toUpperCase();
    bData.payMethod  = activeTab.toUpperCase();
    bData.payDate    = new Date().toISOString();
    step = 3;
    showSuccess();
  }, 2000);
}

/* ───────────────────────────────────────────────
   STEP 3 — SUCCESS
─────────────────────────────────────────────── */
function showSuccess(){
  const {movie,seats,grand,bookingId} = bData;
  const date   = new Date().toLocaleDateString('en-IN',{day:'numeric',month:'short',year:'numeric'});
  const seatIds = seats.map(s=>s.id).join(', ');

  openModal('🎉 Booking Confirmed!', `
  ${progressHTML()}
  <div class="success-view">
    <div class="check-circle"><i class="fas fa-check"></i></div>
    <div class="success-title">Payment <span style="background:var(--g1);-webkit-background-clip:text;background-clip:text;color:transparent">Successful!</span></div>
    <p class="success-sub">Your tickets are confirmed. Enjoy the show! 🍿</p>

    <!-- e-ticket -->
    <div class="e-ticket">
      <div class="ticket-top">
        <div class="ticket-brand">
          <h3>🎬 BOXOFFICE</h3>
          <p>E-Ticket &nbsp;•&nbsp; ${date}</p>
        </div>
        <span class="e-badge">✔ CONFIRMED</span>
      </div>
      <div class="ticket-mid">
        <div class="ticket-movie">
          <h2>${movie.title}</h2>
          <p><i class="fas fa-clock"></i> ${movie.dur} &nbsp;|&nbsp; <i class="fas fa-language"></i> ${movie.lang} &nbsp;|&nbsp; <i class="fas fa-star"></i> ${movie.rating}</p>
          <p style="margin-top:.35rem"><i class="fas fa-chair"></i> ${seatIds}</p>
        </div>
        <div class="ticket-seats">
          <div class="seats-count">${seats.length}</div>
          <div class="seats-lbl">SEAT${seats.length>1?'S':''}</div>
        </div>
      </div>
      <div class="ticket-bottom">
        <div class="ticket-amount">₹${grand}</div>
        <div class="ticket-bc">|||| ${bookingId.slice(-8)} ||||</div>
      </div>
    </div>

    <!-- booking ID row -->
    <div class="bid-row">
      <span class="bid-lbl">Booking ID:</span>
      <strong class="bid-val">${bookingId}</strong>
      <button class="copy-btn" onclick="copyBID('${bookingId}')"><i class="fas fa-copy"></i></button>
    </div>

    <!-- action buttons -->
    <div class="succ-btns">
      <button class="btn-outline btn-sm" onclick="printTicket()"><i class="fas fa-print"></i> Print Ticket</button>
      <button class="btn-primary btn-sm" onclick="downloadTicket()"><i class="fas fa-download"></i> Download</button>
      <button class="btn-outline btn-sm" onclick="closeModal()"><i class="fas fa-home"></i> Back to Home</button>
    </div>
    <div class="cd-msg"><i class="fas fa-clock"></i> Auto-closing in <span id="cdSec">10</span>s</div>
  </div>`);

  launchConfetti();
  let sec = 10;
  cdTimer = setInterval(()=>{
    sec--;
    const el = document.getElementById('cdSec');
    if(el) el.textContent = sec;
    if(sec<=0){ clearInterval(cdTimer); cdTimer=null; closeModal(); }
  },1000);
}

function copyBID(id){
  const fallback = ()=>{
    const t = document.createElement('textarea');
    t.value = id; document.body.appendChild(t); t.select();
    document.execCommand('copy'); document.body.removeChild(t);
  };
  if(navigator.clipboard) navigator.clipboard.writeText(id).catch(fallback);
  else fallback();
  showToast('✅','Booking ID copied!');
}

/* ───────────────────────────────────────────────
   PRINT TICKET
─────────────────────────────────────────────── */
function printTicket(){
  const {movie,seats,grand,bookingId,convFee,gst,ticketPrice,payMethod,payDate} = bData;
  const date = new Date(payDate||Date.now()).toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'});

  /* group seats by type */
  const byType = {};
  seats.forEach(s=>{ if(!byType[s.type]) byType[s.type]=[]; byType[s.type].push(s.id); });

  const seatRows = Object.entries(byType).map(([t,ids])=>{
    const unitPrice = t==='vip'?movie.price.vip : t==='prem'?movie.price.prem : movie.price.reg;
    return `<tr>
      <td>${t.toUpperCase()} Seats</td>
      <td>${ids.join(', ')}</td>
      <td>${ids.length} × ₹${unitPrice}</td>
      <td>₹${ids.length*unitPrice}</td>
    </tr>`;
  }).join('');

  const chipColors = {reg:'#3b82f6', prem:'#d97706', vip:'#ec4899'};
  const seatChips  = seats.map(s=>`<span style="display:inline-block;margin:3px;padding:4px 12px;border-radius:50px;background:${chipColors[s.type]};color:#fff;font-size:.78rem;font-weight:700">${s.id}</span>`).join('');

  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>BOXOFFICE Ticket – ${movie.title}</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  *{margin:0;padding:0;box-sizing:border-box}
  body{font-family:'Space Grotesk',Arial,sans-serif;background:#eef0f8;padding:24px;display:flex;justify-content:center}
  .ticket{max-width:720px;width:100%;background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,.18)}
  .strip{height:8px;background:linear-gradient(90deg,#7c3aed,#a855f7,#ec4899,#f59e0b)}
  /* header */
  .t-head{background:linear-gradient(135deg,#1a1a3e,#2d2d60);color:#fff;padding:28px 32px;text-align:center}
  .t-logo{font-size:1.9rem;font-weight:700;letter-spacing:-1px;margin-bottom:4px}
  .t-logo span{color:#a855f7}
  .t-sub{font-size:.72rem;letter-spacing:3px;opacity:.55;text-transform:uppercase}
  /* movie banner */
  .movie-banner{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;padding:22px 28px;margin:20px;border-radius:14px;position:relative;overflow:hidden}
  .movie-banner::after{content:'🎬';position:absolute;right:-10px;bottom:-18px;font-size:95px;opacity:.08}
  .movie-banner h1{font-size:1.75rem;font-weight:700;margin-bottom:8px}
  .movie-banner p{font-size:.84rem;opacity:.88}
  /* info grid */
  .info-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;margin:0 20px 20px}
  .ib{background:#f5f5fb;border-radius:10px;padding:12px}
  .ib-lbl{font-size:.65rem;color:#94a3b8;text-transform:uppercase;letter-spacing:1px;margin-bottom:3px}
  .ib-val{font-size:.95rem;font-weight:700;color:#1a1a2e}
  /* seats */
  .seats-sec{margin:0 20px 20px;background:#f5f5fb;border-radius:14px;padding:16px}
  .seats-sec h3{font-size:.92rem;font-weight:700;color:#1a1a2e;margin-bottom:10px;display:flex;align-items:center;gap:.4rem}
  .seat-chips{display:flex;flex-wrap:wrap;gap:6px}
  /* price table */
  .price-sec{margin:0 20px 20px}
  .price-sec h3{font-size:.92rem;font-weight:700;color:#1a1a2e;margin-bottom:10px}
  table{width:100%;border-collapse:collapse;font-size:.85rem}
  th{background:#f5f5fb;padding:10px;text-align:left;color:#64748b;font-weight:600;font-size:.78rem}
  td{padding:9px 10px;border-bottom:1px solid #f1f5f9;color:#1a1a2e}
  .tr-total td{font-weight:700;font-size:.97rem;color:#7c3aed;border-bottom:none;border-top:2px solid #e2e8f0}
  /* footer */
  .t-foot{background:#f5f5fb;padding:22px 28px;text-align:center;border-top:2px dashed #e2e8f0;position:relative}
  .t-foot::before,.t-foot::after{content:'';position:absolute;width:22px;height:22px;background:#eef0f8;border-radius:50%;top:-11px}
  .t-foot::before{left:-11px}.t-foot::after{right:-11px}
  .barcode{font-family:monospace;font-size:1.55rem;letter-spacing:4px;color:#7c3aed;margin:10px 0}
  .bid{font-size:.82rem;color:#64748b;margin-bottom:4px}
  .thanks{font-size:1rem;font-weight:700;color:#7c3aed;margin-bottom:6px}
  .note{font-size:.72rem;color:#94a3b8;line-height:1.5}
  /* print actions */
  .actions{text-align:center;padding:18px}
  .pbtn{background:linear-gradient(135deg,#7c3aed,#a855f7);color:#fff;border:none;padding:11px 28px;border-radius:50px;font-size:.92rem;font-weight:700;cursor:pointer;margin-right:8px}
  .cbtn{background:#f1f5f9;color:#64748b;border:none;padding:11px 20px;border-radius:50px;font-size:.92rem;font-weight:600;cursor:pointer}
  .pbtn:hover{opacity:.9}.cbtn:hover{background:#e2e8f0}
  @media print{
    body{background:#fff;padding:0}
    .ticket{box-shadow:none;border-radius:0}
    .actions{display:none}
    .strip{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .movie-banner{-webkit-print-color-adjust:exact;print-color-adjust:exact}
    .seat-chips span{-webkit-print-color-adjust:exact;print-color-adjust:exact}
  }
</style>
</head>
<body>
<div class="ticket">
  <div class="strip"></div>
  <div class="t-head">
    <div class="t-logo">BOX<span>OFFICE</span></div>
    <div class="t-sub">Premium Cinema Experience &nbsp;•&nbsp; E-Ticket</div>
  </div>
  <div class="movie-banner">
    <h1>${movie.title}</h1>
    <p>⏱ ${movie.dur} &nbsp;|&nbsp; 🌐 ${movie.lang} &nbsp;|&nbsp; ⭐ ${movie.rating}/10 &nbsp;|&nbsp; 🎭 ${movie.genre}</p>
  </div>
  <div class="info-grid">
    <div class="ib"><div class="ib-lbl">Date</div><div class="ib-val">${date}</div></div>
    <div class="ib"><div class="ib-lbl">Screen</div><div class="ib-val">Screen 1 – Dolby</div></div>
    <div class="ib"><div class="ib-lbl">Seats</div><div class="ib-val">${seats.length} Seat${seats.length>1?'s':''}</div></div>
    <div class="ib"><div class="ib-lbl">Payment</div><div class="ib-val">${payMethod||'CARD'}</div></div>
    <div class="ib"><div class="ib-lbl">Booking ID</div><div class="ib-val" style="font-family:monospace;font-size:.82rem">${bookingId}</div></div>
    <div class="ib"><div class="ib-lbl">Status</div><div class="ib-val" style="color:#10b981">✔ Confirmed</div></div>
  </div>
  <div class="seats-sec">
    <h3>🎟️ Your Seats</h3>
    <div class="seat-chips">${seatChips}</div>
  </div>
  <div class="price-sec">
    <h3>💰 Price Breakdown</h3>
    <table>
      <thead><tr><th>Category</th><th>Seats</th><th>Rate</th><th>Amount</th></tr></thead>
      <tbody>
        ${seatRows}
        <tr><td>Convenience Fee</td><td>–</td><td>${seats.length} × ₹5</td><td>₹${convFee}</td></tr>
        <tr><td>GST (18%)</td><td>–</td><td>–</td><td>₹${gst}</td></tr>
        <tr class="tr-total"><td colspan="3"><strong>Grand Total</strong></td><td><strong>₹${grand}</strong></td></tr>
      </tbody>
    </table>
  </div>
  <div class="t-foot">
    <div class="thanks">Thank you for choosing BOXOFFICE! 🎬</div>
    <div class="barcode">|||| ${bookingId.slice(-10)} ||||</div>
    <div class="bid">Booking Reference: <strong>${bookingId}</strong></div>
    <p class="note">Please arrive 15 minutes before show time.<br>This e-ticket is valid at the entrance — no physical ticket required.<br>For support: support@boxoffice.in</p>
  </div>
  <div class="actions">
    <button class="pbtn" onclick="window.print()">🖨️ Print Ticket</button>
    <button class="cbtn" onclick="window.close()">✕ Close</button>
  </div>
</div>
<script>window.addEventListener('load',()=>setTimeout(()=>window.print(),600));<\/script>
</body>
</html>`;

  const w = window.open('','_blank','width=800,height=700,scrollbars=yes');
  if(w){ w.document.write(html); w.document.close(); }
  else  showToast('⚠️','Pop-up blocked. Please allow pop-ups for this site.');
}

/* ───────────────────────────────────────────────
   DOWNLOAD TICKET (HTML file)
─────────────────────────────────────────────── */
function downloadTicket(){
  const {movie,seats,grand,bookingId} = bData;
  const date = new Date().toLocaleDateString();
  const content = `<!DOCTYPE html><html><head><meta charset="UTF-8"><title>Ticket – ${movie.title}</title></head>
<body style="font-family:Arial,sans-serif;max-width:600px;margin:2rem auto;padding:2rem;border:2px solid #7c3aed;border-radius:16px">
  <h1 style="color:#7c3aed">🎬 BOXOFFICE – E-Ticket</h1><hr>
  <h2>${movie.title}</h2>
  <p>⏱ ${movie.dur} &nbsp;|&nbsp; 🌐 ${movie.lang} &nbsp;|&nbsp; ⭐ ${movie.rating}</p>
  <p style="margin-top:1rem"><strong>Seats:</strong> ${seats.map(s=>s.id).join(', ')}</p>
  <p><strong>Total Paid:</strong> ₹${grand}</p>
  <p><strong>Booking ID:</strong> <code>${bookingId}</code></p>
  <p><strong>Date:</strong> ${date}</p>
  <hr><p style="color:#888;font-size:.85rem">Thank you for choosing BOXOFFICE! Arrive 15 min before show time.</p>
</body></html>`;
  const blob = new Blob([content],{type:'text/html'});
  const a    = document.createElement('a');
  a.href     = URL.createObjectURL(blob);
  a.download = `BOXOFFICE-${bookingId}.html`;
  a.click();
  URL.revokeObjectURL(a.href);
  showToast('✅','Ticket downloaded!');
}

/* ───────────────────────────────────────────────
   CONFETTI
─────────────────────────────────────────────── */
function launchConfetti(){
  const container = document.getElementById('confetti');
  container.innerHTML = '';
  const colors = ['#7c3aed','#a855f7','#ec4899','#f59e0b','#10b981','#06b6d4','#fff'];
  for(let i=0;i<90;i++){
    const p  = document.createElement('div');
    const sz = Math.random()*11+4;
    p.className = 'cpiece';
    p.style.cssText = `
      left:${Math.random()*100}%;
      width:${sz}px; height:${sz}px;
      background:${colors[Math.floor(Math.random()*colors.length)]};
      border-radius:${Math.random()>.5?'50%':'3px'};
      animation-duration:${Math.random()*2.2+1.4}s;
      animation-delay:${Math.random()*.6}s;`;
    container.appendChild(p);
  }
  setTimeout(()=>{ container.innerHTML=''; }, 4500);
}

/* ───────────────────────────────────────────────
   TOAST
─────────────────────────────────────────────── */
let toastTimer = null;
function showToast(icon, msg){
  if(toastTimer){ clearTimeout(toastTimer); }
  const t = document.getElementById('toast');
  document.getElementById('toastIcon').textContent = icon;
  document.getElementById('toastMsg').textContent  = msg;
  t.classList.add('show');
  toastTimer = setTimeout(()=>t.classList.remove('show'), 3200);
}

/* ───────────────────────────────────────────────
   INIT
─────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', ()=>{
  renderMovies();
  renderComing();
  renderOffers();
});
