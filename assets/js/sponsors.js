/* ===== KONFIGURACE SPONZORŮ ===== */
const sponsors = [
  {
    src: "/images/sponzoring/Peyton_legal.webp",
    name: "Peyton Legal",
    url: "https://www.peytonlegal.cz/"
  },
  {
    src: "/images/sponzoring/SVG/Brick_house.svg",
    name: "Brick House",
    url: "https://www.brickhouse.cz/"
  },
  {
    src: "/images/sponzoring/SVG/Helen_Doron.svg",
    name: "Helen Doron English",
    url: "https://helendoron.cz/"
  },
  {
    src: "/images/sponzoring/SVG/K_Vechtru.svg",
    name: "K Vechtru",
    url: "https://kvechtru.cz/cs/"
  },
  {
    src: "/images/sponzoring/SVG/Ronin_Advisors.svg",
    name: "Ronin Advisors"
  }
];

const leftSlot = document.getElementById("sponsor-left");
const rightSlot = document.getElementById("sponsor-right");

let leftIndex = 0;
let rightIndex = 1;
let rotationInterval = null;

/* Nastaví obrázek do slotu */
function setSponsor(slot, sponsor) {
  const img = slot.querySelector("img");
  const link = slot.querySelector("a");

  img.src = sponsor.src;
  img.alt = sponsor.name;
  link.href = sponsor.url || "#";
}

/* Inicializace */
function initSlots() {
  leftIndex = 0;
  rightIndex = 1;

  setSponsor(leftSlot, sponsors[leftIndex]);
  setSponsor(rightSlot, sponsors[rightIndex]);
}

/* Rotace */
function rotateSlots() {
  leftSlot.classList.add("fade-out");
  rightSlot.classList.add("fade-out");

  setTimeout(() => {
    leftIndex = (leftIndex + 1) % sponsors.length;
    rightIndex = (rightIndex + 1) % sponsors.length;

    if (leftIndex === rightIndex) {
      rightIndex = (rightIndex + 1) % sponsors.length;
    }

    setSponsor(leftSlot, sponsors[leftIndex]);
    setSponsor(rightSlot, sponsors[rightIndex]);

    leftSlot.classList.remove("fade-out");
    rightSlot.classList.remove("fade-out");

    leftSlot.classList.add("fade-in");
    rightSlot.classList.add("fade-in");

    setTimeout(() => {
      leftSlot.classList.remove("fade-in");
      rightSlot.classList.remove("fade-in");
    }, 400);
  }, 400);
}

/* Start */
initSlots();
rotationInterval = setInterval(rotateSlots, 4500);

/* Pauza při hoveru */
[rightSlot, leftSlot].forEach(slot => {
  slot.addEventListener("mouseenter", () => {
    clearInterval(rotationInterval);
  });

  slot.addEventListener("mouseleave", () => {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateSlots, 4500);
  });
});

/* Přepočítání po změně velikosti okna */
window.addEventListener("resize", () => {
  initSlots();
});