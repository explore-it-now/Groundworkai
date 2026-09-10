// screens-polish.jsx — deal actions, clip detail, report/block

// ── Deal actions sheet (cancel / reschedule / counter / report) ──
function DealActions({ nav }) {
  const d = nav.store.deal;
  const role = nav.store.role;
  const c = byId(d.creatorId);
  const other = role === 'shop' ? c.name : (d.shop || SHOP.name);
  const row = (icon, label, sub, onClick, danger) => (
    <Card onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
      <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, background: danger ? 'var(--coral-soft)' : 'var(--cream-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={18} color={danger ? 'var(--coral-ink)' : 'var(--ink-2)'} />
      </div>
      <div style={{ flex: 1 }}>
        <div className="display" style={{ fontWeight: 700, fontSize: 14.5, color: danger ? 'var(--coral-ink)' : 'var(--ink)' }}>{label}</div>
        <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>
      </div>
      <Icon name="fwd" size={15} color="var(--ink-3)" />
    </Card>
  );
  return (
    <Page>
      <TopBar title="Manage deal" sub={`with ${other}`} onBack={nav.pop} />
      <Scroll>
        <Secured amount={d.amount} label="held safely while the deal is active" style={{ marginBottom: 16 }} />
        {row('calendar', 'Reschedule filming', 'Propose a new date', () => nav.push('Reschedule', {}))}
        {row('card', 'Counter-offer', 'Suggest a different price or scope', () => nav.push('CounterOffer', {}))}
        {row('refresh', 'Cancel this deal', 'Money returns to the payer', () => nav.push('CancelDeal', {}), true)}
        {row('ban', `Report or block ${other.split(' ')[0]}`, 'Flag a problem with this person', () => nav.push('ReportUser', { name: other }), true)}
      </Scroll>
    </Page>
  );
}

// ── Reschedule ──────────────────────────────────────────────
function Reschedule({ nav }) {
  const [day, setDay] = React.useState(24);
  return (
    <Page>
      <TopBar title="Propose new date" onBack={nav.pop} />
      <Scroll>
        <Calendar selected={day} unavailable={UNAVAILABLE} mode="pick" onDay={setDay} />
        <Legend items={[['var(--coral)', 'New date'], ['var(--cream-2)', 'Unavailable']]} />
      </Scroll>
      <CTABar>
        <Btn full size="lg" onClick={() => { nav.setDeal({ when: fmtDate(day) }); nav.sysMsg(`Filming moved to ${fmtDate(day)}`, 'calendar'); nav.tab('chats'); nav.push('Chat', { role: nav.store.role }); }}>Propose {fmtDate(day)}</Btn>
      </CTABar>
    </Page>
  );
}

// ── Counter-offer ───────────────────────────────────────────
function CounterOffer({ nav }) {
  const d = nav.store.deal;
  const [price, setPrice] = React.useState(d.amount);
  return (
    <Page>
      <TopBar title="Counter-offer" sub="Suggest a new price" onBack={nav.pop} />
      <Scroll>
        <Card style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
          <span className="display" style={{ fontSize: 24, fontWeight: 700, color: 'var(--ink-3)' }}>£</span>
          <span className="display num" style={{ fontSize: 34, fontWeight: 800, color: 'var(--coral)', marginLeft: 4 }}>{price}</span>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>was £{d.amount}</span>
        </Card>
        <input type="range" min="20" max="250" step="5" value={price} onChange={e => setPrice(+e.target.value)} style={{ width: '100%', accentColor: 'var(--coral)', marginBottom: 16 }} />
        <Label>Add a note (optional)</Label>
        <textarea placeholder="e.g. Could we add an Instagram Reel for a bit more?" style={{ width: '100%', minHeight: 76, resize: 'none', border: 'none', outline: 'none',
          background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)' }} />
      </Scroll>
      <CTABar>
        <Btn full size="lg" onClick={() => { const otherRole = nav.store.role === 'shop' ? 'creator' : 'shop'; nav.setDeal({ amount: price, awaiting: otherRole }); nav.sysMsg(`New offer sent: £${price}`, 'card'); nav.tab('chats'); nav.push('Chat', { role: nav.store.role }); }}>Send counter-offer</Btn>
      </CTABar>
    </Page>
  );
}

// ── Cancel deal ─────────────────────────────────────────────
function CancelDeal({ nav }) {
  const d = nav.store.deal;
  const reasons = ['Plans changed', 'Found someone else', 'Date no longer works', 'Other'];
  const [pick, setPick] = React.useState(null);
  return (
    <Page>
      <TopBar title="Cancel deal" onBack={nav.pop} />
      <Scroll>
        <Card style={{ display: 'flex', gap: 11, alignItems: 'flex-start', marginBottom: 16, background: 'var(--coral-soft)' }}>
          <Icon name="shield" size={18} color="var(--coral-ink)" style={{ marginTop: 1 }} />
          <span style={{ fontSize: 12.5, color: 'var(--coral-ink)', lineHeight: 1.45 }}>
            Cancelling before filming returns the full £{d.amount} to the payer. Frequent cancellations can affect your standing on Patch.
          </span>
        </Card>
        <SectionLabel>Why are you cancelling?</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {reasons.map(r => (
            <Card key={r} onClick={() => setPick(r)} pad={13} style={{ display: 'flex', alignItems: 'center', gap: 10, boxShadow: pick === r ? 'inset 0 0 0 2px var(--coral)' : undefined }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, boxShadow: pick === r ? 'none' : 'inset 0 0 0 2px var(--line-2)',
                background: pick === r ? 'var(--coral)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pick === r && <Icon name="check" size={12} color="#fff" />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{r}</span>
            </Card>
          ))}
        </div>
      </Scroll>
      <CTABar>
        <Btn full size="lg" variant="dark" disabled={!pick} onClick={() => { nav.setDeal({ active: false, status: 'requested' }); nav.reset('CancelDone', {}); }}>Cancel & refund £{d.amount}</Btn>
        <Btn full variant="ghost" style={{ marginTop: 4 }} onClick={nav.pop}>Keep the deal</Btn>
      </CTABar>
    </Page>
  );
}
function CancelDone({ nav }) {
  return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .5s ease both' }}>
          <Icon name="refresh" size={34} color="var(--ink)" />
        </div>
        <div className="display" style={{ fontSize: 22, fontWeight: 800, marginTop: 16 }}>Deal cancelled</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 250, lineHeight: 1.5 }}>
          The held payment has been returned in full. Both sides have been notified.
        </div>
        <Btn variant="soft" style={{ marginTop: 22 }} onClick={() => nav.tab(nav.store.role === 'shop' ? 'discover' : 'home')}>Done</Btn>
      </div>
    </Page>
  );
}

// ── Report / block a person ─────────────────────────────────
function ReportUser({ nav, name }) {
  const reasons = ['Inappropriate behaviour', 'Asked to pay outside Patch', 'Fake profile or stats', 'Didn\'t show / ghosted', 'Something else'];
  const [pick, setPick] = React.useState(null);
  const [sent, setSent] = React.useState(false);
  if (sent) return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--ink)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .5s ease both' }}>
          <Icon name="shield" size={36} color="#fff" />
        </div>
        <div className="display" style={{ fontSize: 21, fontWeight: 800, marginTop: 16 }}>Report received</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 250, lineHeight: 1.5 }}>
          Thanks for keeping Patch safe. Our team reviews every report — {name.split(' ')[0]} won't know who flagged them.
        </div>
        <Btn variant="soft" style={{ marginTop: 22 }} onClick={() => nav.tab(nav.store.role === 'shop' ? 'discover' : 'home')}>Done</Btn>
      </div>
    </Page>
  );
  return (
    <Page>
      <TopBar title={`Report ${name.split(' ')[0]}`} onBack={nav.pop} />
      <Scroll>
        <SectionLabel>What's the problem?</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {reasons.map(r => (
            <Card key={r} onClick={() => setPick(r)} pad={13} style={{ display: 'flex', alignItems: 'center', gap: 10, boxShadow: pick === r ? 'inset 0 0 0 2px var(--coral)' : undefined }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0, boxShadow: pick === r ? 'none' : 'inset 0 0 0 2px var(--line-2)',
                background: pick === r ? 'var(--coral)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pick === r && <Icon name="check" size={12} color="#fff" />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{r}</span>
            </Card>
          ))}
        </div>
        <textarea placeholder="Add any details that help us…" style={{ width: '100%', minHeight: 76, resize: 'none', border: 'none', outline: 'none',
          background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)' }} />
      </Scroll>
      <CTABar>
        <Btn full size="lg" variant="dark" icon="ban" disabled={!pick} onClick={() => setSent(true)}>Block & report</Btn>
        <Btn full variant="ghost" style={{ marginTop: 4 }} disabled={!pick} onClick={() => setSent(true)}>Report only</Btn>
      </CTABar>
    </Page>
  );
}

// ── Clip detail viewer ──────────────────────────────────────
function ClipDetail({ nav, seed, name, platform, views }) {
  return (
    <Page bg="#0E0D0B">
      <div style={{ padding: '4px 16px 8px', display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconButton icon="back" size={38} onClick={nav.pop} style={{ background: 'rgba(255,255,255,.12)', color: '#fff', boxShadow: 'none' }} />
        <div style={{ flex: 1 }} />
      </div>
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 16px', minHeight: 0 }}>
        <Thumb seed={seed} h={440} play style={{ width: '100%', maxWidth: 300, borderRadius: 22 }} />
      </div>
      <div style={{ padding: '16px 18px 30px', flexShrink: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Avatar name={name} size={40} src={nav.store.avatars.creator} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 15, color: '#fff' }}>{name}</div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,.6)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <PlatformBadge platform={platform} size={14} /> {views} views
            </div>
          </div>
          <Badge tone="dark" style={{ background: 'rgba(255,255,255,.15)', color: '#fff' }}>Sample work</Badge>
        </div>
      </div>
    </Page>
  );
}

Object.assign(window, { DealActions, Reschedule, CounterOffer, CancelDeal, CancelDone, ReportUser, ClipDetail });
