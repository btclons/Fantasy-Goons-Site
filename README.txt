# Fantasy Goons — Static Site

This is a lightweight, static 3‑page site (Home, Leaderboard, Commentary) for your fantasy league.

## How it works
- Weekly rankings + commentary are stored as JSON files in `data/`.
- `data/index.json` is a small manifest that lists available weeks.
- The leaderboard page reads the manifest, builds the week dropdown automatically, and loads the selected week’s file.

## Updating each week
1. Copy an existing JSON file in `data/` (e.g., `week8.json` → `week9.json`).
2. Change the `week`, `rankings`, and optional `commentary` fields.
3. Edit `data/index.json` and add a new entry at the top:
   ```json
   { "week": 9, "file": "week9.json", "label": "Week 9" }
   ```
4. Commit and deploy (GitHub Pages/Netlify work great).

## Optional: Comments from league mates
For a simple no-backend comment box, embed Giscus or Utterances at the bottom of `leaderboard.html`.

## Hosting
- **GitHub Pages**: push to a public repo and enable Pages.
- **Netlify**: drag-and-drop this folder or connect your repo.

Enjoy!
