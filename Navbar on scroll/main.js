///SideBar Control
const sidebtn = document.querySelector(".nav-toggle");
const sidebar = document.querySelector(".items");
const closeSide = document.querySelector("#cross")

sidebtn.addEventListener("click",() => {
    const logoNav = document.querySelector(".Navbar .logo");
    console.log(logoNav);
    logoNav.classList.toggle("hideItems");
    sidebar.classList.toggle("showSidebar");
});

closeSide.addEventListener("click",() =>{
    const logoNav = document.querySelector(".Navbar .logo");
    sidebar.classList.toggle("showSidebar");
    setTimeout(() => logoNav.classList.toggle("hideItems"),505);
});

///Fixed Navbar
const navbar = document.getElementById("nav");

window.addEventListener("scroll",() => {
    const scrollHeight = window.pageYOffset;
    const navHeight = navbar.getBoundingClientRect().height;
    if (scrollHeight > navHeight) navbar.classList.add("fixedNavbar");
    else navbar.classList.remove("fixedNavbar");
});


///Smooth Scroll
const navBtns = document.querySelectorAll(".nav-btn");
navBtns.forEach((elem) => {
    elem.addEventListener("click",(e) => {
        if(sidebar.classList.contains("showSidebar")){
            const logoNav = document.querySelector(".Navbar .logo");
            sidebar.classList.toggle("showSidebar");
            setTimeout(() => logoNav.classList.toggle("hideItems"),505);
        }
        e.preventDefault();
        let id = e.currentTarget.getAttribute("href").slice(1);
        let target = document.getElementById(id);
        const navHeight = navbar.getBoundingClientRect().height;
        const fixedNav = navbar.classList.contains("fixedNavbar");
        let position = target.offsetTop - navHeight;
        if (!fixedNav) position -= navHeight;
        window.scrollTo({
            left: 0,
            top: position,
        });
    });
});