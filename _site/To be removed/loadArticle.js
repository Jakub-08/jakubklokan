document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const articleId = params.get("id"); // např. "article_89"
  const contentDiv = document.getElementById("article-content");
  const titleElem = document.querySelector(".blog-article-h1");
  const dateElem = document.querySelector(".date");
  const tagsDiv = document.querySelector(".tags");
  const imgElem = document.querySelector(".img.article");

  if (!articleId) {
    contentDiv.innerHTML = "<p>Článek nebyl nalezen.</p>";
    return;
  }

  fetch("/blog/data/posts.json")
    .then((res) => {
      if (!res.ok) throw new Error("Chyba při načítání JSON: " + res.status);
      return res.json();
    })
    .then((data) => {
      const article = data.find((a) => a.filename === articleId);

      if (!article) {
        contentDiv.innerHTML = "<p>Článek nebyl nalezen.</p>";
        return;
      }

      // Nastavení hlavních informací
      if (titleElem) titleElem.textContent = article.title;
      if (dateElem) {
        const d = new Date(article.date);
        dateElem.textContent = d.toLocaleDateString("cs-CZ", {
          day: "2-digit",
          month: "long",
          year: "numeric",
        });
      }

      // Hlavní obrázek (pokud máš ještě nějaký větší nadpisový)
      if (imgElem && article.image) {
        imgElem.src = article.image;
        imgElem.alt = article.title;
      }

      // Generování obsahu podle typu
      contentDiv.innerHTML = "";
      if (Array.isArray(article.content)) {
        article.content.forEach((section) => {
          switch (section.type) {
            case "heading":
              const h2 = document.createElement("h2");
              h2.textContent = section.text;
              contentDiv.appendChild(h2);
              break;

            case "paragraph":
              const pElem = document.createElement("p");
              pElem.innerHTML = section.text;
              contentDiv.appendChild(pElem);
              break;

            case "image":
              const figure = document.createElement("figure");
              const img = document.createElement("img");
              img.className = "img article";
              img.src = section.src;
              img.alt = section.caption || "";
              const figcaption = document.createElement("figcaption");
              figcaption.className = "img-caption";
              figcaption.textContent = section.caption || "";
              figure.appendChild(img);
              figure.appendChild(figcaption);
              contentDiv.appendChild(figure);
              break;

            case "quote":
              const blockquote = document.createElement("blockquote");
              blockquote.className = "article-qoute";
              blockquote.textContent = section.text;
              contentDiv.appendChild(blockquote);
              break;

            default:
              console.warn("Neznámý typ obsahu:", section.type);
          }
        });
      }

      // Generování tagů
      if (tagsDiv && Array.isArray(article.tags)) {
        tagsDiv.innerHTML = article.tags
          .map((tag) => `<span class="tag">${tag}</span>`)
          .join(" ");
      }
    })
    .catch((err) => {
      console.error("Chyba při načítání článku:", err);
      contentDiv.innerHTML = "<p>Chyba při načítání článku.</p>";
    });
});