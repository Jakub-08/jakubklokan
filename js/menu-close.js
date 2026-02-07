document.addEventListener('click', function(event) {
  const menuCheckbox = document.getElementById('toggle-menu');
  const mobilniMenu = document.querySelector('.mobilni-menu');
  if (
    menuCheckbox &&
    menuCheckbox.checked &&
    !mobilniMenu.contains(event.target)
  ) {
    menuCheckbox.checked = false;
  }
});

function formatDate(isoDate) {
  const d = new Date(isoDate);
  return `${d.getDate()}. ${d.getMonth() + 1}. ${d.getFullYear()}`;
}



/* ===== KONFIGURACE SPONZORŮ ===== */
const sponsors = [
  { src: "/images/sponzoring/SVG/Brick_house.svg", name: "Brick House", url: "https://www.brickhouse.cz/" },
  { src: "/images/sponzoring/SVG/Helen_Doron.svg", name: "Helen Doron English", url: "https://helendoron.cz/" },
  { src: "/images/sponzoring/SVG/K_Vechtru.svg", name: "K Vechtru", url: "https://kvechtru.cz/cs/" },
  { src: "/images/sponzoring/SVG/Ronin_Advisors.svg", name: "Ronin Advisors" }
];

const leftSlot = document.getElementById("sponsor-left");
const rightSlot = document.getElementById("sponsor-right");
const peyton = {
  src: "/images/sponzoring/Peyton_legal.webp",
  name: "Peyton Legal",
  url: "https://www.peytonlegal.cz/"
};

let leftIndex = 0;   // index pro levý slot na desktopu
let rightIndex = 0;  // index pro pravý slot
let rotationInterval = null;

// Nastaví obrázek do slotu
function setSponsor(slot, sponsor) {
  const img = slot.querySelector("img");
  const link = slot.querySelector("a");
  img.src = sponsor.src;
  img.alt = sponsor.name;
  link.href = sponsor.url || "#";
}

// Inicializace slotů
function initSlots() {
  if (window.innerWidth < 768) {
    // mobil: levý pevně Peyton
    setSponsor(leftSlot, peyton);
    // pravý slot první sponzor hned při načtení
    rightIndex = 0;
    setSponsor(rightSlot, sponsors[rightIndex]);
  } else {
    // desktop: levý a pravý slot se nastaví hned při načtení
    leftIndex = 0;
    rightIndex = 1 % sponsors.length;
    setSponsor(leftSlot, sponsors[leftIndex]);
    setSponsor(rightSlot, sponsors[rightIndex]);
  }
}

// Rotace slotů
function rotateSlots() {
  if (window.innerWidth < 768) {
    // mobil: rotuje jen pravý slot
    rightSlot.classList.add("fade-out");
    setTimeout(() => {
      rightIndex = (rightIndex + 1) % sponsors.length;
      setSponsor(rightSlot, sponsors[rightIndex]);
      rightSlot.classList.remove("fade-out");
      rightSlot.classList.add("fade-in");
      setTimeout(() => rightSlot.classList.remove("fade-in"), 400);
    }, 400);
  } else {
    // desktop: rotuje levý i pravý slot
    leftSlot.classList.add("fade-out");
    rightSlot.classList.add("fade-out");

    setTimeout(() => {
      leftIndex = (leftIndex + 1) % sponsors.length;
      rightIndex = (rightIndex + 1) % sponsors.length;

      if (leftIndex === rightIndex) rightIndex = (rightIndex + 1) % sponsors.length;

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
}

// Start
initSlots(); // hned zobrazí loga
rotationInterval = setInterval(rotateSlots, 4500);

// Pauza při hoveru pravého slotu
[rightSlot].forEach(slot => {
  slot.addEventListener("mouseenter", () => clearInterval(rotationInterval));
  slot.addEventListener("mouseleave", () => rotationInterval = setInterval(rotateSlots, 4500));
});

// Přepočítat při resize
window.addEventListener("resize", () => {
  initSlots();
});
