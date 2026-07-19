SENTIENT PRODUCTIONS: NEW PAGES UPDATE

FILES INCLUDED
- components/header.html
- components/footer.html
- site.js
- artists/index.html
- frameworks/index.html
- workshops/index.html
- pages.css

INSTALL
1. Copy each HTML/JS file into the matching path in your sentient-site repository.
2. Append the contents of pages.css to the bottom of your existing styles.css.
3. Save all files.
4. Run:
   git add .
   git commit -m "Add Sentient artist, frameworks, and workshop pages"
   git push
5. Wait for Vercel to show Ready.
6. Hard-refresh sentientproductions.com.

NOTES
- Test on Vercel or through a local server, not by double-clicking HTML files.
- The shared header now routes Workshops to /workshops/.
- These files contain no references to the prior artist collaboration.
