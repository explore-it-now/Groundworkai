// screens-creator.jsx — shared chat/profile + creator journey

// ── Shared chat ─────────────────────────────────────────────
function Chat({ nav, role: roleProp }) {
  const role = roleProp || nav.store.role;
  const d = nav.store.deal;
  const creator = byId(d.creatorId || 'maya');
  const other = role === 'shop' ? { name: creator.name, sub: creator.platform } : { name: d.shop || SHOP.name, sub: SHOP.type };
  const otherSrc = role === 'shop' ? (creator.id === 'maya' ? nav.store.avatars.creator : undefined) : nav.store.avatars.shop;
  const msgs = nav.store.messages;
  const [draft, setDraft] = React.useState('');
  const endRef = React.useRef(null);
  const fileRef = React.useRef(null);
  React.useEffect(() => { if (endRef.current) endRef.current.scrollTop = endRef.current.scrollHeight; }, [msgs.length]);

  const replyBack = () => {
    const reply = role === 'shop'
      ? ["Sounds great! 🙌", "Perfect, noted.", "Can't wait ☕"]
      : ["Brilliant, thank you!", "Great — see you then.", "👍"];
    setTimeout(() => nav.pushMsg({ from: role === 'shop' ? 'creator' : 'shop', text: reply[Math.floor(Math.random() * reply.length)] }), 1100);
  };
  const send = () => {
    if (!draft.trim()) return;
    nav.pushMsg({ from: role, text: draft.trim() });
    setDraft('');
    replyBack();
  };
  const attach = (e) => {
    const f = e.target.files && e.target.files[0];
    if (!f) return;
    const r = new FileReader();
    r.onload = () => { nav.pushMsg({ from: role, img: r.result }); replyBack(); };
    r.readAsDataURL(f);
    e.target.value = '';
  };

  const pending = d.status === 'requested';
  const iAmAwaited = d.awaiting === role;
  const awaitedName = (d.awaiting === 'creator' ? creator.name : (d.shop || SHOP.name)).split(' ')[0];
  const acceptMatch = () => {
    nav.setDeal({ status: 'matched', awaiting: null });
    nav.sysMsg(`Offer accepted · £${d.amount} is now held safely in escrow`, 'lock');
    nav.push('ShopMatch', { id: d.creatorId || 'maya' });
  };
  const declineReq = () => {
    nav.setDeal({ status: 'declined', active: false, awaiting: null });
    nav.sysMsg('Request declined', 'close');
    nav.tab(role === 'shop' ? 'discover' : 'requests');
  };

  return (
    <Page>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 16px 10px', flexShrink: 0 }}>
        <IconButton icon="back" size={38} onClick={() => nav.tab('chats')} />
        <Avatar name={other.name} size={38} src={otherSrc} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{other.name}</div>
          <div style={{ fontSize: 11.5, color: 'var(--green)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)' }} />online
          </div>
        </div>
        <IconButton icon="more" size={38} onClick={() => nav.push('DealActions', {})} style={pending ? { opacity: .4, pointerEvents: 'none' } : undefined} />
      </div>

      {/* pinned deal — only once the deal is live (money held) */}
      {!pending && (
      <div onClick={() => nav.push('DealStatus', {})} className="press" style={{ margin: '0 16px 6px', display: 'flex', alignItems: 'center', gap: 10,
        background: 'var(--surface)', borderRadius: 14, padding: '9px 13px', boxShadow: 'inset 0 0 0 1px var(--line)', cursor: 'pointer' }}>
        <div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="lock" size={15} color="var(--green)" />
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, fontWeight: 700 }}>£{d.amount} held · {STATUS_LABEL[d.status] || 'In progress'}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>Film {d.when} · live by {d.deadline}</div>
        </div>
        <Icon name="fwd" size={16} color="var(--ink-3)" />
      </div>
      )}

      {/* messages */}
      <div ref={endRef} className="scroll" style={{ flex: 1, minHeight: 0, padding: '8px 16px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: 'var(--ink-3)', margin: '4px 0 8px', fontWeight: 600 }}>
          <Icon name="lock" size={11} color="var(--ink-3)" style={{ display: 'inline', verticalAlign: -1, marginRight: 3 }} />
          {pending ? 'Partnership request — chat and agree the details below' : 'Private chat — opened when you matched'}
        </div>

        {/* pending partnership request card */}
        {pending && (
          <Card style={{ marginBottom: 6, border: '1.5px solid var(--coral)', boxShadow: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: 9, background: 'var(--coral-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Icon name="spark" size={16} color="var(--coral-ink)" />
              </div>
              <span className="display" style={{ fontWeight: 700, fontSize: 15 }}>Partnership request</span>
              <div style={{ flex: 1 }} />
              <Badge tone="coral">Pending</Badge>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 5 }}>
              <span style={{ color: 'var(--ink-2)' }}>{d.pkg || '1 video'}</span>
              <span className="display num" style={{ fontWeight: 700, color: 'var(--coral)' }}>£{d.amount}</span>
            </div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 12 }}>Film {d.when} · live by {d.deadline}</div>
            {iAmAwaited ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                <Btn full icon="check" onClick={acceptMatch}>Accept &amp; match</Btn>
                <div style={{ display: 'flex', gap: 7 }}>
                  <Btn variant="secondary" small style={{ flex: 1 }} onClick={() => nav.push('CounterOffer', {})}>Counter-offer</Btn>
                  <Btn variant="secondary" small style={{ flex: 1 }} onClick={declineReq}>Decline</Btn>
                </div>
              </div>
            ) : (
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 7, fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600, marginBottom: 10 }}>
                  <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' }} />
                  Waiting for {awaitedName} to respond…
                </div>
                <Btn full variant="dark" small onClick={acceptMatch}>Demo: {awaitedName} accepts</Btn>
                <Btn full variant="ghost" small style={{ marginTop: 4 }} onClick={declineReq}>Withdraw request</Btn>
              </div>
            )}
          </Card>
        )}
        {msgs.map((m, i) => {
          if (m.from === 'system') {
            return (
              <div key={i} style={{ alignSelf: 'center', maxWidth: '88%', display: 'flex', alignItems: 'center', gap: 6,
                background: 'var(--cream-2)', color: 'var(--ink-2)', borderRadius: 'var(--r-pill)', padding: '5px 12px',
                fontSize: 11.5, fontWeight: 600, margin: '2px 0', animation: 'fadeUp .3s ease both' }}>
                <Icon name={m.icon || 'lock'} size={12.5} color="var(--ink-2)" />{m.text}
              </div>
            );
          }
          const mine = m.from === role;
          return (
            <div key={i} style={{ alignSelf: mine ? 'flex-end' : 'flex-start', maxWidth: '76%',
              background: m.img ? 'transparent' : (mine ? 'var(--coral)' : 'var(--surface)'), color: mine ? '#fff' : 'var(--ink)',
              borderRadius: mine ? '16px 16px 5px 16px' : '16px 16px 16px 5px', padding: m.img ? 0 : '9px 13px',
              fontSize: 14, lineHeight: 1.35, boxShadow: m.img ? 'none' : (mine ? '0 2px 8px rgba(255,92,57,.22)' : 'inset 0 0 0 1px var(--line)'),
              overflow: 'hidden', animation: 'fadeUp .3s ease both' }}>
              {m.img ? <img src={m.img} alt="" style={{ display: 'block', width: 180, maxWidth: '100%', borderRadius: 14 }} /> : m.text}
            </div>
          );
        })}
      </div>

      {/* input */}
      <div style={{ display: 'flex', gap: 9, alignItems: 'center', padding: '10px 16px 28px', flexShrink: 0 }}>
        <button className="press" onClick={() => fileRef.current && fileRef.current.click()} style={{ width: 40, height: 40, borderRadius: '50%', border: 'none',
          background: 'var(--surface)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, boxShadow: 'inset 0 0 0 1px var(--line)' }}>
          <Icon name="plus" size={20} color="var(--ink-2)" />
        </button>
        <input ref={fileRef} type="file" accept="image/*" onChange={attach} style={{ display: 'none' }} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--surface)', borderRadius: 'var(--r-pill)',
          padding: '4px 6px 4px 16px', boxShadow: 'inset 0 0 0 1px var(--line)' }}>
          <input value={draft} onChange={e => setDraft(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
            placeholder="Message…" style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-ui)', fontSize: 14.5, color: 'var(--ink)', padding: '7px 0' }} />
          <button className="press" onClick={send} style={{ width: 36, height: 36, borderRadius: '50%', border: 'none',
            background: 'var(--coral)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="send" size={17} color="#fff" />
          </button>
        </div>
      </div>
    </Page>
  );
}

// ── Chats list ──────────────────────────────────────────────
function ChatsList({ nav }) {
  const role = nav.store.role;
  const d = nav.store.deal;
  const has = d.active;
  const other = role === 'shop' ? (d.active ? byId(d.creatorId).name : 'Maya Reyes') : (d.shop || SHOP.name);
  const last = nav.store.messages[nav.store.messages.length - 1];
  return (
    <Page tab="chats" role={role} onTab={nav.tab}>
      <TopBar title="Chats" />
      <Scroll>
        {has ? (
          <Card onClick={() => nav.push('Chat', { role })} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name={other} size={50} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span className="display" style={{ fontWeight: 700, fontSize: 15 }}>{other}</span>
                <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>now</span>
              </div>
              <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {last ? last.text : 'Say hello 👋'}
              </div>
            </div>
          </Card>
        ) : <Empty icon="chat" title="No chats yet" text="A private chat opens the moment you match with someone." />}
      </Scroll>
    </Page>
  );
}

// ── Profile / You (shared, role-aware) ──────────────────────
function Profile({ nav }) {
  const role = nav.store.role;
  return (
    <Page tab="profile" role={role} onTab={nav.tab}>
      <TopBar title={role === 'shop' ? 'Your shop' : 'Your profile'} />
      <Scroll>
        {/* guided setup entry (onboarding is no longer forced) */}
        <Card onClick={() => nav.restartOnboarding()} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16,
          background: 'linear-gradient(135deg, var(--coral-soft), var(--surface))' }}>
          <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--coral)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name="spark" size={19} color="#fff" />
          </div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 14.5 }}>Take the guided setup</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Walk through onboarding for either side</div>
          </div>
          <Icon name="arrowR" size={17} color="var(--coral-ink)" />
        </Card>

        {/* role switcher */}
        <Card pad={6} style={{ marginBottom: 16, display: 'flex', gap: 4 }}>
          {[['shop', 'Hiring'], ['creator', 'Creator']].map(([r, l]) => (
            <button key={r} className="press" onClick={() => nav.role(r)} style={{ flex: 1, border: 'none', cursor: 'pointer',
              padding: '10px 8px', borderRadius: 16, fontFamily: 'var(--font-ui)', fontWeight: 700, fontSize: 13.5,
              background: role === r ? 'var(--ink)' : 'transparent', color: role === r ? '#fff' : 'var(--ink-3)' }}>{l}</button>
          ))}
        </Card>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <Avatar name={role === 'shop' ? SHOP.name : 'Maya Reyes'} size={62} square={role === 'shop'} src={nav.store.avatars[role]} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 19 }}>{role === 'shop' ? SHOP.name : 'Maya Reyes'}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 1 }}>{role === 'shop' ? `${SHOP.type} · ${SHOP.area}` : '@mayaeats · London Fields'}</div>
          </div>
          <Btn size="sm" variant="secondary" icon="user" onClick={() => nav.push('EditProfile', {})}>Edit</Btn>
        </div>

        {role === 'creator' && (
          <Card style={{ display: 'flex', padding: '14px 6px', marginBottom: 14 }}>
            <Stat value="£270" label="this month" accent />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat value="12.4k" label="followers" />
            <div style={{ width: 1, background: 'var(--line)' }} />
            <Stat value="4.9" label="rating" />
          </Card>
        )}

        {role === 'creator' && (
          <Card onClick={() => nav.push('CreatorOnboard', {})} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: 'var(--coral-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon name="card" size={18} color="var(--coral-ink)" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>Your price</div>
              <div className="display num" style={{ fontWeight: 700, fontSize: 17 }}>£90 <span style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 500 }}>/ TikTok video</span></div>
            </div>
            <Icon name="fwd" size={16} color="var(--ink-3)" />
          </Card>
        )}

        <Card pad={0} style={{ marginBottom: 14 }}>
          <Row icon="shield" tone="green" label="How you're protected" onClick={() => nav.push('EscrowExplainer', {})} />
          <Divider />
          <Row icon={role === 'creator' ? 'camera' : 'card'} label={role === 'creator' ? 'Connected socials' : 'Payment method'} sub={role === 'creator' ? 'TikTok · Instagram' : 'Visa ····4291'} onClick={role === 'creator' ? () => nav.push('CreatorConnect', {}) : undefined} />
          <Divider />
          {role === 'creator' && <React.Fragment>
            <Row icon="calendar" label="Your availability" sub="Set the days you can film" onClick={() => nav.push('ManageAvailability', {})} />
            <Divider />
          </React.Fragment>}
          <Row icon="bell" label="Notifications" onClick={() => nav.push('Notifications', {})} />
          <Divider />
          <Row icon="filter" label="Settings" onClick={() => nav.push('Settings', {})} />
        </Card>
        <div style={{ textAlign: 'center', fontSize: 11.5, color: 'var(--ink-3)', marginTop: 8 }}>Patch · v0.1 prototype</div>
      </Scroll>
    </Page>
  );
}
function Row({ icon, label, sub, tone, onClick }) {
  return (
    <div className={onClick ? 'press' : ''} onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '13px 14px', cursor: onClick ? 'pointer' : 'default' }}>
      <div style={{ width: 34, height: 34, borderRadius: 10, background: tone === 'green' ? 'var(--green-soft)' : 'var(--cream-2)',
        display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Icon name={icon} size={17} color={tone === 'green' ? 'var(--green)' : 'var(--ink-2)'} /></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14.5, fontWeight: 600 }}>{label}</div>
        {sub && <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 1 }}>{sub}</div>}
      </div>
      <Icon name="fwd" size={15} color="var(--ink-3)" />
    </div>
  );
}
function Divider() { return <div style={{ height: 1, background: 'var(--line)', marginLeft: 60 }} />; }

// ── Escrow explainer ────────────────────────────────────────
function EscrowExplainer({ nav }) {
  const rows = [
    ['card', 'Payment is taken upfront', 'The fee is charged but parked — not sent to anyone yet.'],
    ['lock', 'Patch holds the cash', 'Neither side can touch it while the video gets made.'],
    ['camera', 'Creator films & posts', 'The video goes live on the creator\'s own page.'],
    ['bolt', 'Auto-release', 'We verify the post and pay the creator instantly.'],
  ];
  return (
    <Page>
      <TopBar title="You're protected" onBack={nav.pop} />
      <Scroll>
        <div style={{ fontSize: 14.5, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 18 }}>
          Nobody gets scammed. Here's exactly how the money moves on every deal:
        </div>
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rows.map(([ic, t, sub], i) => (
            <Card key={t} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
              <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'var(--coral-soft)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
                <Icon name={ic} size={19} color="var(--coral-ink)" />
                <span className="display num" style={{ position: 'absolute', top: -6, left: -6, width: 19, height: 19, borderRadius: '50%',
                  background: 'var(--ink)', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{t}</div>
                <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.4 }}>{sub}</div>
              </div>
            </Card>
          ))}
        </div>
      </Scroll>
      <CTABar><Btn full variant="green" icon="shield" onClick={nav.pop}>Got it</Btn></CTABar>
    </Page>
  );
}

// ── Creator home ────────────────────────────────────────────
function CreatorHome({ nav }) {
  const newCount = INBOX.filter(r => r.status === 'new').length;
  return (
    <Page tab="home" role="creator" onTab={nav.tab}>
      <div style={{ padding: '4px 18px 8px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>Good morning</div>
          <div className="display" style={{ fontSize: 25, fontWeight: 700, lineHeight: 1.05 }}>Maya</div>
        </div>
        <IconButton icon="bell" size={40} badge onClick={() => nav.push('Notifications', {})} />
        <Avatar name="Maya Reyes" size={42} src={nav.store.avatars.creator} />
      </div>
      <Scroll>
        <Card onClick={() => nav.push('Earnings', {})} style={{ background: 'linear-gradient(150deg, var(--ink), #34302a)', color: '#fff', marginBottom: 14 }}>
          <div style={{ fontSize: 12.5, opacity: .7, fontWeight: 600 }}>Earnings this month</div>
          <div className="display num" style={{ fontSize: 34, fontWeight: 800, margin: '2px 0 12px' }}>£270.00</div>
          <div style={{ display: 'flex', gap: 18 }}>
            <div><div className="num" style={{ fontWeight: 700, fontSize: 15 }}>3</div><div style={{ fontSize: 11, opacity: .6 }}>videos posted</div></div>
            <div><div className="num" style={{ fontWeight: 700, fontSize: 15, color: 'var(--coral)' }}>£90</div><div style={{ fontSize: 11, opacity: .6 }}>in escrow</div></div>
          </div>
        </Card>

        <Card onClick={() => nav.tab('requests')} style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: 'var(--coral-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
            <Icon name="bell" size={20} color="var(--coral-ink)" />
            <span style={{ position: 'absolute', top: -4, right: -4, minWidth: 18, height: 18, padding: '0 4px', borderRadius: 9,
              background: 'var(--coral)', color: '#fff', fontSize: 11, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{newCount}</span>
          </div>
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{newCount} new requests</div>
            <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Local shops want to work with you</div>
          </div>
          <Btn size="sm" variant="soft">View</Btn>
        </Card>

        <SectionLabel>Your price</SectionLabel>
        <Card onClick={() => nav.push('CreatorOnboard', {})} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="display num" style={{ fontWeight: 800, fontSize: 22, color: 'var(--coral)' }}>£90</div>
          <div style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-3)' }}>per TikTok video · tap to edit packages</div>
          <Icon name="fwd" size={16} color="var(--ink-3)" />
        </Card>
      </Scroll>
    </Page>
  );
}

// ── Creator inbox (requests tab) ────────────────────────────
function CreatorInbox({ nav }) {
  const [declined, setDeclined] = React.useState([]);
  return (
    <Page tab="requests" role="creator" onTab={nav.tab}>
      <TopBar title="Requests" sub="From local shops near you" />
      <Scroll>
        <div className="stagger" style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
          {INBOX.filter(r => !declined.includes(r.id)).map(r => (
            <Card key={r.id} onClick={() => nav.push('CreatorRequest', { reqId: r.id })}>
              <div style={{ display: 'flex', gap: 11, alignItems: 'center', marginBottom: 9 }}>
                <Avatar name={r.shop} size={42} square />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span className="display" style={{ fontWeight: 700, fontSize: 15 }}>{r.shop}</span>
                    {r.status === 'new' && <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--coral)' }} />}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>{r.type} · {r.when}</div>
                </div>
                <div className="display num" style={{ fontWeight: 700, color: 'var(--coral)', fontSize: 17 }}>£{r.price}</div>
              </div>
              <div style={{ fontSize: 13, color: 'var(--ink-2)', marginBottom: 11, lineHeight: 1.4 }}>"{r.brief}"</div>
              <div style={{ display: 'flex', gap: 8 }} onClick={e => e.stopPropagation()}>
                <Btn size="sm" full onClick={() => {
                  nav.setDeal({ active: true, creatorId: 'maya', brief: r.brief, when: r.when, deadline: '24 Jun', amount: r.price, pkg: '1 video', status: 'requested', awaiting: 'creator', shop: r.shop });
                  nav.sysMsg(`Partnership request · £${r.price} · ${r.shop}`, 'card');
                  if (r.brief) nav.pushMsg({ from: 'shop', text: r.brief });
                  nav.reset('Chat', { role: 'creator' });
                }}>Respond</Btn>
                <Btn size="sm" variant="secondary" onClick={() => setDeclined(d => [...d, r.id])} style={{ flex: 1 }}>Decline</Btn>
              </div>
            </Card>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 16, padding: '0 4px', color: 'var(--ink-3)' }}>
          <Icon name="shield" size={15} color="var(--green)" />
          <span style={{ fontSize: 12, lineHeight: 1.4 }}>Accepting means £ is held safely for you before you film. You're in control — only say yes to shops you like.</span>
        </div>
      </Scroll>
    </Page>
  );
}

// ── Creator request detail ──────────────────────────────────
function CreatorRequest({ nav, reqId }) {
  const r = INBOX.find(x => x.id === reqId);
  return (
    <Page>
      <TopBar title="Request" onBack={nav.pop} />
      <Scroll>
        <Card onClick={() => nav.push('ShopProfileView', { shop: r.shop })} style={{ display: 'flex', alignItems: 'center', gap: 13, marginBottom: 16 }}>
          <Avatar name={r.shop} size={56} square />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 18 }}>{r.shop}</div>
            <div style={{ fontSize: 12.5, color: 'var(--ink-3)' }}>{r.type}</div>
          </div>
          <Icon name="fwd" size={16} color="var(--ink-3)" />
        </Card>
        <SectionLabel>The brief</SectionLabel>
        <Card style={{ fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5, marginBottom: 14 }}>"{r.brief}"</Card>
        <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
          <Card style={{ flex: 1 }}><div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>Filming</div>
            <div className="display" style={{ fontWeight: 700, fontSize: 15, marginTop: 2 }}>{r.when}</div></Card>
          <Card style={{ flex: 1 }}><div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 600 }}>You earn</div>
            <div className="display num" style={{ fontWeight: 700, fontSize: 15, marginTop: 2, color: 'var(--coral)' }}>£{r.price}.00</div></Card>
        </div>
        <Secured amount={r.price} label="will be held for you on accept" />
      </Scroll>
      <CTABar>
        <div style={{ display: 'flex', gap: 10 }}>
          <Btn variant="secondary" onClick={nav.pop} style={{ flex: 1 }}>Decline</Btn>
          <Btn iconRight="chat" onClick={() => {
            nav.setDeal({ active: true, creatorId: 'maya', brief: r.brief, when: r.when, deadline: '24 Jun', amount: r.price, pkg: '1 video', status: 'requested', awaiting: 'creator', shop: r.shop });
            nav.sysMsg(`Partnership request · £${r.price} · ${r.shop}`, 'card');
            if (r.brief) nav.pushMsg({ from: 'shop', text: r.brief });
            nav.reset('Chat', { role: 'creator' });
          }} style={{ flex: 2 }}>Open chat to respond</Btn>
        </div>
      </CTABar>
    </Page>
  );
}

// ── Creator onboard (set price) ─────────────────────────────
function CreatorOnboard({ nav }) {
  const [price, setPrice] = React.useState(90);
  return (
    <Page>
      <TopBar title="Set your price" onBack={nav.pop} />
      <Scroll>
        <Label>1 TikTok video</Label>
        <Card style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
          <span className="display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-3)' }}>£</span>
          <span className="display num" style={{ fontSize: 34, fontWeight: 800, color: 'var(--coral)', marginLeft: 4 }}>{price}</span>
          <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>flat fee</span>
        </Card>
        <input type="range" min="20" max="250" step="5" value={price} onChange={e => setPrice(+e.target.value)}
          style={{ width: '100%', accentColor: 'var(--coral)', margin: '4px 0 6px' }} />
        <div style={{ fontSize: 12, color: 'var(--ink-3)', marginBottom: 18 }}>Creators near you charge £60–£140 for a video.</div>

        <SectionLabel>Add packages</SectionLabel>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {['＋ IG Reel · £75', '＋ Story set · £40', '＋ TikTok + IG · £150'].map(p => <Chip key={p}>{p}</Chip>)}
        </div>
      </Scroll>
      <CTABar><Btn full size="lg" onClick={nav.pop}>Save price</Btn></CTABar>
    </Page>
  );
}

// ── Creator payout celebration ──────────────────────────────
function CreatorPayout({ nav }) {
  const d = nav.store.deal;
  return (
    <Page bg="linear-gradient(175deg, var(--green-soft), var(--cream) 50%)">
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 28, textAlign: 'center' }}>
        <div style={{ position: 'relative', marginBottom: 8, animation: 'pop .5s ease both' }}>
          <div style={{ width: 96, height: 96, borderRadius: '50%', background: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(28,138,91,.35)' }}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7" />
            </svg>
          </div>
        </div>
        <div className="display num" style={{ fontSize: 34, fontWeight: 800, color: 'var(--green)', marginTop: 12 }}>£{d.amount} paid out</div>
        <div style={{ fontSize: 14.5, color: 'var(--ink-2)', marginTop: 8, maxWidth: 260, lineHeight: 1.5 }}>
          We detected your video went live — funds released to you automatically. No invoicing, no chasing.
        </div>
        <Card style={{ width: '100%', marginTop: 22, display: 'flex', gap: 11, alignItems: 'center', textAlign: 'left' }}>
          <Thumb seed="payout" h={46} style={{ width: 46 }} play />
          <div style={{ flex: 1 }}>
            <div className="display" style={{ fontWeight: 700, fontSize: 14 }}>{d.shop || 'Brew & Co'} · latte reel</div>
            <div style={{ fontSize: 11.5, color: 'var(--ink-3)' }}>Live today · 8.4k views so far</div>
          </div>
          <span className="display num" style={{ fontWeight: 700, color: 'var(--green)' }}>+£{d.amount}</span>
        </Card>
      </div>
      <CTABar style={{ background: 'transparent' }}>
        <Btn full size="lg" variant="green" onClick={() => nav.tab('home')}>View earnings</Btn>
        <Btn full variant="ghost" style={{ marginTop: 4 }} onClick={() => nav.push('Review', { name: d.shop || 'Brew & Co', sub: SHOP.type })}>Leave {(d.shop || 'the shop').split(' ')[0]} a review</Btn>
      </CTABar>
    </Page>
  );
}

Object.assign(window, { Chat, ChatsList, Profile, Row, Divider, EscrowExplainer, CreatorHome, CreatorInbox, CreatorRequest, CreatorOnboard, CreatorPayout });
