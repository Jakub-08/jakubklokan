const jsonFile = 'blog/data/posts.json';

// Aktuální cesta z URL, např. "/articals/article_79.html"
const currentPath = window.location.pathname;

fetch(jsonFile)
  .then(res => {
    if (!res.ok) throw new Error('Nepodařilo se načíst JSON');
    return res.json();
  })
  .then(data => {
    // Najdeme článek podle přesné shody filename === currentPath bez počátečního /
    const articleData = data.find(article => {
      const pathNoSlash = currentPath.startsWith('/') ? currentPath.slice(1) : currentPath;
      return article.filename === pathNoSlash;
    });

    if (!articleData) {
      console.warn('Nenašel se článek pro tuto stránku v JSON');
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
