// screens-onboarding.jsx — first-run onboarding for both sides

const ALL_PLATFORMS = ['TikTok', 'Instagram', 'YouTube', 'Facebook'];
const SHOP_STEPS = ['shop-details', 'shop-payment', 'shop-trust'];
const CREATOR_STEPS = ['creator-details', 'creator-platforms', 'creator-connect', 'creator-price'];

function OBInput({ label, placeholder, defaultValue, value, onChange, area, prefix }) {
  const style = { width: '100%', border: 'none', outline: 'none', background: 'var(--surface)',
    borderRadius: 'var(--r-inset)', padding: area ? 14 : '12px 14px', fontFamily: 'var(--font-ui)',
    fontSize: 14.5, color: 'var(--ink)', boxShadow: 'inset 0 0 0 1px var(--line)', lineHeight: 1.5 };
  return (
    <div style={{ marginBottom: 13 }}>
      {label && <Label>{label}</Label>}
      {area
        ? <textarea placeholder={placeholder} defaultValue={defaultValue} style={{ ...style, minHeight: 76, resize: 'none' }} />
        : prefix
          ? <div style={{ display: 'flex', alignItems: 'center', gap: 6, ...style, padding: '12px 14px' }}>
              <span style={{ color: 'var(--ink-3)', fontWeight: 700 }}>{prefix}</span>
              <input placeholder={placeholder} defaultValue={defaultValue} style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontFamily: 'var(--font-ui)', fontSize: 14.5, color: 'var(--ink)' }} />
            </div>
          : <input placeholder={placeholder} defaultValue={defaultValue} value={value} onChange={onChange} style={style} />}
    </div>
  );
}

// progress bar for setup steps
function OBProgress({ steps, current, onBack }) {
  const idx = steps.indexOf(current);
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '4px 18px 14px' }}>
      <IconButton icon="back" size={36} onClick={onBack} />
      <div style={{ flex: 1, display: 'flex', gap: 5 }}>
        {steps.map((s, i) => (
          <div key={s} style={{ flex: 1, height: 5, borderRadius: 3, background: i <= idx ? 'var(--coral)' : 'var(--line-2)', transition: 'background .25s' }} />
        ))}
      </div>
      <span className="num" style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700 }}>{idx + 1}/{steps.length}</span>
    </div>
  );
}

function Onboarding({ nav }) {
  const [step, setStep] = React.useState('welcome');
  const [role, setRole] = React.useState(null);
  const [platforms, setPlatforms] = React.useState(['TikTok', 'Instagram']);
  const [price, setPrice] = React.useState(90);

  const togglePlat = (p) => setPlatforms(ps => ps.includes(p) ? ps.filter(x => x !== p) : [...ps, p]);
  const allOn = platforms.length === ALL_PLATFORMS.length;

  const back = () => {
    if (step === 'role') return setStep('welcome');
    const steps = role === 'shop' ? SHOP_STEPS : CREATOR_STEPS;
    const i = steps.indexOf(step);
    if (i <= 0) return setStep('role');
    setStep(steps[i - 1]);
  };

  // ── Welcome ───────────────────────────────────────────────
  if (step === 'welcome') {
    return (
      <Page bg="linear-gradient(180deg, var(--coral-soft), var(--cream) 60%)">
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 28px', textAlign: 'center' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 26 }}>
            {['Maya Reyes', 'Brew & Co', 'Priya Kaur'].map((n, i) => (
              <Avatar key={n} name={n} size={i === 1 ? 72 : 58} square={n === 'Brew & Co'}
                style={{ margin: i === 1 ? '0 -8px' : 0, zIndex: i === 1 ? 2 : 1, boxShadow: '0 0 0 4px var(--cream)' }} />
            ))}
          </div>
          <div className="display" style={{ fontSize: 17, fontWeight: 700, color: 'var(--coral)', letterSpacing: '.08em', textTransform: 'uppercase', marginBottom: 8 }}>Patch</div>
          <div className="display" style={{ fontSize: 33, fontWeight: 800, lineHeight: 1.08, letterSpacing: '-0.02em' }}>Hire creators<br />on your patch.</div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 14, lineHeight: 1.5, maxWidth: 290, marginInline: 'auto' }}>
            Businesses and neighbourhood creators, matched in minutes. Free to join, money held safely until the video's live.
          </div>
        </div>
        <CTABar style={{ background: 'transparent', paddingBottom: 30 }}>
          <Btn full size="lg" iconRight="arrowR" onClick={() => setStep('role')}>Get started</Btn>
          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--ink-3)', marginTop: 12, fontWeight: 600 }}>Already on Patch? <span className="press" onClick={() => setStep('login')} style={{ color: 'var(--coral-ink)', fontWeight: 700, cursor: 'pointer' }}>Log in</span></div>
        </CTABar>
      </Page>
    );
  }

  // ── Login (returning user) ──────────────────────────────
  if (step === 'login') {
    return (
      <Page>
        <div style={{ padding: '4px 18px 14px' }}><IconButton icon="back" size={36} onClick={() => setStep('welcome')} /></div>
        <Scroll>
          <div className="display" style={{ fontSize: 26, fontWeight: 800, marginBottom: 6 }}>Welcome back</div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 22 }}>Log in to pick up where you left off.</div>
          <OBInput label="Email or phone" placeholder="you@brewandco.com" defaultValue="sam@brewandco.com" />
          <OBInput label="Password" placeholder="••••••••" defaultValue="••••••••" />
          <div style={{ textAlign: 'right', fontSize: 12.5, color: 'var(--coral-ink)', fontWeight: 700, marginTop: 2 }}>Forgot password?</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, margin: '20px 0' }}>
            <div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} /><span style={{ fontSize: 12, color: 'var(--ink-3)' }}>or</span><div style={{ flex: 1, height: 1, background: 'var(--line-2)' }} />
          </div>
          <Btn full variant="secondary" icon="user" style={{ marginBottom: 10 }} onClick={() => nav.finishOnboarding('shop')}>Continue with Apple</Btn>
          <Btn full variant="secondary" icon="user" onClick={() => nav.finishOnboarding('shop')}>Continue with Google</Btn>
        </Scroll>
        <CTABar><Btn full size="lg" onClick={() => nav.finishOnboarding('shop')}>Log in</Btn></CTABar>
      </Page>
    );
  }

  // ── Role fork ─────────────────────────────────────────────
  if (step === 'role') {
    const opt = (r, icon, title, sub) => (
      <Card onClick={() => { setRole(r); setStep(r === 'shop' ? 'shop-details' : 'creator-details'); }}
        style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 18 }}>
        <div style={{ width: 52, height: 52, borderRadius: 15, flexShrink: 0, background: r === 'shop' ? 'var(--coral-soft)' : 'var(--ink)',
          display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name={icon} size={24} color={r === 'shop' ? 'var(--coral-ink)' : '#fff'} />
        </div>
        <div style={{ flex: 1 }}>
          <div className="display" style={{ fontWeight: 700, fontSize: 17 }}>{title}</div>
          <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.35 }}>{sub}</div>
        </div>
        <Icon name="arrowR" size={20} color="var(--ink-3)" />
      </Card>
    );
    return (
      <Page>
        <div style={{ padding: '4px 18px 14px' }}><IconButton icon="back" size={36} onClick={back} /></div>
        <Scroll>
          <div className="display" style={{ fontSize: 26, fontWeight: 800, lineHeight: 1.1, marginBottom: 6 }}>How will you<br />use Patch?</div>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', marginBottom: 22 }}>You can switch or do both later.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {opt('shop', 'card', 'I want to hire creators', 'Find creators near you and pay them to film a video — for any shop, café, brand or business.')}
            {opt('creator', 'camera', "I'm a creator", 'List your price and get paid to film for businesses near you.')}
          </div>
        </Scroll>
      </Page>
    );
  }

  // ── Shop: details ─────────────────────────────────────────
  if (step === 'shop-details') {
    return (
      <Page key={step}>
        <OBProgress steps={SHOP_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Tell us about your business</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 20 }}>Creators nearby will see this on your requests.</div>
          <OBInput label="Business name" placeholder="e.g. Brew & Co" defaultValue="Brew & Co" />
          <OBInput label="What kind of place?" placeholder="Café, bakery, salon, brand…" defaultValue="Independent café" />
          <OBInput label="Area / postcode" placeholder="e.g. Hackney, E8" defaultValue="Hackney, E8" />
        </Scroll>
        <CTABar><Btn full size="lg" iconRight="arrowR" onClick={() => setStep('shop-payment')}>Continue</Btn></CTABar>
      </Page>
    );
  }

  // ── Shop: payment method ──────────────────────────────────
  if (step === 'shop-payment') {
    return (
      <Page key={step}>
        <OBProgress steps={SHOP_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Add a payment method</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 18 }}>You're only charged when you hire someone — and it's held safely until the video's live.</div>
          {/* card visual */}
          <div style={{ borderRadius: 18, padding: 18, marginBottom: 16, color: '#fff', position: 'relative', overflow: 'hidden',
            background: 'linear-gradient(135deg, #2A2620, #4a4036)', height: 150, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div style={{ position: 'absolute', right: -30, top: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,.06)' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ width: 36, height: 26, borderRadius: 5, background: 'linear-gradient(135deg,#F5D479,#D9A93C)' }} />
              <span className="display" style={{ fontWeight: 700, fontSize: 15, letterSpacing: '.06em' }}>VISA</span>
            </div>
            <div className="num" style={{ fontSize: 18, letterSpacing: '.12em', fontWeight: 600 }}>4291  ••••  ••••  ••••</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: .8 }}>
              <span>{'Brew & Co'}</span><span className="num">09 / 28</span>
            </div>
          </div>
          <OBInput label="Card number" placeholder="1234 5678 9012 3456" defaultValue="4291 1234 5678 9012" />
          <div style={{ display: 'flex', gap: 10 }}>
            <div style={{ flex: 1 }}><OBInput label="Expiry" placeholder="MM / YY" defaultValue="09 / 28" /></div>
            <div style={{ flex: 1 }}><OBInput label="CVC" placeholder="123" defaultValue="•••" /></div>
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 6, padding: '0 4px', color: 'var(--ink-3)' }}>
            <Icon name="lock" size={15} color="var(--green)" />
            <span style={{ fontSize: 12, lineHeight: 1.4 }}>Encrypted &amp; secure. No charge until you confirm a hire.</span>
          </div>
        </Scroll>
        <CTABar><Btn full size="lg" iconRight="arrowR" onClick={() => setStep('shop-trust')}>Continue</Btn></CTABar>
      </Page>
    );
  }

  // ── Shop: trust ───────────────────────────────────────────
  if (step === 'shop-trust') {
    const rows = [
      ['card', 'You pay upfront, safely', 'Your fee is charged but parked — never sent until the work is done.'],
      ['lock', 'We hold it in escrow', 'Patch keeps the money secure while the creator films and posts.'],
      ['bolt', 'Released when it\'s live', 'The second the video posts, payment is released automatically.'],
    ];
    return (
      <Page>
        <OBProgress steps={SHOP_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>You're protected</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 18 }}>No upfront risk. Here's how every deal works.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {rows.map(([ic, t, s], i) => (
              <Card key={t} style={{ display: 'flex', gap: 13, alignItems: 'flex-start' }}>
                <div style={{ width: 40, height: 40, borderRadius: 12, flexShrink: 0, background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon name={ic} size={19} color="var(--green)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{t}</div>
                  <div style={{ fontSize: 12.5, color: 'var(--ink-3)', marginTop: 2, lineHeight: 1.4 }}>{s}</div>
                </div>
              </Card>
            ))}
          </div>
        </Scroll>
        <CTABar><Btn full size="lg" onClick={() => nav.finishOnboarding('shop')}>Start finding creators</Btn></CTABar>
      </Page>
    );
  }

  // ── Creator: details ──────────────────────────────────────
  if (step === 'creator-details') {
    return (
      <Page key={step}>
        <OBProgress steps={CREATOR_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Create your profile</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 20 }}>This is what local shops will see first.</div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: 18 }}>
            <PhotoPicker name="Maya Reyes" size={80} src={nav.store.avatars.creator} onPick={(src) => nav.setAvatar('creator', src)} />
            <div style={{ fontSize: 12, color: 'var(--ink-3)', marginTop: 8, fontWeight: 600 }}>Add a profile photo</div>
          </div>
          <OBInput label="Your name" placeholder="e.g. Maya Reyes" defaultValue="Maya Reyes" />
          <OBInput label="Handle" prefix="@" placeholder="mayaeats" defaultValue="mayaeats" />
          <OBInput label="Area you cover" placeholder="e.g. London Fields" defaultValue="London Fields" />
          <OBInput label="Short bio" area placeholder="What do you film? What's your style?" defaultValue="I make cosy morning café reels that locals save and share." />
        </Scroll>
        <CTABar><Btn full size="lg" iconRight="arrowR" onClick={() => setStep('creator-platforms')}>Continue</Btn></CTABar>
      </Page>
    );
  }

  // ── Creator: platforms multi-select (drives find-creator icons) ──
  if (step === 'creator-platforms') {
    return (
      <Page>
        <OBProgress steps={CREATOR_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Which platforms<br />do you post on?</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 16 }}>Pick all that apply — these badges show on your profile so shops know where you'll post.</div>
          <button className="press" onClick={() => setPlatforms(allOn ? [] : [...ALL_PLATFORMS])}
            style={{ border: 'none', background: 'transparent', cursor: 'pointer', color: 'var(--coral-ink)', fontWeight: 700, fontSize: 13, fontFamily: 'var(--font-ui)', padding: '0 0 12px' }}>
            {allOn ? 'Clear all' : 'Select all'}
          </button>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 11 }}>
            {ALL_PLATFORMS.map(p => {
              const on = platforms.includes(p);
              return (
                <Card key={p} onClick={() => togglePlat(p)} pad={16} style={{ position: 'relative',
                  boxShadow: on ? 'inset 0 0 0 2px var(--coral)' : 'inset 0 0 0 1px var(--line)' }}>
                  <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, borderRadius: '50%',
                    background: on ? 'var(--coral)' : 'transparent', boxShadow: on ? 'none' : 'inset 0 0 0 2px var(--line-2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {on && <Icon name="check" size={12} color="#fff" />}
                  </div>
                  <PlatformBadge platform={p} size={40} />
                  <div className="display" style={{ fontWeight: 700, fontSize: 15, marginTop: 12 }}>{p}</div>
                </Card>
              );
            })}
          </div>
          {/* live preview of how the card will look */}
          <SectionLabel>How shops will see you</SectionLabel>
          <Card style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name="Maya Reyes" size={46} />
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="display" style={{ fontWeight: 700, fontSize: 15, whiteSpace: 'nowrap' }}>Maya Reyes</span>
                {platforms.length ? <Platforms list={platforms} size={16} /> : <span style={{ fontSize: 11, color: 'var(--ink-3)' }}>pick a platform</span>}
              </div>
              <div style={{ fontSize: 11.5, color: 'var(--ink-3)', marginTop: 2 }}>12.4k followers · 0.4 mi</div>
            </div>
            <div className="display num" style={{ fontWeight: 700, fontSize: 16 }}>£{price}</div>
          </Card>
        </Scroll>
        <CTABar><Btn full size="lg" iconRight="arrowR" disabled={!platforms.length} onClick={() => setStep('creator-connect')}>Continue</Btn></CTABar>
      </Page>
    );
  }

  // ── Creator: connect the chosen platforms ─────────────────
  if (step === 'creator-connect') {
    return (
      <Page>
        <OBProgress steps={CREATOR_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Connect your accounts</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 18 }}>We pull your real follower count and average views, so your stats stay honest.</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {platforms.map((p, i) => (
              <Card key={p} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <PlatformBadge platform={p} size={40} />
                <div style={{ flex: 1 }}>
                  <div className="display" style={{ fontWeight: 700, fontSize: 15 }}>{p}</div>
                  <div style={{ fontSize: 12, color: i === 0 ? 'var(--green)' : 'var(--ink-3)', fontWeight: i === 0 ? 700 : 500 }}>
                    {i === 0 ? '✓ Connected · 12.4k' : 'Tap to connect'}
                  </div>
                </div>
                {i === 0 ? <Badge tone="green" icon="check">Linked</Badge> : <Btn size="sm" variant="soft">Connect</Btn>}
              </Card>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start', marginTop: 16, padding: '0 4px', color: 'var(--ink-3)' }}>
            <Icon name="eye" size={15} color="var(--ink-3)" />
            <span style={{ fontSize: 12, lineHeight: 1.4 }}>We only read public stats — never your passwords or DMs.</span>
          </div>
        </Scroll>
        <CTABar><Btn full size="lg" iconRight="arrowR" onClick={() => setStep('creator-price')}>Continue</Btn></CTABar>
      </Page>
    );
  }

  // ── Creator: price ────────────────────────────────────────
  if (step === 'creator-price') {
    return (
      <Page>
        <OBProgress steps={CREATOR_STEPS} current={step} onBack={back} />
        <Scroll>
          <div className="display" style={{ fontSize: 24, fontWeight: 800, marginBottom: 4 }}>Set your price</div>
          <div style={{ fontSize: 13.5, color: 'var(--ink-3)', marginBottom: 20 }}>One flat fee per video. You can add packages later.</div>
          <Card style={{ display: 'flex', alignItems: 'center', marginBottom: 10 }}>
            <span className="display" style={{ fontSize: 26, fontWeight: 700, color: 'var(--ink-3)' }}>£</span>
            <span className="display num" style={{ fontSize: 36, fontWeight: 800, color: 'var(--coral)', marginLeft: 4 }}>{price}</span>
            <span style={{ marginLeft: 'auto', fontSize: 12.5, color: 'var(--ink-3)', fontWeight: 600 }}>per {platforms[0] || 'TikTok'} video</span>
          </Card>
          <input type="range" min="20" max="250" step="5" value={price} onChange={e => setPrice(+e.target.value)}
            style={{ width: '100%', accentColor: 'var(--coral)', margin: '4px 0 8px' }} />
          <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>Creators near you charge £60–£140 for a video.</div>
        </Scroll>
        <CTABar><Btn full size="lg" onClick={() => nav.finishOnboarding('creator', { platforms })}>Go live on Patch</Btn></CTABar>
      </Page>
    );
  }

  return null;
}

Object.assign(window, { Onboarding });
