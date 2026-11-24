# Breesy Help Center

A help center for Breesy: a sidebar index of guides on the left, with videos and step-by-step walkthroughs on the right.

It's a plain static site (HTML, CSS and JavaScript, no build step). Open `index.html` in a browser to view it.

## Folder structure

```
breesy-help-center/
├── index.html        The page: sidebar index and every article
├── css/
│   └── styles.css    All styling
├── js/
│   └── script.js     Article switching, search, home page and breadcrumbs
└── images/
    └── breesyLogo.png
```

## Adding an article

All edits happen in `index.html`.

1. In the sidebar (`<aside class="sidebar">`), add a link under the right section:
   ```html
   <li><a href="#my-article">My Article</a></li>
   ```
2. In `<main>`, add an article whose `id` matches the link:
   ```html
   <article class="article" id="my-article">
       <h1>My Article</h1>
       <h3>One-line summary.</h3>
       <div class="coming-soon">This guide is coming soon.</div>
   </article>
   ```
3. When the content is ready, replace the `coming-soon` block with a video or a Scribe walkthrough. Copy the markup from an existing article.
   - **YouTube:** use `https://www.youtube-nocookie.com/embed/VIDEO_ID` inside a `<div class="video">`.
   - **Scribe:** use the embed link (`https://scribehow.com/embed/...`) in an `<iframe class="scribe">`.

The home page, the breadcrumbs and the "Coming soon" labels update automatically from the sidebar.

## Publishing with GitHub Pages

In the repository on GitHub, go to **Settings → Pages**, set the source to the `main` branch and the root folder, then save. The site will be live at `https://<your-username>.github.io/<repo-name>/`.
