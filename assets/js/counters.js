const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {

      counters.forEach(counter => {
        const target = Number(counter.dataset.target);
        let current = 0;

        const duration = 1200;
        const step = target / (duration / 16);

        const update = () => {
          current += step;

          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };

        update();
      });

      observer.disconnect();
    }
  });
}, {
  threshold: 0.5
});


const statsSection = document.querySelector(".medals-stats");

if (statsSection) {
  observer.observe(statsSection);
}