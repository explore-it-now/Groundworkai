// ui.jsx — Patch design-system primitives (exported to window)

// ── Icons (simple stroke set) ───────────────────────────────
const ICON_PATHS = {
  search: 'M11 4a7 7 0 100 14 7 7 0 000-14zM20 20l-3.2-3.2',
  heart: 'M12 20s-7-4.3-9.2-8.4C1.3 8.3 3 5 6 5c2 0 3.2 1.4 4 2.6C10.8 6.4 12 5 14 5c3 0 4.7 3.3 3.2 6.6C19 15.7 12 20 12 20z',
  back: 'M15 5l-7 7 7 7',
  fwd: 'M9 5l7 7-7 7',
  down: 'M6 9l6 6 6-6',
  lock: 'M7 10V8a5 5 0 0110 0v2M5 10h14v10H5z',
  check: 'M5 12.5l4.5 4.5L19 7',
  play: 'M8 5.5v13l11-6.5z',
  send: 'M4 12l16-7-7 16-2.5-6.5L4 12z',
  pin: 'M12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11zM12 8a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
  star: 'M12 3l2.6 5.6 6 .7-4.4 4.1 1.2 6-5.4-3-5.4 3 1.2-6L3.4 9.3l6-.7z',
  plus: 'M12 5v14M5 12h14',
  spark: 'M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z',
  clip: 'M4 6h16v12H4zM4 9h16M9 6v3M15 6v3',
  chat: 'M4 5h16v11H9l-4 3.5V16H4z',
  user: 'M12 12a4 4 0 100-8 4 4 0 000 8zM5 20c0-3.3 3.1-5.5 7-5.5s7 2.2 7 5.5',
  bell: 'M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6zM10 20a2 2 0 004 0',
  calendar: 'M4 6h16v15H4zM4 10h16M8 3v4M16 3v4',
  card: 'M3 6h18v12H3zM3 10h18',
  shield: 'M12 3l7 3v5c0 5-3.5 8-7 10-3.5-2-7-5-7-10V6z',
  camera: 'M4 8h3l1.5-2h7L17 8h3v11H4zM12 16a3.5 3.5 0 100-7 3.5 3.5 0 000 7z',
  bolt: 'M13 3L5 13h5l-1 8 8-10h-5z',
  filter: 'M4 6h16M7 12h10M10 18h4',
  location: 'M12 11a2 2 0 100-4 2 2 0 000 4zM12 21s7-6.2 7-11a7 7 0 10-14 0c0 4.8 7 11 7 11z',
  eye: 'M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7zM12 9.5a2.5 2.5 0 100 5 2.5 2.5 0 000-5z',
  close: 'M6 6l12 12M18 6L6 18',
  list: 'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  map: 'M9 4L4 6v14l5-2 6 2 5-2V4l-5 2-6-2zM9 4v14M15 6v14',
  arrowR: 'M5 12h14M13 6l6 6-6 6',
  verified: 'M12 3l2 2 2.8-.4.5 2.8L20 9l-1.3 2.5L20 14l-2.7 1.6-.5 2.8L14 18l-2 2-2-2-2.8.4-.5-2.8L4 14l1.3-2.5L4 9l2.7-1.6.5-2.8L10 5z',
  more: 'M6 12h.01M12 12h.01M18 12h.01',
  refresh: 'M4 12a8 8 0 0114-5.3L20 8M20 12a8 8 0 01-14 5.3L4 16M20 4v4h-4M4 20v-4h4',
  ban: 'M5.6 5.6l12.8 12.8M12 3a9 9 0 100 18 9 9 0 000-18z',
  alert: 'M10.3 4.3 2.4 18.1a2 2 0 001.7 3h15.8a2 2 0 001.7-3L13.7 4.3a2 2 0 00-3.4 0zM12 9.5v4M12 17.4h.01',
};

function Icon({ name, size = 20, color = 'currentColor', stroke = 1.85, fill, style }) {
  const filled = name === 'play' || name === 'spark';
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={filled ? color : (fill || 'none')}
      stroke={filled ? 'none' : color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0, display: 'block', ...style }}>
      <path d={ICON_PATHS[name] || ''} />
    </svg>
  );
}

// ── Gradient-initial avatar ─────────────────────────────────
const GRADS = [
  ['#FF8A5B', '#FF5C39'], ['#6FB1FF', '#3A6FE8'], ['#5BD6A6', '#1C8A5B'],
  ['#FFC15B', '#E8853C'], ['#C79BFF', '#8A5BE8'], ['#FF8FB1', '#E84a7a'],
  ['#7FD8E8', '#2B8FA8'], ['#FFB35B', '#E8632C'],
];
function hashStr(s) { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0; return h; }
function initials(name) { return name.split(/\s+/).map(w => w[0]).slice(0, 2).join('').toUpperCase(); }

// ── Platform badge (TikTok / Instagram / YouTube / Facebook) ─
const PLATFORM_BG = {
  TikTok: '#111',
  Instagram: 'linear-gradient(45deg,#FBAD50,#EE2A7B 45%,#9537B0)',
  YouTube: '#FF0000',
  Facebook: '#1877F2',
};
function PlatformBadge({ platform, size = 18, style }) {
  return (
    <span title={platform} style={{ width: size, height: size, borderRadius: size * 0.3, flexShrink: 0,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      background: PLATFORM_BG[platform] || '#111', ...style }}>
      {platform === 'TikTok' && (
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
          <path d="M14.5 3c.4 2.3 1.9 3.9 4.2 4.1v2.7c-1.4 0-2.7-.4-3.9-1.1v5.7a5.6 5.6 0 11-5.6-5.6c.3 0 .6 0 .9.1v2.8a2.8 2.8 0 102.2 2.7V3h2.2z" fill="#fff" />
        </svg>
      )}
      {platform === 'Instagram' && (
        <svg width={size * 0.66} height={size * 0.66} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.1">
          <rect x="4" y="4" width="16" height="16" rx="5" />
          <circle cx="12" cy="12" r="3.8" />
          <circle cx="17.2" cy="6.8" r="1.1" fill="#fff" stroke="none" />
        </svg>
      )}
      {platform === 'YouTube' && (
        <svg width={size * 0.62} height={size * 0.62} viewBox="0 0 24 24">
          <path d="M9.5 8l6.5 4-6.5 4z" fill="#fff" />
        </svg>
      )}
      {platform === 'Facebook' && (
        <span style={{ color: '#fff', fontWeight: 800, fontSize: size * 0.66, lineHeight: 1, fontFamily: 'Georgia, var(--font-display)', marginTop: size * -0.04 }}>f</span>
      )}
    </span>
  );
}
function Platforms({ list = [], size = 16, gap = 4 }) {
  return <span style={{ display: 'inline-flex', gap }}>{list.map(p => <PlatformBadge key={p} platform={p} size={size} />)}</span>;
}

function Avatar({ name = '?', size = 44, ring, style, square, src }) {
  const g = GRADS[hashStr(name) % GRADS.length];
  return (
    <div style={{
      width: size, height: size, borderRadius: square ? size * 0.3 : '50%',
      background: src ? `center/cover no-repeat url(${src})` : `linear-gradient(140deg, ${g[0]}, ${g[1]})`,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      color: '#fff', fontWeight: 700, fontFamily: 'var(--font-display)',
      fontSize: size * 0.38, flexShrink: 0,
      boxShadow: ring ? '0 0 0 3px var(--surface), 0 0 0 4.5px var(--coral)' : 'none',
      letterSpacing: '-0.02em', ...style,
    }}>{src ? '' : initials(name)}</div>
  );
}

// ── Photo picker — wraps an avatar in a real file input ─────
function PhotoPicker({ name, size = 76, square, src, onPick, badge = true }) {
  const ref = React.useRef(null);
  const handle = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => onPick(r.result);
    r.readAsDataURL(f);
  };
  return (
    <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => ref.current && ref.current.click()}>
      <Avatar name={name} size={size} square={square} src={src} />
      <input ref={ref} type="file" accept="image/*" onChange={handle} style={{ display: 'none' }} />
      {badge && (
        <div className="press" style={{ position: 'absolute', bottom: -2, right: -2, width: size * 0.36, height: size * 0.36, minWidth: 26, minHeight: 26,
          borderRadius: '50%', background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 0 3px var(--cream)' }}>
          <Icon name="camera" size={size * 0.18 < 13 ? 13 : size * 0.18} color="#fff" />
        </div>
      )}
    </div>
  );
}

// ── Clip / portfolio thumbnail (gradient + play) ────────────
function Thumb({ seed = 'x', label, h = 90, play, style }) {
  const g = GRADS[hashStr(seed) % GRADS.length];
  return (
    <div style={{
      position: 'relative', height: h, borderRadius: 14, overflow: 'hidden', flexShrink: 0,
      background: `linear-gradient(150deg, ${g[0]}, ${g[1]})`, ...style,
    }}>
      <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(120% 80% at 20% 0%, rgba(255,255,255,.28), transparent 60%)' }} />
      {play && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'rgba(255,255,255,.9)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', backdropFilter: 'blur(2px)' }}>
            <Icon name="play" size={15} color="var(--ink)" />
          </div>
        </div>
      )}
      {label && <div style={{ position: 'absolute', left: 8, bottom: 7, fontSize: 10.5, fontWeight: 600,
        color: 'rgba(255,255,255,.95)', textShadow: '0 1px 3px rgba(0,0,0,.3)' }}>{label}</div>}
    </div>
  );
}

// ── Buttons ─────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'md', full, onClick, style, icon, iconRight, disabled }) {
  const pads = { sm: '8px 14px', md: '13px 20px', lg: '16px 22px' };
  const fs = { sm: 14, md: 16, lg: 17 };
  const styles = {
    primary: { background: 'var(--coral)', color: '#fff', boxShadow: '0 4px 14px rgba(255,92,57,.32)' },
    dark: { background: 'var(--ink)', color: '#fff' },
    soft: { background: 'var(--coral-soft)', color: 'var(--coral-ink)' },
    secondary: { background: 'var(--surface)', color: 'var(--ink)', boxShadow: 'inset 0 0 0 1.5px var(--line-2)' },
    ghost: { background: 'transparent', color: 'var(--ink-2)' },
    green: { background: 'var(--green)', color: '#fff', boxShadow: '0 4px 14px rgba(28,138,91,.28)' },
  };
  return (
    <button className="press" onClick={disabled ? undefined : onClick} disabled={disabled} style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      border: 'none', borderRadius: 'var(--r-pill)', cursor: disabled ? 'default' : 'pointer',
      fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: fs[size], padding: pads[size],
      width: full ? '100%' : undefined, opacity: disabled ? 0.45 : 1, whiteSpace: 'nowrap',
      ...styles[variant], ...style,
    }}>
      {icon && <Icon name={icon} size={size === 'sm' ? 16 : 19} color="currentColor" />}
      {children}
      {iconRight && <Icon name={iconRight} size={size === 'sm' ? 16 : 19} color="currentColor" />}
    </button>
  );
}

function IconButton({ icon, onClick, style, tone, size = 40, badge }) {
  return (
    <button className="press" onClick={onClick} style={{
      width: size, height: size, borderRadius: '50%', border: 'none', cursor: 'pointer', position: 'relative',
      background: tone === 'solid' ? 'var(--ink)' : 'var(--surface)',
      color: tone === 'solid' ? '#fff' : 'var(--ink)',
      boxShadow: '0 1px 4px rgba(0,0,0,.08), inset 0 0 0 1px var(--line)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', ...style,
    }}>
      <Icon name={icon} size={20} color="currentColor" />
      {badge ? <span style={{ position: 'absolute', top: 6, right: 6, width: 9, height: 9, borderRadius: '50%',
        background: 'var(--coral)', boxShadow: '0 0 0 2px var(--surface)' }} /> : null}
    </button>
  );
}

// ── Chip / Badge ────────────────────────────────────────────
function Chip({ children, active, onClick, icon }) {
  return (
    <button className="press" onClick={onClick} style={{
      display: 'inline-flex', alignItems: 'center', gap: 5, whiteSpace: 'nowrap',
      border: 'none', cursor: 'pointer', fontFamily: 'var(--font-ui)', fontWeight: 600, fontSize: 13.5,
      padding: '7px 13px', borderRadius: 'var(--r-pill)',
      background: active ? 'var(--ink)' : 'var(--surface)',
      color: active ? '#fff' : 'var(--ink-2)',
      boxShadow: active ? 'none' : 'inset 0 0 0 1px var(--line-2)',
    }}>
      {icon && <Icon name={icon} size={14} color="currentColor" />}{children}
    </button>
  );
}

function Badge({ children, tone = 'neutral', icon, style }) {
  const tones = {
    neutral: { background: 'var(--cream-2)', color: 'var(--ink-2)' },
    coral: { background: 'var(--coral-soft)', color: 'var(--coral-ink)' },
    green: { background: 'var(--green-soft)', color: 'var(--green)' },
    dark: { background: 'var(--ink)', color: '#fff' },
  };
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 700,
      padding: '4px 9px', borderRadius: 'var(--r-pill)', ...tones[tone], ...style }}>
      {icon && <Icon name={icon} size={12.5} color="currentColor" />}{children}
    </span>
  );
}

// ── Card ────────────────────────────────────────────────────
function Card({ children, onClick, style, pad = 14, soft }) {
  return (
    <div className={onClick ? 'press' : ''} onClick={onClick} style={{
      background: 'var(--surface)', borderRadius: 'var(--r-card)', padding: pad,
      boxShadow: soft ? 'none' : '0 1px 3px rgba(27,25,22,.05), 0 6px 20px rgba(27,25,22,.04)',
      cursor: onClick ? 'pointer' : 'default', ...style,
    }}>{children}</div>
  );
}

function Stat({ value, label, accent }) {
  return (
    <div style={{ textAlign: 'center', flex: 1 }}>
      <div className="display num" style={{ fontSize: 20, fontWeight: 700, lineHeight: 1,
        color: accent ? 'var(--coral)' : 'var(--ink)' }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4, fontWeight: 600 }}>{label}</div>
    </div>
  );
}

// ── Top bar (in-screen header) ──────────────────────────────
function TopBar({ title, sub, onBack, right, style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '6px 18px 10px',
      flexShrink: 0, ...style }}>
      {onBack && <IconButton icon="back" onClick={onBack} size={38} />}
      <div style={{ flex: 1, minWidth: 0 }}>
        {title && <div className="display" style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.1, color: 'var(--ink)' }}>{title}</div>}
        {sub && <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, fontWeight: 500 }}>{sub}</div>}
      </div>
      {right}
    </div>
  );
}

// ── Bottom tab bar ──────────────────────────────────────────
function TabBar({ active, onChange, role }) {
  const tabs = role === 'creator'
    ? [['home', 'map', 'Home'], ['requests', 'bell', 'Requests'], ['chats', 'chat', 'Chats'], ['profile', 'user', 'Profile']]
    : [['discover', 'map', 'Discover'], ['requests', 'list', 'Deals'], ['chats', 'chat', 'Chats'], ['profile', 'user', 'You']];
  return (
    <div style={{ flexShrink: 0, padding: '8px 14px 26px', background: 'linear-gradient(0deg, var(--cream) 62%, transparent)',
      display: 'flex', justifyContent: 'space-around' }}>
      {tabs.map(([key, icon, label]) => {
        const on = active === key;
        return (
          <button key={key} className="press" onClick={() => onChange(key)} style={{
            border: 'none', background: 'transparent', cursor: 'pointer', display: 'flex',
            flexDirection: 'column', alignItems: 'center', gap: 3, padding: '4px 10px',
            color: on ? 'var(--coral)' : 'var(--ink-3)' }}>
            <Icon name={icon} size={23} color="currentColor" stroke={on ? 2.2 : 1.8} />
            <span style={{ fontSize: 10.5, fontWeight: on ? 800 : 600 }}>{label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ── Money / secured badge ───────────────────────────────────
function Secured({ amount, label = 'held in escrow', style }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, background: 'var(--green-soft)',
      borderRadius: 14, padding: '11px 14px', ...style }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: 'var(--green)', display: 'flex',
        alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
        <Icon name="lock" size={17} color="#fff" />
      </div>
      <div style={{ flex: 1 }}>
        <div className="display num" style={{ fontSize: 17, fontWeight: 700, color: 'var(--green)', lineHeight: 1 }}>£{amount}</div>
        <div style={{ fontSize: 11.5, color: 'var(--green)', opacity: .8, fontWeight: 600 }}>{label}</div>
      </div>
    </div>
  );
}

// ── Page layout (status-bar inset + optional tab bar) ───────
function Page({ children, tab, role, onTab, bg, style }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column',
      background: bg || 'var(--cream)', paddingTop: 50, ...style }}>
      {children}
      {tab && <TabBar active={tab} role={role} onChange={onTab} />}
    </div>
  );
}
function Scroll({ children, style, pad = true }) {
  return (
    <div className="scroll" style={{ flex: 1, minHeight: 0,
      padding: pad ? '4px 18px 24px' : 0, ...style }}>{children}</div>
  );
}

// fixed CTA bar pinned above the home indicator
function CTABar({ children, style }) {
  return (
    <div style={{ flexShrink: 0, padding: '12px 18px 30px',
      background: 'linear-gradient(0deg, var(--cream) 70%, transparent)', ...style }}>{children}</div>
  );
}

Object.assign(window, { Icon, Avatar, PhotoPicker, Thumb, Btn, IconButton, Chip, Badge, Card, Stat, TopBar, TabBar, Secured, hashStr, Page, Scroll, CTABar, PlatformBadge, Platforms });
