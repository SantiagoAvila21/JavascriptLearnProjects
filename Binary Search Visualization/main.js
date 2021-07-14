const lowArrow = document.querySelector("#arrow-low");
const highArrow = document.querySelector("#arrow-high");
const midArrow = document.querySelector("#arrow-mid");
const editButton = document.querySelector("#edit-btn");
const createButton = document.querySelector("#create-btn");
const arrayValue = document.querySelector("#array");
const arrayForm = document.querySelector("#array-form");
const checkButton = document.querySelector("#check");
const arrayContainer = document.querySelector(".array-container");
const searchButton = document.querySelector("#search-btn");
const searchValue = document.querySelector("#search-value");
const errorSection = document.querySelector(".error-section");
const explainContainer = document.querySelector(".explain-container");
let array = [];
let editFlag;
let animationDone = false;
let arrowsPosition;

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

const displayError = (errorMessage) => {
    console.log(errorSection);
    errorSection.style.display = "grid";
    errorSection.querySelector(".error").innerHTML = `
        <p> ${errorMessage} </p>
    `;
};

const setDefault = () => {
    document.querySelector(".container-arrowDown").style.display = "none";
    document.querySelector(".container-arrowUp").style.display = "none";    
};

editButton.addEventListener("click", () => {
    if(array.length == 0) {
        displayError("It is needed to exist an array to edit");
        return;
    }
    arrayForm.style.display = "flex";
    arrayValue.value = array.join(",");
});

const BinarySearch = async (flag,arr) => {
    let low = 0, high = arr.length-1;
    while(low <= high){
        if(low == high){
            
        }
        let mid = Math.floor((low + high)/2);
        await animateArrow(midArrow,mid);
        arrowsPosition = {low,mid,high};
        if(arr[mid] == flag) return true;
        if(arr[mid] < flag){
            low = mid + 1;
            await animateArrow(lowArrow, low);
        } 
        else{
            high = mid - 1;
            await animateArrow(highArrow,high);
        }
    }
    return false;
};

const explain = (low, mid, high, flag, target) => {
    return new Promise(resolve => {
        if(flag){
            explainContainer.innerHTML = `
                <p class ="search-key"> Search key: ${target} </p>
                <div class = "explain">
                    <p> Mid = </p>
                    <div id = "fraction">
                        <p class = "numerator"> ${low} + ${high}  </p>
                        <hr>
                        <p class = "denominator"> 2 </p>
                    </div>
                    <p> = ${mid} </p>
                </div>
                <p class ="comparisons"> Total comparisons: 1 </p>
            `; 
        }else{
            let fct = () ? : ;
            explainContainer.innerHTML = `
                <p class ="search-key"> Search key: 33 </p>
                <div class = "explain">
                    <p>  </p>
                </div>
                <p class ="comparisons"> Total comparisons: 1 </p>
            `;
        }
    });
};

const animateArrow = (arrow,pos) => {
    return new Promise(resolve => {
        const index = {
            element: document.querySelectorAll(".array-item")[pos],
            left: Math.round(document.querySelectorAll(".array-item")[pos].getBoundingClientRect().left),
            right: Math.round(document.querySelectorAll(".array-item")[pos].getBoundingClientRect().right),
            top: Math.round(document.querySelectorAll(".array-item")[pos].offsetTop),
            bottom: Math.round(document.querySelectorAll(".array-item")[pos].offsetTop + 52)
        };
        console.log(index.element,index.top);
        arrow.style.top = ((arrow == midArrow) ? index.bottom : index.top - 38) + "px";
        arrow.style.left = (index.left + index.right)/2 - 7 + "px";
        setTimeout(resolve,1500);
    });
};

checkButton.addEventListener("click",() => {
    errorSection.style.display = "none";
    if(arrayValue.value.length == 0){
        displayError("Please insert an array");
        arrayValue.focus();
        return;
    }else{
        arrayContainer.querySelectorAll(".array-item").forEach(elem => arrayContainer.removeChild(elem));
        array = arrayValue.value.split(",").map(elem => parseInt(elem));
        array.sort((a,b) => {
            return a-b;
        });
        const containsNan = array.some((elem) => isNaN(elem));
        if(containsNan){
            displayError("Please insert a valid numerical array");
            arrayValue.focus();
            setDefault();
            return;
        }
        createArray(array);
        document.querySelector(".container-arrowDown").style.display = "flex";
        animateArrow(lowArrow,0);
        animateArrow(highArrow,array.length-1);
    }
    midArrow.style.display = "none";
    arrayValue.value = "";
    arrayForm.style.display = "none";
});

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

createButton.addEventListener("click",() => {
    arrayValue.value = "";
    arrayForm.style.display = "flex";
});

searchButton.addEventListener("click", () => {
    if(isNaN(searchValue.value)){
        displayError("Please search for a valid number");
        searchValue.focus();
        return;
    }
    if(array.length == 0){
        displayError("It must exist an array for search value");
        return;
    }
    errorSection.style.display = "none";
    midArrow.style.display = "initial";
    animateArrow(lowArrow,0);
    animateArrow(highArrow,array.length-1);
    document.querySelector(".container-arrowUp").style.display = "flex";
    BinarySearch(parseInt(searchValue.value),array);
    animationDone = true;
});