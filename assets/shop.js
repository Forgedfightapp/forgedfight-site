/* FORGED shop: product cards open a detail sheet at #p/<slug> (shareable, Back closes). No checkout yet. */
(() => {
const P = '/img/products/', SIZES = ['XS','S','M','L','XL','2XL','3XL'];
const BELTS = [['white','White','#f2f2f2'],['blue','Blue','#2d73eb'],['purple','Purple','#9b55e1'],['brown','Brown','#be8250'],['black','Black','#d7261e']];
const RG = ['Polyester/spandex, all-over sublimation print','Compression fit, flatlock seams','Raglan sleeves with contrast piping'];
const D = {
  'forged-set':{ name:'FORGED Set', sub:'Rash guard + fight shorts', img:'forged-set-rashguard-shorts', wide:true, desc:'The full kit: FORGED rash guard and matching fight shorts. All black, red trim.', notes:[...RG.slice(0,2),'Shorts: fight cut with side slits, velcro waist'], sleeve:true },
  'forged-rashguard-long':{ name:'FORGED Rash Guard', sub:'Long sleeve', img:'forged-rashguard-long-sleeve', desc:'Small FORGED crest on the chest, flame and anvil on the upper back. Black with red raglan trim.', notes:RG, sleeveTo:{ short:'forged-rashguard-short' } },
  'forged-rashguard-short':{ name:'FORGED Rash Guard', sub:'Short sleeve', img:'forged-rashguard-short-sleeve', desc:'Small FORGED crest on the chest, flame and anvil on the upper back. Black with red raglan trim.', notes:RG, sleeveTo:{ long:'forged-rashguard-long' } },
  'forged-fight-shorts':{ name:'FORGED Fight Shorts', sub:'BJJ / MMA', img:'forged-fight-shorts', desc:'Black fight shorts with red side panels and a small FORGED badge on the left leg.', notes:['Lightweight stretch polyester','Side slits for full range of motion','Velcro and drawstring waist'] },
  'based-savage-long':{ name:'BASED SAVAGE Rash Guard', sub:'Long sleeve · rank colors', belt:true, sl:'long', desc:'BASED SAVAGE flame lettering on the chest, flame and anvil on the back. Piping and lettering in your belt color.', notes:RG, sleeveTo:{ short:'based-savage-short' } },
  'based-savage-short':{ name:'BASED SAVAGE Rash Guard', sub:'Short sleeve · rank colors', belt:true, sl:'short', desc:'BASED SAVAGE flame lettering on the chest, flame and anvil on the back. Piping and lettering in your belt color.', notes:RG, sleeveTo:{ long:'based-savage-long' } },
  'forged-tee':{ name:'FORGED T-Shirt', sub:'FORGED FOR THE FIGHT', img:'forged-tee', desc:'Everyday FORGED tee.', notes:['100% cotton','DTG (direct-to-garment) print','Regular fit'] },
  'forged-hoodie':{ name:'FORGED Hoodie', sub:'FORGED FOR THE FIGHT', img:'forged-hoodie', desc:'Heavyweight FORGED hoodie for before and after training.', notes:['Cotton/poly blend fleece','DTG print','Relaxed fit, kangaroo pocket'] }
};
let belt = 'black', size = '', view = 'full', opened = false;
const $ = s => document.querySelector(s), esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const imgOf = p => P + (p.belt ? `based-savage-${belt}-${p.sl}-sleeve` : p.img) + '.webp';
const notifyHref = p => { const a = document.getElementById('store-link'), base = a ? a.getAttribute('href') : 'mailto:hello@forgedfight.com';
  if (!base.startsWith('mailto:')) return base;
  const item = `${p.name} (${p.sub})${p.belt ? ' - ' + belt + ' belt' : ''}${size ? ' - size ' + size : ''}`;
  return `mailto:hello@forgedfight.com?subject=${encodeURIComponent('Notify me: ' + item)}&body=${encodeURIComponent('Let me know when the ' + item + ' drops.')}`; };
const box = document.createElement('div'); box.className = 'pd'; box.hidden = true; box.setAttribute('role','dialog'); box.setAttribute('aria-modal','true'); box.id = 'productDetail'; document.body.appendChild(box);
function render(slug){
  const p = D[slug]; if (!p) return close(true);
  const src = imgOf(p), wide = p.wide;
  const thumbs = wide ? [['full','w','Full']] : [['full','w','Both'],['front','f','Front'],['back','b','Back']];
  if (wide) view = 'full';
  box.innerHTML = `<div class="pd-in"><button type="button" class="pd-x" id="pdClose" aria-label="Close">×</button>
  <div class="pd-gal"><img class="pd-main ${view === 'full' ? '' : view}" id="pdImg" src="${src}" alt="${esc(p.name + ', ' + p.sub)}">
    ${thumbs.length > 1 ? `<div class="pd-th" role="group" aria-label="Views">${thumbs.map(([v, c, l]) => `<button type="button" class="${c}${view === v ? ' on' : ''}" data-view="${v}" aria-label="${l} view"><img src="${src}" alt=""></button>`).join('')}</div>` : ''}</div>
  <div class="pd-info"><span class="pd-tag">Coming soon</span><h2 id="pdTitle">${esc(p.name)}</h2><div style="color:var(--fg);font-weight:600">${esc(p.sub)}</div>
    <p>${esc(p.desc)}</p><ul>${p.notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul>
    ${p.belt ? `<div class="pd-opt" id="pdBelts"><b>Belt color</b><div class="row">${BELTS.map(([k, l, c]) => `<button type="button" class="belt${belt === k ? ' on' : ''}" data-belt="${k}" style="--d:${c}" aria-pressed="${belt === k}">${l}</button>`).join('')}</div></div>` : ''}
    ${p.sleeveTo ? `<div class="pd-opt"><b>Sleeve</b><div class="row">${['long','short'].map(s => { const cur = !p.sleeveTo[s]; return `<button type="button" class="${cur ? 'on' : ''}" data-sleeve="${cur ? '' : p.sleeveTo[s]}" aria-pressed="${cur}">${s === 'long' ? 'Long' : 'Short'}</button>`; }).join('')}</div></div>` : ''}
    <div class="pd-opt" id="pdSizes"><b>Size</b><div class="row">${SIZES.map(s => `<button type="button" class="${size === s ? 'on' : ''}" data-size="${s}" aria-pressed="${size === s}">${s}</button>`).join('')}</div></div>
    <a class="btn pd-notify" id="pdNotify" href="${notifyHref(p)}">Notify me</a><div class="pd-note">No checkout yet. We'll email you when it drops.</div></div></div>`;
  box.hidden = false; document.body.classList.add('pd-open'); box.setAttribute('aria-labelledby','pdTitle');
  box.querySelector('#pdClose').onclick = () => close();
  box.querySelectorAll('[data-view]').forEach(b => b.onclick = () => { view = b.dataset.view; render(slug); });
  box.querySelectorAll('[data-belt]').forEach(b => b.onclick = () => { belt = b.dataset.belt; render(slug); });
  box.querySelectorAll('[data-size]').forEach(b => b.onclick = () => { size = size === b.dataset.size ? '' : b.dataset.size; render(slug); });
  box.querySelectorAll('[data-sleeve]').forEach(b => b.onclick = () => { if (b.dataset.sleeve) location.replace('#p/' + b.dataset.sleeve); });
  const f = document.activeElement; if (!box.contains(f)) box.querySelector('#pdClose').focus();
}
function close(fromRoute){ box.hidden = true; box.innerHTML = ''; document.body.classList.remove('pd-open');
  if (!fromRoute) { if (opened) history.back(); else history.replaceState(null, '', location.pathname + location.search); }
  opened = false; }
function route(){ const m = location.hash.match(/^#p\/([\w-]+)/); if (m) render(m[1]); else if (!box.hidden) close(true); }
box.addEventListener('click', e => { if (e.target === box) close(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && !box.hidden) close(); });
document.querySelectorAll('.card[data-slug]').forEach(c => {
  c.tabIndex = 0; c.setAttribute('role','button'); c.setAttribute('aria-label', 'View ' + c.querySelector('p').textContent.trim());
  const open = () => { const s = c.dataset.slug, bb = c.dataset.beltFrom; if (bb) belt = window.__bsBelt || belt; view = 'full'; opened = true; location.hash = 'p/' + s; };
  c.addEventListener('click', e => { if (e.target.closest('a,button')) return; open(); });
  c.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); } });
});
/* belt selector on the grid */
document.querySelectorAll('.ranks button').forEach(b => b.onclick = () => { const c = b.dataset.c; window.__bsBelt = c;
  document.querySelectorAll('.ranks button').forEach(x => x.classList.toggle('on', x === b));
  for (const k of ['long','short']) { const i = document.getElementById('bs-' + k); if (i) i.src = P + `based-savage-${c}-${k}-sleeve.webp`; }
  document.querySelectorAll('.bs-c').forEach(e => e.textContent = b.textContent); });
addEventListener('hashchange', route);
if (/^#p\//.test(location.hash)) route();
else if (location.pathname.startsWith('/shop')) addEventListener('load', () => document.getElementById('shop').scrollIntoView());
})();
