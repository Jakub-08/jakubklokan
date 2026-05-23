// ====== DATA ======
const allPosts = JSON.parse(
  document.getElementById("posts-data").textContent
);

const postsPerPage = 10;
let currentPage = 1;
let query = "";

// ====== DOM ======
const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");

// ====== Datum ======
function formatCzechDate(isoDate) {
  const d = new Date(isoDate);
  const months = [
    "ledna","února","března","dubna","května","června",
    "července","srpna","září","října","listopadu","prosince"
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ====== FILTER ======
function getFilteredPosts() {
  return allPosts.filter(p =>
    p.title.toLowerCase().includes(query)
  );
}

// ====== RENDER ======
function render() {
  const filtered = getFilteredPosts();
  const totalPages = Math.ceil(filtered.length / postsPerPage);

  // clamp page
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * postsPerPage;
  const pageItems = filtered.slice(start, start + postsPerPage);

  // clear
  seznamClanku.innerHTML = "";

  if (pageItems.length === 0) {
    seznamClanku.innerHTML = `<p class="no-posts">Žádné články.</p>`;
    paginace.innerHTML = "";
    return;
  }

  // render posts
  pageItems.forEach(post => {
    const a = document.createElement("a");
    a.href = post.url;
    a.className = "clanek";

    let html = "";

    if (post.image) {
      html += `<img src="${post.image}" alt="${post.title}">`;
    }

    html += `
      <div class="info">
        <h3>${post.title}</h3>
        ${post.description ? `<p class="post-description">${post.description}</p>` : ""}
        <p class="datum">${formatCzechDate(post.date)}</p>
      </div>
    `;

    a.innerHTML = html;
    seznamClanku.appendChild(a);
  });

  renderPagination(totalPages);
}

// ====== PAGINATION ======
function renderPagination(totalPages) {
  paginace.innerHTML = "";

  if (totalPages <= 1) return;

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = "stranka-btn";

    if (i === currentPage) btn.classList.add("active-page");

    btn.onclick = () => {
      currentPage = i;
      render();

      seznamClanku.scrollIntoView({ behavior: "smooth" });
    };

    paginace.appendChild(btn);
  }
}

// ====== SEARCH ======
vyhledavac.addEventListener("input", (e) => {
  query = e.target.value.toLowerCase();
  currentPage = 1;
  render();
});

// ====== INIT ======
render();