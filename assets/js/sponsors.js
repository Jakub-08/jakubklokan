/* ===== KONFIGURACE SPONZORŮ ===== */

const sponsors = [
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
    url: "https://kvechtru.cz/"
  },
  {
    src: "/images/sponzoring/SVG/Ronin_Advisors.svg",
    name: "Ronin Advisors",
    url: "#"
  },
];


const slots = [
  document.getElementById("sponsor-left"),
  document.getElementById("sponsor-main"),
  document.getElementById("sponsor-right")
];


let indexes = [0, 1, 2];
let rotationInterval;


/* Nastavení loga */
function setSponsor(slot, sponsor) {

  const img = slot.querySelector("img");
  const link = slot.querySelector("a");

  img.src = sponsor.src;
  img.alt = sponsor.name;

  link.href = sponsor.url;

}


/* Inicializace */
function initSponsors() {

  indexes.forEach((index, i) => {
    setSponsor(slots[i], sponsors[index]);
  });

}


/* Rotace */
function rotateSponsors() {

  const imgs = slots.map(
    slot => slot.querySelector("img")
  );


  // start animace
  imgs[0].classList.add("sponsor-left-move");
  imgs[1].classList.add("sponsor-center-move");
  imgs[2].classList.add("sponsor-right-move");


  setTimeout(()=>{


    // posun pozic
    indexes = [
      indexes[2],
      indexes[0],
      indexes[1]
    ];


    indexes.forEach((index,i)=>{
      setSponsor(
        slots[i],
        sponsors[index]
      );
    });


    // reset
    imgs.forEach(img=>{
      img.classList.remove(
        "sponsor-left-move",
        "sponsor-center-move",
        "sponsor-right-move"
      );
    });


  },700);

}



/* Start */

function initSponsors() {

  indexes.forEach((index, i) => {
    setSponsor(slots[i], sponsors[index]);
  });


  slots[1]
    .querySelector("img")
    .classList.add("main-sponsor");

}



/* Pauza při najetí */

slots.forEach(slot => {

  slot.addEventListener(
    "mouseenter",
    () => clearInterval(rotationInterval)
  );


  slot.addEventListener(
    "mouseleave",
    () => {
      rotationInterval = setInterval(
        rotateSponsors,
        5000
      );
    }
  );

});