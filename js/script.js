const sidebar = document.querySelector('.sidebar');
const links = sidebar.querySelectorAll('a');
const search = document.querySelector('.search');

// Names of the sidebar sections a link sits in, outermost first (e.g. ["BreesyOS", "Customer Portal"])
function sectionsOf(link) {
    const sections = [];
    for (let d = link.closest('details'); d; d = d.parentElement.closest('details')) {
        sections.unshift(d.querySelector(':scope > summary').textContent);
    }
    return sections;
}

function isComingSoon(link) {
    const article = document.querySelector(link.getAttribute('href'));
    return article !== null && article.querySelector('.coming-soon') !== null;
}

// Add a breadcrumb above each article's title, and tag unfinished articles in the sidebar
links.forEach(link => {
    const article = document.querySelector(link.getAttribute('href'));
    if (!article) return;

    const crumb = document.createElement('p');
    crumb.className = 'breadcrumb';
    crumb.textContent = sectionsOf(link).join(' › ');
    article.prepend(crumb);

    if (isComingSoon(link)) link.classList.add('soon');
});

// Build the home page: one card per top-level sidebar section, listing its articles
sidebar.querySelectorAll(':scope > details').forEach(section => {
    const card = document.createElement('div');
    card.className = 'home-card';

    const title = document.createElement('h2');
    title.textContent = section.querySelector(':scope > summary').textContent;
    card.append(title);

    const list = document.createElement('ul');
    section.querySelectorAll('a').forEach(link => {
        const item = document.createElement('li');
        const a = document.createElement('a');
        a.href = link.getAttribute('href');
        a.textContent = link.textContent;
        item.append(a);
        if (isComingSoon(link)) {
            const badge = document.createElement('span');
            badge.className = 'badge';
            badge.textContent = 'Coming soon';
            item.append(badge);
        }
        list.append(item);
    });
    card.append(list);

    document.querySelector('.home-sections').append(card);
});

// Show the article matching the URL hash (e.g. #mobile-app), or the home page
function showArticle() {
    const id = location.hash.slice(1) || 'home';
    const article = document.getElementById(id);
    if (!article || !article.classList.contains('article')) return;

    document.querySelectorAll('.article').forEach(a => a.classList.toggle('active', a === article));
    links.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + id;
        link.classList.toggle('active', isActive);
        // Keep every section containing the current article expanded
        if (isActive) {
            for (let d = link.closest('details'); d; d = d.parentElement.closest('details')) d.open = true;
        }
    });
    sidebar.classList.remove('open');
    window.scrollTo(0, 0);
}

// Filter the sidebar to articles whose title or section matches the search text
function filterSidebar() {
    const query = search.value.trim().toLowerCase();
    let anyMatch = false;

    links.forEach(link => {
        const text = (link.textContent + ' ' + sectionsOf(link).join(' ')).toLowerCase();
        const match = text.includes(query);
        link.parentElement.classList.toggle('hidden', !match);
        if (match) anyMatch = true;
    });

    // Hide sections with no matching articles; expand the ones that have matches
    sidebar.querySelectorAll('details').forEach(d => {
        const hasMatch = d.querySelector('li:not(.hidden)') !== null;
        d.classList.toggle('hidden', !hasMatch);
        if (query && hasMatch) d.open = true;
    });

    sidebar.classList.toggle('searching-empty', !anyMatch);
}

search.addEventListener('input', () => {
    filterSidebar();
    // On phones, reveal the sidebar so results are visible
    if (search.value.trim()) sidebar.classList.add('open');
});

// Enter jumps to the first matching article
search.addEventListener('keydown', e => {
    if (e.key !== 'Enter') return;
    const first = sidebar.querySelector('li:not(.hidden) a');
    if (first) location.hash = first.getAttribute('href');
});

document.querySelector('.menu-toggle').addEventListener('click', () => sidebar.classList.toggle('open'));
document.querySelector('.backdrop').addEventListener('click', () => sidebar.classList.remove('open'));
window.addEventListener('hashchange', showArticle);
showArticle();
