// ====== DATA ======
const allPosts = JSON.parse(
  document.getElementById("posts-data").textContent
);

// ====== CONFIG ======
const postsPerPage = 10;
let currentPage = 1;
let query = "";
let activeTag = null;

// ====== DOM ======
const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");
const tagContainer = document.getElementById("filtr-tagy");

// ====== DATE FORMAT ======
function formatCzechDate(isoDate) {
  const d = new Date(isoDate);
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince"
  ];
  return `${d.getDate()}. ${months[d.getMonth()]} ${d.getFullYear()}`;
}

// ====== TAG RENDER ======
function renderTags() {
  const allTags = [...new Set(allPosts.flatMap(p => p.tags || []))];

  tagContainer.innerHTML = "";

  const clearBtn = document.createElement("button");
  clearBtn.innerText = "Vše";
  clearBtn.className = "tag-btn";
  clearBtn.onclick = () => {
    activeTag = null;
    currentPage = 1;
    render();
  };
  tagContainer.appendChild(clearBtn);

  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.innerText = tag;

    if (activeTag === tag) {
      btn.classList.add("active-tag");
    }

    btn.onclick = () => {
      activeTag = tag;
      currentPage = 1;
      render();
    };

    tagContainer.appendChild(btn);
  });
}

// ====== FILTERED DATA ======
function getFilteredPosts() {
  return allPosts.filter(post => {
    const title = (post.h1 || post.title).toLowerCase();
    const summary = (post.summary || "").toLowerCase();
    const tags = (post.tags || []).map(t => t.toLowerCase());

    const matchesQuery =
      title.includes(query) ||
      summary.includes(query);

    const matchesTag =
      !activeTag || tags.includes(activeTag.toLowerCase());

    return matchesQuery && matchesTag;
  });
}

// ====== RENDER ======
function render() {
  const filtered = getFilteredPosts();

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  if (currentPage > totalPages) currentPage = 1;

  const start = (currentPage - 1) * postsPerPage;
  const pageItems = filtered.slice(start, start + postsPerPage);

  seznamClanku.innerHTML = "";

  if (pageItems.length === 0) {
    seznamClanku.innerHTML = `<p class="no-posts">Žádné články.</p>`;
    paginace.innerHTML = "";
    renderTags();
    return;
  }

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
  renderTags();
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