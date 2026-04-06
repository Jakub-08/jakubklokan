const lightbox = document.getElementById("lightbox");
        const lightboxImg = document.getElementById("lightbox-img");
        const images = document.querySelectorAll(".gallery-card img"); // přesnější výběr
        const prev = document.getElementById("prev");
        const next = document.getElementById("next");

        let currentIndex = 0;

        function openLightbox(index) {
          currentIndex = index;
          updateImage();
          lightbox.style.display = "flex";
        }

        function updateImage() {
          lightboxImg.src = images[currentIndex].src;
        }

        function showNext() {
          currentIndex = (currentIndex + 1) % images.length;
          updateImage();
        }

        function showPrev() {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateImage();
        }

        // klik na obrázek
        images.forEach((img, index) => {
          img.addEventListener("click", () => openLightbox(index));
        });

        // šipky
        prev.addEventListener("click", (e) => {
          e.stopPropagation();
          showPrev();
        });

        next.addEventListener("click", (e) => {
          e.stopPropagation();
          showNext();
        });

        // zavření klikem mimo
        lightbox.addEventListener("click", () => {
          lightbox.style.display = "none";
        });

        // klávesnice
        document.addEventListener("keydown", (e) => {
          if (lightbox.style.display === "flex") {
            if (e.key === "ArrowLeft") showPrev();
            if (e.key === "ArrowRight") showNext();
            if (e.key === "Escape") lightbox.style.display = "none";
          }
        });

        // swipe (mobil)
        let startX = 0;

        lightbox.addEventListener("touchstart", (e) => {
          startX = e.touches[0].clientX;
        });

        lightbox.addEventListener("touchend", (e) => {
          const endX = e.changedTouches[0].clientX;
          const diff = endX - startX;

          if (Math.abs(diff) > 50) {
            if (diff > 0) {
              showPrev();
            } else {
              showNext();
            }
          }
        });