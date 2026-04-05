// ====== Připravené pole článků z Jekyllu ======
const allPosts = JSON.parse(document.getElementById("posts-data").textContent);

const postsPerPage = 5;
let currentPage = 1;
let filteredTags = [];

const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");
const filtrTagy = document.getElementById("filtr-tagy");

// ====== Vytvoření všech článků jen jednou ======
allPosts.forEach(post => {
  const a = document.createElement("a");
  a.href = post.url;
  a.className = "clanek";

  if (post.image) {
    const img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;
    a.appendChild(img);
  }

  const info = document.createElement("div");
  info.className = "info";
  info.innerHTML = `<h3>${post.title}</h3>
                    ${post.description ? `<p>${post.description}</p>` : ""}
                    <p class="datum">${post.date}</p>`;
  a.appendChild(info);

  if (post.tags.length > 0) {
    const divTags = document.createElement("div");
    divTags.className = "tags";
    post.tags.forEach(tag => {
      const span = document.createElement("span");
      span.className = "tag";
      span.innerText = tag;
      divTags.appendChild(span);
    });
    a.appendChild(divTags);
  }

  // uložíme tagy do datasetu pro filtraci
  a.dataset.tags = post.tags.join(",");
  seznamClanku.appendChild(a);
});

// ====== Vytvoření tlačítek tagů ======
const tagSet = new Set();
allPosts.forEach(post => post.tags.forEach(t => tagSet.add(t)));

// tlačítko pro zrušení všech filtrů
const resetBtn = document.createElement("button");
resetBtn.className = "button button--secondary button--small btn-filter-blog";
resetBtn.innerText = "Vymazat filtry";
resetBtn.onclick = () => {
  filteredTags = [];
  document.querySelectorAll(".btn-filter-blog").forEach(b => b.classList.remove("aktivni"));
  renderPosts();
  renderPagination();
};
filtrTagy.appendChild(resetBtn);

// jednotlivé tagy
tagSet.forEach(tag => {
  const btn = document.createElement("button");
  btn.className = "button button--secondary button--small btn-filter-blog";
  btn.innerText = tag;
  btn.onclick = () => {
    if (filteredTags.includes(tag)) {
      filteredTags = filteredTags.filter(t => t !== tag);
      btn.classList.remove("aktivni");
    } else {
      filteredTags.push(tag);
      btn.classList.add("aktivni");
    }
    currentPage = 1;
    renderPosts();
    renderPagination();
  };
  filtrTagy.appendChild(btn);
});

// ====== Vyhledávání ======
vyhledavac.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
  renderPagination();
});

// ====== Render článků ======
function renderPosts() {
  const start = (currentPage - 1) * postsPerPage;
  const end = start + postsPerPage;

  const allClanky = Array.from(seznamClanku.children);

  // všechny články skryjeme
  allClanky.forEach(c => c.style.display = "none");

  // vybereme viditelné články podle tagů a vyhledávání
  const query = vyhledavac.value.toLowerCase();
  const visiblePosts = allClanky.filter(c => {
    const tags = c.dataset.tags.split(",");
    const matchesTags = filteredTags.every(t => tags.includes(t));
    const matchesQuery = c.querySelector(".info h3").innerText.toLowerCase().includes(query) ||
                         c.querySelector(".info p")?.innerText.toLowerCase().includes(query);
    return matchesTags && matchesQuery;
  });

  // stránkování
  visiblePosts.slice(start, end).forEach(c => c.style.display = "");

  // pokud nejsou žádné články
  if (visiblePosts.length === 0) {
    seznamClanku.innerHTML = "<p>Žádné články.</p>";
  }
}

// ====== Render stránkování ======
function renderPagination() {
  paginace.innerHTML = "";
  const allClanky = Array.from(seznamClanku.children);
  const query = vyhledavac.value.toLowerCase();

  const visiblePosts = allClanky.filter(c => {
    const tags = c.dataset.tags.split(",");
    const matchesTags = filteredTags.every(t => tags.includes(t));
    const matchesQuery = c.querySelector(".info h3").innerText.toLowerCase().includes(query) ||
                         c.querySelector(".info p")?.innerText.toLowerCase().includes(query);
    return matchesTags && matchesQuery;
  });

  const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.innerText = i;
    btn.className = i === currentPage ? "active-page" : "";
    btn.onclick = () => {
      currentPage = i;
      renderPosts();
      renderPagination();
    };
    paginace.appendChild(btn);
  }
}

// ====== Inicializace ======
renderPosts();
renderPagination();