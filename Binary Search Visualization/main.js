const editButton = document.querySelector("#edit-btn");
const createButton = document.querySelector("#create-btn");
const arrayValue = document.querySelector("#array");
const arrayForm = document.querySelector("#array-form");
const checkButton = document.querySelector("#check");
const arrayContainer = document.querySelector(".array-container");
const searchButton = document.querySelector("#search-btn");
const searchValue = document.querySelector("#search-value");
const errorSection = document.querySelector(".error-section");
const configSection = document.querySelector(".configuration");
const explainContainer = document.querySelector(".explain-container");

//Function that create the array on screen
const createArray = (arr) => {
    arr.forEach((elem,id) => {
        let newItem = document.createElement("div");
        newItem.classList.add("array-item");
        newItem.innerHTML = `
            <div class = "id-div">
                <p class = "item-id"> ${id} </p>
            </div>
            <p class = "item-value"> ${elem} </p>
        `;
        arrayContainer.appendChild(newItem);
    });
};

//Function that displays some Error on screen
const displayError = (errorMessage) => {
    errorSection.style.display = "grid";
    errorSection.querySelector(".error").innerHTML = `
        <p> ${errorMessage} </p>
    `;
};

//Function that gets everything ready to start the animations
const setInitAnimation = () => {
    const lowArrowSpan = lowArrow.querySelector("span");
    const highArrowSpan = highArrow.querySelector("span");
    animateArrow(lowArrow,0);
    animateArrow(highArrow,array.length-1);
    if(Math.abs(lowArrowSpan.offsetTop) > Math.abs(highArrowSpan.offsetTop)) moveVerticalArrowSpan(lowArrow,highArrowSpan.offsetTop);
    else moveVerticalArrowSpan(highArrow,lowArrowSpan.offsetTop);
    if(array.length == 1) mergeArrow(lowArrow);
};

//Function that changes the displays of the arrows
const setDefault = () => {
    document.querySelector(".container-arrowDown").style.display = "none";
    document.querySelector(".container-arrowUp").style.display = "none";    
};

//editButton once is clicked fills the arrayForm with
editButton.addEventListener("click", () => {
    if(array.length == 0) {
        displayError("It is needed to exist an array to edit");
        return;
    }
    arrayForm.style.display = "flex";
    arrayValue.value = array.join(",");
});

//Once the checkButton is clicked
checkButton.addEventListener("click",() => {
    explainContainer.style.display = "none";
    errorSection.style.display = "none";
    //errors management
    if(arrayValue.value.length == 0){
        displayError("Please insert an array");
        arrayValue.focus();
        return;
    }else{
        //Get user input and map it into a valid array to sort it
        arrayContainer.querySelectorAll(".array-item").forEach(elem => arrayContainer.removeChild(elem));
        array = arrayValue.value.split(",").map(elem => parseInt(elem));
        array.sort((a,b) => {
            return a-b;
        });
        //If the array has some element that is NaN, displays an error
        if(array.some((elem) => isNaN(elem))){
            displayError("Please insert a valid numerical array");
            arrayValue.focus();
            setDefault();
            return;
        }
        createArray(array);
        document.querySelector(".container-arrowDown").style.display = "flex";
        setInitAnimation();
    }
    midArrow.style.display = "none";
    arrayValue.value = "";
    arrayForm.style.display = "none";
});

//If the user resize the window, we have to move the arrows into their respective positions 
//According into if the animation is done or not
window.addEventListener("resize",() => {
    if(array.length > 0){
        if(!animationDone){
            animateArrow(lowArrow,0);
            animateArrow(highArrow,array.length-1);
        }else{
            animateArrow(lowArrow,arrowsPosition.low);
            animateArrow(midArrow,arrowsPosition.mid);
            animateArrow(highArrow,arrowsPosition.high);
        }
    }
});

//Create Button just displays the arrayForm and set the value to blank
createButton.addEventListener("click",() => {
    arrayValue.value = "";
    arrayForm.style.display = "flex";
});

searchButton.addEventListener("click", () => {
    //Error management
    if(array.length == 0){
        displayError("It must exist an array for search value");
        return;
    }
    if(isNaN(searchValue.value) || searchValue.value.length == 0){
        displayError("Please search for a valid number");
        searchValue.focus();
        return;
    }
    //Start the animation calling to BinarySearch() with the respective values
    configSection.style.display = "none";
    errorSection.style.display = "none";
    midArrow.style.display = "initial";
    setInitAnimation();
    document.querySelector(".container-arrowUp").style.display = "flex";
    //Since Binary Search is an async function we want that once is finished the configSection displays again
    BinarySearch(parseInt(searchValue.value),array).then(() => configSection.style.display = "flex");
    animationDone = true;
});