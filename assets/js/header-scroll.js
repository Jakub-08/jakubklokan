let lastScroll = 0;

const header = document.querySelector("header");

if(header){

window.addEventListener("scroll", () => {

  const currentScroll = window.scrollY;


  if(currentScroll <= 20){
    header.classList.remove("hide");
    lastScroll = currentScroll;
    return;
  }


  if(currentScroll > lastScroll){
    header.classList.add("hide");
  } 
  else {
    header.classList.remove("hide");
  }


  lastScroll = currentScroll;

});

}