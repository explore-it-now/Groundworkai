// screens-flow.jsx — request → match → chat (the connection moment)

// Step 1 — Business composes & sends the partnership request
function RequestSend() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Send request" back sub="to Maya R. · £90" />
      <Body style={{ gap: 12 }}>
        <Sk style={{ display: 'flex', gap: 10, alignItems: 'center', padding: 10 }}>
          <Avatar size={40} />
          <div><div style={{ fontWeight: 700, fontSize: 14 }}>Maya R.</div>
            <div style={{ fontSize: 11, color: 'var(--ink-soft)' }}>1 TikTok video · £90</div></div>
        </Sk>
        <div>
          <Eyebrow>What do you want filmed?</Eyebrow>
          <Sk soft style={{ height: 76, padding: 10, fontSize: 12.5, color: 'var(--ink-soft)' }}>
            New oat-milk latte launch — cosy morning vibe…
          </Sk>
        </div>
        <div style={{ display: 'flex', gap: 10 }}>
          <div style={{ flex: 1 }}>
            <Eyebrow>Filming date</Eyebrow>
            <Sk soft style={{ padding: '9px 10px', fontSize: 13 }}>Sat 21 Jun ▾</Sk>
          </div>
          <div style={{ flex: 1 }}>
            <Eyebrow>Deadline live</Eyebrow>
            <Sk soft style={{ padding: '9px 10px', fontSize: 13 }}>+3 days ▾</Sk>
          </div>
        </div>
        <Sk alt style={{ padding: 12, display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontSize: 13 }}>You'll pay (held safely)</span>
          <span style={{ fontWeight: 700, color: 'var(--accent)' }}>£90</span>
        </Sk>
        <Btn fill>Send request →</Btn>
        <Note>Money is authorised now but only captured once she accepts.</Note>
      </Body>
    </WFScreen>
  );
}

// Step 2 — The match: both agreed, chat unlocks
function MatchOpen() {
  return (
    <WFScreen bg="var(--paper)">
      <StatusBar />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center',
        justifyContent: 'center', padding: 24, textAlign: 'center', gap: 6 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 6 }}>
          <Avatar size={62} />
          <div style={{ fontSize: 30, margin: '0 -8px', zIndex: 2, color: 'var(--accent)' }}>🤝</div>
          <Avatar size={62} />
        </div>
        <div style={{ fontWeight: 700, fontSize: 24, color: 'var(--accent)' }}>It's a match!</div>
        <div style={{ fontSize: 14, color: 'var(--ink-soft)', maxWidth: 220 }}>
          You & Maya R. agreed to work together. A private chat is now open.
        </div>
        <Sk style={{ marginTop: 14, padding: 12, width: '100%', textAlign: 'left', fontSize: 12.5 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
            <span style={{ color: 'var(--ink-soft)' }}>Deal</span><span style={{ fontWeight: 700 }}>1 TikTok · £90</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--ink-soft)' }}>£90 held in escrow</span>
            <span style={{ color: 'var(--accent)', fontWeight: 700 }}>🔒 secured</span></div>
        </Sk>
        <Btn fill style={{ width: '100%', marginTop: 14 }}>Open chat →</Btn>
      </div>
    </WFScreen>
  );
}

// Step 3 — Private chat room to finalise details
function ChatRoom() {
  return (
    <WFScreen>
      <StatusBar />
      <TopBar title="Maya R." back sub="● online · deal £90"
        right={<span style={{ fontSize: 16, color: 'var(--accent)' }}>🔒</span>} />
      {/* pinned deal bar */}
      <div style={{ margin: '0 14px 8px', display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', borderRadius: 8, border: '2px dashed var(--ink-soft)', padding: '6px 10px' }}>
        <span style={{ fontSize: 11.5, color: 'var(--ink-soft)' }}>Film Sat 21 · live by 24 Jun</span>
        <span style={{ fontSize: 11.5, color: 'var(--accent)', fontWeight: 700 }}>£90 held 🔒</span>
      </div>
      <Body style={{ gap: 9, paddingTop: 2 }}>
        <Bubble>Hi! Excited for the latte shoot ☕</Bubble>
        <Bubble me>Perfect — door's open from 8am, ask for Sam.</Bubble>
        <Bubble>Great. I'll send a draft before posting 👍</Bubble>
        <div style={{ alignSelf: 'center', fontSize: 11, color: 'var(--ink-soft)',
          border: '2px solid var(--ink-soft)', borderRadius: 20, padding: '3px 10px' }}>
          📎 brief.pdf shared
        </div>
        <Bubble me>Amazing, see you Saturday!</Bubble>
      </Body>
      <div style={{ display: 'flex', gap: 8, padding: 12, borderTop: '2px solid var(--ink)', alignItems: 'center' }}>
        <Sk soft style={{ flex: 1, padding: '8px 12px', fontSize: 13, color: 'var(--ink-soft)' }}>Message…</Sk>
        <div style={{ width: 38, height: 38, borderRadius: '50%', background: 'var(--accent)', color: '#fff',
          display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>↑</div>
      </div>
    </WFScreen>
  );
}

function Bubble({ children, me }) {
  return (
    <div style={{ alignSelf: me ? 'flex-end' : 'flex-start', maxWidth: '78%',
      background: me ? 'color-mix(in srgb,var(--accent) 16%,transparent)' : 'transparent',
      border: `2px solid ${me ? 'var(--accent)' : 'var(--ink)'}`,
      borderRadius: me ? '14px 14px 4px 14px' : '14px 14px 14px 4px',
      padding: '7px 11px', fontSize: 13, color: 'var(--ink)' }}>{children}</div>
  );
}

Object.assign(window, { RequestSend, MatchOpen, ChatRoom, Bubble });
