function formatDate(isoDate) {
  const d = new Date(isoDate);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

fetch("/blog/data/posts.json")
  .then(res => res.json())
  .then(data => {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    const posledni = data.slice(0, 3);
    const kontejner = document.getElementById("blog-prehled-seznam-homepage");
    if (!kontejner) return;

    posledni.forEach(post => {
      const card = document.createElement("a");
      card.href = post.filename;
      card.className = "blog-article";
      card.style.backgroundImage = `url(${post.image})`;

      const overlay = document.createElement("div");
      overlay.className = "overlay";

      const title = document.createElement("h3");
      title.textContent = post.h1;

      const date = document.createElement("p");
      date.textContent = formatDate(post.date);

      overlay.appendChild(title);
      overlay.appendChild(date);
      card.appendChild(overlay);
      kontejner.appendChild(card);
    });
  })
  .catch(err => console.error("Chyba při načítání článků:", err));
