// ==================================================================
// ToolHub — hero3d.js
// Campo de partículas/formas con profundidad que reacciona al ratón.
// Canvas 2D con proyección pseudo-3D. Sin librerías externas.
// ==================================================================
(function(){
  const canvas = document.getElementById('hero3d');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  let W, H, DPR;
  const GREEN = '5,150,105';
  let mouse = {x:0, y:0, tx:0, ty:0};

  // Genera nodos en un cubo 3D
  const N = 46;
  const nodes = [];
  for(let i=0;i<N;i++){
    nodes.push({
      x:(Math.random()*2-1),
      y:(Math.random()*2-1),
      z:(Math.random()*2-1),
      r: 1.6 + Math.random()*2.8
    });
  }

  function resize(){
    DPR = Math.min(window.devicePixelRatio||1, 2);
    const rect = canvas.getBoundingClientRect();
    W = rect.width; H = rect.height;
    canvas.width = W*DPR; canvas.height = H*DPR;
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }

  window.addEventListener('resize', resize);

  window.addEventListener('mousemove', e=>{
    const rect = canvas.getBoundingClientRect();
    mouse.tx = ((e.clientX - rect.left)/rect.width - 0.5);
    mouse.ty = ((e.clientY - rect.top)/rect.height - 0.5);
  });

  let t = 0;
  function project(p, ry, rx){
    // rotación en Y
    let cosY=Math.cos(ry), sinY=Math.sin(ry);
    let x = p.x*cosY - p.z*sinY;
    let z = p.x*sinY + p.z*cosY;
    // rotación en X
    let cosX=Math.cos(rx), sinX=Math.sin(rx);
    let y = p.y*cosX - z*sinX;
    z = p.y*sinX + z*cosX;
    const scale = 1/(2.4 - z); // perspectiva
    return {
      sx: W/2 + x*W*0.34*scale,
      sy: H/2 + y*H*0.5*scale,
      depth: (z+1)/2,
      scale
    };
  }

  function frame(){
    t += reduce ? 0 : 0.0022;
    mouse.x += (mouse.tx - mouse.x)*0.05;
    mouse.y += (mouse.ty - mouse.y)*0.05;

    const ry = t + mouse.x*0.9;
    const rx = mouse.y*0.6;

    ctx.clearRect(0,0,W,H);

    // proyecta todos
    const pts = nodes.map(n=>({...project(n,ry,rx), r:n.r}));

    // líneas entre nodos cercanos
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const dx=pts[i].sx-pts[j].sx, dy=pts[i].sy-pts[j].sy;
        const d=Math.hypot(dx,dy);
        if(d<118){
          const a=(1-d/118)*0.22*Math.min(pts[i].depth,pts[j].depth);
          ctx.strokeStyle=`rgba(${GREEN},${a})`;
          ctx.lineWidth=1;
          ctx.beginPath();
          ctx.moveTo(pts[i].sx,pts[i].sy);
          ctx.lineTo(pts[j].sx,pts[j].sy);
          ctx.stroke();
        }
      }
    }
    // nodos (de atrás hacia adelante)
    pts.sort((a,b)=>a.depth-b.depth).forEach(p=>{
      const rad = p.r*p.scale*1.6;
      const alpha = 0.25 + p.depth*0.65;
      ctx.beginPath();
      ctx.arc(p.sx,p.sy,rad,0,Math.PI*2);
      ctx.fillStyle=`rgba(${GREEN},${alpha})`;
      ctx.fill();
      // halo
      ctx.beginPath();
      ctx.arc(p.sx,p.sy,rad*2.4,0,Math.PI*2);
      ctx.fillStyle=`rgba(${GREEN},${alpha*0.06})`;
      ctx.fill();
    });

    requestAnimationFrame(frame);
  }

  resize();
  frame();
})();
