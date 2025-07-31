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
    a.href = post.filename;
    a.className = "clanek";
    a.style.textDecoration = "none";
    a.style.color = "inherit";

    a.addEventListener("click", function () {
      ulozStav();
    });

    let img = document.createElement("img");
    img.src = post.image;
    img.alt = post.title;

    let info = document.createElement("div");
    info.className = "info";

    let h2 = document.createElement("h2");
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

  // Po vykreslení obsahu obnov scroll pozici (pokud je uložená)
  const ulozenyScroll = sessionStorage.getItem("scrollY");
  if (ulozenyScroll) {
    window.scrollTo({ top: parseInt(ulozenyScroll), behavior: "auto" });
    sessionStorage.removeItem("scrollY");  // aplikuj jen jednou
  } else {
    window.scrollTo({ top: 0, behavior: "smooth" });
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
    });

    paginace.appendChild(btn);
  }
}

function generujTagy(data) {
  const filtrTagy = document.getElementById("filtr-tagy");
  filtrTagy.innerHTML = "";

  let vsechnyTagy = new Set();

  data.forEach(post => {
    post.tags.forEach(tag => vsechnyTagy.add(tag));
  });

  vsechnyTagy.forEach(tag => {
    let btn = document.createElement("button");
    btn.textContent = tag;
    btn.className = "filtr-btn";

    btn.addEventListener("click", function () {
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
      ulozStav();
    });

    filtrTagy.appendChild(btn);
  });

  let reset = document.createElement("button");
  reset.textContent = "Zobrazit vše";
  reset.className = "filtr-btn reset";
  reset.addEventListener("click", function () {
    aktivniTagy = [];
    document.querySelectorAll(".filtr-btn").forEach(b => b.classList.remove("aktivni"));
    currentPage = 1;
    vykresliClanky(vsechnyClanky, currentPage);
    ulozStav();
  });
  filtrTagy.appendChild(reset);
}

function getAktualniFilter() {
  const dotaz = document.getElementById("vyhledavac").value.toLowerCase();
  let filtrovane = vsechnyClanky;

  // console.log("Aktivni tagy v getAktualniFilter:", aktivniTagy);

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

// Načtení dat a inicializace
fetch("data/posts.json")
  .then(response => response.json())
  .then(function (data) {
    data.sort((a, b) => new Date(b.date) - new Date(a.date));
    vsechnyClanky = data;

    // Obnovení uloženého stavu
    const ulozenyDotaz = sessionStorage.getItem("filterDotaz") || "";
    const ulozeneTagy = JSON.parse(sessionStorage.getItem("filterTagy") || "[]");
    const ulozenaStranka = parseInt(sessionStorage.getItem("currentPage")) || 1;

    // Nastav vyhledávací dotaz
    document.getElementById("vyhledavac").value = ulozenyDotaz;
    // Nastav aktivní tagy
    aktivniTagy = ulozeneTagy;

    generujTagy(data);

    // Označ aktivní tagy tlačítky
    aktivniTagy.forEach(tag => {
      const btn = [...document.querySelectorAll(".filtr-btn")].find(b => b.textContent === tag);
      if (btn) btn.classList.add("aktivni");
    });

    currentPage = ulozenaStranka;

    // Vykresli podle filtru (filtrovane články)
    const filtrovaneClanky = getAktualniFilter();
    vykresliClanky(filtrovaneClanky, currentPage);

    // Vyčistit sessionStorage kromě scrollY (ta se maže při vykreslení)
    sessionStorage.removeItem("filterDotaz");
    sessionStorage.removeItem("filterTagy");
    sessionStorage.removeItem("currentPage");
  })
  .catch(function (error) {
    console.error("Chyba při načítání článků:", error);
  });

// Vyhledávací input - při změně filtruj a ukládej stav
document.getElementById("vyhledavac").addEventListener("input", function () {
  currentPage = 1;
  let filtrovane = getAktualniFilter();
  vykresliClanky(filtrovane, currentPage);
  ulozStav();
});
