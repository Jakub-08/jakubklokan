const counters = document.querySelectorAll(".counter");

document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");
  const statsSection = document.querySelector(".medals-stats");

  if (!statsSection || counters.length === 0) return;

  const animateCounters = () => {
    counters.forEach(counter => {
      const target = Number(counter.dataset.target);
      const duration = 2200;
      const startTime = performance.now();

      const update = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // zpomalení ke konci (easeOut)
        const easeProgress = 1 - Math.pow(1 - progress, 4);

        const current = Math.floor(target * easeProgress);

        counter.textContent = current + "+";

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          counter.textContent = target + "+";
        }
      };

      requestAnimationFrame(update);
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