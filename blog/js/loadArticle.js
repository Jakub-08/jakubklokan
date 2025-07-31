fetch("/blog/data/posts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Chyba při načítání JSON: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    const currentPath = window.location.pathname; // např. "/blog/articals/article_1.html"

    const articleData = data.find((article) => article.filename === currentPath);

    if (articleData) {
      // Nastav název stránky (title)
      document.title = articleData.title;

      // Datum
      const dateElem = document.querySelector(".date");
      if (dateElem) {
        const formattedDate = new Date(articleData.date).toLocaleDateString("cs-CZ", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        dateElem.textContent = formattedDate;
      }

      // Nadpis
      const heading = document.querySelector("h1");
      if (heading) {
        heading.textContent = articleData.title;
      }

      // Úvodní obrázek
      const img = document.querySelector("img[alt='Úvodní obrázek']");
      if (img && articleData.image) {
        img.src = articleData.image;
      }

      // Tagy
      const tagsDiv = document.querySelector(".tags");
      if (tagsDiv && Array.isArray(articleData.tags)) {
        tagsDiv.innerHTML = articleData.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join(" ");
      }
    } else {
      console.error("Nenašel se článek pro tuto stránku v JSON:", currentPath);
    }
  })
  .catch((error) => {
    console.error("Chyba při zpracování článku:", error);
  });
