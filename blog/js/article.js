document.addEventListener("DOMContentLoaded", () => {
  fetch('blog/data/posts.json')
    .then(response => response.json())
    .then(data => {
      // Dejme tomu, že chceš první článek z pole
      const article = data[0];

      // Nadpis článku
      const h1 = document.querySelector('main h1');
      if (h1) h1.textContent = article.title;

      // Datum
      const dateDiv = document.querySelector('main .date');
      if (dateDiv) dateDiv.textContent = article.date;

      // Text článku
      const textP = document.querySelector('main p.text');
      if (textP) textP.textContent = article.text;

      // Obrázek
      const img = document.querySelector('main img[alt="Úvodní obrázek"]');
      if (img) img.src = article.image;

      // Tagy
      const tagContainer = document.querySelector('main .tags');
      if (tagContainer) {
        tagContainer.innerHTML = ''; // vyčistit stávající
        article.tags.forEach(tag => {
          const span = document.createElement('span');
          span.classList.add('tag');
          span.textContent = tag;
          tagContainer.appendChild(span);
        });
      }
    })
    .catch(error => {
      console.error('Chyba při načítání JSON:', error);
    });
});
