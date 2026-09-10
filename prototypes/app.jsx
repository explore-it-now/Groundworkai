// app.jsx — assembles the wireframe canvas + tweaks

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#e8775a",
  "font": "Kalam",
  "showNotes": true,
  "ink": "#2b2a28"
}/*EDITMODE-END*/;

const FONT_STACK = {
  Kalam: "'Kalam', cursive",
  "Architects Daughter": "'Architects Daughter', cursive",
  Clean: "'Inter', system-ui, sans-serif",
};

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    const r = document.documentElement;
    r.style.setProperty('--accent', t.accent);
    r.style.setProperty('--ink', t.ink);
    r.style.setProperty('--wf-font', FONT_STACK[t.font] || FONT_STACK.Kalam);
    document.body.classList.toggle('hide-notes', !t.showNotes);
  }, [t.accent, t.ink, t.font, t.showNotes]);

  const H = 700;
  return (
    <React.Fragment>
      <DesignCanvas>
        <DCSection id="discover" title="1 · Discover creators"
          subtitle="How a local shop finds neighbourhood creators">
          <DCArtboard id="d-split" label="A · Map + list (recommended)" width={320} height={H}><DiscoverySplit /></DCArtboard>
          <DCArtboard id="d-map" label="B · Full map" width={320} height={H}><DiscoveryMap /></DCArtboard>
          <DCArtboard id="d-grid" label="C · Grid feed" width={320} height={H}><DiscoveryGrid /></DCArtboard>
        </DCSection>

        <DCSection id="profile" title="2 · Creator profile"
          subtitle="Real stats, one fixed price, request button">
          <DCArtboard id="p-stats" label="A · Stats-forward" width={320} height={730}><ProfileStats /></DCArtboard>
          <DCArtboard id="p-proof" label="B · Proof-forward" width={320} height={H}><ProfileProof /></DCArtboard>
          <DCArtboard id="p-compact" label="C · Decision card" width={320} height={H}><ProfileCompact /></DCArtboard>
        </DCSection>

        <DCSection id="flow" title="3 · Request → Match → Chat"
          subtitle="The connection moment, in order">
          <DCArtboard id="f-req" label="1 · Send request" width={320} height={H}><RequestSend /></DCArtboard>
          <DCArtboard id="f-match" label="2 · It's a match" width={320} height={640}><MatchOpen /></DCArtboard>
          <DCArtboard id="f-chat" label="3 · Private chat" width={320} height={H}><ChatRoom /></DCArtboard>
        </DCSection>

        <DCSection id="escrow" title="4 · Safe payments"
          subtitle="The anti-scam escrow layer — money held until the post goes live">
          <DCArtboard id="e-time" label="A · Deal status (shop)" width={320} height={H}><EscrowTimeline /></DCArtboard>
          <DCArtboard id="e-rel" label="B · Auto-payout (creator)" width={320} height={680}><EscrowRelease /></DCArtboard>
          <DCArtboard id="e-exp" label="C · How it's protected" width={320} height={680}><EscrowExplainer /></DCArtboard>
        </DCSection>

        <DCSection id="creator" title="5 · Creator side"
          subtitle="Set up free, list a price, accept the shops you like">
          <DCArtboard id="c-con" label="1 · Connect socials" width={320} height={680}><OnboardConnect /></DCArtboard>
          <DCArtboard id="c-price" label="2 · Set price + area" width={320} height={740}><OnboardPrice /></DCArtboard>
          <DCArtboard id="c-inbox" label="3 · Requests inbox" width={320} height={760}><CreatorInbox /></DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel>
        <TweakSection label="Look & feel" />
        <TweakColor label="Accent" value={t.accent}
          options={['#e8775a', '#2a6fdb', '#1f8a5b', '#7a5ae0', '#d94f7a']}
          onChange={(v) => setTweak('accent', v)} />
        <TweakRadio label="Sketch font" value={t.font}
          options={['Kalam', 'Architects Daughter', 'Clean']}
          onChange={(v) => setTweak('font', v)} />
        <TweakColor label="Ink" value={t.ink}
          options={['#2b2a28', '#1a2b3a', '#3a2b1a']}
          onChange={(v) => setTweak('ink', v)} />
        <TweakSection label="Display" />
        <TweakToggle label="Show annotations" value={t.showNotes}
          onChange={(v) => setTweak('showNotes', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
