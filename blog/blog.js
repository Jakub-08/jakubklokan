// ====== Připravené pole článků z Jekyllu ======
const allPosts = JSON.parse(document.getElementById("posts-data").textContent);

const postsPerPage = 10;
let currentPage = 1;

const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");

// ====== Funkce pro české datum ======
function formatCzechDate(isoDate) {
  const d = new Date(isoDate);
  const months = [
    "ledna", "února", "března", "dubna", "května", "června",
    "července", "srpna", "září", "října", "listopadu", "prosince"
  ];
  const day = d.getDate();
  const month = months[d.getMonth()];
  const year = d.getFullYear();
  return `${day}. ${month} ${year}`;
}

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
  info.innerHTML = `
  <h3>${post.h1 || post.title}</h3>
  ${post.summary ? `<p class="post-summary">${post.summary}</p>` : ""}
  <p class="datum">${formatCzechDate(post.date)}</p>
`;
  a.appendChild(info);

  seznamClanku.appendChild(a);
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

  const allClanky = Array.from(seznamClanku.children).filter(c => !c.classList.contains("no-posts"));

  // viditelné články pouze podle title
  const query = vyhledavac.value.toLowerCase();
  const visiblePosts = allClanky.filter(c => {
    return c.querySelector(".info h3").innerText.toLowerCase().includes(query);
  });

  // všechny články nejdřív skryjeme
  allClanky.forEach(c => c.style.display = "none");

  if (visiblePosts.length === 0) {
    // zobrazíme zprávu jen pokud neexistuje
    let noPosts = document.querySelector(".no-posts");
    if (!noPosts) {
      noPosts = document.createElement("p");
      noPosts.classList.add("no-posts");
      noPosts.innerText = "Žádné články.";
      seznamClanku.appendChild(noPosts);
    }
  } else {
    // odstraníme zprávu, pokud existuje
    const noPosts = document.querySelector(".no-posts");
    if (noPosts) noPosts.remove();

    // zobrazíme viditelné články podle aktuální stránky
    visiblePosts.slice(start, end).forEach(c => c.style.display = "");
  }
}

// ====== Render stránkování ======
function renderPagination() {
  paginace.innerHTML = "";

  const allClanky = Array.from(seznamClanku.children).filter(c => !c.classList.contains("no-posts"));
  const query = vyhledavac.value.toLowerCase();

  const visiblePosts = allClanky.filter(c => {
    return c.querySelector(".info h3").innerText.toLowerCase().includes(query);
  });

  const totalPages = Math.ceil(visiblePosts.length / postsPerPage);
  if (totalPages <= 1) return; // pokud je jen 1 stránka, stránkování se nezobrazí

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "stranka-btn";
    btn.innerText = i;

    if (i === currentPage) btn.classList.add("active-page");

    btn.onclick = () => {
      currentPage = i;
      renderPosts();
      renderPagination();

      // scrollnutí k seznamu článků s odsazením
      seznamClanku.scrollIntoView({ behavior: "smooth", block: "start" });
      window.scrollBy(0, -200);
    };

    paginace.appendChild(btn);
  }
}

// ====== Inicializace ======
renderPosts();
renderPagination();