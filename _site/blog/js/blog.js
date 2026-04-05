let vsechnyClanky = [];
const pageSize = 12;
let currentPage = 1;
let aktivniTagy = [];

function formatDate(isoDate) {
  let d = new Date(isoDate);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}

function ulozStav() {
  const dotaz = document.getElementById("vyhledavac").value;
  const scrollY = window.scrollY || window.pageYOffset;

  sessionStorage.setItem("filterDotaz", dotaz);
  sessionStorage.setItem("filterTagy", JSON.stringify(aktivniTagy));
  sessionStorage.setItem("currentPage", currentPage);
  sessionStorage.setItem("scrollY", scrollY);
}

function vykresliClanky(data, page = 1) {
  const seznam = document.getElementById("seznam-clanku");
  seznam.innerHTML = "";

  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const strankaClanku = data.slice(start, end);

  strankaClanku.forEach(function (post) {
    let a = document.createElement("a");
    a.href = `/blog/article.html?id=${post.filename}`;
    a.className = "clanek";
    a.style.textDecoration = "none"; 

    a.addEventListener("click", function () {
      ulozStav();
    });

    let img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;

    let info = document.createElement("div");
    info.className = "info";

    let h2 = document.createElement("h3");
    h2.textContent = post.title;

    let popis = document.createElement("p");
    popis.textContent = post.description;

    info.appendChild(h2);
    info.appendChild(popis);

    let date = document.createElement("p");
    date.textContent = formatDate(post.date);
    date.className = "datum";

    a.appendChild(img);
    a.appendChild(info);
    a.appendChild(date);

    seznam.appendChild(a);
  });

  const ulozenyScroll = sessionStorage.getItem("scrollY");
  if (ulozenyScroll) {
  window.scrollTo({ top: parseInt(ulozenyScroll), behavior: "auto" });
  sessionStorage.removeItem("scrollY");
}

  vykresliPaginaci(data.length, page);
}

function vykresliPaginaci(pocetClanku, aktivniStranka) {
  const paginace = document.getElementById("paginace");
  paginace.innerHTML = "";

  const pocetStranek = Math.ceil(pocetClanku / pageSize);

  for (let i = 1; i <= pocetStranek; i++) {
    let btn = document.createElement("button");
    btn.textContent = i;
    btn.className = "stranka-btn";
    if (i === aktivniStranka) btn.classList.add("aktivni");

    btn.addEventListener("click", function () {
  currentPage = i;
  let filtrovaneClanky = getAktualniFilter();
  vykresliClanky(filtrovaneClanky, currentPage);
  ulozStav();

  const seznam = document.getElementById("seznam-clanku");
  if (seznam) {
    // scroll na seznam
    seznam.scrollIntoView({ behavior: "smooth", block: "start" });
    // jemný offset nahoru, např. 20px
    window.scrollBy(0, -200);
  }
});

    paginace.appendChild(btn);
  }
}

function generujTagy(data) {
  const filtrTagy = document.getElementById("filtr-tagy");
  filtrTagy.innerHTML = "";

  let vsechnyTagySet = new Set();
  data.forEach(post => {
    post.tags.forEach(tag => vsechnyTagySet.add(tag));
  });

  let serazeneTagy = Array.from(vsechnyTagySet).sort((a, b) =>
    a.localeCompare(b, 'cs', { sensitivity: 'base' })
  );

  serazeneTagy.forEach(tag => {
    let btn = document.createElement("button");
    btn.textContent = tag;
    btn.className = "filtr-btn button button--secondary button--small";

    btn.addEventListener("click", function () {
    // uložíme scroll před filtrováním
    const scrollY = window.scrollY || window.pageYOffset;

    if (aktivniTagy.includes(tag)) {
     aktivniTagy = aktivniTagy.filter(t => t !== tag);
      btn.classList.remove("aktivni");
    } else {
      aktivniTagy.push(tag);
     btn.classList.add("aktivni");
    }

    currentPage = 1;
    const filtrovane = getAktualniFilter();
  
    vykresliClanky(filtrovane, currentPage);

    // po vykreslení obnovíme scroll
    window.scrollTo({ top: scrollY, behavior: "auto" });

    ulozStav();
    });

    filtrTagy.appendChild(btn);
  });

  let reset = document.createElement("button");
  reset.textContent = "Zobrazit vše";
  reset.className = "filtr-btn reset button button--primary button--small";
  reset.addEventListener("click", function () {
    aktivniTagy = [];
    document.querySelectorAll(".filtr-btn").forEach(b => b.classList.remove("aktivni"));
    currentPage = 1;
    vykresliClanky(vsechnyClanky, currentPage);
    ulozStav();
    window.scrollTo({ top: 0, behavior: "smooth" }); // ← skok nahoru po resetu
  });
  filtrTagy.appendChild(reset);
}

function getAktualniFilter() {
  const dotaz = document.getElementById("vyhledavac").value.toLowerCase();
  let filtrovane = vsechnyClanky;

  if (aktivniTagy.length > 0) {
    filtrovane = filtrovane.filter(post =>
      aktivniTagy.every(tag => post.tags.includes(tag))
    );
  }

  if (dotaz) {
    filtrovane = filtrovane.filter(post =>
      post.title.toLowerCase().includes(dotaz)
    );
  }

  return filtrovane;
}

fetch("/blog/data/posts.json")
  .then(response => response.json())
  .then(function (data) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    vsechnyClanky = data;

    const ulozenyDotaz = sessionStorage.getItem("filterDotaz") || "";
    const ulozeneTagy = JSON.parse(sessionStorage.getItem("filterTagy") || "[]");
    const ulozenaStranka = parseInt(sessionStorage.getItem("currentPage")) || 1;

    document.getElementById("vyhledavac").value = ulozenyDotaz;
    aktivniTagy = ulozeneTagy;

    generujTagy(data);

    aktivniTagy.forEach(tag => {
      const btn = [...document.querySelectorAll(".filtr-btn")].find(b => b.textContent === tag);
      if (btn) btn.classList.add("aktivni");
    });

    currentPage = ulozenaStranka;

    const filtrovaneClanky = getAktualniFilter();
    vykresliClanky(filtrovaneClanky, currentPage);

    sessionStorage.removeItem("filterDotaz");
    sessionStorage.removeItem("filterTagy");
    sessionStorage.removeItem("currentPage");
  })
  .catch(function (error) {
    console.error("Chyba při načítání článků:", error);
  });

document.getElementById("vyhledavac").addEventListener("input", function () {
  currentPage = 1;
  let filtrovane = getAktualniFilter();
  vykresliClanky(filtrovane, currentPage);
  ulozStav();
});
