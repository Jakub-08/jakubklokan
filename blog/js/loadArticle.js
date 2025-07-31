const jsonFile = '../data/posts.json';  // uprav podle cesty k JSON

const currentPath = window.location.pathname;

let pathNoSlash = currentPath.startsWith('/blog/') ? currentPath.slice(6) : currentPath;
pathNoSlash = pathNoSlash.startsWith('/') ? pathNoSlash.slice(1) : pathNoSlash;

fetch(jsonFile)
  .then(res => res.json())
  .then(data => {
    const articleData = data.find(article => article.filename === pathNoSlash);

    if (!articleData) {
      console.warn('Nenašel se článek pro tuto stránku v JSON');
      console.log('Soubory v JSON:', data.map(a => a.filename));
      return;
    }

    if (articleData.title) document.title = articleData.title;

    const h1 = document.querySelector('h1');
    if (h1 && articleData.title) h1.textContent = articleData.title;

    const dateElem = document.querySelector('.date');
    if (dateElem && articleData.date) {
      const d = new Date(articleData.date);
      dateElem.textContent = d.toLocaleDateString('cs-CZ', { day: 'numeric', month: 'long', year: 'numeric' });
    }

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc && articleData.description) {
      metaDesc.setAttribute('content', articleData.description);
    }

    const img = document.querySelector('main img');
    if (img && articleData.image) img.src = articleData.image;

    const tagsContainer = document.querySelector('.tags');
    if (tagsContainer && Array.isArray(articleData.tags)) {
      tagsContainer.innerHTML = articleData.tags.map(tag => `<span class="tag">${tag}</span>`).join(' ');
    }
  })
  .catch(err => console.error('Chyba při načítání dat:', err));
