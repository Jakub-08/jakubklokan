let lastScroll = 0;

const header = document.querySelector("header");

window.addEventListener("scroll", () => {

  const currentScroll = window.scrollY;


  if (currentScroll <= 20) {
    header.classList.remove("hide");
    return;
  }


  if (currentScroll > lastScroll) {
    // dolů
    header.classList.add("hide");
  } 
  
  else {
    // nahoru
    header.classList.remove("hide");
  }


  lastScroll = currentScroll;

});