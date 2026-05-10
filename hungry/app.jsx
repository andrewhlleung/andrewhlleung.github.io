// app.jsx — main App: state machine, themes, language, Tweaks, device-frame wrapper

const { useState: useS, useEffect: useE, useMemo: useM, useRef: useR } = React;

// ─────────────────────────────────────────────────────────────
// Theme presets — three vibrant-contrast directions
// ─────────────────────────────────────────────────────────────
const THEMES = {
  cafe_red: {
    name: { 'zh-TW': '茶記紅', 'zh-CN': '茶记红', en: 'Cafe Red' },
    bg:      '#FFF8EE',
    bgSoft:  '#F1E9D8',
    ink:     '#1A1410',
    primary: '#E63946',
    onPrimary: '#FFFFFF',
    accent:  '#FFC93C',
    onAccent: '#1A1410',
    card:    '#FFFFFF',
    line:    '#E5DBC4',
    shadow:  '0 1px 0 rgba(26,20,16,.04)',
  },
  dark_lime: {
    name: { 'zh-TW': '暗夜檸茶', 'zh-CN': '暗夜柠茶', en: 'Dark Lime' },
    bg:      '#0F1014',
    bgSoft:  '#1B1D24',
    ink:     '#FFFCE6',
    primary: '#E7FF52',
    onPrimary: '#0F1014',
    accent:  '#FF6B35',
    onAccent: '#0F1014',
    card:    '#1B1D24',
    line:    '#2A2D38',
    shadow:  '0 1px 0 rgba(0,0,0,.3)',
  },
  mint_pop: {
    name: { 'zh-TW': '薄荷', 'zh-CN': '薄荷', en: 'Mint Pop' },
    bg:      '#F0F7F4',
    bgSoft:  '#DCEAE3',
    ink:     '#0A2A1F',
    primary: '#00B886',
    onPrimary: '#FFFFFF',
    accent:  '#FF4D8D',
    onAccent: '#FFFFFF',
    card:    '#FFFFFF',
    line:    '#CFDED7',
    shadow:  '0 1px 0 rgba(10,42,31,.04)',
  },
};

const FONTS = {
  cantonese: { stack: '"Noto Sans HK", "Noto Sans TC", "Noto Sans SC", system-ui, sans-serif', label: 'Noto Sans HK' },
  modern:    { stack: '"Manrope", "Noto Sans HK", system-ui, sans-serif', label: 'Manrope' },
  classic:   { stack: '"IBM Plex Sans", "Noto Sans HK", system-ui, sans-serif', label: 'IBM Plex Sans' },
};

const LANGS = [
  { id: 'zh-TW', short: '繁', label: '繁體中文' },
  { id: 'zh-CN', short: '简', label: '简体中文' },
  { id: 'en',    short: 'EN', label: 'English' },
];

// ─────────────────────────────────────────────────────────────
// Defaults — wrap in EDITMODE markers for tweaks persistence
// ─────────────────────────────────────────────────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "cafe_red",
  "font": "cantonese",
  "radius": 16,
  "imgStyle": "stripe",
  "device": "mobile",
  "lang": "zh-TW"
}/*EDITMODE-END*/;

// ─────────────────────────────────────────────────────────────
// Mobile frame — iOS device wrapper
// ─────────────────────────────────────────────────────────────
function PhoneFrame({ theme, children }) {
  const isDark = theme.bg === '#0F1014';
  return (
    <div style={{
      width: 402, height: 874, borderRadius: 48, overflow: 'hidden',
      position: 'relative', background: theme.bg,
      boxShadow: '0 40px 80px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.12)',
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position:'absolute', top:11, left:'50%', transform:'translateX(-50%)',
        width:126, height:37, borderRadius:24, background:'#000', zIndex:50,
      }}/>
      {/* status bar */}
      <div style={{ position:'absolute', top:0, left:0, right:0, zIndex:10 }}>
        <IOSStatusBar dark={isDark} time="12:34"/>
      </div>
      {/* content scroll area */}
      <div style={{ height:'100%', overflow:'auto', paddingTop:54 }}>
        {children}
      </div>
      {/* home indicator */}
      <div style={{
        position:'absolute', bottom:0, left:0, right:0, zIndex:60,
        height:34, display:'flex', justifyContent:'center', alignItems:'flex-end',
        paddingBottom:8, pointerEvents:'none',
      }}>
        <div style={{
          width:139, height:5, borderRadius:100,
          background: isDark ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.25)',
        }}/>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Desktop frame — kiosk layout in a browser window
// ─────────────────────────────────────────────────────────────
function DesktopFrame({ theme, children, url }) {
  const isDark = theme.bg === '#0F1014';
  return (
    <ChromeWindow url={url || 'order.chakee.hk'} dark={isDark} width={1180} height={760}>
      <div style={{ width: 1180, height: 700, background: theme.bg, color: theme.ink, overflow:'hidden', position:'relative' }}>
        {children}
      </div>
    </ChromeWindow>
  );
}

// ─────────────────────────────────────────────────────────────
// Desktop kiosk shell — sticks left sidebar with categories + persistent cart
// ─────────────────────────────────────────────────────────────
function DesktopApp({ theme, radius, imgStyle, lang, screen, currentItem, setCurrentItem, cart, order, ...handlers }) {
  // Mid-bottom area shows menu/detail; right rail shows cart always.
  // Home, checkout, confirm take over the whole frame.
  if (screen === 'home') return (
    <DesktopHome theme={theme} radius={radius} lang={lang} go={handlers.go} cartCount={cart.reduce((s,e)=>s+e.qty,0)}/>
  );
  if (screen === 'checkout') return (
    <CheckoutScreen cart={cart} theme={theme} radius={radius} lang={lang}
                    go={handlers.go} placeOrder={handlers.placeOrder}/>
  );
  if (screen === 'confirm') return (
    <ConfirmScreen order={order} theme={theme} radius={radius} lang={lang} go={handlers.go}/>
  );
  // menu / detail / cart → split layout
  return (
    <div style={{ display:'flex', height:'100%' }}>
      {/* left sidebar */}
      <DesktopSidebar theme={theme} lang={lang} go={handlers.go} screen={screen}
                      menuCat={handlers.menuCat} setMenuCat={handlers.setMenuCat}/>
      {/* center */}
      <div style={{ flex:1, overflow:'auto', minWidth:0 }}>
        {(screen === 'menu' || screen === 'cart') && (
          <MenuScreen theme={theme} radius={radius} imgStyle={imgStyle} lang={lang}
                      go={handlers.go} openItem={handlers.openItem}
                      initialCat={handlers.menuCat} onCatChange={handlers.setMenuCat}
                      cartCount={cart.reduce((s,e)=>s+e.qty,0)}/>
        )}
        {screen === 'detail' && currentItem && (
          <DetailScreen itemId={currentItem} theme={theme} radius={radius} imgStyle={imgStyle} lang={lang}
                        go={handlers.go} addToCart={handlers.addToCart}/>
        )}
      </div>
      {/* right rail — always-visible cart */}
      <DesktopCartRail cart={cart} theme={theme} radius={radius} imgStyle={imgStyle} lang={lang}
                       go={handlers.go} updateQty={handlers.updateQty} removeEntry={handlers.removeEntry}/>
    </div>
  );
}

function DesktopSidebar({ theme, lang, go, screen, menuCat, setMenuCat }) {
  const SideBtn = ({ id, glyph, label }) => {
    const active = screen === 'menu' && menuCat === id;
    return (
      <button onClick={() => { setMenuCat(id); go('menu'); }} style={{
        width:60, padding:'10px 0', borderRadius:10,
        background: active ? theme.ink : 'transparent',
        color: active ? theme.bg : theme.ink,
        border:0, cursor:'pointer', display:'flex', flexDirection:'column', alignItems:'center', gap:3,
        transition:'background .15s',
      }}
      onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = theme.bgSoft; }}
      onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
      >
        <span style={{ fontFamily:'"Noto Serif HK", serif', fontWeight:700, fontSize:18 }}>{glyph}</span>
        <span style={{ fontSize:10, opacity:0.75, fontWeight:500 }}>{label}</span>
      </button>
    );
  };
  return (
    <div style={{
      width:80, flexShrink:0, background:theme.card, borderRight:`1px solid ${theme.line}`,
      display:'flex', flexDirection:'column', alignItems:'center', padding:'20px 0', gap:6,
    }}>
      <button onClick={() => go('home')} title={lang==='en'?'Home':'首頁'} style={{
        width:44, height:44, borderRadius:12, background:theme.ink, color:theme.bg,
        border:0, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center',
        fontFamily:'"Noto Serif HK", serif', fontWeight:800, fontSize:22, marginBottom:10,
      }}>茶</button>
      <SideBtn id="all" glyph="全" label={tr('all_items', lang)}/>
      {CATS.map(c => <SideBtn key={c.id} id={c.id} glyph={c.glyph} label={c.label[lang]}/>)}
      <div style={{ flex:1 }}/>
      <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:9, opacity:0.4, writingMode:'vertical-rl', transform:'rotate(180deg)', letterSpacing:2 }}>
        CHAKEE 0823
      </div>
    </div>
  );
}

function DesktopCartRail({ cart, theme, radius, imgStyle, lang, go, updateQty, removeEntry }) {
  const subtotal = cart.reduce((s, e) => s + linePrice(e), 0);
  const service = subtotal * 0.1;
  const total = subtotal + service;
  return (
    <div style={{
      width:340, flexShrink:0, background:theme.card, borderLeft:`1px solid ${theme.line}`,
      display:'flex', flexDirection:'column', minHeight:0,
    }}>
      <div style={{ padding:'20px 20px 14px', borderBottom:`1px solid ${theme.line}` }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
          <div style={{ display:'flex', alignItems:'center', gap:10 }}>
            <Icon name="cart" size={18} stroke={theme.ink}/>
            <div style={{ fontWeight:700, fontSize:15 }}>{tr('cart', lang)}</div>
          </div>
          <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:11, opacity:0.55 }}>
            {cart.reduce((s,e)=>s+e.qty, 0)} {tr('items_in_cart', lang)}
          </div>
        </div>
      </div>

      <div style={{ flex:1, overflow:'auto', padding:'12px 16px' }}>
        {cart.length === 0 ? (
          <div style={{ textAlign:'center', padding:'40px 20px', opacity:0.55 }}>
            <div style={{ width:54, height:54, margin:'0 auto 12px', borderRadius:999, background:theme.bgSoft, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="cart" size={22} stroke={theme.ink}/>
            </div>
            <div style={{ fontSize:13, fontWeight:600 }}>{tr('empty_cart', lang)}</div>
            <div style={{ fontSize:11, marginTop:4 }}>{tr('empty_hint', lang)}</div>
          </div>
        ) : (
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            {cart.map((e, idx) => {
              const it = ITEMS.find(i => i.id === e.itemId);
              return (
                <div key={idx} style={{ padding:10, background:theme.bgSoft, borderRadius:radius - 4 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', gap:8 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:700 }}>{it.name[lang]}</div>
                      <div style={{ fontSize:10, opacity:0.55, marginTop:2 }}>{summariseSel(it, e.sel, lang)}</div>
                    </div>
                    <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:12, fontWeight:700, color:theme.primary }}>
                      {fmt(linePrice(e))}
                    </div>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginTop:8 }}>
                    <div style={{ display:'inline-flex', alignItems:'center', gap:6, padding:'3px 8px', background:theme.bg, borderRadius:999 }}>
                      <button onClick={() => updateQty(idx, Math.max(1, e.qty - 1))} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, padding:0, display:'flex' }}>
                        <Icon name="minus" size={11}/>
                      </button>
                      <span style={{ minWidth:14, textAlign:'center', fontWeight:700, fontSize:11, fontVariantNumeric:'tabular-nums' }}>{e.qty}</span>
                      <button onClick={() => updateQty(idx, e.qty + 1)} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, padding:0, display:'flex' }}>
                        <Icon name="plus" size={11}/>
                      </button>
                    </div>
                    <button onClick={() => removeEntry(idx)} style={{ background:'transparent', border:0, cursor:'pointer', color:theme.ink, opacity:0.5, padding:0, display:'flex' }}>
                      <Icon name="trash" size={13}/>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div style={{ padding:'14px 18px 18px', borderTop:`1px solid ${theme.line}` }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, opacity:0.6, marginBottom:3 }}>
            <span>{tr('subtotal', lang)}</span>
            <span style={{ fontFamily:'"IBM Plex Mono", monospace' }}>{fmt(subtotal)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, opacity:0.6, marginBottom:8 }}>
            <span>{tr('service', lang)}</span>
            <span style={{ fontFamily:'"IBM Plex Mono", monospace' }}>{fmt(service)}</span>
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'baseline', marginBottom:12 }}>
            <span style={{ fontWeight:700 }}>{tr('total', lang)}</span>
            <span style={{ fontFamily:'"IBM Plex Mono", monospace', fontWeight:700, fontSize:18, color:theme.primary }}>{fmt(total)}</span>
          </div>
          <Btn theme={theme} radius={radius} kind="accent" size="md" full on={() => go('checkout')}>
            {tr('checkout', lang)}
            <Icon name="arrow" size={16}/>
          </Btn>
        </div>
      )}
    </div>
  );
}

// Desktop-specific home page
function DesktopHome({ theme, radius, lang, go, cartCount }) {
  return (
    <div style={{ display:'flex', height:'100%', background:theme.bg }}>
      <div style={{ flex:1, padding:'48px 56px', display:'flex', flexDirection:'column', justifyContent:'center', maxWidth:600 }}>
        <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:11, letterSpacing:2, opacity:0.55, marginBottom:14 }}>
          # {tr('brand', lang)} / {tr('open_hours', lang)}
        </div>
        <div style={{
          fontFamily:'"Noto Serif HK", serif', fontSize:96, fontWeight:800,
          lineHeight:0.9, letterSpacing:-3, color:theme.ink, marginBottom:24,
        }}>{tr('greeting', lang)}</div>
        <div style={{ fontSize:18, opacity:0.75, marginBottom:36, maxWidth:440, lineHeight:1.5 }}>
          {tr('greeting_sub', lang)}
        </div>
        <div style={{ display:'flex', gap:12 }}>
          <Btn theme={theme} radius={radius} kind="accent" size="lg" on={() => go('menu')}>
            {tr('order_now', lang)} <Icon name="arrow" size={20}/>
          </Btn>
          {cartCount > 0 && (
            <Btn theme={theme} radius={radius} kind="ghost" size="lg" on={() => go('cart')}>
              <Icon name="cart" size={18}/> {tr('view_cart', lang)} · {cartCount}
            </Btn>
          )}
        </div>
        <div style={{ marginTop:48, display:'flex', gap:36, borderTop:`1px solid ${theme.line}`, paddingTop:24 }}>
          {[
            { n:'01', label: tr('step1', lang) },
            { n:'02', label: tr('step2', lang) },
            { n:'03', label: tr('step3', lang) },
          ].map(s => (
            <div key={s.n} style={{ flex:1 }}>
              <div style={{ fontFamily:'"IBM Plex Mono", monospace', fontSize:13, fontWeight:700, opacity:0.5, marginBottom:6 }}>{s.n}</div>
              <div style={{ fontSize:14, fontWeight:500, lineHeight:1.4 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex:1, position:'relative', overflow:'hidden' }}>
        <svg width="100%" height="100%" viewBox="0 0 600 700" preserveAspectRatio="xMidYMid slice" style={{ display:'block' }}>
          <defs>
            <pattern id="desktop-stripe" width="40" height="40" patternUnits="userSpaceOnUse" patternTransform="rotate(30)">
              <rect width="40" height="40" fill={theme.primary}/>
              <rect width="20" height="40" fill={theme.accent}/>
            </pattern>
          </defs>
          <rect width="600" height="700" fill="url(#desktop-stripe)" opacity="0.55"/>
          <text x="40" y="500" fontFamily='"Noto Serif HK", serif' fontWeight="800" fontSize="380" fill={theme.ink} opacity="0.92">茶</text>
          <text x="60" y="640" fontFamily='"IBM Plex Mono", monospace' fontSize="14" fill={theme.ink} opacity="0.65" letterSpacing="3">EST. 1984 · KOWLOON CITY</text>
        </svg>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const theme = THEMES[t.theme] || THEMES.cafe_red;
  const font = FONTS[t.font] || FONTS.cantonese;

  // Hard state
  const [screen, setScreen] = useS('home'); // home | menu | detail | cart | checkout | confirm
  const [currentItem, setCurrentItem] = useS(null);
  const [cart, setCart] = useS([]);
  const [order, setOrder] = useS(null);
  const [menuCat, setMenuCat] = useS('all');

  const go = (s) => { setScreen(s); window.scrollTo?.(0, 0); };
  const openItem = (id) => { setCurrentItem(id); setScreen('detail'); };
  const addToCart = (entry) => {
    setCart(c => [...c, { ...entry, _at: Date.now() }]);
  };
  const updateQty = (idx, q) => {
    setCart(c => c.map((e, i) => i === idx ? { ...e, qty: q } : e));
  };
  const removeEntry = (idx) => {
    setCart(c => c.filter((_, i) => i !== idx));
  };
  const placeOrder = (info) => {
    const orderNo = String(Math.floor(1000 + Math.random() * 9000));
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
    const ord = { ...info, orderNo, time, items: cart };
    setOrder(ord);
    // Persist to localStorage so kitchen.html can see it
    pushOrder({ ...ord, items: cart.map(e => ({ itemId: e.itemId, qty: e.qty, sel: e.sel })) });
    setCart([]);
    setScreen('confirm');
  };

  // when language changes, persist
  const setLang = (l) => setTweak('lang', l);

  // Screens — phone
  const renderPhoneScreen = () => {
    const props = { theme, radius: t.radius, imgStyle: t.imgStyle, lang: t.lang };
    const handlers = { go, openItem, addToCart, updateQty, removeEntry, placeOrder };
    const cartCount = cart.reduce((s,e)=>s+e.qty,0);
    switch (screen) {
      case 'home':     return <HomeScreen {...props} {...handlers} cartCount={cartCount}/>;
      case 'menu':     return <MenuScreen {...props} {...handlers} cartCount={cartCount} initialCat={menuCat} onCatChange={setMenuCat}/>;
      case 'detail':   return <DetailScreen itemId={currentItem} {...props} {...handlers}/>;
      case 'cart':     return <CartScreen cart={cart} {...props} {...handlers}/>;
      case 'checkout': return <CheckoutScreen cart={cart} {...props} {...handlers}/>;
      case 'confirm':  return <ConfirmScreen order={order} {...props} {...handlers}/>;
      default: return null;
    }
  };

  return (
    <div style={{
      minHeight:'100vh', fontFamily: font.stack, background:'#0E0D0B',
      color:theme.ink, display:'flex', flexDirection:'column', alignItems:'center',
      padding:'40px 20px 80px', boxSizing:'border-box',
    }}>
      {/* Top toolbar */}
      <TopBar theme={theme} t={t} setTweak={setTweak} setLang={setLang} screen={screen} go={go}/>

      {/* Frame area */}
      <div style={{ marginTop:32, display:'flex', justifyContent:'center', width:'100%' }}>
        {t.device === 'mobile' ? (
          <PhoneFrame theme={theme}>
            <div style={{ minHeight:'100%', position:'relative', fontFamily: font.stack }} key={screen}>
              <ScreenAnim>{renderPhoneScreen()}</ScreenAnim>
            </div>
          </PhoneFrame>
        ) : (
          <DesktopFrame theme={theme}>
            <div style={{ height:'100%', fontFamily: font.stack }}>
              <DesktopApp
                theme={theme} radius={t.radius} imgStyle={t.imgStyle} lang={t.lang}
                screen={screen} currentItem={currentItem} setCurrentItem={setCurrentItem}
                cart={cart} order={order}
                go={go} openItem={openItem} addToCart={addToCart}
                updateQty={updateQty} removeEntry={removeEntry} placeOrder={placeOrder}
                menuCat={menuCat} setMenuCat={setMenuCat}
              />
            </div>
          </DesktopFrame>
        )}
      </div>

      {/* Tweaks panel */}
      <TweaksPanel>
        <TweakSection label={t.lang==='en' ? 'Device' : '裝置'}/>
        <TweakRadio label={t.lang==='en'?'View':'視圖'} value={t.device}
                    options={[{value:'mobile',label:'Mobile'},{value:'desktop',label:'Desktop'}]}
                    onChange={(v) => setTweak('device', v)}/>
        <TweakSelect label={t.lang==='en'?'Language':'語言'} value={t.lang}
                     options={LANGS.map(l => ({ value:l.id, label:l.label }))}
                     onChange={(v) => setTweak('lang', v)}/>

        <TweakSection label={t.lang==='en' ? 'Theme' : '主題'}/>
        <TweakRadio label={t.lang==='en'?'Palette':'配色'} value={t.theme}
                    options={Object.entries(THEMES).map(([k,v]) => ({ value:k, label:v.name[t.lang] }))}
                    onChange={(v) => setTweak('theme', v)}/>

        <TweakSection label={t.lang==='en' ? 'Typography' : '字體'}/>
        <TweakRadio label={t.lang==='en'?'Font':'字體'} value={t.font}
                    options={Object.entries(FONTS).map(([k,v]) => ({ value:k, label:v.label }))}
                    onChange={(v) => setTweak('font', v)}/>

        <TweakSection label={t.lang==='en' ? 'Cards' : '卡片'}/>
        <TweakSlider label={t.lang==='en'?'Corner radius':'圓角'} value={t.radius} min={0} max={28} step={2} unit="px"
                     onChange={(v) => setTweak('radius', v)}/>

        <TweakSection label={t.lang==='en' ? 'Imagery' : '餐點圖片'}/>
        <TweakRadio label={t.lang==='en'?'Style':'風格'} value={t.imgStyle}
                    options={[
                      { value:'stripe', label:'Stripe' },
                      { value:'block',  label:'Glyph' },
                      { value:'mono',   label:'Mono' },
                    ]}
                    onChange={(v) => setTweak('imgStyle', v)}/>

        <TweakSection label={t.lang==='en' ? 'Navigation' : '導航'}/>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:6 }}>
          {[
            { id:'home', l: t.lang==='en'?'Home':'首頁' },
            { id:'menu', l: t.lang==='en'?'Menu':'菜單' },
            { id:'detail', l: t.lang==='en'?'Detail':'詳情' },
            { id:'cart', l: t.lang==='en'?'Cart':'購物車' },
            { id:'checkout', l: t.lang==='en'?'Checkout':'結帳' },
            { id:'confirm', l: t.lang==='en'?'Confirm':'確認' },
          ].map(s => (
            <button key={s.id} onClick={() => {
              if (s.id === 'detail' && !currentItem) setCurrentItem('m1');
              if (s.id === 'confirm' && !order) setOrder({ orderNo:'1234', time:'12:34', tableNo:'12', payment:'online', diningMode:'dine_in', notes:'', total:200, items:[] });
              go(s.id);
            }} style={{
              padding:'6px 8px', fontSize:11, fontWeight:600,
              background: screen===s.id ? 'rgba(0,0,0,.12)' : 'rgba(255,255,255,.4)',
              border:'.5px solid rgba(0,0,0,.1)', borderRadius:6, cursor:'pointer', color:'#29261b',
              fontFamily:'inherit',
            }}>{s.l}</button>
          ))}
        </div>
      </TweaksPanel>
    </div>
  );
}

// Top toolbar above the device — current screen + language quick pick
function TopBar({ theme, t, setTweak, setLang, screen, go }) {
  const pal = THEMES[t.theme];
  const screenLabel = {
    home:'01 Home', menu:'02 Menu', detail:'03 Detail',
    cart:'04 Cart', checkout:'05 Checkout', confirm:'06 Confirm',
  }[screen];
  return (
    <div style={{
      width:'100%', maxWidth: t.device === 'desktop' ? 1180 : 480,
      display:'flex', alignItems:'center', justifyContent:'space-between', gap:14,
      color:'#FFF8EE', fontFamily:'"IBM Plex Mono", monospace',
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <div style={{ display:'flex', gap:6 }}>
          {Object.entries(THEMES).map(([k, v]) => (
            <button key={k} onClick={() => setTweak('theme', k)} title={v.name[t.lang]} style={{
              width:24, height:24, borderRadius:6, border: t.theme===k ? '2px solid #FFF8EE' : '2px solid transparent',
              background:'transparent', padding:2, cursor:'pointer', display:'flex',
            }}>
              <div style={{ display:'flex', width:'100%', height:'100%', borderRadius:3, overflow:'hidden' }}>
                <div style={{ flex:1, background:v.bg }}/>
                <div style={{ flex:1, background:v.primary }}/>
                <div style={{ flex:1, background:v.accent }}/>
              </div>
            </button>
          ))}
        </div>
        <div style={{ fontSize:11, opacity:0.7, letterSpacing:1, textTransform:'uppercase' }}>
          {screenLabel}
        </div>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10 }}>
        <div style={{ display:'flex', background:'rgba(255,255,255,.08)', borderRadius:999, padding:3 }}>
          {LANGS.map(l => (
            <button key={l.id} onClick={() => setLang(l.id)} style={{
              padding:'4px 12px', fontSize:11, fontWeight:600, border:0, cursor:'pointer',
              background: t.lang===l.id ? '#FFF8EE' : 'transparent',
              color: t.lang===l.id ? '#0E0D0B' : '#FFF8EE',
              borderRadius:999, fontFamily:'inherit',
            }}>{l.short}</button>
          ))}
        </div>
        <div style={{ display:'flex', background:'rgba(255,255,255,.08)', borderRadius:999, padding:3 }}>
          {['mobile','desktop'].map(d => (
            <button key={d} onClick={() => setTweak('device', d)} style={{
              padding:'4px 12px', fontSize:11, fontWeight:600, border:0, cursor:'pointer',
              background: t.device===d ? '#FFF8EE' : 'transparent',
              color: t.device===d ? '#0E0D0B' : '#FFF8EE',
              borderRadius:999, fontFamily:'inherit', textTransform:'uppercase',
            }}>{d}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Light slide animation on screen change
function ScreenAnim({ children }) {
  return (
    <>
      <div style={{ animation:'screen-in .26s cubic-bezier(.2,.7,.3,1) both', minHeight:'100%' }}>
        {children}
      </div>
      <style>{`@keyframes screen-in { 0% { opacity:0; transform: translateY(8px) } 100% { opacity:1; transform: none } }`}</style>
    </>
  );
}

// Mount
ReactDOM.createRoot(document.getElementById('app')).render(<App/>);
