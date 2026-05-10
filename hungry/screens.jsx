// screens.jsx — six screens of the order flow.
// Reads: window.T, CATS, ITEMS, tr, fmt, defaultSelection, linePrice, summariseSel
// All theming via props (theme, font, radius, imgStyle, lang).
// Common UI primitives are at the top.

const { useState, useMemo, useEffect, useRef } = React;

// ─────────────────────────────────────────────────────────────
// Reusable primitives
// ─────────────────────────────────────────────────────────────

function Icon({ name, size = 20, stroke = 'currentColor', sw = 1.8 }) {
  const p = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none',
              stroke, strokeWidth: sw, strokeLinecap: 'round', strokeLinejoin: 'round' };
  switch (name) {
    case 'search':  return <svg {...p}><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>;
    case 'cart':    return <svg {...p}><path d="M3 4h2l2.5 12.5a2 2 0 0 0 2 1.5h8a2 2 0 0 0 2-1.5L22 8H6"/><circle cx="10" cy="21" r="1"/><circle cx="18" cy="21" r="1"/></svg>;
    case 'back':    return <svg {...p}><path d="M15 6l-6 6 6 6"/></svg>;
    case 'close':   return <svg {...p}><path d="M6 6l12 12M18 6L6 18"/></svg>;
    case 'plus':    return <svg {...p}><path d="M12 5v14M5 12h14"/></svg>;
    case 'minus':   return <svg {...p}><path d="M5 12h14"/></svg>;
    case 'check':   return <svg {...p}><path d="M5 12l5 5L20 7"/></svg>;
    case 'arrow':   return <svg {...p}><path d="M5 12h14M14 6l6 6-6 6"/></svg>;
    case 'flame':   return <svg {...p} fill="currentColor" stroke="none"><path d="M12 2c1 3-1 5-1 7a3 3 0 0 0 6 0c0-1-.5-2-1-2.5 3 2 5 5 5 9a9 9 0 1 1-18 0c0-5 4-8 4-11 2 1 4 2 5 -2.5z"/></svg>;
    case 'star':    return <svg {...p} fill="currentColor" stroke="none"><path d="M12 3l2.6 5.6 6.1.6-4.6 4.2 1.3 6.1L12 16.8 6.6 19.5l1.3-6.1L3.3 9.2l6.1-.6L12 3z"/></svg>;
    case 'spark':   return <svg {...p}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>;
    case 'phone':   return <svg {...p}><rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/></svg>;
    case 'money':   return <svg {...p}><rect x="3" y="6" width="18" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>;
    case 'pin':     return <svg {...p}><path d="M12 22s7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 13 7 13z"/><circle cx="12" cy="9" r="2.5"/></svg>;
    case 'clock':   return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>;
    case 'globe':   return <svg {...p}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>;
    case 'menu':    return <svg {...p}><path d="M4 7h16M4 12h16M4 17h16"/></svg>;
    case 'trash':   return <svg {...p}><path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2l1-13"/></svg>;
    default: return null;
  }
}

// Theme-aware striped placeholder for dish imagery
function Placeholder({ item, theme, imgStyle, h = 180, label = true, lang = 'zh-TW' }) {
  // imgStyle: 'stripe' | 'block' | 'mono'
  const bgs = {
    main:    [theme.primary, theme.accent],
    drinks:  [theme.accent,  theme.primary],
    dessert: [theme.primary, theme.bgSoft],
  };
  const [a, b] = bgs[item.cat] || [theme.primary, theme.accent];
  let body;
  if (imgStyle === 'stripe') {
    body = (
      <svg width="100%" height="100%" viewBox="0 0 200 120" preserveAspectRatio="none" style={{ display: 'block' }}>
        <defs>
          <pattern id={`p-${item.id}`} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect width="14" height="14" fill={a}/>
            <rect width="7" height="14" fill={b}/>
          </pattern>
        </defs>
        <rect width="200" height="120" fill={`url(#p-${item.id})`} opacity="0.7"/>
        <rect width="200" height="120" fill={a} opacity="0.15"/>
      </svg>
    );
  } else if (imgStyle === 'block') {
    body = (
      <div style={{ position:'absolute', inset:0, background:a, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:'"Noto Serif HK", "Noto Serif TC", serif', fontSize: h*0.42, fontWeight:700, color:b, letterSpacing:-2, lineHeight:1, opacity:0.85 }}>
          {item.name['zh-TW'].slice(0, 1)}
        </div>
      </div>
    );
  } else { // 'mono'
    body = (
      <div style={{ position:'absolute', inset:0, background:theme.ink, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize: 11, color:theme.bg, letterSpacing:1, padding:'0 12px', textAlign:'center', textTransform:'uppercase' }}>
          [ {item.name.en} ]
        </div>
      </div>
    );
  }
  return (
    <div style={{ position:'relative', width:'100%', height:h, overflow:'hidden', background:a }}>
      {body}
      {label && imgStyle !== 'mono' && (
        <div style={{ position:'absolute', left:10, bottom:8, fontFamily:'"IBM Plex Mono", monospace', fontSize:9, color:theme.ink, opacity:0.55, letterSpacing:1, textTransform:'uppercase' }}>
          [photo · {item.cat}]
        </div>
      )}
    </div>
  );
}

function Tag({ kind, theme, lang }) {
  const map = {
    signature: { bg: theme.ink, fg: theme.bg, txt: tr('signature', lang) },
    hot:       { bg: theme.primary, fg: theme.onPrimary, txt: tr('recommended', lang) },
    new:       { bg: theme.accent,  fg: theme.onAccent || theme.ink, txt: tr('new_item', lang) },
  };
  const c = map[kind];
  if (!c) return null;
  return (
    <span style={{
      display:'inline-flex', alignItems:'center', gap:4, fontSize:10, fontWeight:700,
      padding:'3px 7px', borderRadius:4, background:c.bg, color:c.fg,
      letterSpacing:0.5, textTransform:'uppercase',
      fontFamily:'"IBM Plex Mono", monospace',
    }}>
      {kind === 'hot' && <Icon name="flame" size={11}/>}
      {kind === 'signature' && <Icon name="star" size={11}/>}
      {kind === 'new' && <Icon name="spark" size={11}/>}
      {c.txt}
    </span>
  );
}

function Stepper({ value, onChange, min = 1, max = 99, theme, radius }) {
  const Btn = ({ glyph, on, disabled }) => (
    <button onClick={on} disabled={disabled} style={{
      width:36, height:36, border:`1.5px solid ${theme.ink}`, background:'transparent',
      borderRadius: radius >= 18 ? 999 : radius/2, color:theme.ink, fontFamily:'inherit',
      display:'flex', alignItems:'center', justifyContent:'center',
      cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.35 : 1,
    }}>{glyph}</button>
  );
  return (
    <div style={{ display:'inline-flex', alignItems:'center', gap:14 }}>
      <Btn glyph={<Icon name="minus" size={16}/>} on={() => onChange(Math.max(min, value - 1))} disabled={value <= min}/>
      <span style={{ minWidth:24, textAlign:'center', fontWeight:600, fontSize:18, fontVariantNumeric:'tabular-nums' }}>{value}</span>
      <Btn glyph={<Icon name="plus" size={16}/>} on={() => onChange(Math.min(max, value + 1))} disabled={value >= max}/>
    </div>
  );
}

function Btn({ children, on, kind = 'primary', theme, radius, full, disabled, size='md' }) {
  const pads = { sm:'10px 16px', md:'14px 20px', lg:'18px 24px' };
  const sizes = { sm:13, md:15, lg:16 };
  const styles = {
    primary: { background: theme.ink, color: theme.bg, border: `2px solid ${theme.ink}` },
    accent:  { background: theme.primary, color: theme.onPrimary, border: `2px solid ${theme.primary}` },
    ghost:   { background: 'transparent', color: theme.ink, border: `2px solid ${theme.ink}` },
    soft:    { background: theme.bgSoft, color: theme.ink, border: `2px solid transparent` },
  };
  return (
    <button onClick={on} disabled={disabled} style={{
      ...styles[kind],
      padding: pads[size], fontSize: sizes[size],
      fontWeight:700, fontFamily:'inherit', letterSpacing:0.2,
      borderRadius: radius >= 18 ? 999 : radius, cursor:'pointer',
      display:'inline-flex', alignItems:'center', justifyContent:'center', gap:8,
      width: full ? '100%' : undefined, opacity: disabled ? 0.4 : 1,
      transition:'transform .1s, opacity .15s',
    }}
    onMouseDown={(e)=>e.currentTarget.style.transform='scale(.98)'}
    onMouseUp={(e)=>e.currentTarget.style.transform=''}
    onMouseLeave={(e)=>e.currentTarget.style.transform=''}
    >{children}</button>
  );
}

// ─────────────────────────────────────────────────────────────
// Home screen
// ─────────────────────────────────────────────────────────────
function HomeScreen({ theme, radius, lang, go, cartCount }) {
  const Step = ({ n, label }) => (
    <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'14px 0' }}>
      <div style={{
        flexShrink:0, width:30, height:30, borderRadius:999, background:theme.bgSoft,
        display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'"IBM Plex Mono", monospace', fontWeight:700, fontSize:13, color:theme.ink,
      }}>{n}</div>
      <div style={{ paddingTop:5, fontSize:15, fontWeight:500, color:theme.ink }}>{label}</div>
    </div>
  );
  return (
    <div style={{
      minHeight:'100%', background:theme.bg, color:theme.ink, padding:'20px 20px 28px',
      display:'flex', flexDirection:'column', position:'relative', overflow:'hidden',
    }}>
      {/* top bar */}
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
        <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:11, fontWeight:600, letterSpacing:1.5, color:theme.ink, opacity:0.65 }}>
          # {tr('brand', lang)}
        </div>
        <div style={{ display:'inline-flex', alignItems:'center', gap:6, fontFamily:'"IBM Plex Mono", monospace', fontSize:10, color:theme.ink, opacity:0.7 }}>
          <span style={{ display:'inline-block', width:7, height:7, borderRadius:999, background:theme.primary }}/>
          {tr('open_hours', lang)}
        </div>
      </div>

      {/* hero */}
      <div style={{ marginTop:14, marginBottom:18 }}>
        <div style={{
          fontFamily:'"Noto Serif HK", "Noto Serif TC", serif',
          fontSize:64, fontWeight:800, lineHeight:0.92, letterSpacing:-2, color:theme.ink,
        }}>
          {tr('greeting', lang)}
        </div>
        <div style={{ marginTop:14, fontSize:15, color:theme.ink, opacity:0.75, maxWidth:300, lineHeight:1.45 }}>
          {tr('greeting_sub', lang)}
        </div>
      </div>

      {/* Hero image card */}
      <div style={{
        marginTop:6, marginBottom:22, borderRadius:radius, overflow:'hidden', position:'relative',
        background:theme.primary, height:200,
      }}>
        <svg width="100%" height="100%" viewBox="0 0 320 200" preserveAspectRatio="xMidYMid slice" style={{ display:'block', position:'absolute', inset:0 }}>
          <defs>
            <pattern id="hero-stripe" width="22" height="22" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="22" height="22" fill={theme.primary}/>
              <rect width="11" height="22" fill={theme.accent}/>
            </pattern>
          </defs>
          <rect width="320" height="200" fill="url(#hero-stripe)" opacity="0.55"/>
          {/* big chinese mark */}
          <text x="22" y="155" fontFamily='"Noto Serif HK", serif' fontWeight="800" fontSize="170" fill={theme.ink} opacity="0.9">茶</text>
        </svg>
        <div style={{ position:'absolute', right:14, bottom:12, fontFamily:'"IBM Plex Mono", monospace', fontSize:10, color:theme.ink, opacity:0.65, letterSpacing:1 }}>
          EST. 1984 · KOWLOON CITY
        </div>
      </div>

      {/* steps */}
      <div style={{ borderTop:`1px solid ${theme.ink}1a`, borderBottom:`1px solid ${theme.ink}1a`, padding:'2px 0' }}>
        <Step n="01" label={tr('step1', lang)}/>
        <Step n="02" label={tr('step2', lang)}/>
        <Step n="03" label={tr('step3', lang)}/>
      </div>

      <div style={{ flex:1 }}/>

      {/* CTA */}
      <div style={{ marginTop:24, display:'flex', flexDirection:'column', gap:10 }}>
        <Btn theme={theme} radius={radius} kind="accent" size="lg" full on={() => go('menu')}>
          {tr('order_now', lang)}
          <Icon name="arrow" size={20}/>
        </Btn>
        {cartCount > 0 && (
          <Btn theme={theme} radius={radius} kind="ghost" size="md" full on={() => go('cart')}>
            <Icon name="cart" size={16}/> {tr('view_cart', lang)} · {cartCount}
          </Btn>
        )}
        <div style={{ display:'flex', gap:8, marginTop:6, justifyContent:'center', fontFamily:'"IBM Plex Mono", monospace', fontSize:10, opacity:0.5 }}>
          <a href="admin.html" style={{ color:theme.ink, textDecoration:'underline' }}>ADMIN ↗</a>
          <span>·</span>
          <a href="kitchen.html" style={{ color:theme.ink, textDecoration:'underline' }}>KITCHEN ↗</a>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Menu screen — categories + search + grid
// ─────────────────────────────────────────────────────────────
function MenuScreen({ theme, radius, imgStyle, lang, go, cartCount, openItem, initialCat, onCatChange }) {
  const [cat, setCatState] = useState(initialCat || 'all');
  const setCat = (c) => { setCatState(c); onCatChange && onCatChange(c); };
  useEffect(() => { if (initialCat && initialCat !== cat) setCatState(initialCat); }, [initialCat]);
  const [q, setQ] = useState('');
  const filtered = useMemo(() => {
    let r = ITEMS;
    if (cat !== 'all') r = r.filter(i => i.cat === cat);
    if (q.trim()) {
      const qq = q.trim().toLowerCase();
      r = r.filter(i =>
        Object.values(i.name).some(n => n.toLowerCase().includes(qq)) ||
        Object.values(i.sub).some(n => n.toLowerCase().includes(qq))
      );
    }
    return r;
  }, [cat, q]);

  const CategoryPill = ({ id, label, glyph }) => {
    const on = cat === id;
    return (
      <button onClick={() => setCat(id)} style={{
        flexShrink:0, padding:'10px 16px',
        background: on ? theme.ink : 'transparent',
        color: on ? theme.bg : theme.ink,
        border:`1.5px solid ${theme.ink}`, borderRadius: 999,
        fontFamily:'inherit', fontSize:14, fontWeight:600, cursor:'pointer',
        display:'inline-flex', alignItems:'center', gap:7,
      }}>
        {glyph && <span style={{ fontFamily:'"Noto Serif HK", serif', fontWeight:700 }}>{glyph}</span>}
        {label}
      </button>
    );
  };

  return (
    <div style={{ minHeight:'100%', background:theme.bg, color:theme.ink, display:'flex', flexDirection:'column' }}>
      {/* header */}
      <div style={{ padding:'18px 20px 8px', position:'sticky', top:0, background:theme.bg, zIndex:5 }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
          <button onClick={() => go('home')} style={{
            background:'transparent', border:0, padding:0, cursor:'pointer', color:theme.ink,
            display:'inline-flex', alignItems:'center', gap:4, fontSize:14, fontWeight:600, fontFamily:'inherit',
          }}>
            <Icon name="back" size={18}/> {tr('back', lang)}
          </button>
          <button onClick={() => go('cart')} style={{
            position:'relative', background:'transparent', border:0, cursor:'pointer', color:theme.ink,
          }}>
            <Icon name="cart" size={22}/>
            {cartCount > 0 && (
              <span style={{
                position:'absolute', top:-4, right:-6, minWidth:18, height:18, padding:'0 5px',
                background:theme.primary, color:theme.onPrimary, fontSize:10, fontWeight:700,
                borderRadius:999, display:'inline-flex', alignItems:'center', justifyContent:'center',
                fontFamily:'"IBM Plex Mono", monospace',
              }}>{cartCount}</span>
            )}
          </button>
        </div>

        <div style={{
          fontFamily:'"Noto Serif HK", "Noto Serif TC", serif', fontSize:38, fontWeight:800, letterSpacing:-1.2, lineHeight:1,
          marginBottom:14,
        }}>
          {lang==='en' ? 'Menu' : '餐單'}
          <span style={{ marginLeft:8, fontFamily:'"IBM Plex Mono", monospace', fontSize:14, fontWeight:500, opacity:0.45 }}>
            / {filtered.length.toString().padStart(2,'0')}
          </span>
        </div>

        {/* Search */}
        <div style={{
          display:'flex', alignItems:'center', gap:10, padding:'12px 14px',
          background:theme.bgSoft, borderRadius:radius >= 18 ? 999 : radius, marginBottom:14,
        }}>
          <Icon name="search" size={18} stroke={theme.ink}/>
          <input
            value={q} onChange={e => setQ(e.target.value)}
            placeholder={tr('search_ph', lang)}
            style={{
              flex:1, border:0, outline:'none', background:'transparent', color:theme.ink,
              fontFamily:'inherit', fontSize:14,
            }}
          />
          {q && (
            <button onClick={() => setQ('')} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, opacity:0.6, padding:0 }}>
              <Icon name="close" size={16}/>
            </button>
          )}
        </div>

        {/* Categories */}
        <div style={{ display:'flex', gap:8, overflowX:'auto', marginLeft:-20, marginRight:-20, padding:'0 20px 14px', scrollbarWidth:'none' }}>
          <CategoryPill id="all" label={tr('all_items', lang)}/>
          {CATS.map(c => <CategoryPill key={c.id} id={c.id} label={c.label[lang]} glyph={c.glyph}/>)}
        </div>
      </div>

      {/* Item list */}
      <div style={{ padding:'4px 20px 24px', flex:1 }}>
        {filtered.length === 0 ? (
          <div style={{ padding:'48px 0', textAlign:'center', opacity:0.55, fontSize:14 }}>
            {tr('no_results', lang).replace('{q}', q)}
          </div>
        ) : (
          <div style={{ display:'grid', gridTemplateColumns:'1fr', gap:12 }}>
            {filtered.map(it => <MenuCard key={it.id} item={it} theme={theme} radius={radius} imgStyle={imgStyle} lang={lang} on={() => openItem(it.id)}/>)}
          </div>
        )}
      </div>
    </div>
  );
}

function MenuCard({ item, theme, radius, imgStyle, lang, on }) {
  return (
    <button onClick={on} style={{
      display:'flex', gap:14, padding:10, alignItems:'stretch',
      background:theme.card, border:`1px solid ${theme.line}`, borderRadius:radius,
      cursor:'pointer', textAlign:'left', color:theme.ink, fontFamily:'inherit',
      width:'100%', boxShadow: theme.shadow,
    }}>
      <div style={{ width:90, flexShrink:0, borderRadius: Math.max(0, radius - 6), overflow:'hidden' }}>
        <Placeholder item={item} theme={theme} imgStyle={imgStyle} h={90} label={false} lang={lang}/>
      </div>
      <div style={{ flex:1, minWidth:0, display:'flex', flexDirection:'column', justifyContent:'space-between', padding:'2px 0' }}>
        <div>
          <div style={{ display:'flex', gap:6, marginBottom:6, flexWrap:'wrap' }}>
            {item.tags.map(t => <Tag key={t} kind={t} theme={theme} lang={lang}/>)}
          </div>
          <div style={{ fontSize:16, fontWeight:700, lineHeight:1.2, marginBottom:2 }}>{item.name[lang]}</div>
          <div style={{ fontSize:12, opacity:0.6, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{item.sub[lang]}</div>
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:6 }}>
          <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:15, fontWeight:700, color:theme.primary }}>{fmt(item.price)}</div>
          <div style={{ width:30, height:30, borderRadius:999, background:theme.ink, color:theme.bg, display:'inline-flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="plus" size={16} stroke={theme.bg} sw={2.2}/>
          </div>
        </div>
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Detail screen — image, customisations, add to cart
// ─────────────────────────────────────────────────────────────
function DetailScreen({ itemId, theme, radius, imgStyle, lang, go, addToCart }) {
  const item = ITEMS.find(i => i.id === itemId);
  const [sel, setSel] = useState(() => defaultSelection(item));
  const [qty, setQty] = useState(1);
  const [flash, setFlash] = useState(false);

  if (!item) return null;
  const totalPrice = linePrice({ itemId, sel, qty });

  const pick = (groupId, optId, multi) => {
    setSel(s => {
      if (multi) {
        const arr = Array.isArray(s[groupId]) ? s[groupId] : [];
        return { ...s, [groupId]: arr.includes(optId) ? arr.filter(x => x !== optId) : [...arr, optId] };
      }
      return { ...s, [groupId]: optId };
    });
  };

  const add = () => {
    addToCart({ itemId, sel, qty });
    setFlash(true);
    setTimeout(() => { setFlash(false); go('cart'); }, 600);
  };

  return (
    <div style={{ minHeight:'100%', background:theme.bg, color:theme.ink, display:'flex', flexDirection:'column', position:'relative' }}>
      {/* image header w/ back button */}
      <div style={{ position:'relative' }}>
        <Placeholder item={item} theme={theme} imgStyle={imgStyle} h={280} label={false} lang={lang}/>
        <button onClick={() => go('menu')} style={{
          position:'absolute', top:18, left:16, width:40, height:40, borderRadius:999,
          background:theme.bg, border:0, cursor:'pointer', color:theme.ink,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 2px 8px rgba(0,0,0,.15)',
        }}>
          <Icon name="back" size={20}/>
        </button>
        <button onClick={() => go('cart')} style={{
          position:'absolute', top:18, right:16, width:40, height:40, borderRadius:999,
          background:theme.bg, border:0, cursor:'pointer', color:theme.ink,
          display:'flex', alignItems:'center', justifyContent:'center',
          boxShadow:'0 2px 8px rgba(0,0,0,.15)',
        }}>
          <Icon name="cart" size={20}/>
        </button>
      </div>

      {/* content */}
      <div style={{ flex:1, padding:'20px 20px 140px' }}>
        <div style={{ display:'flex', gap:6, marginBottom:10, flexWrap:'wrap' }}>
          {item.tags.map(t => <Tag key={t} kind={t} theme={theme} lang={lang}/>)}
        </div>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:14 }}>
          <h1 style={{
            margin:0, fontFamily:'"Noto Serif HK", "Noto Serif TC", serif',
            fontSize:34, fontWeight:800, letterSpacing:-1, lineHeight:1.05,
          }}>{item.name[lang]}</h1>
          <div style={{
            fontFamily:'"IBM Plex Mono", monospace', fontSize:22, fontWeight:700,
            color:theme.primary, whiteSpace:'nowrap', paddingTop:6,
          }}>{fmt(item.price)}</div>
        </div>
        <div style={{ marginTop:6, fontSize:13, opacity:0.6, fontStyle:'italic' }}>{item.sub[lang]}</div>
        <p style={{ marginTop:14, fontSize:14, lineHeight:1.55, opacity:0.85 }}>{item.desc[lang]}</p>

        {/* options */}
        {(item.custom || []).map(g => (
          <OptionGroup key={g.id} g={g} sel={sel[g.id]} onPick={(id) => pick(g.id, id, g.multi)} theme={theme} radius={radius} lang={lang}/>
        ))}

        {/* qty */}
        <div style={{ marginTop:24, borderTop:`1px solid ${theme.line}`, paddingTop:18, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ fontSize:13, fontWeight:600, textTransform:'uppercase', letterSpacing:1, opacity:0.7, fontFamily:'"IBM Plex Mono", monospace' }}>
            {tr('qty', lang)}
          </div>
          <Stepper value={qty} onChange={setQty} theme={theme} radius={radius}/>
        </div>
      </div>

      {/* sticky add to cart */}
      <div style={{
        position:'sticky', bottom:0, left:0, right:0, padding:'14px 20px 18px',
        background:`linear-gradient(180deg, ${theme.bg}00 0%, ${theme.bg} 22%)`,
      }}>
        <Btn theme={theme} radius={radius} kind="accent" size="lg" full on={add} disabled={flash}>
          {flash ? <><Icon name="check" size={20}/> {tr('added', lang)}</> : (
            <>
              {tr('add_to_cart', lang)}
              <span style={{ marginLeft:'auto', fontFamily:'"IBM Plex Mono", monospace' }}>{fmt(totalPrice)}</span>
            </>
          )}
        </Btn>
      </div>
    </div>
  );
}

function OptionGroup({ g, sel, onPick, theme, radius, lang }) {
  return (
    <div style={{ marginTop:24 }}>
      <div style={{ display:'flex', alignItems:'baseline', justifyContent:'space-between', marginBottom:10 }}>
        <div style={{ fontSize:15, fontWeight:700 }}>{g.label[lang]}</div>
        <div style={{
          fontSize:10, fontWeight:700, textTransform:'uppercase', letterSpacing:1,
          color: g.required ? theme.primary : theme.ink, opacity: g.required ? 1 : 0.5,
          fontFamily:'"IBM Plex Mono", monospace',
        }}>
          {g.required ? tr('required', lang) : tr('optional', lang)}
          {g.multi && ' · multi'}
        </div>
      </div>
      <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
        {g.opts.map(o => {
          const on = g.multi ? (Array.isArray(sel) && sel.includes(o.id)) : sel === o.id;
          return (
            <button key={o.id} onClick={() => onPick(o.id)} style={{
              padding:'10px 14px',
              background: on ? theme.ink : 'transparent',
              color: on ? theme.bg : theme.ink,
              border:`1.5px solid ${on ? theme.ink : theme.ink + '33'}`,
              borderRadius: radius >= 18 ? 999 : Math.max(8, radius/1.8),
              fontFamily:'inherit', fontSize:13, fontWeight:600, cursor:'pointer',
              display:'inline-flex', alignItems:'center', gap:6,
            }}>
              {o.label[lang]}
              {o.price > 0 && <span style={{ opacity:0.7, fontFamily:'"IBM Plex Mono", monospace', fontSize:11 }}>+${o.price}</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Cart screen
// ─────────────────────────────────────────────────────────────
function CartScreen({ cart, theme, radius, imgStyle, lang, go, updateQty, removeEntry }) {
  const subtotal = cart.reduce((s, e) => s + linePrice(e), 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;

  return (
    <div style={{ minHeight:'100%', background:theme.bg, color:theme.ink, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'18px 20px 6px' }}>
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:18 }}>
          <button onClick={() => go('menu')} style={{
            background:'transparent', border:0, padding:0, cursor:'pointer', color:theme.ink,
            display:'inline-flex', alignItems:'center', gap:4, fontSize:14, fontWeight:600, fontFamily:'inherit',
          }}>
            <Icon name="back" size={18}/> {tr('back', lang)}
          </button>
          <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:11, opacity:0.55 }}>
            {cart.reduce((s,e) => s + e.qty, 0)} {tr('items_in_cart', lang)}
          </div>
        </div>
        <h1 style={{
          margin:0, fontFamily:'"Noto Serif HK", "Noto Serif TC", serif',
          fontSize:38, fontWeight:800, letterSpacing:-1.2, lineHeight:1,
        }}>{tr('cart', lang)}</h1>
      </div>

      {cart.length === 0 ? (
        <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', padding:'40px 24px' }}>
          <div style={{
            width:80, height:80, borderRadius:999, background:theme.bgSoft,
            display:'flex', alignItems:'center', justifyContent:'center', marginBottom:18,
          }}>
            <Icon name="cart" size={36} stroke={theme.ink}/>
          </div>
          <div style={{ fontSize:18, fontWeight:700, marginBottom:6 }}>{tr('empty_cart', lang)}</div>
          <div style={{ fontSize:13, opacity:0.6, marginBottom:22 }}>{tr('empty_hint', lang)}</div>
          <Btn theme={theme} radius={radius} kind="primary" size="md" on={() => go('menu')}>
            {tr('order_now', lang)}
          </Btn>
        </div>
      ) : (
        <>
          <div style={{ flex:1, padding:'14px 20px 20px', display:'flex', flexDirection:'column', gap:10 }}>
            {cart.map((e, idx) => {
              const it = ITEMS.find(i => i.id === e.itemId);
              const summary = summariseSel(it, e.sel, lang);
              return (
                <div key={idx} style={{
                  display:'flex', gap:12, padding:12, background:theme.card,
                  border:`1px solid ${theme.line}`, borderRadius:radius, boxShadow:theme.shadow,
                }}>
                  <div style={{ width:60, flexShrink:0, borderRadius:Math.max(0, radius - 6), overflow:'hidden' }}>
                    <Placeholder item={it} theme={theme} imgStyle={imgStyle} h={60} label={false} lang={lang}/>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:'flex', justifyContent:'space-between', gap:8, alignItems:'flex-start' }}>
                      <div style={{ fontSize:15, fontWeight:700, lineHeight:1.2 }}>{it.name[lang]}</div>
                      <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:14, fontWeight:700, color:theme.primary, whiteSpace:'nowrap' }}>
                        {fmt(linePrice(e))}
                      </div>
                    </div>
                    {summary && <div style={{ fontSize:11, opacity:0.6, marginTop:4 }}>{summary}</div>}
                    <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginTop:10 }}>
                      <div style={{ display:'inline-flex', alignItems:'center', gap:8, padding:'4px 10px', background:theme.bgSoft, borderRadius:999 }}>
                        <button onClick={() => updateQty(idx, Math.max(1, e.qty - 1))} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, padding:0, display:'flex' }}>
                          <Icon name="minus" size={14}/>
                        </button>
                        <span style={{ minWidth:18, textAlign:'center', fontWeight:700, fontSize:13, fontVariantNumeric:'tabular-nums' }}>{e.qty}</span>
                        <button onClick={() => updateQty(idx, e.qty + 1)} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, padding:0, display:'flex' }}>
                          <Icon name="plus" size={14}/>
                        </button>
                      </div>
                      <button onClick={() => removeEntry(idx)} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, opacity:0.55, fontSize:12, fontFamily:'inherit', display:'inline-flex', alignItems:'center', gap:4 }}>
                        <Icon name="trash" size={14}/> {tr('remove', lang)}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* totals */}
          <div style={{ padding:'14px 20px 18px', background:theme.bg, borderTop:`1px solid ${theme.line}` }}>
            <Row label={tr('subtotal', lang)} value={fmt(subtotal)} theme={theme}/>
            <Row label={tr('service', lang)} value={fmt(service)} theme={theme} muted/>
            <Row label={tr('total', lang)} value={fmt(total)} theme={theme} big/>
            <div style={{ marginTop:14 }}>
              <Btn theme={theme} radius={radius} kind="accent" size="lg" full on={() => go('checkout')}>
                {tr('checkout', lang)}
                <Icon name="arrow" size={20}/>
              </Btn>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Row({ label, value, theme, big, muted }) {
  return (
    <div style={{
      display:'flex', justifyContent:'space-between', alignItems:'baseline',
      padding:big ? '8px 0 0' : '5px 0',
      fontSize: big ? 17 : 13,
      fontWeight: big ? 800 : 500,
      opacity: muted ? 0.6 : 1,
    }}>
      <span>{label}</span>
      <span style={{ fontFamily:'"IBM Plex Mono", monospace', color: big ? theme.primary : 'inherit' }}>{value}</span>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Checkout screen
// ─────────────────────────────────────────────────────────────
function CheckoutScreen({ cart, theme, radius, lang, go, placeOrder }) {
  const [tableNo, setTableNo] = useState('');
  const [payment, setPayment] = useState('online');
  const [diningMode, setDiningMode] = useState('dine_in');
  const [notes, setNotes] = useState('');
  const subtotal = cart.reduce((s,e) => s + linePrice(e), 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;
  const isTakeout = diningMode === 'takeout';
  const canSubmit = isTakeout ? true : (tableNo.trim().length > 0 && /^\d{1,3}$/.test(tableNo.trim()));

  return (
    <div style={{ minHeight:'100%', background:theme.bg, color:theme.ink, display:'flex', flexDirection:'column' }}>
      <div style={{ padding:'18px 20px 6px' }}>
        <button onClick={() => go('cart')} style={{
          background:'transparent', border:0, padding:0, cursor:'pointer', color:theme.ink, marginBottom:14,
          display:'inline-flex', alignItems:'center', gap:4, fontSize:14, fontWeight:600, fontFamily:'inherit',
        }}>
          <Icon name="back" size={18}/> {tr('back', lang)}
        </button>
        <h1 style={{ margin:0, fontFamily:'"Noto Serif HK", "Noto Serif TC", serif', fontSize:36, fontWeight:800, letterSpacing:-1, lineHeight:1 }}>
          {tr('checkout', lang)}
        </h1>
      </div>

      <div style={{ flex:1, padding:'20px 20px 140px', display:'flex', flexDirection:'column', gap:22 }}>
        {/* Dining mode */}
        <Section title={lang==='en' ? 'Dining' : '用餐方式'} theme={theme}>
          <SegRadio value={diningMode} onChange={setDiningMode} theme={theme} radius={radius}
            opts={[
              { id:'dine_in', label: tr('dine_in', lang) },
              { id:'takeout', label: tr('takeout', lang) },
            ]}
          />
        </Section>

        {/* Table number — dine-in only */}
        {!isTakeout && (
          <Section title={tr('table_no', lang)} theme={theme} required>
            <input
              type="text" inputMode="numeric" pattern="[0-9]*" value={tableNo}
              onChange={(e) => setTableNo(e.target.value.replace(/\D/g, '').slice(0,3))}
              placeholder={tr('table_ph', lang)}
              style={{
                width:'100%', padding:'16px 18px', fontSize:24, fontWeight:700,
                background:theme.bgSoft, border:`2px solid ${tableNo ? theme.ink : 'transparent'}`,
                borderRadius:radius, color:theme.ink, fontFamily:'"IBM Plex Mono", monospace',
                outline:'none', letterSpacing:2, boxSizing:'border-box',
              }}
            />
          </Section>
        )}

        {/* Payment */}
        <Section title={tr('payment', lang)} theme={theme} required>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            <PaymentOption
              on={() => setPayment('online')} active={payment==='online'} theme={theme} radius={radius}
              icon="phone" title={tr('pay_online', lang)} sub={tr('pay_subtitle_online', lang)}
            />
            <PaymentOption
              on={() => setPayment('cash')} active={payment==='cash'} theme={theme} radius={radius}
              icon="money" title={tr('pay_cash', lang)} sub={tr('pay_subtitle_cash', lang)}
            />
          </div>
        </Section>

        {/* Notes */}
        <Section title={tr('notes_label', lang)} theme={theme}>
          <textarea
            value={notes} onChange={(e) => setNotes(e.target.value)}
            placeholder={tr('notes_ph', lang)} rows={3}
            style={{
              width:'100%', padding:'12px 14px', fontSize:14,
              background:theme.bgSoft, border:`1px solid ${theme.line}`,
              borderRadius:radius, color:theme.ink, fontFamily:'inherit',
              outline:'none', resize:'vertical', boxSizing:'border-box',
            }}
          />
        </Section>

        {/* Order summary */}
        <Section title={lang==='en'?'Summary':'訂單摘要'} theme={theme}>
          <div style={{ background:theme.bgSoft, borderRadius:radius, padding:'14px 16px' }}>
            {cart.map((e, i) => {
              const it = ITEMS.find(i => i.id === e.itemId);
              return (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', padding:'6px 0', fontSize:13, borderBottom: i<cart.length-1 ? `1px dashed ${theme.line}` : 0 }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontWeight:600 }}>{it.name[lang]} <span style={{ opacity:0.5, marginLeft:4 }}>×{e.qty}</span></div>
                    {summariseSel(it, e.sel, lang) && <div style={{ fontSize:11, opacity:0.55 }}>{summariseSel(it, e.sel, lang)}</div>}
                  </div>
                  <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontWeight:700, marginLeft:10 }}>{fmt(linePrice(e))}</div>
                </div>
              );
            })}
            <div style={{ marginTop:6 }}>
              <Row label={tr('subtotal', lang)} value={fmt(subtotal)} theme={theme}/>
              <Row label={tr('service', lang)} value={fmt(service)} theme={theme} muted/>
              <Row label={tr('total', lang)} value={fmt(total)} theme={theme} big/>
            </div>
          </div>
        </Section>
      </div>

      <div style={{
        position:'sticky', bottom:0, left:0, right:0, padding:'14px 20px 18px',
        background:`linear-gradient(180deg, ${theme.bg}00 0%, ${theme.bg} 22%)`,
      }}>
        <Btn theme={theme} radius={radius} kind="accent" size="lg" full
             disabled={!canSubmit}
             on={() => placeOrder({ tableNo: isTakeout ? '—' : tableNo, payment, diningMode, notes, total })}>
          {tr('place_order', lang)} · {fmt(total)}
          <Icon name="arrow" size={20}/>
        </Btn>
      </div>
    </div>
  );
}

function Section({ title, theme, required, children }) {
  return (
    <div>
      <div style={{ display:'flex', alignItems:'baseline', gap:8, marginBottom:10 }}>
        <div style={{
          fontFamily:'"IBM Plex Mono", monospace', fontSize:11, fontWeight:700,
          textTransform:'uppercase', letterSpacing:1.5, color:theme.ink, opacity:0.75,
        }}>{title}</div>
        {required && <span style={{
          fontFamily:'"IBM Plex Mono", monospace', fontSize:9, fontWeight:700,
          color:theme.primary, letterSpacing:1,
        }}>*</span>}
      </div>
      {children}
    </div>
  );
}

function SegRadio({ value, onChange, opts, theme, radius }) {
  return (
    <div style={{ display:'flex', gap:8 }}>
      {opts.map(o => {
        const on = value === o.id;
        return (
          <button key={o.id} onClick={() => onChange(o.id)} style={{
            flex:1, padding:'14px 12px', textAlign:'center',
            background: on ? theme.ink : 'transparent',
            color: on ? theme.bg : theme.ink,
            border:`1.5px solid ${on ? theme.ink : theme.ink + '33'}`,
            borderRadius:radius, fontFamily:'inherit', fontSize:14, fontWeight:600, cursor:'pointer',
          }}>{o.label}</button>
        );
      })}
    </div>
  );
}

function PaymentOption({ on, active, theme, radius, icon, title, sub }) {
  return (
    <button onClick={on} style={{
      display:'flex', alignItems:'center', gap:14, padding:'14px 16px',
      background: active ? theme.bgSoft : 'transparent',
      border:`2px solid ${active ? theme.ink : theme.line}`,
      borderRadius:radius, color:theme.ink, cursor:'pointer', textAlign:'left', fontFamily:'inherit',
    }}>
      <div style={{ width:38, height:38, borderRadius:999, background: active ? theme.ink : 'transparent', border:`1.5px solid ${active ? theme.ink : theme.line}`, color: active ? theme.bg : theme.ink, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
        <Icon name={icon} size={18}/>
      </div>
      <div style={{ flex:1, minWidth:0 }}>
        <div style={{ fontSize:14, fontWeight:700 }}>{title}</div>
        <div style={{ fontSize:11, opacity:0.6, marginTop:2 }}>{sub}</div>
      </div>
      <div style={{ width:20, height:20, borderRadius:999, border:`2px solid ${active ? theme.primary : theme.line}`, background: active ? theme.primary : 'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>
        {active && <Icon name="check" size={12} stroke={theme.onPrimary} sw={3}/>}
      </div>
    </button>
  );
}

// ─────────────────────────────────────────────────────────────
// Confirmation screen
// ─────────────────────────────────────────────────────────────
function ConfirmScreen({ order, theme, radius, lang, go }) {
  return (
    <div style={{ minHeight:'100%', background:theme.bg, color:theme.ink, display:'flex', flexDirection:'column', padding:'20px' }}>
      {/* big check */}
      <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'20px 0' }}>
        <div style={{
          width:96, height:96, borderRadius:999, background:theme.primary, color:theme.onPrimary,
          display:'flex', alignItems:'center', justifyContent:'center', marginBottom:24,
          animation:'pop .4s cubic-bezier(.3,1.4,.5,1) both',
        }}>
          <Icon name="check" size={48} stroke={theme.onPrimary} sw={3}/>
        </div>
        <h1 style={{ margin:'0 0 8px', fontFamily:'"Noto Serif HK", serif', fontSize:32, fontWeight:800, letterSpacing:-1, lineHeight:1.1 }}>
          {tr('order_received', lang)}
        </h1>
        <div style={{ fontSize:14, opacity:0.7, marginBottom:24 }}>{tr('prep_time', lang)}</div>

        {/* receipt-style summary */}
        <div style={{
          width:'100%', background:theme.card, border:`1px solid ${theme.line}`,
          borderRadius:radius, padding:'18px 18px 16px', boxShadow:theme.shadow,
          textAlign:'left', fontFamily:'"IBM Plex Mono", monospace',
        }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, opacity:0.6, paddingBottom:10, borderBottom:`1px dashed ${theme.line}` }}>
            <span>{tr('order_no', lang)} #{order.orderNo}</span>
            <span>{order.time}</span>
          </div>
          {order.diningMode !== 'takeout' && <SumRow k={tr('table_no', lang)} v={`# ${order.tableNo}`} big theme={theme}/>}
          <SumRow k={lang==='en'?'Dining':'用餐'} v={tr(order.diningMode, lang)} theme={theme}/>
          <SumRow k={tr('payment', lang)} v={order.payment==='online' ? tr('pay_online', lang) : tr('pay_cash', lang)} theme={theme}/>
          <SumRow k={tr('est_time', lang)} v="~ 12 min" theme={theme}/>
          <div style={{ marginTop:10, paddingTop:10, borderTop:`1px dashed ${theme.line}`, display:'flex', justifyContent:'space-between' }}>
            <span style={{ fontWeight:700 }}>{tr('total', lang)}</span>
            <span style={{ fontWeight:700, color:theme.primary }}>{fmt(order.total)}</span>
          </div>
        </div>

        {order.payment === 'online' && (
          <div style={{ marginTop:14, padding:'10px 14px', background:theme.bgSoft, borderRadius:radius, fontSize:12, opacity:0.75, display:'inline-flex', alignItems:'center', gap:8, fontFamily:'"IBM Plex Mono", monospace' }}>
            <Icon name="check" size={14}/> {lang==='en' ? 'Payment confirmed' : '已完成付款'}
          </div>
        )}
      </div>

      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        <Btn theme={theme} radius={radius} kind="primary" size="md" full on={() => go('home')}>
          {tr('start_new', lang)}
        </Btn>
      </div>

      <style>{`@keyframes pop { 0% { transform: scale(0); opacity:0 } 60% { transform: scale(1.15); opacity:1 } 100% { transform: scale(1); opacity:1 } }`}</style>
    </div>
  );
}

function SumRow({ k, v, big, theme }) {
  return (
    <div style={{ display:'flex', justifyContent:'space-between', padding: big ? '10px 0 6px' : '5px 0', fontSize: big ? 14 : 12, alignItems:'baseline' }}>
      <span style={{ opacity:0.6 }}>{k}</span>
      <span style={{ fontWeight: big ? 700 : 500, color: big ? theme.ink : 'inherit', fontSize: big ? 16 : 12 }}>{v}</span>
    </div>
  );
}

Object.assign(window, { HomeScreen, MenuScreen, DetailScreen, CartScreen, CheckoutScreen, ConfirmScreen });
