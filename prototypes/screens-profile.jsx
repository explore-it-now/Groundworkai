// screens-profile.jsx — creator profile: stats, price, request (3 variants)

// Variant A — Stats-forward
function ProfileStats() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Creator" back right={<span style={{ fontSize: 18 }}>♡</span>} />
      <Body style={{ gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar size={64} />
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 700, fontSize: 18 }}>Maya R.</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>@mayaeats · 📍 0.8 mi away</div>
            <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
              <Pill on>Food</Pill><Pill>Cafés</Pill>
            </div>
          </div>
        </div>
        <Sk style={{ display: 'flex', padding: '12px 6px' }}>
          <Stat n="12.4k" l="TikTok" />
          <Stat n="3.1k" l="Instagram" />
          <Stat n="8.1k" l="avg views" />
          <Stat n="6.2%" l="engage" />
        </Sk>
        <div>
          <Eyebrow>Recent work</Eyebrow>
          <div style={{ display: 'flex', gap: 8 }}>
            <Hatch h={88} label="clip 1" style={{ borderColor: 'var(--ink)' }} />
            <Hatch h={88} label="clip 2" style={{ borderColor: 'var(--ink)' }} />
            <Hatch h={88} label="clip 3" style={{ borderColor: 'var(--ink)' }} />
          </div>
        </div>
        <Sk alt style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>Fixed price</div>
            <div style={{ fontWeight: 700, fontSize: 22, color: 'var(--accent)' }}>£90</div>
            <div style={{ fontSize: 10.5, color: 'var(--ink-soft)' }}>1 TikTok video · posted to her page</div>
          </div>
          <Btn fill>Send request</Btn>
        </Sk>
        <Note>Real stats + one clear price = a 5-minute hiring decision.</Note>
      </Body>
    </WFScreen>
  );
}

// Variant B — Proof-forward (portfolio hero, sticky CTA)
function ProfileProof() {
  return (
    <WFScreen>
      <div style={{ position: 'relative', flex: '0 0 auto' }}>
        <Hatch h={170} label="showreel / pinned clip" style={{ borderRadius: 0, borderColor: 'var(--ink)' }} />
        <div style={{ position: 'absolute', top: 8, left: 12, fontSize: 22 }}>‹</div>
        <div style={{ position: 'absolute', bottom: 10, left: 12, display: 'flex', gap: 10, alignItems: 'center' }}>
          <Avatar size={50} />
          <div style={{ background: 'var(--paper)', borderRadius: 6, padding: '3px 8px' }}>
            <div style={{ fontWeight: 700, fontSize: 15 }}>Maya R.</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>@mayaeats · 0.8 mi</div>
          </div>
        </div>
      </div>
      <Body style={{ gap: 11, paddingTop: 12 }}>
        <div style={{ display: 'flex', gap: 8, overflow: 'hidden' }}>
          <Pill on>12.4k followers</Pill><Pill on>8.1k avg views</Pill><Pill on>6.2% eng.</Pill>
        </div>
        <Eyebrow>More clips</Eyebrow>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 6 }}>
          {['', '', '', '', '', ''].map((_, i) => <Hatch key={i} h={56} style={{ borderColor: 'var(--ink-soft)' }} />)}
        </div>
        <Sk style={{ padding: 10, fontSize: 12.5, color: 'var(--ink-soft)' }}>
          <Line w="90%" /><Line w="75%" style={{ marginTop: 6 }} />
          <div style={{ marginTop: 6 }}>"I film cosy café reels for local spots."</div>
        </Sk>
      </Body>
      {/* sticky CTA */}
      <div style={{ borderTop: '2px solid var(--ink)', padding: 12, display: 'flex',
        gap: 10, alignItems: 'center', background: 'var(--paper)', flex: '0 0 auto' }}>
        <div>
          <div style={{ fontWeight: 700, fontSize: 20, color: 'var(--accent)', lineHeight: 1 }}>£90</div>
          <div style={{ fontSize: 10, color: 'var(--ink-soft)' }}>per video</div>
        </div>
        <Btn fill style={{ flex: 1 }}>Request partnership</Btn>
      </div>
    </WFScreen>
  );
}

// Variant C — Compact decision card (everything above the fold)
function ProfileCompact() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="" back />
      <Body style={{ gap: 12 }}>
        <div style={{ textAlign: 'center' }}>
          <Avatar size={72} label="" />
          <div style={{ fontWeight: 700, fontSize: 19, marginTop: 8 }}>Maya R.</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-soft)' }}>Food creator · 0.8 mi · Hackney</div>
        </div>
        <Sk style={{ display: 'flex', padding: '10px 6px' }}>
          <Stat n="12.4k" l="followers" />
          <Stat n="8.1k" l="avg views" />
          <Stat n="£90" l="per video" />
        </Sk>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
          {['Films & edits in your venue', 'Posts to her own TikTok + IG', 'Usually replies within 1 day'].map((t) => (
            <div key={t} style={{ display: 'flex', gap: 8, fontSize: 13, alignItems: 'center' }}>
              <span style={{ color: 'var(--accent)', fontWeight: 700 }}>✓</span>{t}
            </div>
          ))}
        </div>
        <Hatch h={64} label="3 sample clips →" style={{ borderColor: 'var(--ink-soft)' }} />
        <Btn fill style={{ marginTop: 2 }}>Send partnership request · £90</Btn>
        <Btn ghost small>Message first</Btn>
        <Note>Stripped to the decision: can I afford it, are they good, book.</Note>
      </Body>
    </WFScreen>
  );
}

Object.assign(window, { ProfileStats, ProfileProof, ProfileCompact });
