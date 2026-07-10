const counters = document.querySelectorAll(".counter");

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".medals-stats");

  if (!statsSection || counters.length === 0) return;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      let current = 0;

      const duration = 1200;
      const increment = target / (duration / 16);

      const update = () => {
        current += increment;

        if (current < target) {
          counter.textContent = Math.floor(current) + "+";
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "+";
        }
      };

      update();
    });
  };

  const observer = new IntersectionObserver(
    entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    },
    {
      threshold: 0.5
    }
  );

  observer.observe(statsSection);
});


const statsSection = document.querySelector(".medals-stats");

if (statsSection) {
  observer.observe(statsSection);
}