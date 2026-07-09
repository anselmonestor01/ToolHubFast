// ==================================================================
// ToolHub — home.js
// Render de tarjetas + buscador + filtro categorías + estrellas reales
// ==================================================================

// ---- Sistema de valoración REAL (guardado en el navegador del visitante) ----
// Cada visitante puede votar una vez por herramienta. Se guarda su voto y
// se acumula un promedio local. Empieza vacío: es honesto y va creciendo.
const RATE_KEY = 'toolhub_ratings_v1';
function getRatings(){ try{return JSON.parse(localStorage.getItem(RATE_KEY))||{}}catch(e){return {}} }
function saveRatings(r){ try{localStorage.setItem(RATE_KEY, JSON.stringify(r))}catch(e){} }

function toolRating(id){
  const r = getRatings()[id];
  if(!r || !r.count) return null;
  return { avg: r.sum / r.count, count: r.count, mine: r.mine||0 };
}

function starsHTML(id){
  const r = toolRating(id);
  if(!r){
    return `<span class="rating rating-empty">Sé el primero en valorar</span>`;
  }
  const full = Math.round(r.avg);
  let s = '';
  for(let i=1;i<=5;i++) s += `<span class="star ${i<=full?'on':''}">★</span>`;
  return `<span class="rating"><span class="stars">${s}</span>
    <b>${r.avg.toFixed(1)}</b> <em>(${r.count})</em></span>`;
}

// ---- Render de las tarjetas ----
let activeCat = 'Todas';

function toolCardHTML(t){
  return `<a class="tool-card" href="tools/${t.id}.html" data-name="${t.name.toLowerCase()}" data-cat="${t.cat}">
    <span class="tool-ico">${t.ico}</span>
    <h3>${t.name}</h3>
    <p>${t.desc}</p>
    <div class="card-foot">
      ${starsHTML(t.id)}
      <span class="arrow">Abrir →</span>
    </div>
  </a>`;
}

function renderTools(){
  const grid = document.getElementById('toolsGrid');
  grid.innerHTML = TOOLS.map(toolCardHTML).join('');
  filterTools();
}

// ---- Categorías ----
function renderCats(){
  const box = document.getElementById('catTabs');
  box.innerHTML = CATEGORIES.map(c =>
    `<button class="cat-tab ${c==='Todas'?'active':''}" onclick="setCat('${c}',this)">${c}</button>`
  ).join('');
}
function setCat(c, el){
  activeCat = c;
  document.querySelectorAll('.cat-tab').forEach(b=>b.classList.remove('active'));
  el.classList.add('active');
  filterTools();
}

// ---- Buscador + filtro ----
function filterTools(){
  const q = (document.getElementById('search').value||'').toLowerCase().trim();
  let visible = 0;
  document.querySelectorAll('.tool-card').forEach(card=>{
    const name = card.dataset.name;
    const cat = card.dataset.cat;
    const okCat = activeCat==='Todas' || cat===activeCat;
    const okSearch = !q || name.includes(q);
    const show = okCat && okSearch;
    card.style.display = show ? '' : 'none';
    if(show) visible++;
  });
  document.getElementById('noResults').style.display = visible ? 'none' : 'block';
}

renderCats();
renderTools();
