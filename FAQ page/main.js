const qstion = document.querySelectorAll(".question");
console.log(qstion);

qstion.forEach((elem) => {
    elem.addEventListener('click',() => {
        qstion.forEach((qs) => {
            if(qs !== elem && qs.lastElementChild.className == "far fa-minus-square"){
                qs.nextElementSibling.classList.remove("show-panel");
                qs.lastElementChild.className = (qs.lastElementChild.className == "far fa-minus-square") ? "far fa-plus-square" : "far fa-minus-square"; 
            }
        });
        const icon = elem.lastElementChild;
        const ans = elem.nextElementSibling;
        icon.className = (icon.className == "far fa-minus-square") ? "far fa-plus-square" : "far fa-minus-square"; 
        ans.classList.toggle("show-panel");
    });
});