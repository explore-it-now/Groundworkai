// data.jsx — mock data + MapView

const SHOP = { name: 'Brew & Co', type: 'Independent café', area: 'Hackney, E8', initials: 'B' };

const CREATORS = [
  { id: 'maya', name: 'Maya Reyes', handle: '@mayaeats', platform: 'TikTok', platforms: ['TikTok', 'Instagram'], followers: '12.4k',
    avgViews: '8.1k', eng: '6.2%', price: 90, dist: '0.4 mi', area: 'London Fields', rating: 4.9, jobs: 27,
    tags: ['Food', 'Cafés', 'Cosy'], x: 32, y: 40, fast: true,
    bio: 'I make cosy morning café reels that locals actually save and share. Quick turnaround, always on-brand.',
    clips: ['m1', 'm2', 'm3', 'm4'], niche: 'Food & cafés',
    stats: { TikTok: { followers: '12.4k', videos: 148, views: '1.2M' }, Instagram: { followers: '3.1k', videos: 96, views: '320k' } } },
  { id: 'tomi', name: 'Tomi Adeyemi', handle: '@tomi.shoots', platform: 'Instagram', platforms: ['Instagram', 'TikTok'], followers: '6.8k',
    avgViews: '3.2k', eng: '8.1%', price: 60, dist: '0.9 mi', area: 'Dalston', rating: 4.8, jobs: 14,
    tags: ['Street', 'Fashion'], x: 60, y: 28, fast: false,
    bio: 'Punchy street-style edits. High engagement, loyal local following.', clips: ['t1', 't2', 't3'], niche: 'Street & fashion',
    stats: { Instagram: { followers: '6.8k', videos: 210, views: '540k' }, TikTok: { followers: '2.4k', videos: 60, views: '180k' } } },
  { id: 'priya', name: 'Priya Kaur', handle: '@priyakplates', platform: 'TikTok', platforms: ['TikTok', 'YouTube'], followers: '21k',
    avgViews: '14k', eng: '5.4%', price: 140, dist: '1.2 mi', area: 'Stoke Newington', rating: 5.0, jobs: 41,
    tags: ['Food', 'Reviews'], x: 72, y: 58, fast: true,
    bio: 'Trusted local food reviewer. My "spot of the week" drives real footfall.', clips: ['p1', 'p2', 'p3', 'p4'], niche: 'Food reviews',
    stats: { TikTok: { followers: '21k', videos: 320, views: '4.1M' }, YouTube: { followers: '8.2k', videos: 74, views: '1.6M' } } },
  { id: 'jay', name: 'Jay Miller', handle: '@jaymakesvids', platform: 'TikTok', platforms: ['TikTok'], followers: '4.1k',
    avgViews: '2.4k', eng: '9.3%', price: 40, dist: '0.6 mi', area: 'Haggerston', rating: 4.7, jobs: 8,
    tags: ['Comedy', 'Local'], x: 44, y: 70, fast: false,
    bio: 'Funny, fast, friendly. Great for shops that want personality.', clips: ['j1', 'j2'], niche: 'Comedy & local',
    stats: { TikTok: { followers: '4.1k', videos: 90, views: '260k' } } },
  { id: 'lola', name: 'Lola Bianchi', handle: '@lola.b', platform: 'Instagram', platforms: ['Instagram', 'Facebook'], followers: '9.7k',
    avgViews: '5.5k', eng: '7.0%', price: 75, dist: '1.5 mi', area: 'Clapton', rating: 4.9, jobs: 19,
    tags: ['Lifestyle', 'Cafés'], x: 20, y: 60, fast: true,
    bio: 'Warm lifestyle storytelling. I shoot, edit and post within 48h.', clips: ['l1', 'l2', 'l3'], niche: 'Lifestyle',
    stats: { Instagram: { followers: '9.7k', videos: 180, views: '610k' }, Facebook: { followers: '3.4k', videos: 40, views: '95k' } } },
];

const byId = (id) => CREATORS.find(c => c.id === id);

// reviews shown on a creator's profile
const DEFAULT_REVIEWS = [
  { by: 'Fold Bakery', stars: 5, when: '2 wk ago', text: 'Turned our croissant launch into a reel that genuinely brought people in. So easy to work with.', tags: ['On brief', 'Drove footfall'] },
  { by: 'Verde Plants', stars: 5, when: '1 mo ago', text: 'Lovely energy, quick turnaround, posted right on time.', tags: ['On time'] },
  { by: 'Cornershop Coffee', stars: 4, when: '2 mo ago', text: 'Great video and a smooth shoot — would book again.', tags: ['Easy to work with'] },
];
const REVIEWS = {
  maya: [
    { by: 'Fold Bakery', stars: 5, when: '2 wk ago', text: 'Maya made our oat-latte launch look irresistible. The reel hit 9k views and we had new faces in by the weekend.', tags: ['On brief', 'Drove footfall'] },
    { by: 'The Tonic Bar', stars: 5, when: '3 wk ago', text: 'Warm, professional, and so quick. Felt like working with a friend who happens to be great on camera.', tags: ['Easy to work with', 'On time'] },
    { by: 'Verde Plants', stars: 5, when: '1 mo ago', text: 'Exactly the cosy vibe we asked for. Posted on time and sent us the clip to repost too.', tags: ['On brief'] },
    { by: 'Cornershop Coffee', stars: 4, when: '2 mo ago', text: 'Really happy — great quality, would book again.', tags: ['Great quality'] },
  ],
};
const reviewsFor = (id) => REVIEWS[id] || DEFAULT_REVIEWS;

// creator availability — day numbers (June 2026) that are NOT bookable
const UNAVAILABLE = [16, 17, 23, 29];

// creator-side inbox (requests from shops)
const INBOX = [
  { id: 'r1', shop: 'Brew & Co', type: 'Café · 0.4 mi', brief: 'New oat-milk latte launch — cosy morning vibe.',
    price: 90, when: 'Sat 21 Jun', status: 'new' },
  { id: 'r2', shop: 'Fold Bakery', type: 'Bakery · 1.1 mi', brief: 'Croissant of the week, quick & playful.',
    price: 90, when: 'Sun 22 Jun', status: 'new' },
  { id: 'r3', shop: 'Verde Plants', type: 'Plant shop · 1.8 mi', brief: 'Repotting how-to, calm and helpful.',
    price: 90, when: 'Wed 25 Jun', status: 'seen' },
];

const CHAT_SEED = [
  { from: 'them', text: 'Hi! So excited for the latte shoot ☕' },
  { from: 'me', text: "Perfect — door's open from 8am, just ask for Sam." },
  { from: 'them', text: "Lovely. I'll send a draft before it goes live 👍" },
];

// ── MapView ─────────────────────────────────────────────────
function MapView({ creators, selected, onSelect, height = 200, mini }) {
  return (
    <div style={{ position: 'relative', height, borderRadius: mini ? 18 : 0, overflow: 'hidden',
      background: 'linear-gradient(160deg, #EFE9DC, #E7DECc)' }}>
      {/* water + park + roads */}
      <svg width="100%" height="100%" viewBox="0 0 320 240" preserveAspectRatio="xMidYMid slice"
        style={{ position: 'absolute', inset: 0 }}>
        <path d="M-10 70 Q 80 40 160 80 T 340 70 L 340 -10 L -10 -10 Z" fill="#DCEBE6" opacity="0.7" />
        <ellipse cx="250" cy="180" rx="70" ry="48" fill="#D6E4C8" opacity="0.85" />
        <ellipse cx="70" cy="150" rx="44" ry="34" fill="#D6E4C8" opacity="0.7" />
        <g stroke="#F4EFE6" strokeWidth="9" fill="none" strokeLinecap="round">
          <path d="M-20 120 H 360" /><path d="M40 -20 V 260" /><path d="M210 -20 V 260" />
          <path d="M-20 60 Q 120 90 360 50" /><path d="M120 -20 Q 150 120 110 260" />
        </g>
        <g stroke="#EAE3D5" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M-20 190 H 360" /><path d="M280 -20 V 260" /><path d="M150 130 H 360" />
        </g>
      </svg>

      {/* me marker */}
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%,-50%)' }}>
        <div style={{ position: 'absolute', inset: -10, borderRadius: '50%', background: 'var(--coral)',
          animation: 'pulse 2.4s ease-out infinite' }} />
        <div style={{ width: 16, height: 16, borderRadius: '50%', background: 'var(--coral)',
          boxShadow: '0 0 0 3px #fff, 0 2px 6px rgba(0,0,0,.25)', position: 'relative' }} />
      </div>

      {/* creator pins */}
      {creators.map((c) => {
        const on = selected === c.id;
        return (
          <button key={c.id} onClick={() => onSelect && onSelect(c.id)} style={{
            position: 'absolute', left: `${c.x}%`, top: `${c.y}%`, transform: 'translate(-50%,-100%)',
            border: 'none', background: 'transparent', cursor: 'pointer', padding: 0, zIndex: on ? 5 : 2 }}>
            <div className="press" style={{ display: 'flex', alignItems: 'center', gap: 5,
              background: on ? 'var(--ink)' : 'var(--surface)', padding: on ? '4px 9px 4px 4px' : '3px',
              borderRadius: 'var(--r-pill)', boxShadow: '0 3px 10px rgba(0,0,0,.18)',
              transform: on ? 'scale(1.06)' : 'scale(1)', transition: 'all .18s' }}>
              <Avatar name={c.name} size={on ? 28 : 26} />
              {on && <span className="display num" style={{ fontSize: 13, fontWeight: 700, color: '#fff', paddingRight: 2 }}>£{c.price}</span>}
            </div>
            <div style={{ width: 0, height: 0, margin: '0 auto', borderLeft: '5px solid transparent',
              borderRight: '5px solid transparent', borderTop: `6px solid ${on ? 'var(--ink)' : 'var(--surface)'}` }} />
          </button>
        );
      })}
    </div>
  );
}

Object.assign(window, { SHOP, CREATORS, byId, INBOX, CHAT_SEED, MapView, REVIEWS, DEFAULT_REVIEWS, reviewsFor, UNAVAILABLE });
