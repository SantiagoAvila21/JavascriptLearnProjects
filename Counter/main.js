let botones = document.querySelectorAll(".boton");
let counter = document.querySelector("#Counter");
let cnt = 0;

botones.forEach((btn) => {
    btn.addEventListener('click',() => {
        if(btn.innerText == "Decrease") cnt--;
        else if(btn.innerText == "Increase") cnt++;
        else cnt = 0;
        counter.innerText = cnt;
        if(cnt > 0) counter.style.color = "green";
        else if(cnt < 0) counter.style.color = "red";
        else counter.style.color = "black";
    })
});