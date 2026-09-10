# GroundworkAI — Claude Code handoff

Everything needed to maintain and deploy the live GroundworkAI site.

## What this is

GroundworkAI is a one-person studio that turns ideas into clickable prototypes plus a build-ready plan. This bundle contains its **live marketing site**, its **portfolio prototypes**, and the deploy setup.

The site is **not** a design reference to be rebuilt — it is the shipping artefact. It is hand-written HTML with inline CSS and vanilla JS, no build step, no framework, no dependencies beyond two Google Fonts. Edit the HTML directly.

## Live details

| Thing | Value |
| --- | --- |
| Live URL | https://gilded-lebkuchen-d0ad29.netlify.app/ (being renamed to `groundworkai.netlify.app`) |
| Hosting | Netlify, free tier, currently drag-and-drop deploys |
| Repo | https://github.com/explore-it-now/Groundworkai (empty at time of handoff) |
| Contact email | `sales.groundworkai@linkedtech.io` (IONOS Mail Basic 5, domain `linkedtech.io`) |
| Form backend | Formspree, endpoint `https://formspree.io/f/xnpqokod`, free tier 50/month |
| Brand name | **GroundworkAI** — one word, capital A and I, no "s" |

## Files in this bundle

```
site/
  Groundwork.html          Source of the site. THE file to edit.
  privacy.html             Privacy policy page.
  og.png                   1200x630 link-preview image.
deploy/
  index.html               Copy of Groundwork.html, renamed for hosting.
  privacy.html
  meetcreators.html        Self-contained bundle of the MeetCreators prototype.
  og.png
prototypes/
  MeetCreators.html        Source of the MeetCreators prototype (React + Babel, loads the .jsx files).
  *.jsx                    Screen modules for MeetCreators.
```

The CV Generator prototype is not in this bundle — it lives at https://cv-generator-five-iota.vercel.app/ and the site links to it externally.

## The deploy rule

**Any change to the site must also go live.** The site source and the deployed copy are separate files, so editing one without the other silently does nothing.

After editing `site/Groundwork.html` or `site/privacy.html`:

1. Copy `site/Groundwork.html` → `deploy/index.html`
2. Copy `site/privacy.html` → `deploy/privacy.html`
3. If the MeetCreators prototype changed, re-bundle it into a single self-contained file at `deploy/meetcreators.html` (it must inline the `.jsx` files, since the deploy folder is flat)
4. Deploy the `deploy` folder

### Deploying

Currently manual: drag the `deploy` folder onto the Netlify site's **Deploys** tab.

**Better setup, worth doing once.** Push `deploy/` to `explore-it-now/Groundworkai`, then in Netlify: *Add new site → Import an existing project → GitHub → Groundworkai → Deploy*, leaving build command and publish directory blank. After that every push to `main` redeploys automatically, and the loop is fully scriptable — edit, copy to deploy, commit, push.

If you set this up, consider committing the whole project and setting Netlify's publish directory to `deploy` so source and deployed copy live in one repo.

## Site structure

`Groundwork.html` is a single file, roughly 1,300 lines, in this order: `<head>` with meta and OG tags → `<style>` block holding the entire stylesheet → nav → sections → `<script>` block at the end holding all behaviour.

Sections top to bottom:

1. **Nav** — fixed, blurred backdrop, logo mark of three bars
2. **Hero** — headline, sub, two CTAs, aurora blobs behind a grid background
3. **Problem** — why ideas stall
4. **What you get** — the three deliverables
5. **Pipeline** — the process, an animated illustration per step
6. **Portfolio** — cards for CV Generator and MeetCreators, each a CSS mock of the real UI, linking out. Third card is a "your idea, next" slot pointing at the form.
7. **Pricing** — three tiers
8. **FAQ** — accordion
9. **Contact** — the brief form
10. **Footer**
11. **Chatbot** — a scripted assistant, bottom right, keyword-matched answers, no AI call

### Design tokens

Defined as CSS custom properties on `:root` near the top of the `<style>` block. Read them there rather than trusting this table, but at time of writing:

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#F1ECE2` | page background, warm off-white |
| `--paper-2` | `#E8E2D6` | alternating section background |
| `--ink` | `#15140E` | body text and headings |
| `--mut` | `#5C584C` | secondary text |
| `--blue` | `#2A2AF0` | the single accent — links, active states, one bar in the logo |
| `--line` | `rgba(21,20,14,.12)` | hairline borders |

Type: **Instrument Serif** for headings (400 only, occasional italic), **Hanken Grotesk** for everything else (400/500/600/700). Both from Google Fonts, preconnected in `<head>`.

Keep the palette as is. One accent colour, warm paper ground, no gradients beyond the soft aurora blobs in the hero. Do not introduce a second accent.

## The contact form

Lives in the contact section, id `briefForm`. Fields: name, email, starting-point radio (`tier`), budget select, idea textarea. Two submit buttons — `value="call"` and `value="email"`.

Behaviour, in the `<script>` block:

- **"Book my free call"** (`call`) → `POST` to the Formspree endpoint as JSON with `_replyto` set to the visitor's email and `_subject` set to "New project brief — {name}". On success, the form is hidden and a confirmation panel (`#formOk`) is shown. On failure, it falls back to opening a `mailto:` with the same content, so a submission is never lost silently.
- **"Email us instead"** (`email`) → goes straight to the `mailto:` route.

`_replyto` matters: it means hitting Reply in the IONOS inbox goes to the prospect, not to Formspree.

**Known issue at handoff.** The user reported testing the live site and seeing the mail app open rather than a clean submit, and no email arriving at IONOS. The endpoint itself was verified working — a test POST returned `200 {"ok":true}` — so the causes to check are, in order: (1) the live deploy predates the Formspree wiring, so re-deploy first; (2) the notification address is unverified in the Formspree dashboard, which logs submissions but sends no email; (3) the notification is landing in the IONOS spam folder, which is common for a brand-new mailbox. Check the Formspree **Submissions** tab to tell receiving from delivery.

## The chatbot

Bottom-right widget. Entirely scripted — an array of `{q, a}` pairs matched by keyword against the visitor's message, with a fallback that points them at the form. No API, no key, no cost. Answers cover what GroundworkAI is, pricing, timelines, and starting a project.

If you want it to actually reason, that means an API call and a key, which means a server or a serverless function — a real change in the site's architecture, not a tweak. Worth discussing before doing.

## Conventions to keep

- **Compact source.** One-line CSS rules, no indentation ladders, no blank lines between siblings. Match what is there.
- **No dependencies.** No npm, no bundler, no framework on the marketing site. If a change seems to need one, it probably needs a rethink instead.
- **No emoji** anywhere in the UI.
- **Copy is plain and matter-of-fact.** Short sentences, no marketing inflation, no em-dash-heavy rhetoric. The user writes some of it themselves — do not rewrite their words when asked to design around them.
- **Accessibility basics already in place**: `aria-label` on icon buttons, `aria-expanded` on the FAQ accordion, focus-visible outlines. Keep them.
- **Reduced motion** is respected via a `prefers-reduced-motion` block. New animation should sit inside that guard.

## Open items

- **OG image URL is absolute** and hardcoded to `gilded-lebkuchen-d0ad29.netlify.app`. When the site is renamed or a custom domain is attached, update `og:url`, `og:image` and `twitter:image` in `Groundwork.html`.
- **Custom domain** not yet bought. `linkedtech.io` is owned and hosts the email; `groundworkai.com` is not owned. If bought, attach in Netlify and update the OG tags.
- **Form delivery** unconfirmed end to end. See the known issue above.
- **No analytics.** Deliberate, and the privacy policy says so. If any is added, the privacy page must change to match.
- **Verify the CV Generator** actually does what the portfolio card claims before driving traffic to it.

## The MeetCreators prototype

`prototypes/MeetCreators.html` is a different beast from the site: React 18 plus in-browser Babel, loading a set of `.jsx` screen modules. It is a design prototype, not production code — it exists to be clicked through.

Two things to know if you touch it. Each `<script type="text/babel">` gets its own scope, so shared components are exported via `Object.assign(window, {...})` at the end of each file. And it must be re-bundled into a single self-contained file for deployment, because the deploy folder is flat and cannot resolve the `.jsx` paths.
