// proto-app.jsx — router, nav, role/deal store, device frame, tweaks

const TAB_DEFAULT = {
  shop: { discover: 'ShopDiscover', requests: 'ShopDeals', chats: 'ChatsList', profile: 'Profile' },
  creator: { home: 'CreatorHome', requests: 'CreatorInbox', chats: 'ChatsList', profile: 'Profile' },
};
const FIRST_TAB = { shop: 'discover', creator: 'home' };

const SEED_MSGS = CHAT_SEED.map(m => ({ from: m.from === 'me' ? 'shop' : 'creator', text: m.text }));

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#FF5C39",
  "startRole": "shop"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [role, setRoleState] = React.useState(t.startRole || 'shop');
  const [tab, setTab] = React.useState(FIRST_TAB[t.startRole || 'shop']);
  const [stack, setStack] = React.useState([]);
  const [deal, setDeal] = React.useState({ active: false, status: 'requested', amount: 90, creatorId: 'maya', when: 'Sat 21 Jun', deadline: '24 Jun' });
  const [messages, setMessages] = React.useState(SEED_MSGS);
  const [scale, setScale] = React.useState(1);
  const [onboarded, setOnboarded] = React.useState(true);
  const [myPlatforms, setMyPlatforms] = React.useState(['TikTok', 'Instagram']);
  const [saved, setSaved] = React.useState(['lola']);
  const [avatars, setAvatars] = React.useState(() => {
    try { return JSON.parse(localStorage.getItem('patch:avatars') || '{}'); } catch (e) { return {}; }
  });
  const [filters, setFilters] = React.useState({ platforms: [], maxPrice: 250, niche: null });

  React.useEffect(() => {
    // Derive the coral shades in JS so we don't depend on CSS color-mix()
    // (unsupported on older Safari / Android WebView). Keeps Tweaks re-theming working.
    const hex2rgb = (h) => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    const mix = (hex, target, w) => {
      const c = hex2rgb(hex), p = (a, t2) => Math.round(a * w + t2 * (1 - w)).toString(16).padStart(2, '0');
      return '#' + p(c[0], target[0]) + p(c[1], target[1]) + p(c[2], target[2]);
    };
    const r = document.documentElement.style;
    const a = t.accent || '#FF5C39';
    r.setProperty('--coral', a);
    r.setProperty('--coral-press', mix(a, [0, 0, 0], 0.86));
    r.setProperty('--coral-ink', mix(a, [74, 22, 6], 0.80));
    r.setProperty('--coral-soft', mix(a, [255, 255, 255], 0.15));
  }, [t.accent]);

  React.useEffect(() => {
    const W = 402, H = 874;
    const fit = () => setScale(Math.min((window.innerWidth - 24) / W, (window.innerHeight - 24) / H, 1));
    fit(); window.addEventListener('resize', fit); return () => window.removeEventListener('resize', fit);
  }, []);

  const store = { deal, messages, role, myPlatforms, saved, filters, avatars };
  const nav = React.useMemo(() => ({
    store: { deal, messages, role, myPlatforms, saved, filters, avatars },
    push: (name, props = {}) => setStack(s => [...s, { name, props }]),
    pop: () => setStack(s => s.slice(0, -1)),
    reset: (name, props = {}) => setStack([{ name, props }]),
    tab: (key) => { setStack([]); setTab(key); },
    role: (r) => { setRoleState(r); setStack([]); setTab(FIRST_TAB[r]); },
    setDeal: (patch) => setDeal(d => ({ ...d, ...patch })),
    pushMsg: (m) => setMessages(ms => [...ms, m]),
    sysMsg: (text, icon) => setMessages(ms => [...ms, { from: 'system', text, icon }]),
    setMyPlatforms: (p) => setMyPlatforms(p),
    toggleSave: (id) => setSaved(s => s.includes(id) ? s.filter(x => x !== id) : [...s, id]),
    setAvatar: (key, src) => setAvatars(a => { const next = { ...a, [key]: src }; try { localStorage.setItem('patch:avatars', JSON.stringify(next)); } catch (e) {} return next; }),
    setFilters: (f) => setFilters(f),
    finishOnboarding: (r, opts = {}) => {
      if (opts.platforms) setMyPlatforms(opts.platforms);
      setRoleState(r); setStack([]); setTab(FIRST_TAB[r]); setOnboarded(true);
    },
    restartOnboarding: () => { setStack([]); setOnboarded(false); },
    restart: () => { setStack([]); setDeal({ active: false, status: 'requested', amount: 90, creatorId: 'maya', when: 'Sat 21 Jun', deadline: '24 Jun' }); setMessages(SEED_MSGS); setTab(FIRST_TAB[role]); },
  }), [deal, messages, role, myPlatforms, saved, filters, avatars]);
  nav.store = store;

  const baseName = TAB_DEFAULT[role][tab];
  const Base = window[baseName];

  return (
    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'center center' }}>
        <IOSDevice>
          <div style={{ position: 'relative', height: '100%', overflow: 'hidden' }}>
            {!onboarded ? (
              <div style={{ position: 'absolute', inset: 0 }}><Onboarding nav={nav} /></div>
            ) : (
              <React.Fragment>
                {Base && <div style={{ position: 'absolute', inset: 0 }}><Base nav={nav} /></div>}
                {stack.map((s, i) => {
                  const Comp = window[s.name];
                  if (!Comp) return null;
                  return (
                    <div key={i + s.name} className="scr-enter" style={{ position: 'absolute', inset: 0, zIndex: 10 + i }}>
                      <Comp nav={nav} {...s.props} />
                    </div>
                  );
                })}
              </React.Fragment>
            )}
          </div>
        </IOSDevice>
      </div>

      <TweaksPanel>
        <TweakSection label="Demo" />
        <TweakRadio label="View as" value={role} options={['shop', 'creator']} onChange={(v) => nav.role(v)} />
        <TweakButton label="Onboarding" onClick={() => nav.restartOnboarding()}>Replay onboarding</TweakButton>
        <TweakButton label="Restart flow" onClick={() => nav.restart()}>Reset deal & chat</TweakButton>
        <TweakSection label="Brand" />
        <TweakColor label="Accent" value={t.accent}
          options={['#FF5C39', '#2A6FDB', '#1F8A5B', '#7A5AE0', '#E0457A', '#E8853C']}
          onChange={(v) => setTweak('accent', v)} />
      </TweaksPanel>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
