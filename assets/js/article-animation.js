const images = document.querySelectorAll(".text img");

const observer = new IntersectionObserver(entries => {

entries.forEach(entry => {

if(entry.isIntersecting){
entry.target.classList.add("show");
}

});

});


images.forEach(img => observer.observe(img));