// screens-escrow.jsx — safe-payment / escrow tracking (the trust layer)

const STEPS = [
  ['Payment held', '£90 secured by app', 'done'],
  ['Filming day', 'Maya at your venue Sat 21', 'done'],
  ['Draft approved', 'You okayed the cut', 'now'],
  ['Posted live', 'Video on Maya\'s TikTok', 'todo'],
  ['Auto-released', '£90 paid to Maya', 'todo'],
];

// Variant A — Business-side vertical status timeline
function EscrowTimeline() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Deal status" back sub="Maya R. · 1 TikTok video" />
      <Body style={{ gap: 0 }}>
        <Sk alt style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12, marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Held safely</div>
            <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--accent)' }}>£90 🔒</div>
          </div>
          <Pill on>In progress</Pill>
        </Sk>
        <div style={{ position: 'relative', paddingLeft: 6 }}>
          {STEPS.map(([t, d, s], i) => (
            <div key={t} style={{ display: 'flex', gap: 12, paddingBottom: i === STEPS.length - 1 ? 0 : 16, position: 'relative' }}>
              {i < STEPS.length - 1 && <div style={{ position: 'absolute', left: 10, top: 22, bottom: 0, width: 2,
                background: s === 'done' ? 'var(--accent)' : 'var(--ink-soft)' }} />}
              <div style={{ width: 22, height: 22, borderRadius: '50%', flex: '0 0 auto', zIndex: 1,
                border: `2px solid ${s === 'todo' ? 'var(--ink-soft)' : 'var(--accent)'}`,
                background: s === 'done' ? 'var(--accent)' : s === 'now' ? 'var(--paper)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11,
                color: s === 'done' ? '#fff' : 'var(--accent)', fontWeight: 700 }}>
                {s === 'done' ? '✓' : s === 'now' ? '●' : ''}</div>
              <div style={{ paddingTop: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: s === 'todo' ? 'var(--ink-soft)' : 'var(--ink)' }}>{t}</div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>{d}</div>
              </div>
            </div>
          ))}
        </div>
        <Note style={{ marginTop: 14 }}>Payment auto-releases the second the post goes live. No chasing.</Note>
      </Body>
    </WFScreen>
  );
}

// Variant B — Creator side: video detected live → money released
function EscrowRelease() {
  return (
    <WFScreen>
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', textAlign: 'center', padding: 22, gap: 8 }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', border: '3px solid var(--accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 38, color: 'var(--accent)' }}>✓</div>
        <div style={{ fontWeight: 700, fontSize: 26, color: 'var(--accent)', marginTop: 6 }}>£90 paid out</div>
        <div style={{ fontSize: 13.5, color: 'var(--ink-soft)', maxWidth: 230 }}>
          We detected your video went live on TikTok — funds released to you automatically.
        </div>
        <Sk style={{ width: '100%', padding: 12, marginTop: 12, textAlign: 'left' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <Hatch w={44} h={44} label="" style={{ borderColor: 'var(--ink)' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700, fontSize: 13.5 }}>Brew & Co · latte reel</div>
              <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Live 24 Jun · 8.4k views so far</div>
            </div>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>+£90</span>
          </div>
        </Sk>
        <Btn fill style={{ width: '100%', marginTop: 12 }}>View payout</Btn>
        <Btn ghost small>Leave Brew & Co a review</Btn>
      </div>
    </WFScreen>
  );
}

// Variant C — "How your money is protected" explainer (trust onboarding)
function EscrowExplainer() {
  const rows = [
    ['💳', 'Shop pays upfront', 'Fee is charged but parked — not sent yet.'],
    ['🔒', 'App holds the cash', 'Neither side can touch it during filming.'],
    ['🎬', 'Creator films & posts', 'Video goes live on their own page.'],
    ['⚡', 'Auto-release', 'We verify the post and pay the creator instantly.'],
  ];
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="You're protected" back />
      <Body style={{ gap: 12 }}>
        <div style={{ fontSize: 14, color: 'var(--ink-soft)' }}>
          Nobody gets scammed. Here's exactly how the money moves:
        </div>
        {rows.map(([e, t, d], i) => (
          <Sk key={t} style={{ display: 'flex', gap: 12, padding: 12, alignItems: 'flex-start' }}>
            <div style={{ width: 34, height: 34, borderRadius: '50%', border: '2px solid var(--accent)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, flex: '0 0 auto' }}>{e}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 14 }}>{i + 1}. {t}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-soft)', marginTop: 2 }}>{d}</div>
            </div>
          </Sk>
        ))}
        <Btn fill>Got it</Btn>
      </Body>
    </WFScreen>
  );
}

Object.assign(window, { EscrowTimeline, EscrowRelease, EscrowExplainer });
