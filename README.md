# Eggcellent landing page

Static site, no build step. Deploy to GitHub Pages:

1. Copy the contents of this `site/` folder into your repository root (or a `docs/` folder).
2. Repo → Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)` or `/docs`.
3. Open `https://<user>.github.io/<repo>/`.

Files:
- `index.html` — landing page
- `privacy.html`, `support.html` — placeholder copy, replace before publishing
- `styles.css` — all styling
- `assets/` — app icon and screenshots

The App Store button is an App Store Connect campaign link (`pt=129156858`, campaign `landing`). `site.js` swaps in the visitor's country store (taken from the browser language) and turns `?ref=<name>` on the page URL into campaign `web-<name>` (kept for the visit; 30-character limit), so `…/?ref=reddit` shows up as `web-reddit` in App Store Connect → Analytics → Campaigns. Google Play is marked "Soon" with no link yet.
