document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(".reveal");

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const index = [...elements].indexOf(entry.target);

          entry.target.style.transitionDelay = `${index * 100}ms`;

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