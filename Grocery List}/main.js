const groceryName = document.querySelector("#grocery");
const submitBtn = document.querySelector("#submitBtn");
const container = document.querySelector(".items-list");
const clearBton = document.querySelector("#clear-btn");
const alertItem = document.querySelector("#alert");
const closeAlert = document.querySelector("#close-alert");
let flagEdit = false;
let elementToEdit;

//Alert Control
const alert = (message,bgColor) => {
    alertItem.style.backgroundColor = bgColor;
    alertItem.firstElementChild.innerText = message;
    alertItem.style.display = "flex";
};

closeAlert.addEventListener("click",() => alertItem.style.display = "none");

//Creates item of grocery and appends it to the container of the groceries
const createItem = (itemName) => {
    const item = document.createElement("div");
    item.classList.add("item");
    item.innerHTML += `
        <p> ${itemName} </p>
        <div class = "edit-btns">
            <button class = "edit"> <i class="far fa-edit"></i> </button><button class = "delete"> <i class="far fa-trash-alt"></i> </button>
        </div>
    `;
    //Set unique dataset to the element
    let attr = document.createAttribute("data-id");
    attr.value = getLocalStorage().length;
    item.setAttributeNode(attr);
    //Create Buttons of each grocery container
    let editBtn = item.lastElementChild.querySelector(".edit"), deleteBtn = item.lastElementChild.querySelector(".delete");
    editBtn.addEventListener("click", edit);
    deleteBtn.addEventListener("click",del);
    container.appendChild(item);
};

//Delete Element of the grocerie's container
const del = (e) => {
    let itemAct = e.currentTarget.parentElement.parentElement;
    removeLocalStorage(itemAct.dataset.id);
    container.removeChild(itemAct);
    alert("Item deleted", "red");
    if(container.querySelectorAll(".item").length == 0) clearBton.style.display = "none";
};

//Change Flag of EditItem
const edit = (e) => {
    let itemAct = e.currentTarget.parentElement.parentElement;
    groceryName.value = itemAct.firstElementChild.innerText;
    flagEdit = true;
    submitBtn.value = "Edit";
    elementToEdit = itemAct;
};

submitBtn.addEventListener("click",() => {
    //Gets the value of the input text
    if(groceryName.value.length == 0) {
        alert("Please enter a value", "#FF0000");
        return;
    }
    let name = groceryName.value.split(" ");
    name[0] = name[0][0].toUpperCase() + name[0].substr(1);
    name = name.join(" ");
    if(flagEdit){
        alertItem.style.display = "none";
        editLocalStorage(elementToEdit.dataset.id,name);
        elementToEdit.firstElementChild.innerText = name;
        groceryName.value = "";
        flagEdit = false;
        alert("Item edited succesfully","#00FF00");
        submitBtn.value = "Submit";
    }else{
        addToLocalStorage(getLocalStorage().length + 1,name);
        createItem(name);
        alert("Item added succesfully","#00FF00");
        groceryName.value = "";
    }
    if(container.querySelectorAll(".item").length >= 1) clearBton.style.display = "block";
});

clearBton.addEventListener("click", () => {
    let itemsList = container.querySelectorAll(".item");
    itemsList.forEach(elem => {
        container.removeChild(elem);
    });
    alert("Items cleared", "red");
    clearBton.style.display = "none";
    localStorage.clear();
});

/* LOCAL STORAGE */
const getLocalStorage = () => {
    return localStorage.getItem("list") ? JSON.parse(localStorage.getItem("list")) : [];
};

const addToLocalStorage = (id,value) => {
    let storageAct = getLocalStorage();
    let infoToAdd = { id, value};
    storageAct.push(infoToAdd);
    localStorage.setItem("list",JSON.stringify(storageAct));
};

const editLocalStorage = (id,value) => {
    let storageAct = getLocalStorage();
    storageAct = storageAct.map(elem => {
        if(elem.id == id) elem.value = value;
        return elem;
    });
    localStorage.setItem("list",JSON.stringify(storageAct));
};

const removeLocalStorage = (id) => {
    let storageAct = getLocalStorage();
    storageAct = storageAct.filter(elem => id != elem.id);
    localStorage.setItem("list",JSON.stringify(storageAct));
};

window.addEventListener("DOMContentLoaded",() => {
    let storageAct = getLocalStorage();
    storageAct.forEach(elem => {
        createItem(elem.value);
    });
    if(container.querySelectorAll(".item").length >= 1) clearBton.style.display = "block";
});