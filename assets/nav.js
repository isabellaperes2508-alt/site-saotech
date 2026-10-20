/* Navegação mobile da Saotech: gaveta em tela cheia, topo que some ao rolar para baixo */
(function(){
"use strict";
/* aparelhos modestos ganham o modo leve também nas páginas internas */
if(innerWidth<720||(navigator.hardwareConcurrency||8)<=4||(navigator.deviceMemory||8)<=4||(navigator.connection&&navigator.connection.saveData)) document.documentElement.classList.add('leve');
const topo=document.getElementById('topo'), btn=document.getElementById('menuBtn'), gv=document.getElementById('gaveta');
if(!topo||!btn||!gv) return;
const reduz=matchMedia('(prefers-reduced-motion: reduce)').matches;
const fora=()=>[...document.querySelectorAll('main, footer, .zap, .barra a, .pular')];
const bm=document.getElementById('barMenu');
let aberta=false, desenhou=false;

/* Curvas de nível no fundo da gaveta (mesmo ruído do terreno do site) */
function hash(ix,iy){ let h=(Math.imul(ix,374761393)+Math.imul(iy,668265263))|0; h=Math.imul(h^(h>>>13),1274126177); h^=h>>>16; return (h>>>0)/4294967295; }
function vn(x,y){ const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy); const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function fbm(x,y){ let s=0,a=.5,f=1; for(let i=0;i<4;i++){ s+=a*vn(x*f+11.3,y*f+7.1); f*=2.03; a*=.5; } return s; }
function curvas(){
  const cv=gv.querySelector('canvas'); if(!cv) return;
  const w=gv.clientWidth, h=gv.clientHeight, dpr=Math.min(devicePixelRatio||1,2);
  cv.width=w*dpr; cv.height=h*dpr; const x=cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0);
  const p=12, nx=Math.ceil(w/p)+1, ny=Math.ceil(h/p)+1, e=3.2/Math.max(w,h), g=new Float32Array(nx*ny);
  for(let j=0;j<ny;j++) for(let i=0;i<nx;i++) g[j*nx+i]=fbm(i*p*e+4.2,j*p*e+1.3)*6;
  for(let k=0,nv=0.8;nv<5.2;nv+=0.24,k++){
    x.strokeStyle=k%5===0?'rgba(217,225,90,.28)':'rgba(127,143,87,.22)'; x.lineWidth=k%5===0?1.1:.8; x.beginPath();
    for(let j=0;j<ny-1;j++) for(let i=0;i<nx-1;i++){
      const a=g[j*nx+i],b=g[j*nx+i+1],c=g[(j+1)*nx+i+1],d=g[(j+1)*nx+i];
      const cs=(a>nv?8:0)|(b>nv?4:0)|(c>nv?2:0)|(d>nv?1:0); if(cs===0||cs===15) continue;
      const X=i*p,Y=j*p,t=(m,n)=>(nv-m)/(n-m);
      const T=[X+p*t(a,b),Y], R=[X+p,Y+p*t(b,c)], B=[X+p*t(d,c),Y+p], L=[X,Y+p*t(a,d)];
      const seg=({1:[L,B],2:[B,R],3:[L,R],4:[T,R],5:[L,T,B,R],6:[T,B],7:[L,T],8:[L,T],9:[T,B],10:[T,R,L,B],11:[T,R],12:[L,R],13:[B,R],14:[L,B]})[cs];
      for(let s=0;s<seg.length;s+=2){ x.moveTo(seg[s][0],seg[s][1]); x.lineTo(seg[s+1][0],seg[s+1][1]); }
    }
    x.stroke();
  }
  desenhou=true;
}

function abrir(){
  if(aberta) return; aberta=true;
  if(!desenhou) curvas();
  gv.querySelectorAll('.gv-nav a').forEach((a,i)=>a.style.transitionDelay=reduz?'0s':(0.12+i*0.05)+'s');
  gv.classList.add('aberta'); gv.setAttribute('aria-hidden','false');
  topo.classList.add('gv-on'); topo.classList.remove('some'); document.body.classList.remove('topo-some');
  document.documentElement.classList.add('gv-trava');
  document.dispatchEvent(new CustomEvent('gaveta',{detail:true}));   // o terreno 3D pausa enquanto o menu cobre a tela
  fora().forEach(el=>el.setAttribute('inert',''));
  btn.setAttribute('aria-expanded','true'); btn.setAttribute('aria-label','Fechar menu');
  if(bm){ bm.setAttribute('aria-expanded','true'); bm.querySelector('.rot').textContent='Fechar'; }
  setTimeout(()=>{ const a=gv.querySelector('.gv-nav a'); a&&a.focus({preventScroll:true}); }, reduz?0:350);
}
function fechar(foco){
  if(!aberta) return; aberta=false;
  gv.querySelectorAll('.gv-nav a').forEach(a=>a.style.transitionDelay='0s');
  gv.classList.remove('aberta'); gv.setAttribute('aria-hidden','true');
  topo.classList.remove('gv-on');
  document.documentElement.classList.remove('gv-trava');
  document.dispatchEvent(new CustomEvent('gaveta',{detail:false}));
  fora().forEach(el=>el.removeAttribute('inert'));
  btn.setAttribute('aria-expanded','false'); btn.setAttribute('aria-label','Abrir menu');
  if(bm){ bm.setAttribute('aria-expanded','false'); bm.querySelector('.rot').textContent='Menu'; }
  if(foco!==false) (foco||btn).focus({preventScroll:true});
}
btn.addEventListener('click',()=>aberta?fechar():abrir());
if(bm) bm.addEventListener('click',()=>aberta?fechar(bm):abrir());
gv.addEventListener('click',e=>{ const a=e.target.closest('a'); if(!a) return;
  const h=a.getAttribute('href')||''; const mesma=a.hasAttribute('aria-current');
  if(mesma){ e.preventDefault(); fechar(false); scrollTo({top:0,behavior:reduz?'auto':'smooth'}); return; }
  if(h.charAt(0)==='#') fechar(false);
});
addEventListener('keydown',e=>{
  if(!aberta) return;
  if(e.key==='Escape'){ fechar(); return; }
  if(e.key==='Tab'){ /* mantém o foco entre o botão do menu e a gaveta */
    const itens=[btn,...gv.querySelectorAll('a'),...(bm&&bm.offsetParent?[bm]:[])], i=itens.indexOf(document.activeElement);
    if(e.shiftKey && i<=0){ e.preventDefault(); itens[itens.length-1].focus(); }
    else if(!e.shiftKey && i===itens.length-1){ e.preventDefault(); itens[0].focus(); }
  }
});
matchMedia('(min-width:1021px)').addEventListener('change',m=>{ if(m.matches) fechar(false); });
addEventListener('resize',()=>{ if(aberta) curvas(); else desenhou=false; });
addEventListener('pageshow',()=>fechar(false));

/* Topo some ao rolar para baixo e volta ao rolar para cima (só no celular/tablet) */
const mq=matchMedia('(max-width:1020px)');
let yAnt=scrollY, acum=0, pend=false;
function rolou(){
  pend=false; const y=scrollY, d=y-yAnt; yAnt=y;
  if(aberta||!mq.matches||y<120){ topo.classList.remove('some'); document.body.classList.remove('topo-some'); acum=0; return; }
  if(Math.sign(d)!==Math.sign(acum)) acum=0; acum+=d;
  if(acum>40){ topo.classList.add('some'); document.body.classList.add('topo-some'); }
  else if(acum<-24){ topo.classList.remove('some'); document.body.classList.remove('topo-some'); }
}
addEventListener('scroll',()=>{ if(!pend){ pend=true; requestAnimationFrame(rolou); } },{passive:true});
topo.addEventListener('focusin',()=>{ topo.classList.remove('some'); document.body.classList.remove('topo-some'); });

/* Esconde a barra inferior enquanto o teclado está aberto num campo de formulário */
const campo=e=>e.target.matches&&e.target.matches('input:not([type=checkbox]):not([type=radio]),textarea,select');
addEventListener('focusin',e=>{ if(campo(e)) document.body.classList.add('digitando'); });
addEventListener('focusout',e=>{ if(campo(e)) document.body.classList.remove('digitando'); });

/* Início: atalho "Pular apresentação" enquanto a história em 3D ocupa a tela */
const hist=document.getElementById('historia');
if(hist && hist.nextElementSibling){
  const destino=hist.nextElementSibling; if(!destino.id) destino.id='depois-historia';
  const a=document.createElement('a'); a.className='pular'; a.href='#'+destino.id;
  a.innerHTML='Pular apresentação<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 5v14M6 13l6 6 6-6"/></svg>';
  a.addEventListener('click',e=>{ e.preventDefault(); destino.scrollIntoView({behavior:'auto'}); });
  document.body.appendChild(a);
  let pp=false;
  const confere=()=>{ pp=false; const r=hist.getBoundingClientRect(); a.classList.toggle('on', r.top < -innerHeight*0.5 && r.bottom > innerHeight*1.4); };
  addEventListener('scroll',()=>{ if(!pp){ pp=true; requestAnimationFrame(confere); } },{passive:true}); confere();
}
})();
