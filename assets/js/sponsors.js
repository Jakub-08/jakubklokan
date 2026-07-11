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


  imgs.forEach(img=>{
    img.classList.add("sponsor-move-left");
  });


  setTimeout(()=>{

    indexes = [
      indexes[1],
      indexes[2],
      (indexes[2] + 1) % sponsors.length
    ];


    indexes.forEach((index,i)=>{
      setSponsor(
        slots[i],
        sponsors[index]
      );
    });


    requestAnimationFrame(()=>{

      imgs.forEach(img=>{
        img.classList.remove(
          "sponsor-move-left"
        );
      });

    });


  },800);

}



/* Start */

function initSponsors() {

  indexes = [0,1,2];

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