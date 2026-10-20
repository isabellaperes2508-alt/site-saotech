(function(){
"use strict";
const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = (s,el=document)=>el.querySelector(s);
const $$ = (s,el=document)=>[...el.querySelectorAll(s)];
const esc = (t)=>String(t).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ---------- Logo desenhado e menu ---------- */
function desenhaLogo(){ const m=$('#logoMark'); if(!m||reduz) return; m.classList.remove('draw'); void m.getBoundingClientRect(); m.classList.add('draw'); }
desenhaLogo();
$('#logo') && $('#logo').addEventListener('mouseenter',desenhaLogo);
/* menu no celular: assets/nav.js */

/* ---------- Curvas de nível geradas do mesmo terreno do Início ---------- */
function hash(ix,iy){ let h=(Math.imul(ix,374761393)+Math.imul(iy,668265263))|0; h=Math.imul(h^(h>>>13),1274126177); h^=h>>>16; return (h>>>0)/4294967295; }
function vnoise(x,y){ const ix=Math.floor(x),iy=Math.floor(y),fx=x-ix,fy=y-iy,u=fx*fx*(3-2*fx),v=fy*fy*(3-2*fy);
  const a=hash(ix,iy),b=hash(ix+1,iy),c=hash(ix,iy+1),d=hash(ix+1,iy+1); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function fbm(x,y){ let s=0,a=.5,f=1; for(let i=0;i<5;i++){ s+=a*vnoise(x*f+11.3,y*f+7.1); f*=2.03; a*=.5; } return s; }
function curvas(cv){
  const sem=parseFloat(cv.dataset.semente||'0');
  const w=cv.clientWidth, h=cv.clientHeight; if(!w||!h) return;
  const dpr=Math.min(devicePixelRatio||1,2); cv.width=w*dpr; cv.height=h*dpr;
  const x=cv.getContext('2d'); x.setTransform(dpr,0,0,dpr,0,0); x.clearRect(0,0,w,h);
  const passo=Math.max(8,Math.round(Math.min(w,h)/70)), nx=Math.ceil(w/passo)+1, ny=Math.ceil(h/passo)+1;
  const esc_=2.6/Math.max(w,h)*Math.max(1,w/900);
  const g=new Float32Array(nx*ny);
  for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const px=i*passo*esc_+sem, py=j*passo*esc_+sem*0.7; g[j*nx+i]=fbm(px,py)*6; }
  const niveis=[]; for(let v=0.6;v<5.4;v+=0.22) niveis.push(v);
  niveis.forEach((nv,k)=>{
    const maior=k%5===0;
    x.strokeStyle=maior?'rgba(217,225,90,0.32)':'rgba(127,143,87,0.30)'; x.lineWidth=maior?1.2:0.9;
    x.beginPath();
    for(let j=0;j<ny-1;j++) for(let i=0;i<nx-1;i++){
      const a=g[j*nx+i],b=g[j*nx+i+1],c=g[(j+1)*nx+i+1],d=g[(j+1)*nx+i];
      const cs=(a>nv?8:0)|(b>nv?4:0)|(c>nv?2:0)|(d>nv?1:0); if(cs===0||cs===15) continue;
      const X=i*passo,Y=j*passo,t=(p,q)=>(nv-p)/(q-p);
      const T=[X+passo*t(a,b),Y], R=[X+passo,Y+passo*t(b,c)], B=[X+passo*t(d,c),Y+passo], L=[X,Y+passo*t(a,d)];
      const seg=(p,q)=>{ x.moveTo(p[0],p[1]); x.lineTo(q[0],q[1]); };
      switch(cs){case 1:case 14:seg(L,B);break;case 2:case 13:seg(B,R);break;case 3:case 12:seg(L,R);break;case 4:case 11:seg(T,R);break;
        case 5:seg(L,T);seg(B,R);break;case 6:case 9:seg(T,B);break;case 7:case 8:seg(L,T);break;case 10:seg(T,R);seg(L,B);break;}
    }
    x.stroke();
  });
}
const cvs=$$('canvas.curvas');
const redesenha=()=>cvs.forEach(curvas);
redesenha(); let tr; addEventListener('resize',()=>{ clearTimeout(tr); tr=setTimeout(redesenha,150); });

/* ---------- Paralaxe ---------- */
const camadas=$$('[data-vel]');
function paralaxe(){ if(reduz) return; for(const c of camadas){ const r=c.parentElement.getBoundingClientRect(); if(r.bottom<0||r.top>innerHeight) continue; const d=(r.top+r.height/2-innerHeight/2); c.style.transform='translate3d(0,'+(d*parseFloat(c.dataset.vel)).toFixed(1)+'px,0)'+(c.dataset.escala?' scale('+c.dataset.escala+')':''); } }

/* ---------- Frase que acende palavra a palavra ---------- */
const fr=$('#frase'); let palavras=[];
if(fr){
  const partes=[]; fr.childNodes.forEach(n=>{ const em=n.nodeType===1; n.textContent.split(/(\s+)/).forEach(w=>{ if(!w) return; if(/^\s+$/.test(w)) partes.push(' '); else partes.push(em?'<em class="w">'+esc(w)+'</em>':'<span class="w">'+esc(w)+'</span>'); }); });
  fr.innerHTML=partes.join(''); palavras=$$('.w',fr); if(!reduz) fr.closest('section').classList.add('js-frase');
}
function acendeFrase(){ if(!fr||reduz) return; const r=fr.getBoundingClientRect(); const p=Math.min(Math.max((innerHeight*0.88-r.top)/(innerHeight*0.55),0),1); const k=Math.round(p*palavras.length); palavras.forEach((w,i)=>w.classList.toggle('on',i<k)); }

/* ---------- Linha do tempo ---------- */
const tempo=$('.tempo'), etapas=$$('.etapa');
function linhaTempo(){ if(!tempo) return; const r=tempo.getBoundingClientRect(); const p=Math.min(Math.max((innerHeight*0.6-r.top)/r.height,0),1); tempo.style.setProperty('--prog',p.toFixed(3));
  etapas.forEach(e=>{ const er=e.getBoundingClientRect(); e.classList.toggle('on', er.top < innerHeight*0.6); }); }

/* ---------- Âncoras ativas ---------- */
const anc=$$('.ancoras a'); const alvos=anc.map(a=>$(a.getAttribute('href')));
function ancoraAtiva(){ if(!anc.length) return; let at=0; alvos.forEach((s,i)=>{ if(s && s.getBoundingClientRect().top < innerHeight*0.4) at=i; }); anc.forEach((a,i)=>a.classList.toggle('on',i===at)); }

/* ---------- Leitura do artigo ---------- */
function progressoLeitura(){ const a=$('.artigo'); const b=$('.progresso-leitura'); if(!a||!b) return; const r=a.getBoundingClientRect(); const p=Math.min(Math.max(-r.top/(r.height-innerHeight*0.6),0),1); b.style.setProperty('--lido',p.toFixed(3));
  const hs=$$('.artigo h2'); let at=-1; hs.forEach((h,i)=>{ if(h.getBoundingClientRect().top<160) at=i; }); $$('.indice a').forEach((l,i)=>l.classList.toggle('on',i===at)); }

let pend=false;
function rolagem(){ paralaxe(); acendeFrase(); linhaTempo(); ancoraAtiva(); progressoLeitura(); }
addEventListener('scroll',()=>{ if(pend) return; pend=true; requestAnimationFrame(()=>{ pend=false; rolagem(); }); },{passive:true});
addEventListener('resize',rolagem);

/* ---------- Copiar contato ---------- */
$$('[data-copiar]:not(#pCopiar)').forEach(b=>b.addEventListener('click',(e)=>{ e.preventDefault(); e.stopPropagation(); const t=b.dataset.copiar;
  const avisa=(m)=>{ const o=b.dataset.rot||b.textContent; b.dataset.rot=o; b.textContent=m; setTimeout(()=>b.textContent=o,1800); };
  (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(()=>avisa('Copiado')).catch(()=>avisa('Selecione e copie')); }));

/* ---------- Formulário de orçamento ---------- */
const form=$('#formOrc');
if(form){
  const campos=['nome','telefone','municipio','servico','area','mensagem'];
  const montaTexto=()=>{ const v=k=>(form.elements[k]?.value||'').trim(); const l=['Olá! Vim pelo site da Saotech e gostaria de um orçamento.'];
    if(v('nome')) l.push('Nome: '+v('nome')); if(v('telefone')) l.push('Telefone: '+v('telefone')); if(v('municipio')) l.push('Município: '+v('municipio'));
    if(v('servico')) l.push('Serviço: '+v('servico')); if(v('area')) l.push('Área aproximada: '+v('area')); if(v('mensagem')) l.push('Situação: '+v('mensagem')); return l.join('\n'); };
  const zap=$('#formZap');
  const atualiza=()=>{ zap.href='https://wa.me/5528999273727?text='+encodeURIComponent(montaTexto()); };
  form.addEventListener('input',atualiza); atualiza();
  form.addEventListener('submit',(e)=>{
    e.preventDefault();
    if(!form.reportValidity()) return;
    const dados=new URLSearchParams(new FormData(form));
    fetch('/',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:dados.toString()}).catch(()=>{});
    $('#formOk').hidden=false; atualiza(); zap.focus();
  });
}

/* ---------- Blog ---------- */
const POSTS=(window.POSTS||[]).slice().sort((a,b)=>b.data.localeCompare(a.data));
const dataBR=(d)=>{ const [y,m,dd]=d.split('-'); const ms=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez']; return dd+' '+ms[+m-1]+' '+y; };
const leitura=(p)=>Math.max(2,Math.round(p.corpo.replace(/<[^>]+>/g,' ').split(/\s+/).length/200))+' min de leitura';
const cartaoPost=(p)=>`<a class="post-card vidro revela" href="post.html#${esc(p.slug)}">
  <div class="img"><img src="${esc(p.capa)}" alt="${esc(p.capaAlt)}" loading="lazy" decoding="async"></div>
  <div class="corpo"><div class="meta"><span class="cat">${esc(p.categoria)}</span><span>${dataBR(p.data)}</span><span>${leitura(p)}</span></div>
  <h3>${esc(p.titulo)}</h3><p>${esc(p.resumo)}</p><span class="ler">Ler artigo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div></a>`;

const lista=$('#blogLista');
if(lista){
  const dest=$('#blogDestaque'), busca=$('#blogBusca'), catsEl=$('#blogCats'), cont=$('#blogContagem');
  const cats=['Todos',...new Set(POSTS.map(p=>p.categoria))]; let cat='Todos';
  catsEl.innerHTML=cats.map(c=>`<button type="button" aria-pressed="${c==='Todos'}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  catsEl.addEventListener('click',e=>{ const b=e.target.closest('button'); if(!b) return; cat=b.dataset.cat; $$('button',catsEl).forEach(x=>x.setAttribute('aria-pressed',x===b)); render(); });
  busca.addEventListener('input',render);
  const norm=(t)=>t.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase();
  function render(){
    const q=norm(busca.value.trim());
    const f=POSTS.filter(p=>(cat==='Todos'||p.categoria===cat)&&(!q||norm(p.titulo+' '+p.resumo+' '+p.corpo.replace(/<[^>]+>/g,' ')).includes(q)));
    const filtrando=q||cat!=='Todos';
    if(!filtrando && f.length){ const p=f[0]; dest.hidden=false; dest.innerHTML=`<a class="destaque vidro" href="post.html#${esc(p.slug)}"><div class="img"><img src="${esc(p.capa)}" alt="${esc(p.capaAlt)}"></div><div class="corpo"><div class="meta"><span class="cat">${esc(p.categoria)}</span><span>${dataBR(p.data)}</span><span>${leitura(p)}</span></div><h2>${esc(p.titulo)}</h2><p>${esc(p.resumo)}</p><span class="btn btn-lima" style="align-self:flex-start">Ler artigo</span></div></a>`; }
    else dest.hidden=true;
    const resto=(!filtrando)?f.slice(1):f;
    lista.innerHTML=resto.length?resto.map(cartaoPost).join(''):(f.length?'':`<div class="vazio-blog vidro">Nenhum artigo encontrado. Tente outra palavra ou fale com a gente pelo WhatsApp.</div>`);
    cont.textContent=f.length+(f.length===1?' artigo':' artigos');
  }
  render();
}

const art=$('#post');
if(art){
  function abre(){
    const slug=(location.hash||'').slice(1); const p=POSTS.find(x=>x.slug===slug)||POSTS[0]; if(!p) return;
    document.title=p.titulo+' · Blog Saotech';
    $('#pCat').textContent=p.categoria; $('#pData').textContent=dataBR(p.data); $('#pLeit').textContent=leitura(p);
    $('#pTit').textContent=p.titulo; $('#pRes').textContent=p.resumo;
    const ci=$('#pCapa'); ci.src=p.capa; ci.alt=p.capaAlt;
    art.innerHTML=p.corpo;
    const hs=$$('h2',art); hs.forEach((h,i)=>h.id='s'+(i+1));
    $('#pIndice').innerHTML='<span class="eyebrow" style="margin-bottom:8px">Neste artigo</span>'+hs.map(h=>`<a href="#${h.id}">${esc(h.textContent)}</a>`).join('');
    const url=location.href; const zapTxt=encodeURIComponent(p.titulo+' — '+url);
    $('#pZap').href='https://wa.me/?text='+zapTxt; $('#pCopiar').dataset.copiar=url;
    const rel=POSTS.filter(x=>x.slug!==p.slug).slice(0,3); $('#pRel').innerHTML=rel.map(cartaoPost).join('');
    $('#pRelSec').hidden=!rel.length;
    scrollTo(0,0); progressoLeitura();
  }
  $$('#pIndice').forEach(el=>el.addEventListener('click',e=>{ const a=e.target.closest('a'); if(!a) return; e.preventDefault(); $(a.getAttribute('href')).scrollIntoView({behavior:reduz?'auto':'smooth'}); }));
  addEventListener('hashchange',()=>{ if(/^#s\d+$/.test(location.hash)) return; abre(); });
  abre();
  $('#pCopiar').addEventListener('click',(e)=>{ const b=e.currentTarget; const t=b.querySelector('span'); const avisa=(m)=>{ t.textContent=m; setTimeout(()=>t.textContent='Copiar link',1800); }; (navigator.clipboard?navigator.clipboard.writeText(b.dataset.copiar):Promise.reject()).then(()=>avisa('Link copiado')).catch(()=>avisa('Não foi possível copiar')); });
}

rolagem();
})();
