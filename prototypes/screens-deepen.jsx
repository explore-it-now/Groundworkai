// screens-deepen.jsx — calendar/availability, date picker, reviews

const WD = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const WD1 = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const TODAY = 14; // June 2026 demo "today"
const fmtDate = (day) => `${WD[new Date(2026, 5, day).getDay()]} ${day} Jun`;

// ── Reusable month calendar (June 2026) ─────────────────────
function Calendar({ selected, unavailable = [], onDay, mode = 'pick' }) {
  const firstDow = new Date(2026, 5, 1).getDay();
  const days = 30;
  const cells = [...Array(firstDow).fill(null), ...Array.from({ length: days }, (_, i) => i + 1)];
  return (
    <Card pad={14}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <span className="display" style={{ fontWeight: 700, fontSize: 16 }}>June 2026</span>
        <div style={{ display: 'flex', gap: 6 }}>
          <Icon name="back" size={16} color="var(--ink-3)" /><Icon name="fwd" size={16} color="var(--ink-2)" />
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4, marginBottom: 4 }}>
        {WD1.map((d, i) => <div key={i} style={{ textAlign: 'center', fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', padding: '2px 0' }}>{d}</div>)}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7,1fr)', gap: 4 }}>
        {cells.map((d, i) => {
          if (!d) return <div key={i} />;
          const past = d < TODAY;
          const off = unavailable.includes(d);
          const sel = selected === d;
          const disabled = mode === 'pick' && (past || off);
          let bg = 'transparent', col = 'var(--ink)', extra = null;
          if (sel) { bg = 'var(--coral)'; col = '#fff'; }
          else if (mode === 'pick' && off) { col = 'var(--ink-3)'; }
          else if (past) { col = 'var(--line-2)'; }
          else if (mode === 'manage' && off) { bg = 'var(--cream-2)'; col = 'var(--ink-3)'; }
          else if (mode === 'manage') { bg = 'var(--green-soft)'; col = 'var(--green)'; }
          return (
            <button key={i} disabled={disabled && mode === 'pick'} onClick={() => !((mode === 'pick') && disabled) && onDay && onDay(d)}
              className={disabled ? '' : 'press'} style={{ aspectRatio: '1', border: 'none', borderRadius: 10, cursor: disabled ? 'default' : 'pointer',
                background: bg, color: col, fontFamily: 'var(--font-ui)', fontWeight: sel ? 800 : 600, fontSize: 13.5, position: 'relative',
                display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              {d}
              {mode === 'pick' && off && !sel && <span style={{ position: 'absolute', bottom: 5, width: 3, height: 3, borderRadius: '50%', background: 'var(--ink-3)' }} />}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

function Legend({ items }) {
  return (
    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', marginTop: 14 }}>
      {items.map(([c, l]) => (
        <div key={l} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, color: 'var(--ink-3)', fontWeight: 600 }}>
          <span style={{ width: 12, height: 12, borderRadius: 4, background: c }} />{l}
        </div>
      ))}
    </div>
  );
}

// ── Date picker (shop books against creator availability) ───
function DatePicker({ nav, selected, onPick }) {
  const init = typeof selected === 'number' ? selected : 21;
  const [day, setDay] = React.useState(init);
  return (
    <Page>
      <TopBar title="Pick a date" sub="When should they film?" onBack={nav.pop} />
      <Scroll>
        <Calendar selected={day} unavailable={UNAVAILABLE} mode="pick" onDay={setDay} />
        <Legend items={[['var(--coral)', 'Selected'], ['var(--cream-2)', 'Booked / off']]} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 18, padding: '0 4px', color: 'var(--ink-3)' }}>
          <Icon name="calendar" size={15} color="var(--coral)" />
          <span style={{ fontSize: 12.5, lineHeight: 1.4 }}>Greyed days are when this creator is already booked or unavailable.</span>
        </div>
      </Scroll>
      <CTABar><Btn full size="lg" onClick={() => { onPick && onPick(day); nav.pop(); }}>Choose {fmtDate(day)}</Btn></CTABar>
    </Page>
  );
}

// ── Creator: manage availability ────────────────────────────
function ManageAvailability({ nav }) {
  const [off, setOff] = React.useState(UNAVAILABLE);
  const toggle = (d) => setOff(o => o.includes(d) ? o.filter(x => x !== d) : [...o, d]);
  return (
    <Page>
      <TopBar title="Your availability" sub="Tap days you can't film" onBack={nav.pop} />
      <Scroll>
        <Calendar unavailable={off} mode="manage" onDay={toggle} />
        <Legend items={[['var(--green-soft)', 'Available'], ['var(--cream-2)', 'Unavailable']]} />
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 18, padding: '0 4px', color: 'var(--ink-3)' }}>
          <Icon name="eye" size={15} color="var(--ink-3)" />
          <span style={{ fontSize: 12.5, lineHeight: 1.4 }}>Shops can only request you on your available days.</span>
        </div>
      </Scroll>
      <CTABar><Btn full size="lg" onClick={nav.pop}>Save availability</Btn></CTABar>
    </Page>
  );
}

// ── Stars + review card ─────────────────────────────────────
function StarRow({ n, size = 14 }) {
  return (
    <span style={{ display: 'inline-flex', gap: 1 }}>
      {[1, 2, 3, 4, 5].map(i => <Icon key={i} name="star" size={size} color={i <= n ? 'var(--gold)' : 'var(--line-2)'} fill={i <= n ? 'var(--gold)' : 'transparent'} stroke={i <= n ? 0 : 2} />)}
    </span>
  );
}
function ReviewCard({ r }) {
  return (
    <Card style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
        <Avatar name={r.by} size={36} square />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="display" style={{ fontWeight: 700, fontSize: 14 }}>{r.by}</div>
          <div style={{ fontSize: 11, color: 'var(--ink-3)' }}>{r.when}</div>
        </div>
        <StarRow n={r.stars} />
      </div>
      <div style={{ fontSize: 13.5, color: 'var(--ink-2)', lineHeight: 1.5 }}>"{r.text}"</div>
      {r.tags && <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 10 }}>
        {r.tags.map(t => <Badge key={t} tone="neutral">{t}</Badge>)}
      </div>}
    </Card>
  );
}

// ── Full reviews list ───────────────────────────────────────
function Reviews({ nav, id }) {
  const c = byId(id);
  const list = reviewsFor(id);
  return (
    <Page>
      <TopBar title="Reviews" sub={`${c.name} · ${c.jobs} jobs`} onBack={nav.pop} />
      <Scroll>
        <Card style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
          <div style={{ textAlign: 'center' }}>
            <div className="display num" style={{ fontSize: 32, fontWeight: 800, color: 'var(--ink)', lineHeight: 1 }}>{c.rating}</div>
            <StarRow n={Math.round(c.rating)} size={13} />
          </div>
          <div style={{ flex: 1, fontSize: 12.5, color: 'var(--ink-3)', lineHeight: 1.4 }}>
            Based on {c.jobs} completed jobs with local businesses on Patch.
          </div>
        </Card>
        {list.map((r, i) => <ReviewCard key={i} r={r} />)}
      </Scroll>
    </Page>
  );
}

Object.assign(window, { Calendar, DatePicker, ManageAvailability, Reviews, StarRow, ReviewCard, fmtDate });
