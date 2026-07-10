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
const mainSlot = document.getElementById("sponsor-main");
const rightSlot = document.getElementById("sponsor-right");

const slots = [leftSlot, mainSlot, rightSlot];

let sponsorIndexes = [0, 1, 2];
let rotationInterval = null;


/* Nastavení loga */
function setSponsor(slot, sponsor) {
  const img = slot.querySelector("img");
  const link = slot.querySelector("a");

  img.src = sponsor.src;
  img.alt = sponsor.name;

  if (sponsor.url) {
    link.href = sponsor.url;
  } else {
    link.href = "#";
  }
}


/* První načtení */
function initSponsors() {
  sponsorIndexes.forEach((index, i) => {
    setSponsor(slots[i], sponsors[index]);
  });
}


/* Rotace */
function rotateSponsors() {

  slots.forEach(slot => {
    slot.classList.add("fade-out");
  });


  setTimeout(() => {

    sponsorIndexes = sponsorIndexes.map(index => {
      return (index + 1) % sponsors.length;
    });


    // kontrola, aby se neopakovalo stejné logo
    if (
      sponsorIndexes[0] === sponsorIndexes[1] ||
      sponsorIndexes[0] === sponsorIndexes[2] ||
      sponsorIndexes[1] === sponsorIndexes[2]
    ) {
      sponsorIndexes[2] = (sponsorIndexes[2] + 1) % sponsors.length;
    }


    sponsorIndexes.forEach((index, i) => {
      setSponsor(slots[i], sponsors[index]);
    });


    slots.forEach(slot => {
      slot.classList.remove("fade-out");
      slot.classList.add("fade-in");
    });


    setTimeout(() => {
      slots.forEach(slot => {
        slot.classList.remove("fade-in");
      });
    }, 400);


  }, 400);
}



/* Start */
initSponsors();

rotationInterval = setInterval(rotateSponsors, 4500);



/* Pauza při najetí */
slots.forEach(slot => {

  slot.addEventListener("mouseenter", () => {
    clearInterval(rotationInterval);
  });


  slot.addEventListener("mouseleave", () => {
    clearInterval(rotationInterval);
    rotationInterval = setInterval(rotateSponsors, 4500);
  });

});



/* Resize */
window.addEventListener("resize", () => {
  initSponsors();
});