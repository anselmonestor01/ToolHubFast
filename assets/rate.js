// ==================================================================
// ToolHub — rate.js  (valoración real por visitante, en cada herramienta)
// Requiere: <div id="rate" data-tool="ID"></div>
// ==================================================================
(function(){
  const box = document.getElementById('rate');
  if(!box) return;
  const id = box.dataset.tool;
  const KEY = 'toolhub_ratings_v1';
  const get = ()=>{try{return JSON.parse(localStorage.getItem(KEY))||{}}catch(e){return {}}};
  const save = r=>{try{localStorage.setItem(KEY,JSON.stringify(r))}catch(e){}};

  function state(){ return get()[id] || {sum:0,count:0,mine:0}; }

  function render(){
    const s = state();
    const avg = s.count ? (s.sum/s.count) : 0;
    let stars='';
    for(let i=1;i<=5;i++){
      const on = s.mine ? i<=s.mine : i<=Math.round(avg);
      stars += `<span class="rstar ${on?'on':''}" data-v="${i}">★</span>`;
    }
    let msg = s.mine
      ? `¡Gracias por tu valoración de ${s.mine}★!`
      : (s.count ? `Promedio ${avg.toFixed(1)}★ · ${s.count} valoración${s.count>1?'es':''}` : 'Aún sin valoraciones. ¡Sé el primero!');
    box.innerHTML = `<h4>¿Te resultó útil esta herramienta?</h4>
      <div class="rate-stars">${stars}</div>
      <p class="rate-msg">${msg}</p>`;
    if(!s.mine){
      box.querySelectorAll('.rstar').forEach(st=>{
        st.onclick = ()=>vote(+st.dataset.v);
        st.onmouseenter = ()=>hover(+st.dataset.v);
      });
      box.querySelector('.rate-stars').onmouseleave = ()=>render();
    }
  }
  function hover(v){
    box.querySelectorAll('.rstar').forEach(st=>{
      st.classList.toggle('on', +st.dataset.v<=v);
    });
  }
  function vote(v){
    const all = get();
    const s = all[id] || {sum:0,count:0,mine:0};
    if(s.mine) return;
    s.sum += v; s.count += 1; s.mine = v;
    all[id] = s; save(all);
    render();
  }
  render();
})();
