// ====== DATA ======
const allPosts = JSON.parse(
  document.getElementById("posts-data").textContent
);

// ====== CONFIG ======
const postsPerPage = 10;
let currentPage = 1;
let query = "";
let activeTags = [];
let activeYear = "";

// ====== DOM ======
const seznamClanku = document.getElementById("seznam-clanku");
const paginace = document.getElementById("paginace");
const vyhledavac = document.getElementById("vyhledavac");
const clearSearch = document.getElementById("clear-search");
const tagContainer = document.getElementById("filtr-tagy");
const yearContainer = document.getElementById("filtr-roky");


const lang = document.body.dataset.lang || "cs";

const translations = {
  cs: {
    months: [
      "ledna", "února", "března", "dubna", "května", "června",
      "července", "srpna", "září", "října", "listopadu", "prosince"
    ],
    all: "Vše",
    noPosts: "Nic jsme nenašli",
    noPostsText: "Zkus změnit hledaný výraz nebo vybrat jiný filtr.",
    showAll: "Zobrazit všechny články",
    searchPlaceholder: "🔍 Hledat články..."
  },

  en: {
    months: [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ],
    all: "All",
    noPosts: "Nothing found",
    noPostsText: "Try changing your search phrase or selecting another filter.",
    showAll: "Show all articles",
    searchPlaceholder: "🔍 Search articles..."
  }
};

const t = translations[lang];

// ====== DATE FORMAT ======
function formatCzechDate(isoDate) {
  const d = new Date(isoDate);

  return `${d.getDate()}. ${t.months[d.getMonth()]} ${d.getFullYear()}`;
}

// ====== FILTERED DATA ======
function getFilteredPosts() {
  return allPosts.filter(post => {

    const title = (post.h1 || post.title).toLowerCase();
    const summary = (post.summary || "").toLowerCase();

    const tags = (post.tags || [])
      .map(t => t.toLowerCase());


    const postYear = post.date.substring(0, 4);


    const matchesQuery =
      title.includes(query) ||
      summary.includes(query);


    const matchesTags =
      activeTags.length === 0 ||
      activeTags.every(t =>
        tags.includes(t.toLowerCase())
      );


    const matchesYear =
      activeYear === "" ||
      postYear === activeYear;


    return (
      matchesQuery &&
      matchesTags &&
      matchesYear
    );

  });
}

// ====== TAG RENDER ======
function renderTags() {
  const allTags = [...new Set(allPosts.flatMap(p => p.tags || []))]
    .sort((a, b) => a.localeCompare(b, "cs"));

  tagContainer.innerHTML = "";

  // RESET BUTTON
  const clearBtn = document.createElement("button");
  clearBtn.className = "tag-btn";
  clearBtn.innerText = t.all;

  if (activeTags.length === 0) {
    clearBtn.classList.add("active-tag");
  }

  clearBtn.onclick = () => {
    activeTags = [];
    currentPage = 1;
    render();
  };

  tagContainer.appendChild(clearBtn);

  // TAG BUTTONS
  allTags.forEach(tag => {
    const btn = document.createElement("button");
    btn.className = "tag-btn";
    btn.innerText = tag;

    const isActive = activeTags.includes(tag);

    if (isActive) {
      btn.classList.add("active-tag");
    }

    btn.onclick = () => {
      if (activeTags.includes(tag)) {
        activeTags = activeTags.filter(t => t !== tag);
      } else {
        activeTags.push(tag);
      }

      currentPage = 1;
      render();
    };

    tagContainer.appendChild(btn);
  });
}


function renderYears() {

  const years = [...new Set(
    allPosts.map(post =>
      post.date.substring(0,4)
    )
  )].sort((a,b) => b-a);


  yearContainer.innerHTML = "";


  const title = document.createElement("span");
  title.className = "filter-title";
  title.innerText = "Rok:";
  yearContainer.appendChild(title);



  const allBtn = document.createElement("button");

  allBtn.className = "tag-btn";
  allBtn.innerText = t.all;


  if(activeYear === "") {
    allBtn.classList.add("active-tag");
  }


  allBtn.onclick = () => {

    activeYear = "";
    currentPage = 1;

    render();

  };


  yearContainer.appendChild(allBtn);



  years.forEach(year => {

    const btn = document.createElement("button");

    btn.className = "tag-btn";
    btn.innerText = year;


    if(activeYear === year) {
      btn.classList.add("active-tag");
    }


    btn.onclick = () => {

      activeYear = year;
      currentPage = 1;

      render();

    };


    yearContainer.appendChild(btn);

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
    seznamClanku.innerHTML = `
      <div class="no-posts">

        <div class="no-posts-icon">
          🔍
        </div>

        <h3>${t.noPosts}</h3>

        <p>
          ${t.noPostsText}
        </p>

        <button class="reset-search">
          ${t.showAll}
        </button>

      </div>
    `;

    document.querySelector(".reset-search").onclick = () => {
      query = "";
      activeTags = [];
      activeYear = "";
      vyhledavac.value = "";
      currentPage = 1;
      render();
    };

    paginace.innerHTML = "";
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

    setTimeout(() => {
      a.classList.add("show");
    }, 50 * (seznamClanku.children.length));

  });

  renderPagination(totalPages);
  renderTags();
  renderYears();
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

      const y =
        seznamClanku.getBoundingClientRect().top +
        window.pageYOffset -
        80; // <- offset (uprav si hodnotu)

      window.scrollTo({
        top: y,
        behavior: "smooth"
      });
    };

    paginace.appendChild(btn);
  }
}

// ====== SEARCH ======
vyhledavac.addEventListener("input", (e) => {

  query = e.target.value.toLowerCase();

  currentPage = 1;

  clearSearch.style.display =
    query ? "block" : "none";

  render();

});

clearSearch.addEventListener("click", () => {

  vyhledavac.value = "";

  query = "";

  currentPage = 1;

  clearSearch.style.display = "none";

  render();

  vyhledavac.focus();

});

// ====== INIT ======
render();