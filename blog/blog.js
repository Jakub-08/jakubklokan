// ====== DATA ======
const allPosts = JSON.parse(
  document.getElementById("posts-data").textContent
);

// ====== CONFIG ======
const postsPerPage = 10;
let currentPage = 1;
let query = "";

// ====== DOM ======
const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");

// ====== DATE FORMAT ======
function formatCzechDate(isoDate) {
  const d = new Date(isoDate);
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince"
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ====== FILTERED DATA ======
function getFilteredPosts() {
  return allPosts.filter(post => {
    const title = (post.h1 || post.title).toLowerCase();
    const summary = (post.summary || "").toLowerCase();

    return (
      title.includes(query) ||
      summary.includes(query)
    );
  });
}

// ====== RENDER ======
function render() {
  const filtered = getFilteredPosts();

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * postsPerPage;
  const pageItems = filtered.slice(start, start + postsPerPage);

  // reset
  seznamClanku.innerHTML = "";

  if (pageItems.length === 0) {
    seznamClanku.innerHTML = `<p class="no-posts">Žádné články.</p>`;
    paginace.innerHTML = "";
    return;
  }

  // posts
  pageItems.forEach(post => {
    const a = document.createElement("a");
    a.href = post.url;
    a.className = "clanek";

    let html = "";

    if (post.image) {
      html += `<img src="${post.image}" alt="${post.h1 || post.title}">`;
    }

    html += `
      <div class="info">
        <h3>${post.h1 || post.title}</h3>

        ${post.summary ? `
          <p class="post-summary">${post.summary}</p>
        ` : ""}

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
    btn.className = "stranka-btn";
    btn.innerText = i;

    if (i === currentPage) {
      btn.classList.add("active-page");
    }

    btn.onclick = () => {
      currentPage = i;
      render();

      seznamClanku.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
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