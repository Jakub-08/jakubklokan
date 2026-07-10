document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const index = [...elements].indexOf(entry.target);

          entry.target.style.transitionDelay = `${Math.min(index * 100, 500)}ms`;

          entry.target.classList.add("active");

          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15
    }
  );

  elements.forEach(element => observer.observe(element));
});




const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
});

document.querySelectorAll(".clanek").forEach(card=>{
    observer.observe(card);
});