function vlozPosledniClanky() {
  fetch('/blog/data/posts.json')
    .then(res => {
      if (!res.ok) throw new Error('Nepodařilo se načíst posts.json');
      return res.json();
    })
    .then(data => {
      data.sort((a, b) => new Date(b.date) - new Date(a.date));
      const posledni3 = data.slice(0, 3);

      const container = document.getElementById("blog-prehled-seznam");
      if (!container) return;

      posledni3.forEach(post => {
        const a = document.createElement("a");
        a.href = post.filename;
        a.className = "blog-ctverec";
        a.style.backgroundImage = `url(${post.image})`;

        const overlay = document.createElement("div");
        overlay.className = "overlay";

        const h4 = document.createElement("h4");
        h4.textContent = post.title;

        overlay.appendChild(h4);
        a.appendChild(overlay);
        container.appendChild(a);
      });
    })
    .catch(err => console.error(err));
}

document.addEventListener("DOMContentLoaded", () => {
  vlozPosledniClanky();
});
