// screens-extra.jsx — notifications, reviews, connect socials, disputes

// ── Notifications (role-aware) ──────────────────────────────
function Notifications({ nav }) {
  const role = nav.store.role;
  const items = role === 'shop' ? [
    ['spark', 'coral', 'Maya Reyes accepted your request', 'Your private chat is open', 'now', true, 'chats'],
    ['lock', 'green', '£140 released to Priya Kaur', 'Her "spot of the week" went live', '2d', false, 'requests'],
    ['user', 'neutral', '3 new creators joined near you', 'In London Fields & Dalston', '4d', false, 'discover'],
  ] : [
    ['bell', 'coral', 'New request from Fold Bakery', 'Croissant of the week · £90', 'now', true, 'requests'],
    ['bell', 'coral', 'New request from Verde Plants', 'Repotting how-to · £90', '1h', true, 'requests'],
    ['lock', 'green', '£90 released to you', 'Brew & Co latte reel is live', '3d', false, 'home'],
    ['star', 'neutral', 'Brew & Co left you a 5★ review', '"Maya was brilliant — so easy!"', '3d', false, 'profile'],
  ];
  return (
    <Page>
      <TopBar title="Notifications" onBack={nav.pop} />
      <Scroll>
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(([ic, tone, title, sub, time, unread, to], i) => (
            <Card key={i} onClick={() => nav.tab(to)} pad={12} style={{ display: 'flex', gap: 12, alignItems: 'center',
              background: unread ? 'var(--surface)' : 'transparent', boxShadow: unread ? undefined : 'inset 0 0 0 1px var(--line)' }}>
              <div style={{ width: 38, height: 38, borderRadius: 11, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: tone === 'green' ? 'var(--green-soft)' : tone === 'coral' ? 'var(--coral-soft)' : 'var(--cream-2)' }}>
                <Icon name={ic} size={18} color={tone === 'green' ? 'var(--green)' : tone === 'coral' ? 'var(--coral-ink)' : 'var(--ink-2)'} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 700, lineHeight: 1.25 }}>{title}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 5 }}>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>{time}</span>
                {unread && <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)' }} />}
              </div>
            </Card>
          ))}
        </div>
      </Scroll>
    </Page>
  );
}

// ── Review (star rating) ────────────────────────────────────
function Review({ nav, name, sub }) {
  const [rating, setRating] = React.useState(5);
  const [picked, setPicked] = React.useState([]);
  const [done, setDone] = React.useState(false);
  const tags = nav.store.role === 'shop'
    ? ['Great quality', 'On time', 'Easy to work with', 'On brief', 'Drove footfall']
    : ['Clear brief', 'Welcoming', 'Paid fast', 'Would work again'];
  const toggle = (t) => setPicked(p => p.includes(t) ? p.filter(x => x !== t) : [...p, t]);

  if (done) return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .5s ease both' }}>
          <Icon name="check" size={38} color="#fff" />
        </div>
        <div className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 18 }}>Thanks for the review!</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 240, lineHeight: 1.5 }}>
          Reviews keep Patch trustworthy for everyone nearby.
        </div>
        <Btn variant="soft" style={{ marginTop: 22 }} onClick={() => nav.tab(nav.store.role === 'shop' ? 'discover' : 'home')}>Done</Btn>
      </div>
    </Page>
  );

  return (
    <Page>
      <TopBar title="Leave a review" onBack={nav.pop} />
      <Scroll>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 18 }}>
          <Avatar name={name} size={66} square={nav.store.role === 'creator'} />
          <div className="display" style={{ fontWeight: 700, fontSize: 18, marginTop: 12 }}>{name}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{sub}</div>
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginBottom: 22 }}>
          {[1, 2, 3, 4, 5].map(n => (
            <button key={n} className="press" onClick={() => setRating(n)} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 2 }}>
              <Icon name="star" size={36} color={n <= rating ? 'var(--gold)' : 'var(--line-2)'} fill={n <= rating ? 'var(--gold)' : 'transparent'} stroke={n <= rating ? 0 : 2} />
            </button>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 18 }}>
          {tags.map(t => <Chip key={t} active={picked.includes(t)} onClick={() => toggle(t)}>{t}</Chip>)}
        </div>
        <textarea placeholder="Add a few words (optional)…" style={{ width: '100%', minHeight: 80, resize: 'none', border: 'none', outline: 'none',
          background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)',
          boxShadow: 'inset 0 0 0 1px var(--line)' }} />
      </Scroll>
      <CTABar><Btn full size="lg" onClick={() => setDone(true)}>Post review</Btn></CTABar>
    </Page>
  );
}

// ── Creator: connect socials ────────────────────────────────
function CreatorConnect({ nav }) {
  const [ig, setIg] = React.useState(false);
  return (
    <Page>
      <TopBar title="Connected socials" sub="We pull your real stats" onBack={nav.pop} />
      <Scroll>
        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 16 }}>
          Shops trust verified numbers. Connect your accounts so your follower count and average views stay honest and up to date.
        </div>
        <Card style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
          <PlatformBadge platform="TikTok" size={40} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>TikTok</div>
            <div style={{ fontSize: 12, color: 'var(--green)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 4 }}>
              <Icon name="check" size={13} color="var(--green)" /> Connected · 12.4k · 8.1k avg views
            </div>
          </div>
        </Card>
        <Card style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <PlatformBadge platform="Instagram" size={40} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>Instagram</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>{ig ? 'Connected · 3.1k' : 'Not connected yet'}</div>
          </div>
          {ig ? <Badge tone="green" icon="check">Linked</Badge> : <Btn size="sm" variant="soft" onClick={() => setIg(true)}>Connect</Btn>}
        </Card>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 16, padding: '0 4px', color: 'var(--ink-3)' }}>
          <Icon name="eye" size={15} color="var(--ink-3)" />
          <span style={{ fontSize: 12, lineHeight: 1.4 }}>We only read public stats — never your passwords or DMs.</span>
        </div>
      </Scroll>
      <CTABar><Btn full size="lg" onClick={nav.pop}>Save</Btn></CTABar>
    </Page>
  );
}

// ── Dispute / report a problem ──────────────────────────────
function Dispute({ nav }) {
  const role = nav.store.role;
  const reasons = role === 'shop'
    ? ['Video never went live', 'Content not as briefed', 'Creator was a no-show', 'Something else']
    : ['Shop cancelled on the day', 'Couldn\'t access the venue', 'Brief changed unfairly', 'Something else'];
  const [pick, setPick] = React.useState(null);
  const [sent, setSent] = React.useState(false);

  if (sent) return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'var(--cream-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pop .5s ease both' }}>
          <Icon name="shield" size={36} color="var(--ink)" />
        </div>
        <div className="display" style={{ fontSize: 21, fontWeight: 700, marginTop: 18 }}>We're on it</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 250, lineHeight: 1.5 }}>
          Your £{nav.store.deal.amount} stays safely held while our team looks into this. We'll message you within 24h.
        </div>
        <Btn size="lg" style={{ marginTop: 22 }} onClick={() => nav.reset('DisputeOutcome', {})}>See the resolution</Btn>
        <Btn variant="ghost" style={{ marginTop: 4 }} onClick={() => nav.tab('chats')}>Back to chat</Btn>
      </div>
    </Page>
  );

  return (
    <Page>
      <TopBar title="Report a problem" onBack={nav.pop} />
      <Scroll>
        <Secured amount={nav.store.deal.amount} label="stays held until this is resolved" style={{ marginBottom: 18 }} />
        <SectionLabel>What went wrong?</SectionLabel>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 16 }}>
          {reasons.map(r => (
            <Card key={r} onClick={() => setPick(r)} pad={13} style={{ display: 'flex', alignItems: 'center', gap: 10,
              boxShadow: pick === r ? 'inset 0 0 0 2px var(--coral)' : undefined }}>
              <div style={{ width: 20, height: 20, borderRadius: '50%', flexShrink: 0,
                boxShadow: pick === r ? 'none' : 'inset 0 0 0 2px var(--line-2)', background: pick === r ? 'var(--coral)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {pick === r && <Icon name="check" size={12} color="#fff" />}
              </div>
              <span style={{ fontSize: 14, fontWeight: 600 }}>{r}</span>
            </Card>
          ))}
        </div>
        <textarea placeholder="Tell us what happened…" style={{ width: '100%', minHeight: 80, resize: 'none', border: 'none', outline: 'none',
          background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14, fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)',
          boxShadow: 'inset 0 0 0 1px var(--line)' }} />
      </Scroll>
      <CTABar><Btn full size="lg" variant="dark" disabled={!pick} onClick={() => setSent(true)}>Submit report</Btn></CTABar>
    </Page>
  );
}

Object.assign(window, { Notifications, Review, CreatorConnect, Dispute });
