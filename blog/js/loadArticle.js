fetch("/blog/data/posts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error("Chyba při načítání JSON: " + response.status);
    }
    return response.json();
  })
  .then((data) => {
    const currentPath = window.location.pathname;

    const articleData = data.find((article) => article.filename === currentPath);

    if (articleData) {
      document.title = articleData.title;

      const dateElem = document.querySelector(".date");
      if (dateElem) {
        const formattedDate = new Date(articleData.date).toLocaleDateString("cs-CZ", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
        dateElem.textContent = formattedDate;
      }

      const heading = document.querySelector("h1");
      if (heading) {
        heading.textContent = articleData.title;
      }

      const img = document.querySelector(".img");
      if (img && articleData.image) {
        img.src = articleData.image;
        img.alt = articleData.title;
        img.style.aspectRatio = "1 / 1";
        img.style.width = "50vw";
        img.style.height = "auto";
      }

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
