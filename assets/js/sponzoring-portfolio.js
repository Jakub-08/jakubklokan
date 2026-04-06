const openBtn = document.getElementById("open-pdf");
                const closeBtn = document.getElementById("close-pdf");
                const modal = document.getElementById("pdf-modal");

                openBtn.addEventListener("click", function (e) {
                  e.preventDefault();
                  modal.style.display = "block";
                });

                closeBtn.addEventListener("click", function () {
                  modal.style.display = "none";
                });

                // klik na overlay zavře modal
                document
                  .querySelector(".pdf-overlay")
                  .addEventListener("click", function () {
                    modal.style.display = "none";
                  });