SENTIENT ARTIST PROGRAM RESPONSIVE UPDATE

FILES
- artists/index.html
- artist-responsive.css

INSTALL
1. Replace your current artists/index.html with the included file.
2. Open artist-responsive.css.
3. Paste the entire CSS block at the END of your existing styles.css.
4. Save both files.
5. Run:
   git add .
   git commit -m "Redesign responsive Artist Program page"
   git push
6. When Vercel shows Ready, hard-refresh:
   - Mac: Command + Shift + R
   - Windows: Ctrl + Shift + R

BREAKPOINTS INCLUDED
- Desktop
- Small laptop / large tablet: 1100px
- Tablet: 820px
- Handset: 560px
- Very small handset: 380px
- Landscape handset: max-height 500px

NOTES
- This update introduces a single .shell container system.
- It fixes the accidental fourth empty card.
- It removes the oversized email treatment from this page.
- It changes the selection process into a responsive timeline.
