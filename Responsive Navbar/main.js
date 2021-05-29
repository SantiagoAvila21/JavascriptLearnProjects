let togglebtn = document.querySelector(".nav-toggle");
let header = document.querySelector(".header");
let links = document.querySelector(".nav-menu");
links.classList.toggle("show-menu");

togglebtn.addEventListener('click',() => {
    header.classList.toggle("show-links-header");
    links.classList.toggle("show-menu");
});