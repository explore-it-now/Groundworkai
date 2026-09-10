// screens-shop.jsx — business (shop) journey

// ── Discover (home tab) ─────────────────────────────────────
function ShopDiscover({ nav }) {
  const [sel, setSel] = React.useState('maya');
  const [filter, setFilter] = React.useState('Nearest');
  const [q, setQ] = React.useState('');
  const filters = ['Nearest', 'Cheapest', 'Most views', 'Food'];
  const pv = (v) => parseFloat(v) * (/k/i.test(v) ? 1000 : 1);
  let list = CREATORS.filter(c => !q || (c.name + ' ' + c.handle + ' ' + c.tags.join(' ')).toLowerCase().includes(q.toLowerCase()));
  const af = nav.store.filters;
  if (af.platforms && af.platforms.length) list = list.filter(c => c.platforms.some(p => af.platforms.includes(p)));
  if (af.niche) list = list.filter(c => c.niche === af.niche);
  if (af.maxPrice < 250) list = list.filter(c => c.price <= af.maxPrice);
  const activeFilters = (af.platforms && af.platforms.length) || af.niche || af.maxPrice < 250;
  if (filter === 'Food') list = list.filter(c => c.tags.includes('Food'));
  else if (filter === 'Cheapest') list = [...list].sort((a, b) => a.price - b.price);
  else if (filter === 'Most views') list = [...list].sort((a, b) => pv(b.avgViews) - pv(a.avgViews));
  else list = [...list].sort((a, b) => parseFloat(a.dist) - parseFloat(b.dist));
  return (
    <Page tab="discover" role="shop" onTab={nav.tab}>
      {/* header */}
      <div style={{ padding: '4px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <Icon name="pin" size={13} color="var(--coral)" /> {SHOP.area}
          </div>
          <div className="display" style={{ fontSize: 25, fontWeight: 700, lineHeight: 1.05, marginTop: 1 }}>Find a creator</div>
        </div>
        <IconButton icon="bell" size={40} badge onClick={() => nav.push('Notifications', {})} />
        <Avatar name={SHOP.name} size={42} square src={nav.store.avatars.shop} />
      </div>

      <Scroll>
        {/* search */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 9,
          background: 'var(--surface)', borderRadius: 'var(--r-pill)', padding: '11px 16px',
          boxShadow: 'inset 0 0 0 1px var(--line)', color: 'var(--ink-3)', marginBottom: 12 }}>
          <Icon name="search" size={18} color="var(--ink-3)" />
          <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search creators or styles…"
            style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-ui)',
              fontSize: 14.5, color: 'var(--ink)' }} />
          {q ? <button onClick={() => setQ('')} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex' }}><Icon name="close" size={16} color="var(--ink-3)" /></button>
            : <button onClick={() => nav.push('FilterSheet', {})} style={{ border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, display: 'flex', position: 'relative' }}><Icon name="filter" size={18} color={activeFilters ? 'var(--coral)' : 'var(--ink-2)'} />{activeFilters ? <span style={{ position: 'absolute', top: -2, right: -2, width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' }} /> : null}</button>}
        </div>

        {/* map */}
        <Card pad={0} style={{ overflow: 'hidden', marginBottom: 14, position: 'relative' }}>
          <MapView creators={CREATORS} selected={sel} onSelect={setSel} height={188} />
          <button className="press" onClick={() => {}} style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)',
            border: 'none', cursor: 'pointer', background: 'var(--ink)', color: '#fff', borderRadius: 'var(--r-pill)', padding: '7px 14px',
            fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 12.5, display: 'flex', alignItems: 'center', gap: 6, boxShadow: '0 4px 12px rgba(0,0,0,.2)' }}>
            <Icon name="refresh" size={14} color="#fff" /> Search this area
          </button>
          <div style={{ padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 8 }}>
            <Badge tone="coral" icon="spark">{list.length} creator{list.length === 1 ? '' : 's'} {q || filter === 'Food' ? 'matching' : 'within 2 mi'}</Badge>
            <div style={{ flex: 1 }} />
            <span style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>Tap a pin</span>
          </div>
        </Card>

        {/* selected creator quick card */}
        {sel && (() => { const c = byId(sel); return (
          <Card onClick={() => nav.push('ShopProfile', { id: c.id })} style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 16 }}>
            <Avatar name={c.name} size={50} src={c.id === 'maya' ? nav.store.avatars.creator : undefined} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="display" style={{ fontWeight: 700, fontSize: 16, whiteSpace: 'nowrap' }}>{c.name}</span>
                <Platforms list={c.id === 'maya' ? nav.store.myPlatforms : c.platforms} size={17} />
                <Icon name="verified" size={14} color="var(--coral)" fill="var(--coral)" stroke={0} />
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{c.platform} · {c.followers} · {c.avgViews} avg views</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div className="display num" style={{ fontWeight: 700, fontSize: 18, color: 'var(--coral)' }}>£{c.price}</div>
              <div style={{ fontSize: 10.5, color: 'var(--ink-3)' }}>per video</div>
            </div>
          </Card>
        ); })()}

        {/* filters */}
        <div style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 12 }} className="scroll">
          {filters.map(f => <Chip key={f} active={filter === f} onClick={() => setFilter(f)}>{f}</Chip>)}
        </div>

        {/* list */}
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {list.map(c => (
            <Card key={c.id} onClick={() => nav.push('ShopProfile', { id: c.id })} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <Avatar name={c.name} size={46} src={c.id === 'maya' ? nav.store.avatars.creator : undefined} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="display" style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>{c.name}</span>
                  <Platforms list={c.id === 'maya' ? nav.store.myPlatforms : c.platforms} size={16} />
                  {c.fast && <Badge tone="green" icon="bolt" style={{ padding: '2px 7px', fontSize: 10.5 }}>Fast</Badge>}
                </div>
                <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2, display: 'flex', gap: 7 }}>
                  <span>{c.niche}</span><span>·</span><span>{c.followers}</span><span>·</span><span>{c.dist}</span>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div className="display num" style={{ fontWeight: 700, fontSize: 16, color: 'var(--ink)' }}>£{c.price}</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 2, justifyContent: 'flex-end', marginTop: 1 }}>
                  <Icon name="star" size={11} color="var(--gold)" fill="var(--gold)" stroke={0} />
                  <span className="num" style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>{c.rating}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
        {list.length === 0 && <Empty icon="search" title="No creators found" text={`Nothing matches “${q}” nearby. Try a different search.`} cta="Clear search" onCta={() => { setQ(''); setFilter('Nearest'); }} />}
      </Scroll>
    </Page>
  );
}

// ── Creator profile ─────────────────────────────────────────
function ShopProfile({ nav, id }) {
  const c = byId(id);
  return (
    <Page bg="var(--cream)">
      <TopBar onBack={nav.pop} right={<IconButton icon="heart" size={38} onClick={() => nav.toggleSave(c.id)} style={{ color: nav.store.saved.includes(c.id) ? 'var(--coral)' : 'var(--ink)' }} />} />
      <Scroll style={{ padding: '0 18px 24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: 16 }}>
          <Avatar name={c.name} size={84} ring src={c.id === 'maya' ? nav.store.avatars.creator : undefined} />
          <div className="display" style={{ fontSize: 23, fontWeight: 700, marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
            {c.name} <Icon name="verified" size={18} color="var(--coral)" fill="var(--coral)" stroke={0} />
          </div>
          <div style={{ fontSize: 13, color: 'var(--ink-3)', marginTop: 2, fontWeight: 500 }}>{c.handle}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <Badge tone="coral" icon="spark">{c.niche}</Badge>
            <Badge icon="location">{c.dist} · {c.area}</Badge>
            {c.fast && <Badge tone="green" icon="bolt">Fast turnaround</Badge>}
          </div>
        </div>

        <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 4 }}>{c.bio}</div>

        <SectionLabel>Social reach</SectionLabel>
        {Object.keys(c.stats).map(p => {
          const s = c.stats[p];
          return (
            <Card key={p} onClick={() => nav.push('ExternalLink', { platform: p, handle: c.handle })} pad={13} style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 12 }}>
                <PlatformBadge platform={p} size={24} />
                <span className="display" style={{ fontWeight: 700, fontSize: 14.5 }}>{p}</span>
                <div style={{ flex: 1 }} />
                <span style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{c.handle}</span>
                <Icon name="arrowR" size={15} color="var(--ink-3)" style={{ marginLeft: 6 }} />
              </div>
              <div style={{ display: 'flex' }}>
                <Stat value={s.followers} label={p === 'YouTube' ? 'subscribers' : 'followers'} accent />
                <div style={{ width: 1, background: 'var(--line)' }} />
                <Stat value={s.videos} label={p === 'Instagram' || p === 'Facebook' ? 'posts' : 'videos'} />
                <div style={{ width: 1, background: 'var(--line)' }} />
                <Stat value={s.views} label="total views" />
              </div>
            </Card>
          );
        })}
        <div style={{ display: 'flex', gap: 9, alignItems: 'center', background: '#FFF3DB',
          border: '2px solid var(--gold)', borderRadius: 14, padding: '10px 13px', margin: '2px 0 4px' }}>
          <Icon name="alert" size={18} color="#C8881F" stroke={2.2} style={{ flexShrink: 0 }} />
          <span style={{ fontSize: 11.5, lineHeight: 1.4, color: '#7A5414', fontWeight: 700 }}>
            Stay safe — tapping a social link leaves Patch. Only deals booked &amp; paid in the app are protected.
          </span>
        </div>
        <Card style={{ display: 'flex', padding: '14px 6px', marginTop: 2, marginBottom: 4 }}>
          <Stat value={c.avgViews} label="avg / video" />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat value={c.eng} label="engagement" />
          <div style={{ width: 1, background: 'var(--line)' }} />
          <Stat value={c.rating} label={`${c.jobs} jobs`} />
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="display" style={{ fontWeight: 700, fontSize: 16 }}>Recent work</span>
          <span style={{ fontSize: 12.5, color: 'var(--coral-ink)', fontWeight: 700 }}>See all</span>
        </div>
        <div className="scroll" style={{ display: 'flex', gap: 9, overflowX: 'auto', marginBottom: 18 }}>
          {c.clips.map((s, i) => <div key={s} onClick={() => nav.push('ClipDetail', { seed: s, name: c.name, platform: c.platform, views: `${(i + 4) * 1.3 | 0}k` })} style={{ cursor: 'pointer' }}><Thumb seed={s} h={150} play label={`${(i + 4) * 1.3 | 0}k views`} style={{ width: 110 }} /></div>)}
        </div>

        <SectionLabel>Next available</SectionLabel>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="calendar" size={18} color="var(--green)" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 14 }}>Free from {c.fast ? 'Thu 18 Jun' : 'Sat 21 Jun'}</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Usually replies within {c.fast ? 'a few hours' : '1 day'}</div>
          </div>
          <Badge tone="green" icon="bolt">Open</Badge>
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10 }}>
          <span className="display" style={{ fontWeight: 700, fontSize: 16, display: 'flex', alignItems: 'center', gap: 7 }}>
            Reviews <StarRow n={Math.round(c.rating)} size={13} /> <span className="num" style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 600 }}>{c.rating}</span>
          </span>
          <span className="press" onClick={() => nav.push('Reviews', { id: c.id })} style={{ fontSize: 12.5, color: 'var(--coral-ink)', fontWeight: 700, cursor: 'pointer' }}>See all {c.jobs}</span>
        </div>
        {reviewsFor(c.id).slice(0, 2).map((r, i) => <ReviewCard key={i} r={r} />)}

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 8, marginBottom: 6 }}>
          {c.tags.map(t => <Chip key={t}>{t}</Chip>)}
        </div>
      </Scroll>

      <CTABar style={{ paddingBottom: 30 }}>
        <Card pad={12} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>Fixed price</div>
            <div className="display num" style={{ fontSize: 24, fontWeight: 700, color: 'var(--coral)', lineHeight: 1 }}>£{c.price}</div>
          </div>
          <Btn full onClick={() => nav.push('ShopRequest', { id: c.id })} iconRight="arrowR" style={{ flex: 1 }}>Request partnership</Btn>
        </Card>
      </CTABar>
    </Page>
  );
}

// ── Compose request ─────────────────────────────────────────
function ShopRequest({ nav, id }) {
  const c = byId(id);
  const [brief, setBrief] = React.useState('New oat-milk latte launch — cosy, warm morning vibe. Show the pour + a happy first sip.');
  const [day, setDay] = React.useState(21);
  const packages = React.useMemo(() => {
    const list = [{ label: `${c.platform} video`, price: c.price, platform: c.platform }];
    if (c.platforms && c.platforms[1]) {
      const p2 = c.platforms[1];
      list.push({ label: `${p2} ${p2 === 'YouTube' ? 'Short' : p2 === 'Instagram' ? 'Reel' : 'video'}`, price: Math.round(c.price * 0.85 / 5) * 5, platform: p2 });
    }
    list.push({ label: '2-video bundle', price: Math.round(c.price * 1.6 / 5) * 5 });
    return list;
  }, [id]);
  const [pkg, setPkg] = React.useState(0);
  const fee = packages[pkg].price;
  const service = Math.round(fee * 0.1);
  const total = fee + service;
  return (
    <Page>
      <TopBar title="Send request" sub={`to ${c.name}`} onBack={nav.pop} />
      <Scroll>
        <Card style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 14 }}>
          <Avatar name={c.name} size={42} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{c.name}</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>1 {c.platform} video · posted to their page</div>
          </div>
          <div className="display num" style={{ fontWeight: 700, color: 'var(--coral)', fontSize: 17 }}>£{fee}</div>
        </Card>

        <Label>Choose a package</Label>
        <div className="scroll" style={{ display: 'flex', gap: 8, overflowX: 'auto', marginBottom: 16, paddingBottom: 2 }}>
          {packages.map((p, i) => (
            <button key={i} className="press" onClick={() => setPkg(i)} style={{ flexShrink: 0, textAlign: 'left', cursor: 'pointer',
              border: 'none', borderRadius: 14, padding: '10px 14px', background: 'var(--surface)',
              boxShadow: pkg === i ? 'inset 0 0 0 2px var(--coral)' : 'inset 0 0 0 1px var(--line)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                {p.platform && <PlatformBadge platform={p.platform} size={15} />}
                <span style={{ fontSize: 12.5, fontWeight: 700, color: pkg === i ? 'var(--coral-ink)' : 'var(--ink)' }}>{p.label}</span>
              </div>
              <div className="display num" style={{ fontWeight: 700, fontSize: 15 }}>£{p.price}</div>
            </button>
          ))}
        </div>

        <Label>What do you want filmed?</Label>
        <textarea value={brief} onChange={e => setBrief(e.target.value)} style={{
          width: '100%', minHeight: 88, resize: 'none', border: 'none', outline: 'none',
          background: 'var(--surface)', borderRadius: 'var(--r-inset)', padding: 14, marginBottom: 14,
          fontFamily: 'var(--font-ui)', fontSize: 14, color: 'var(--ink)', lineHeight: 1.5,
          boxShadow: 'inset 0 0 0 1px var(--line)' }} />

        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <div style={{ flex: 1 }}>
            <Label>Filming date</Label>
            <Field icon="calendar" onClick={() => nav.push('DatePicker', { selected: day, onPick: setDay })}>{fmtDate(day)}</Field>
          </div>
          <div style={{ flex: 1 }}>
            <Label>Live within</Label>
            <Field icon="bolt">3 days</Field>
          </div>
        </div>

        <Card style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 8 }}>
            <span style={{ color: 'var(--ink-2)' }}>Creator fee</span><span className="num" style={{ fontWeight: 600 }}>£{fee}.00</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13.5, marginBottom: 10 }}>
            <span style={{ color: 'var(--ink-2)' }}>Service fee (10%)</span><span className="num" style={{ fontWeight: 600 }}>£{service}.00</span>
          </div>
          <div style={{ height: 1, background: 'var(--line)', marginBottom: 10 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span className="display" style={{ fontWeight: 700, fontSize: 15 }}>You'll pay on accept</span>
            <span className="display num" style={{ fontWeight: 700, fontSize: 19, color: 'var(--ink)' }}>£{total}.00</span>
          </div>
        </Card>

        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', padding: '0 4px', color: 'var(--green)' }}>
          <Icon name="shield" size={16} color="var(--green)" />
          <span style={{ fontSize: 12, lineHeight: 1.4, fontWeight: 600 }}>
            You won't be charged until {c.name.split(' ')[0]} accepts. Then it's held safely and only released once the video is posted live.
          </span>
        </div>
      </Scroll>

      <CTABar>
        <Btn full size="lg" iconRight="arrowR" onClick={() => {
          nav.setDeal({ active: true, creatorId: c.id, brief, when: fmtDate(day), deadline: '24 Jun', amount: fee, total, pkg: packages[pkg].label, status: 'requested', awaiting: 'creator' });
          nav.sysMsg(`Partnership request sent · £${fee} for ${packages[pkg].label}`, 'card');
          if (brief && brief.trim()) nav.pushMsg({ from: 'shop', text: brief.trim() });
          nav.reset('Chat', { role: 'shop' });
        }}>Send request</Btn>
      </CTABar>
    </Page>
  );
}

// ── Sent / waiting (auto-advances to match) ─────────────────
function ShopSent({ nav, id }) {
  const c = byId(id);
  React.useEffect(() => {
    const t = setTimeout(() => { nav.setDeal({ status: 'matched' }); nav.reset('ShopMatch', { id }); }, 2200);
    return () => clearTimeout(t);
  }, []);
  return (
    <Page>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 30, textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: 22 }}>
          <Avatar name={c.name} size={92} />
          <div style={{ position: 'absolute', inset: -8, borderRadius: '50%', boxShadow: '0 0 0 2px var(--coral)',
            animation: 'pulse 1.8s ease-out infinite' }} />
        </div>
        <div className="display" style={{ fontSize: 22, fontWeight: 700 }}>Request sent</div>
        <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, maxWidth: 250, lineHeight: 1.5 }}>
          Waiting for {c.name.split(' ')[0]} to accept. Your £{nav.store.deal.total || c.price} is authorised but not charged yet.
        </div>
        <div style={{ marginTop: 24, display: 'flex', gap: 6 }}>
          {[0, 1, 2].map(i => <span key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--coral)',
            animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }} />)}
        </div>
      </div>
    </Page>
  );
}

// ── Match ───────────────────────────────────────────────────
function ShopMatch({ nav, id }) {
  const c = byId(id);
  return (
    <Page bg="linear-gradient(170deg, var(--coral-soft), var(--cream) 55%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 22, animation: 'pop .5s ease both' }}>
          <Avatar name={SHOP.name} size={72} square style={{ marginRight: -14, boxShadow: '0 0 0 4px var(--cream)' }} />
          <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'var(--coral)', display: 'flex',
            alignItems: 'center', justifyContent: 'center', zIndex: 2, boxShadow: '0 6px 18px rgba(255,92,57,.4)' }}>
            <Icon name="spark" size={24} color="#fff" />
          </div>
          <Avatar name={c.name} size={72} style={{ marginLeft: -14, boxShadow: '0 0 0 4px var(--cream)' }} />
        </div>
        <div className="display" style={{ fontSize: 30, fontWeight: 800, color: 'var(--coral)', lineHeight: 1.1 }}>It's a match!</div>
        <div style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 10, maxWidth: 270, lineHeight: 1.5 }}>
          You and {c.name} agreed to work together. A private chat is now open to sort the details.
        </div>
        <Card style={{ width: '100%', marginTop: 22, textAlign: 'left' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
            <span style={{ color: 'var(--ink-3)', fontSize: 13, fontWeight: 600 }}>The deal</span>
            <span className="display" style={{ fontWeight: 700, fontSize: 14 }}>{nav.store.deal.pkg || `1 ${c.platform} video`} · £{nav.store.deal.amount}</span>
          </div>
          <Secured amount={nav.store.deal.amount} />
        </Card>
      </div>
      <CTABar style={{ background: 'transparent' }}>
        <Btn full size="lg" iconRight="chat" onClick={() => { nav.setDeal({ status: 'filming' }); nav.reset('Chat', { role: 'shop' }); }}>Open chat</Btn>
      </CTABar>
    </Page>
  );
}

// ── Deals tab ───────────────────────────────────────────────
function ShopDeals({ nav }) {
  const d = nav.store.deal;
  return (
    <Page tab="requests" role="shop" onTab={nav.tab}>
      <TopBar title="Your deals" right={<IconButton icon="heart" size={38} onClick={() => nav.push('SavedCreators', {})} />} />
      <Scroll>
        {d.active ? (
          <Card onClick={() => nav.push('DealStatus', {})} style={{ marginBottom: 12 }}>
            <div style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 12 }}>
              <Avatar name={byId(d.creatorId).name} size={44} />
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{byId(d.creatorId).name}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>1 video · {d.when}</div>
              </div>
              <Badge tone={d.status === 'released' ? 'green' : 'coral'}>{STATUS_LABEL[d.status]}</Badge>
            </div>
            <Secured amount={d.amount} label={d.status === 'released' ? 'paid out to creator' : 'held in escrow'} />
          </Card>
        ) : (
          <Empty icon="list" title="No active deals" text="Find a creator and send your first request." cta="Discover creators" onCta={() => nav.tab('discover')} />
        )}
        <SectionLabel>Past</SectionLabel>
        <Card soft style={{ display: 'flex', gap: 11, alignItems: 'center', opacity: .75 }}>
          <Avatar name="Priya Kaur" size={40} />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 14 }}>Priya Kaur</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Spot of the week · 14k views</div>
          </div>
          <Badge tone="green" icon="check">Done</Badge>
        </Card>
      </Scroll>
    </Page>
  );
}

// ── Deal status / escrow timeline ───────────────────────────
const STATUS_ORDER = ['requested', 'matched', 'filming', 'draft', 'posted', 'released'];
const STATUS_LABEL = { requested: 'Requested', matched: 'Matched', filming: 'Filming', draft: 'In review', posted: 'Posted', released: 'Complete' };

function DealStatus({ nav }) {
  const d = nav.store.deal;
  const c = byId(d.creatorId);
  const curIdx = STATUS_ORDER.indexOf(d.status);
  const steps = [
    ['Payment held', `£${d.amount} secured by Patch`],
    ['Matched', `You & ${c.name.split(' ')[0]} agreed`],
    ['Filming day', `${c.name.split(' ')[0]} at your venue · ${d.when}`],
    ['Draft approved', `You okay the cut before it's public`],
    ['Posted live', `Video on ${c.name.split(' ')[0]}'s ${c.platform}`],
    ['Auto-released', `£${d.amount} paid to ${c.name.split(' ')[0]}`],
  ];
  return (
    <Page>
      <TopBar title="Deal status" sub={`${c.name} · 1 video`} onBack={nav.pop} />
      <Scroll>
        <Secured amount={d.amount} label={d.status === 'released' ? 'paid out — all done' : 'held safely until posted'} style={{ marginBottom: 20 }} />
        <div style={{ paddingLeft: 4 }}>
          {steps.map(([t, sub], i) => {
            const done = i < curIdx, now = i === curIdx;
            return (
              <div key={t} style={{ display: 'flex', gap: 14, paddingBottom: i === steps.length - 1 ? 0 : 18, position: 'relative' }}>
                {i < steps.length - 1 && <div style={{ position: 'absolute', left: 12, top: 26, bottom: 0, width: 2,
                  background: done ? 'var(--coral)' : 'var(--line-2)' }} />}
                <div style={{ width: 26, height: 26, borderRadius: '50%', flexShrink: 0, zIndex: 1,
                  background: done ? 'var(--coral)' : now ? 'var(--surface)' : 'var(--cream-2)',
                  boxShadow: now ? 'inset 0 0 0 2.5px var(--coral)' : done ? 'none' : 'inset 0 0 0 1.5px var(--line-2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {done ? <Icon name="check" size={15} color="#fff" /> :
                    now ? <span style={{ width: 9, height: 9, borderRadius: '50%', background: 'var(--coral)' }} /> : null}
                </div>
                <div style={{ paddingTop: 1 }}>
                  <div className="display" style={{ fontWeight: 700, fontSize: 14.5, color: i > curIdx ? 'var(--ink-3)' : 'var(--ink)' }}>{t}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>
                </div>
              </div>
            );
          })}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 20, padding: '0 4px', color: 'var(--ink-3)' }}>
          <Icon name="bolt" size={15} color="var(--coral)" />
          <span style={{ fontSize: 12, lineHeight: 1.4 }}>Payment releases automatically the second the post goes live — no chasing.</span>
        </div>
        {d.status !== 'released' && (
          <button className="press" onClick={() => nav.push('Dispute', {})} style={{ display: 'flex', alignItems: 'center', gap: 6, margin: '16px auto 0',
            border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--ink-3)', fontFamily: 'var(--font-ui)', fontSize: 12.5, fontWeight: 600 }}>
            <Icon name="shield" size={14} color="var(--ink-3)" /> Something wrong? Report a problem
          </button>
        )}
      </Scroll>
      {(() => {
        const role = nav.store.role, s = d.status;
        let cta = null;
        if (s === 'released' && role === 'shop') cta = <Btn full size="lg" icon="star" onClick={() => nav.push('Review', { name: c.name, sub: `${c.platform} · ${c.area}` })}>Leave {c.name.split(' ')[0]} a review</Btn>;
        else if (role === 'creator' && s === 'filming') cta = <Btn full size="lg" variant="dark" icon="clip" onClick={() => { nav.setDeal({ status: 'draft' }); nav.sysMsg('Maya submitted a draft for approval', 'clip'); }}>Submit draft for approval</Btn>;
        else if (role === 'creator' && s === 'draft') cta = <Btn full size="lg" variant="secondary" disabled>Waiting for shop to approve…</Btn>;
        else if (role === 'creator' && s === 'posted') cta = <Btn full size="lg" variant="green" icon="camera" onClick={() => { nav.setDeal({ status: 'released' }); nav.sysMsg(`Video is live · £${d.amount} released to you`, 'lock'); nav.push('CreatorPayout', {}); }}>Post video to {c.platform}</Btn>;
        else if (role === 'shop' && s === 'filming') cta = <Btn full variant="dark" icon="play" onClick={() => { nav.setDeal({ status: 'draft' }); nav.sysMsg('Maya submitted a draft for approval', 'clip'); }}>Demo: creator submits a draft</Btn>;
        else if (role === 'shop' && s === 'draft') cta = <Btn full size="lg" icon="eye" onClick={() => nav.push('DraftReview', {})}>Review the draft</Btn>;
        else if (role === 'shop' && s === 'posted') cta = <Btn full variant="dark" icon="play" onClick={() => { nav.setDeal({ status: 'released' }); nav.sysMsg(`Video is live · £${d.amount} released to ${c.name.split(' ')[0]}`, 'lock'); }}>Demo: creator posts the video</Btn>;
        return cta ? <CTABar>{cta}</CTABar> : null;
      })()}
    </Page>
  );
}

// ── small helpers ───────────────────────────────────────────
function Label({ children }) { return <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--ink-2)', margin: '0 4px 7px' }}>{children}</div>; }
function Field({ children, icon, onClick }) {
  return (
    <div onClick={onClick} className={onClick ? 'press' : ''} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--surface)', borderRadius: 'var(--r-inset)',
      padding: '11px 13px', boxShadow: 'inset 0 0 0 1px var(--line)', fontSize: 14, fontWeight: 600, cursor: onClick ? 'pointer' : 'default' }}>
      {icon && <Icon name={icon} size={16} color="var(--ink-3)" />}<span style={{ flex: 1 }}>{children}</span>
      <Icon name="down" size={15} color="var(--ink-3)" />
    </div>
  );
}
function SectionLabel({ children }) { return <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--ink-3)', margin: '18px 4px 10px' }}>{children}</div>; }
function Empty({ icon, title, text, cta, onCta }) {
  return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ width: 60, height: 60, borderRadius: 18, background: 'var(--cream-2)', display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}><Icon name={icon} size={26} color="var(--ink-3)" /></div>
      <div className="display" style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginTop: 6, maxWidth: 230, marginInline: 'auto', lineHeight: 1.4 }}>{text}</div>
      {cta && <Btn variant="soft" style={{ marginTop: 16 }} onClick={onCta}>{cta}</Btn>}
    </div>
  );
}

Object.assign(window, { ShopDiscover, ShopProfile, ShopRequest, ShopSent, ShopMatch, ShopDeals, DealStatus, Label, Field, SectionLabel, Empty, STATUS_ORDER, STATUS_LABEL });
