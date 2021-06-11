const groceryName = document.querySelector("#grocery");
const submitBtn = document.querySelector("#submitBtn");
const container = document.querySelector(".items-list");
const clearBton = document.querySelector("#clear-btn");
const alertItem = document.querySelector("#alert");
const closeAlert = document.querySelector("#close-alert");
let flagEdit = false;
let elementToEdit;

const alert = (message,bgColor) => {
    alertItem.style.backgroundColor = bgColor;
    alertItem.firstElementChild.innerText = message;
    alertItem.style.display = "flex";
};

closeAlert.addEventListener("click",() => alertItem.style.display = "none");

const createItem = (itemName) => {
    const item = document.createElement("div");
    item.classList.add("item");
    console.log(item.innerHTML);
    item.innerHTML += `
        <p> ${itemName} </p>
        <div class = "edit-btns">
            <button class = "edit"> <i class="far fa-edit"></i> </button><button class = "delete"> <i class="far fa-trash-alt"></i> </button>
        </div>
    `;
    return item;
};

const del = (e) => {
    let itemAct = e.currentTarget.parentElement.parentElement;
    container.removeChild(itemAct);
    alert("Item deleted", "red");
    if(container.querySelectorAll(".item").length == 0) clearBton.style.display = "none";
};

const edit = (e) => {
    let itemAct = e.currentTarget.parentElement.parentElement;
    groceryName.value = itemAct.firstElementChild.innerText;
    flagEdit = true;
    submitBtn.value = "Edit";
    elementToEdit = itemAct;
};

submitBtn.addEventListener("click",() => {
    if(groceryName.value.length == 0) alert("Please enter a value", "#FF0000");
    if(flagEdit){
        console.log(elementToEdit);
        alertItem.style.display = "none";
        let name = groceryName.value.split(" ");
        name[0] = name[0][0].toUpperCase() + name[0].substr(1);
        name = name.join(" ");
        elementToEdit.firstElementChild.innerText = name;
        groceryName.value = "";
        flagEdit = false;
        alert("Item edited succesfully","#00FF00");
        submitBtn.value = "Submit";
    }else{
        document.querySelector("#alert").style.display = "none";
        let name = groceryName.value.split(" ");
        name[0] = name[0][0].toUpperCase() + name[0].substr(1);
        name = name.join(" ");
        let newItem = createItem(name);
        let editBtn = newItem.lastElementChild.querySelector(".edit"), deleteBtn = newItem.lastElementChild.querySelector(".delete");
        editBtn.addEventListener("click", edit);
        deleteBtn.addEventListener("click",del);
        container.appendChild(newItem);
        alert("Item added succesfully","#00FF00");
        groceryName.value = "";
    }
    if(container.querySelectorAll(".item").length >= 1) clearBton.style.display = "block";
});

clearBton.addEventListener("click", () => {
    console.log("Clear All");
    let itemsList = container.querySelectorAll(".item");
    itemsList.forEach(elem => {
        container.removeChild(elem);
    });
    alert("Items cleared", "red");
    clearBton.style.display = "none";
});