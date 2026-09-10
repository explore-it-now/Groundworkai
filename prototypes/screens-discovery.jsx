// screens-discovery.jsx — how a business finds local creators (3 variants)

// Variant A — Split: map on top, ranked list below (the recommended pick)
function DiscoverySplit() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Creators near you" sub="Hackney · within 2 mi"
        right={<Pill on>Map + list</Pill>} />
      {/* mini map */}
      <div style={{ margin: '0 14px', height: 150, position: 'relative', borderRadius: 8,
        border: '2px solid var(--ink)', overflow: 'hidden',
        backgroundImage: 'repeating-linear-gradient(0deg,color-mix(in srgb,var(--ink-soft) 14%,transparent) 0 1px,transparent 1px 26px),repeating-linear-gradient(90deg,color-mix(in srgb,var(--ink-soft) 14%,transparent) 0 1px,transparent 1px 26px)' }}>
        <Pin x={28} y={42} n="2" on />
        <Pin x={58} y={30} n="1" />
        <Pin x={72} y={62} n="3" />
        <Pin x={44} y={72} n="4" />
        <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)',
          width: 10, height: 10, borderRadius: '50%', background: 'var(--accent)',
          boxShadow: '0 0 0 4px color-mix(in srgb,var(--accent) 30%,transparent)' }} />
      </div>
      <Body style={{ gap: 10, paddingTop: 10 }}>
        <div style={{ display: 'flex', gap: 6, overflow: 'hidden' }}>
          <Pill on>All</Pill><Pill>TikTok</Pill><Pill>Instagram</Pill><Pill>Food</Pill>
        </div>
        {[['1', 'Maya R.', '@mayaeats', '12.4k', '8.1k', '£90'],
          ['2', 'Tomi A.', '@tomi.shoots', '6.8k', '3.2k', '£60']].map(([n, name, h, f, v, p]) => (
          <Sk key={n} style={{ padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Avatar size={46} label="" />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>{name}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-soft)' }}>· {h}</span>
              </div>
              <div style={{ display: 'flex', gap: 12, marginTop: 4 }}>
                <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>👥 {f}</span>
                <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>▶ {v} avg</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--accent)' }}>{p}</div>
              <div style={{ fontSize: 10, color: 'var(--ink-soft)' }}>per video</div>
            </div>
          </Sk>
        ))}
        <Note>Map + list stay in sync — tap a pin to highlight its card.</Note>
      </Body>
      <TabBar active={0} />
    </WFScreen>
  );
}

// Variant B — Full-bleed map with a draggable bottom sheet
function DiscoveryMap() {
  return (
    <WFScreen>
      <div style={{ position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg,color-mix(in srgb,var(--ink-soft) 13%,transparent) 0 1px,transparent 1px 30px),repeating-linear-gradient(90deg,color-mix(in srgb,var(--ink-soft) 13%,transparent) 0 1px,transparent 1px 30px)' }} />
      <StatusBar />
      {/* floating search */}
      <div style={{ margin: '4px 14px', position: 'relative', zIndex: 2 }}>
        <Sk style={{ padding: '9px 12px', background: 'var(--paper)', fontSize: 13, color: 'var(--ink-soft)',
          display: 'flex', justifyContent: 'space-between' }}>
          <span>🔍 Search Hackney…</span><span style={{ color: 'var(--accent)', fontWeight: 700 }}>Filters</span>
        </Sk>
      </div>
      <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
        <Pin x={30} y={28} n="£90" on />
        <Pin x={64} y={22} n="£60" />
        <Pin x={48} y={48} n="£75" />
        <Pin x={76} y={56} n="£120" />
        <Pin x={22} y={62} n="£45" />
      </div>
      {/* bottom sheet */}
      <div style={{ position: 'relative', zIndex: 2, background: 'var(--paper)',
        borderTop: '2px solid var(--ink)', borderRadius: '16px 16px 0 0', padding: '8px 14px 14px' }}>
        <div style={{ width: 38, height: 4, borderRadius: 3, background: 'var(--ink-soft)', margin: '0 auto 10px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <span style={{ fontWeight: 700, fontSize: 14 }}>23 creators nearby</span>
          <Pill on>Map view</Pill>
        </div>
        <Sk style={{ padding: 10, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Avatar size={44} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Maya R.</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-soft)', marginTop: 3 }}>TikTok · 12.4k · 8.1k avg views</div>
          </div>
          <Btn fill small>£90</Btn>
        </Sk>
        <Note style={{ marginTop: 10 }}>Map-first for "who's literally around the corner".</Note>
      </div>
    </WFScreen>
  );
}

// Variant C — Grid / feed of creators (Tinder-of-creators browse)
function DiscoveryGrid() {
  const cards = [['Maya R.', '12.4k', '£90'], ['Tomi A.', '6.8k', '£60'],
    ['Priya K.', '21k', '£140'], ['Jay M.', '4.1k', '£40'],
    ['Lola B.', '9.7k', '£75'], ['Sam O.', '15k', '£110']];
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Discover" sub="Local creators · Hackney"
        right={<Pill>Grid</Pill>} />
      <div style={{ display: 'flex', gap: 6, padding: '0 14px 8px', overflow: 'hidden' }}>
        <Pill on>Nearest</Pill><Pill>Cheapest</Pill><Pill>Most views</Pill>
      </div>
      <Body style={{ paddingTop: 4 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {cards.map(([name, f, p]) => (
            <Sk key={name} style={{ padding: 8 }}>
              <Hatch h={70} label="clip" style={{ borderColor: 'var(--ink)', marginBottom: 7 }} />
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>{name}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-soft)', margin: '2px 0 6px' }}>👥 {f} · 1.2mi</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontWeight: 700, color: 'var(--accent)', fontSize: 14 }}>{p}</span>
                <span style={{ fontSize: 16 }}>＋</span>
              </div>
            </Sk>
          ))}
        </div>
      </Body>
      <TabBar active={0} />
    </WFScreen>
  );
}

Object.assign(window, { DiscoverySplit, DiscoveryMap, DiscoveryGrid });
