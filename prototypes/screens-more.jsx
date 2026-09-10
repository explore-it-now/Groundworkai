// screens-more.jsx — draft approval + dispute resolution

// ── Draft review (shop approves the cut before it posts) ────
function DraftReview({ nav }) {
  const d = nav.store.deal;
  const c = byId(d.creatorId);
  const [changes, setChanges] = React.useState(false);
  return (
    <Page>
      <TopBar title="Review the draft" sub={`${c.name.split(' ')[0]} sent a cut for approval`} onBack={nav.pop} />
      <Scroll>
        <div style={{ position: 'relative', marginBottom: 14 }}>
          <Thumb seed={`${c.id}draft`} h={300} play label="Draft v1 · 0:18" style={{ borderRadius: 18 }} />
          <Badge tone="dark" style={{ position: 'absolute', top: 12, left: 12 }}>Not public yet</Badge>
        </div>
        <Card style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700, marginBottom: 5 }}>YOUR BRIEF</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>"{d.brief}"</div>
        </Card>
        <Secured amount={d.amount} label="released the moment you approve & it posts" style={{ marginBottom: 4 }} />
        {changes && (
          <div style={{ marginTop: 12 }}>
            <Label>What needs changing?</Label>
            <textarea autoFocus placeholder="e.g. Could we get a clearer shot of the latte art?" style={{ width: '100%', minHeight: 76, resize: 'none',
              border: 'none', outline: 'none', background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14,
              fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)' }} />
          </div>
        )}
      </Scroll>
      <CTABar>
        {changes ? (
          <Btn full size="lg" variant="dark" icon="send" onClick={() => { nav.setDeal({ status: 'filming' }); nav.sysMsg('Shop requested changes to the draft', 'clip'); nav.pop(); }}>Send change request</Btn>
        ) : (
          <Btn full size="lg" variant="green" icon="check" onClick={() => { nav.setDeal({ status: 'posted' }); nav.sysMsg('Draft approved · scheduling the post', 'check'); setTimeout(() => nav.setDeal({ status: 'released' }), 1100); nav.pop(); }}>Approve & schedule post</Btn>
        )}
        <Btn full variant="ghost" style={{ marginTop: 4 }} onClick={() => setChanges(v => !v)}>{changes ? 'Cancel' : 'Request changes'}</Btn>
      </CTABar>
    </Page>
  );
}

// ── Dispute resolution outcome ──────────────────────────────
function DisputeOutcome({ nav }) {
  const d = nav.store.deal;
  const role = nav.store.role;
  const shop = role === 'shop';
  return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ width: 84, height: 84, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
          animation: 'pop .5s ease both' }}>
          <Icon name="shield" size={38} color="#fff" />
        </div>
        <div className="display" style={{ fontSize: 23, fontWeight: 800, marginTop: 16 }}>Dispute resolved</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 270, lineHeight: 1.5 }}>
          {shop
            ? `We reviewed the case with both sides. Your £${d.amount} has been refunded in full — nothing left your account.`
            : `We reviewed the case with both sides. You were covered for your time — a goodwill payment is on its way.`}
        </div>
        <Card style={{ width: '100%', marginTop: 22, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
            <span style={{ color: 'var(--ink-3)', fontSize: 13, fontWeight: 600 }}>Outcome</span>
            <Badge tone="green" icon="check">{shop ? 'Full refund' : 'Covered'}</Badge>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>{shop ? 'Refunded to your card' : 'Goodwill payout'}</span>
            <span className="display num" style={{ fontWeight: 700, fontSize: 17, color: 'var(--green)' }}>£{shop ? d.amount : Math.round(d.amount * 0.3)}</span>
          </div>
        </Card>
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 14, lineHeight: 1.4, maxWidth: 250 }}>
          Both parties were notified. Repeated issues can affect a member's standing on Patch.
        </div>
      </div>
      <CTABar><Btn full size="lg" onClick={() => nav.tab(shop ? 'discover' : 'home')}>Done</Btn></CTABar>
    </Page>
  );
}

Object.assign(window, { DraftReview, DisputeOutcome, ExternalLink });

// ── Leaving-Patch confirmation (clicked an external social link) ──
function ExternalLink({ nav, platform, handle }) {
  return (
    <Page>
      <TopBar onBack={nav.pop} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <PlatformBadge platform={platform} size={64} />
        <div className="display" style={{ fontSize: 22, fontWeight: 800, marginTop: 18 }}>Opening {platform}</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 280, lineHeight: 1.5 }}>
          You're about to leave Patch to view <span style={{ fontWeight: 700, color: 'var(--ink)' }}>{handle}</span> on {platform}.
        </div>
        <div style={{ width: '100%', marginTop: 22, textAlign: 'left', background: '#FFF3DB',
          border: '2.5px solid var(--gold)', borderRadius: 'var(--r-card)', padding: 16,
          boxShadow: '0 8px 24px rgba(232,161,60,.28)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 9 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--gold)', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(232,161,60,.5)' }}>
              <Icon name="alert" size={22} color="#fff" stroke={2.2} />
            </div>
            <span className="display" style={{ fontWeight: 800, fontSize: 16, color: '#8A5A12', letterSpacing: '.06em', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>Stay safe</span>
          </div>
          <div style={{ fontSize: 13, color: '#6E4A12', lineHeight: 1.5, fontWeight: 500 }}>
            Patch only protects deals booked and paid <span style={{ fontWeight: 800 }}>inside the app</span>. If you pay or arrange work off Patch, we <span style={{ fontWeight: 800 }}>can't hold the money safely, verify the post, or help if something goes wrong</span>.
          </div>
        </div>
      </div>
      <CTABar>
        <Btn full size="lg" iconRight="arrowR" onClick={nav.pop}>Continue to {platform}</Btn>
        <Btn full variant="ghost" style={{ marginTop: 4 }} onClick={nav.pop}>Stay on Patch</Btn>
      </CTABar>
    </Page>
  );
}
