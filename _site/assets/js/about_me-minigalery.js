let index = 0;
const slides = document.querySelectorAll(".education-gallery .slide");
const interval = 5000; // 5 sekundy

setInterval(() => {
  slides[index].classList.remove("aktivni");
  index = (index + 1) % slides.length;
  slides[index].classList.add("aktivni");
}, interval);