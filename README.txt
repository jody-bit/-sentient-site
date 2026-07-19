SENTIENT PRODUCTIONS FULL RESPONSIVE SITE UPDATE

REPLACE THESE FILES:
- index.html
- styles.css
- site.js
- components/header.html
- components/footer.html
- artists/index.html
- frameworks/index.html
- workshops/index.html

KEEP YOUR EXISTING:
- assets/
- favicon.ico
- apple-touch-icon.png
- Vercel configuration

PUSH:
git add .
git commit -m "Apply responsive design system across Sentient site"
git push

Then wait for Vercel to show Ready and hard-refresh the live site.

OPENING ANIMATION RESTORED
- sentient_sp_logo_animated.html is included at the repository root.
- The intro plays on the homepage for 3.3 seconds.
- Visitors can skip it.
- Reduced-motion users bypass it automatically.
- Interior pages do not replay the intro.
