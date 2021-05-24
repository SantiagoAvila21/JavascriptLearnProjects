
let botonClick = document.querySelector('.Clickme');
let simple = document.querySelector('.astext');
let hex = simple.nextElementSibling;
hex.style.color = "#24D3A3";
let status = "hex";
let randomColor = () => {
    return Math.floor(Math.random()*16777215).toString(16);
}

simple.addEventListener('click',() => {
    status = "simple";
    simple.style.color = "#24D3A3";
    hex.style.color = "black";
});

hex.addEventListener('click',() => {
    status = "hex";
    hex.style.color = "#24D3A3";
    simple.style.color = "black";
});

botonClick.addEventListener('click',()=>{
    if(status == "hex"){
        let newColor = randomColor();
        let container = document.querySelector(".container"), bgtitle = document.querySelector("#BgColor");
        console.log(bgtitle);
        document.documentElement.style.setProperty('--bgColor', '#' + newColor);
        bgtitle.innerHTML = "#" + newColor;
    }else{
        let colors = ['Green','Blue','Red','White','Gray','Magenta','Cyan','Pink'];
        let id = Math.floor(Math.random() * colors.length);
        let container = document.querySelector(".container"), bgtitle = document.querySelector("#BgColor");
        document.documentElement.style.setProperty('--bgColor', colors[id]);
        bgtitle.innerHTML = colors[id];
    }
});