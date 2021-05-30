const togglebtn = document.querySelector(".side-toggle");
const sidemenu = document.querySelector(".side-menu");
const close = document.querySelector("#cross");
console.log(sidemenu);

togglebtn.addEventListener('click',() => {
    sidemenu.classList.toggle("showMenu");
    togglebtn.style.display = "none";
});

close.addEventListener('click',() => {
    sidemenu.classList.toggle("showMenu");
    setTimeout(() => {togglebtn.style.display = "block";}, 510);
});