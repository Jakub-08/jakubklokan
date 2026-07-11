const header = document.querySelector("header");

let lastScroll = 0;
let headerHeight = header.offsetHeight;


window.addEventListener("scroll", () => {

  const currentScroll = window.scrollY;


  if (currentScroll < headerHeight + 30) {
    header.classList.remove("hide");
    lastScroll = currentScroll;
    return;
  }


  if (currentScroll > lastScroll) {
    // scroll dolů
    header.classList.add("hide");
  } 
  else {
    // scroll nahoru
    header.classList.remove("hide");
  }


  lastScroll = currentScroll;

});