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

Store links are `href="#"` — put the real App Store / Google Play URLs there.
