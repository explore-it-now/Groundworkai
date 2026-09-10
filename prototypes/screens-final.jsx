// screens-final.jsx — filters, saved, settings, edit profile, earnings, shop view

const NICHES = ['Food & cafés', 'Street & fashion', 'Food reviews', 'Comedy & local', 'Lifestyle'];

// ── Filter sheet ────────────────────────────────────────────
function FilterSheet({ nav }) {
  const cur = nav.store.filters;
  const [platforms, setPlatforms] = React.useState(cur.platforms || []);
  const [maxPrice, setMaxPrice] = React.useState(cur.maxPrice || 250);
  const [niche, setNiche] = React.useState(cur.niche || null);
  const tog = (p) => setPlatforms(ps => ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]);
  return (
    <Page>
      <TopBar title="Filters" onBack={nav.pop} right={<button className="press" onClick={() => { setPlatforms([]); setMaxPrice(250); setNiche(null); }} style={{ border: 'none', background: 'transparent', color: 'var(--coral-ink)', fontWeight: 700, fontSize: 13, cursor: 'pointer', fontFamily: 'var(--font-ui)' }}>Reset</button>} />
      <Scroll>
        <SectionLabel>Platform</SectionLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 8 }}>
          {['TikTok', 'Instagram', 'YouTube', 'Facebook'].map(p => (
            <Chip key={p} active={platforms.includes(p)} onClick={() => tog(p)}>{p}</Chip>
          ))}
        </div>
        <SectionLabel>Max price</SectionLabel>
        <Card style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
            <span style={{ fontSize: 13, color: 'var(--ink-2)' }}>Up to</span>
            <span className="display num" style={{ fontWeight: 700, color: 'var(--coral)' }}>£{maxPrice}</span>
          </div>
          <input type="range" min="40" max="250" step="5" value={maxPrice} onChange={e => setMaxPrice(+e.target.value)} style={{ width: '100%', accentColor: 'var(--coral)' }} />
        </Card>
        <SectionLabel>Niche</SectionLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {NICHES.map(n => <Chip key={n} active={niche === n} onClick={() => setNiche(niche === n ? null : n)}>{n}</Chip>)}
        </div>
      </Scroll>
      <CTABar><Btn full size="lg" onClick={() => { nav.setFilters({ platforms, maxPrice, niche }); nav.pop(); }}>Show results</Btn></CTABar>
    </Page>
  );
}

// ── Saved creators ──────────────────────────────────────────
function SavedCreators({ nav }) {
  const list = CREATORS.filter(c => nav.store.saved.includes(c.id));
  return (
    <Page>
      <TopBar title="Saved creators" sub={`${list.length} saved`} onBack={nav.pop} />
      <Scroll>
        {list.length ? list.map(c => (
          <Card key={c.id} onClick={() => nav.push('ShopProfile', { id: c.id })} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 10 }}>
            <Avatar name={c.name} size={46} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="display" style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>{c.name}</span>
                <Platforms list={c.platforms} size={15} />
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>{c.niche} · {c.dist}</div>
            </div>
            <div className="display num" style={{ fontWeight: 700, fontSize: 16 }}>£{c.price}</div>
          </Card>
        )) : <Empty icon="heart" title="Nothing saved yet" text="Tap the heart on a creator to keep them here for later." cta="Browse creators" onCta={() => nav.tab('discover')} />}
      </Scroll>
    </Page>
  );
}

// ── Settings ────────────────────────────────────────────────
function Settings({ nav }) {
  const rows = [['user', 'Account'], ['shield', 'Privacy & data'], ['card', 'Payments & payouts'], ['bell', 'Notifications'], ['chat', 'Help & support'], ['spark', 'About Patch']];
  return (
    <Page>
      <TopBar title="Settings" onBack={nav.pop} />
      <Scroll>
        <Card pad={0} style={{ marginBottom: 16 }}>
          {rows.map(([ic, l], i) => (
            <React.Fragment key={l}>
              <Row icon={ic} label={l} />
              {i < rows.length - 1 && <Divider />}
            </React.Fragment>
          ))}
        </Card>
        <Btn full variant="secondary" onClick={() => nav.restartOnboarding()}>Log out</Btn>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-3)', marginTop: 14 }}>Patch · v0.1 prototype</div>
      </Scroll>
    </Page>
  );
}

// ── Edit profile ────────────────────────────────────────────
function EditProfile({ nav }) {
  const role = nav.store.role;
  return (
    <Page>
      <TopBar title="Edit profile" onBack={nav.pop} />
      <Scroll>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
          <PhotoPicker name={role === 'shop' ? SHOP.name : 'Maya Reyes'} size={76} square={role === 'shop'}
            src={nav.store.avatars[role]} onPick={(src) => nav.setAvatar(role, src)} />
          <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 8, fontWeight: 600 }}>Tap to change photo</div>
        </div>
        {role === 'shop' ? (
          <React.Fragment>
            <EditField label="Business name" value="Brew & Co" />
            <EditField label="Type" value="Independent café" />
            <EditField label="Area" value="Hackney, E8" />
            <EditField label="About" value="Cosy neighbourhood café on the corner." area />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <EditField label="Name" value="Maya Reyes" />
            <EditField label="Handle" value="@mayaeats" />
            <EditField label="Area" value="London Fields" />
            <EditField label="Bio" value="I make cosy morning café reels that locals save and share." area />
          </React.Fragment>
        )}
      </Scroll>
      <CTABar><Btn full size="lg" onClick={nav.pop}>Save changes</Btn></CTABar>
    </Page>
  );
}
function EditField({ label, value, area }) {
  const style = { width: '100%', border: 'none', outline: 'none', background: 'var(--surface)', borderRadius: 'var(--r-inset)',
    padding: area ? 14 : '12px 14px', fontFamily: 'var(--font-ui)', fontSize: 14.5, color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)', lineHeight: 1.5 };
  return (
    <div style={{ marginBottom: 13 }}>
      <Label>{label}</Label>
      {area ? <textarea defaultValue={value} style={{ ...style, minHeight: 70, resize: 'none' }} /> : <input defaultValue={value} style={style} />}
    </div>
  );
}

// ── Creator earnings detail ─────────────────────────────────
function Earnings({ nav }) {
  const payouts = [
    ['Brew & Co', 'latte reel', 90, 'today', 'paid'],
    ['Fold Bakery', 'croissant of the week', 90, '2 wk ago', 'paid'],
    ['The Tonic Bar', 'summer menu', 90, '3 wk ago', 'paid'],
    ['Verde Plants', 'repotting how-to', 90, 'in escrow', 'pending'],
  ];
  return (
    <Page>
      <TopBar title="Earnings" onBack={nav.pop} />
      <Scroll>
        <Card style={{ background: 'linear-gradient(150deg, var(--ink), #34302a)', color: '#fff', marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Paid out this month</div>
          <div className="display num" style={{ fontSize: 34, fontWeight: 800, margin: '2px 0 12px' }}>£270.00</div>
          <div style={{ display: 'flex', gap: 18 }}>
            <div><div className="num" style={{ fontWeight: 700, fontSize: 15 }}>3</div><div style={{ fontSize: 11, opacity: .6 }}>completed</div></div>
            <div><div className="num" style={{ fontWeight: 700, fontSize: 15, color: 'var(--coral)' }}>£90</div><div style={{ fontSize: 11, opacity: .6 }}>in escrow</div></div>
            <div><div className="num" style={{ fontWeight: 700, fontSize: 15 }}>£0</div><div style={{ fontSize: 11, opacity: .6 }}>fees</div></div>
          </div>
        </Card>
        <Btn full variant="secondary" icon="card" style={{ marginBottom: 16 }}>Withdraw to bank ····8842</Btn>
        <SectionLabel>Activity</SectionLabel>
        {payouts.map(([shop, job, amt, when, st], i) => (
          <Card key={i} style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 8 }}>
            <Avatar name={shop} size={40} square />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="display" style={{ fontWeight: 700, fontSize: 14 }}>{shop}</div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{job} · {when}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display num" style={{ fontWeight: 700, fontSize: 15, color: st === 'paid' ? 'var(--green)' : 'var(--ink-3)' }}>{st === 'paid' ? '+' : ''}£{amt}</div>
              <div style={{ fontSize: 10, color: st === 'paid' ? 'var(--green)' : 'var(--coral-ink)', fontWeight: 700 }}>{st === 'paid' ? 'paid' : 'held'}</div>
            </div>
          </Card>
        ))}
      </Scroll>
    </Page>
  );
}

// ── Shop profile (as a creator sees it) ─────────────────────
function ShopProfileView({ nav, shop = 'Brew & Co' }) {
  return (
    <Page>
      <TopBar onBack={nav.pop} />
      <Scroll style={{ padding: '0 18px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 16 }}>
          <Avatar name={shop} size={80} square />
          <div className="display" style={{ fontSize: 22, fontWeight: 700, marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            {shop} <Icon name="verified" size={17} color="var(--coral)" fill="var(--coral)" stroke={0} />
          </div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2 }}>Independent café · Hackney, E8</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}>
            <Badge icon="star">4.9 · 12 hires</Badge>
            <Badge tone="green" icon="bolt">Pays fast</Badge>
          </div>
        </div>
        <Card style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 14 }}>
          Cosy neighbourhood café on the corner of London Fields. We love warm, authentic videos that feel local.
        </Card>
        <SectionLabel>Past collabs</SectionLabel>
        <div className="scroll" style={{ display: 'flex', gap: 9, overflowX: 'auto', marginBottom: 14 }}>
          {['bc1', 'bc2', 'bc3'].map(s => <Thumb key={s} seed={s} h={130} play style={{ width: 100 }} />)}
        </div>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <Icon name="shield" size={18} color="var(--green)" />
          <span style={{ fontSize: 12.5, color: 'var(--ink-2)', lineHeight: 1.4 }}>Payment method verified · last 12 deals released on time.</span>
        </Card>
      </Scroll>
    </Page>
  );
}

Object.assign(window, { FilterSheet, SavedCreators, Settings, EditProfile, Earnings, ShopProfileView });
