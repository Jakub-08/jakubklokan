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
  {
    src: "/images/sponzoring/Peyton_legal.webp",
    name: "Peyton Legal",
    url: "https://www.peytonlegal.cz/"
  }
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


  slots.forEach(slot => {
    slot.classList.add("fade-out");
  });


  setTimeout(() => {


    indexes = indexes.map(index => {
      return (index + 1) % sponsors.length;
    });


    // zabrání stejnému logu vedle sebe
    while (
      indexes[0] === indexes[1] ||
      indexes[1] === indexes[2] ||
      indexes[0] === indexes[2]
    ) {

      indexes = indexes.map(index => {
        return (index + 1) % sponsors.length;
      });

    }


    indexes.forEach((index, i) => {
      setSponsor(slots[i], sponsors[index]);
    });



    slots.forEach(slot => {
      slot.classList.remove("fade-out");
      slot.classList.add("fade-in");


      setTimeout(() => {
        slot.classList.remove("fade-in");
      },400);

    });


  },400);

}



/* Start */

initSponsors();

rotationInterval = setInterval(
  rotateSponsors,
  4500
);



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
        4500
      );
    }
  );

});