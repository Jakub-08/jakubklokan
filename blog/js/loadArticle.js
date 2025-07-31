fetch("/blog/data/posts.json")
  .then((response) => response.json())
  .then((data) => {
    let path = window.location.pathname;

    // Odebrání '/blog/' prefixu
    if (path.startsWith("/blog/")) {
      path = path.slice(6); // 'articals/article_1.html'
    }

    // Odebrání počátečního lomítka, pokud zůstane
    if (path.startsWith("/")) {
      path = path.slice(1);
    }

    // Najdi odpovídající článek v JSON
    const articleData = data.find((article) => article.filename === path);

    if (!articleData) {
      console.error("Nenašel se článek pro tuto stránku v JSON:", path);
      return;
    }

    // Nastavení názvu stránky
    document.title = articleData.title;

    // Nadpis článku
    const h1 = document.querySelector("h1");
    if (h1) h1.textContent = articleData.title;

    // Datum
    const dateEl = document.querySelector(".date");
    if (dateEl) dateEl.textContent = articleData.date;

    // Popis článku (volitelné, pokud existuje textová část)
    const desc = document.querySelector("p.text");
    if (desc && articleData.description) {
      desc.textContent = articleData.description;
    }

    // Obrázek
    const img = document.querySelector("main img");
    if (img && articleData.image) {
      // Pokud cesta k obrázku nezačíná /, přidáme /blog/
      img.src = articleData.image.startsWith("/")
        ? articleData.image
        : "/blog/" + articleData.image;
    }

    // Tagy
    const tagsDiv = document.querySelector(".tags");
    if (tagsDiv && Array.isArray(articleData.tags)) {
      tagsDiv.innerHTML = ""; // smaže případné původní tagy
      articleData.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.className = "tag";
        span.textContent = tag;
        tagsDiv.appendChild(span);
      });
    }
  })
  .catch((error) => {
    console.error("Chyba při načítání JSON souboru:", error);
  });
