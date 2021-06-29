const lowArrow = document.querySelector("#arrow-low");
const highArrow = document.querySelector("#arrow-high");
const midArrow = document.querySelector("#arrow-mid");
let array = [];
let editFlag;
let animationDone = false;
let arrowsPosition;

//Binary Search is an async function, because always we want to await the animations to finish
//to proceed to the next step on the binary search itself
const BinarySearch = async (flag,arr) => {
    let low = 0, high = arr.length-1;
    while(high >= low){
        let mid = Math.floor((low + high)/2);
        arrowsPosition = {low,mid,high};
        explain(low,mid,high,1,flag);
        await animateArrow(midArrow,mid);
        if(arr[mid] == flag){
            explain(low,mid,high,2,flag);
            return true;
        }
        if(arr[mid] < flag){
            low = mid + 1;
            if(low >= array.length){
                explain(low,-1,high,3,flag);
                return false;
            }
            if(low == high) mergeArrow(lowArrow);
            explain(low,mid,high,0,flag);
            await animateArrow(lowArrow, low);
        } 
        else{
            high = mid - 1;
            if(high < 0){
                explain(low,-1,high,3,flag);
                return false;
            }
            if(low  == high) mergeArrow(highArrow);
            explain(low,mid,high,0,flag);
            await animateArrow(highArrow,high);
        }
    }
    explain(low,-1,high,3,flag);
    return false;
};

//mergeArrow is the function that helps when the high and low indexes are equal
const mergeArrow = (arrowToMerge) => {
    let other;
    if(arrowToMerge == lowArrow) other = highArrow;
    else other = lowArrow;
    moveVerticalArrowSpan(arrowToMerge,other.querySelector("span").offsetTop - 20);
};

const moveVerticalArrowSpan = (arrow,fct) => {
    arrow.querySelector("span").style.top = fct + "px";
};

//Explain is the function that displays on window what is happening on the binary search
//It has 3 type of flags
//1 - We move mid so we show the formula and it result 
//0 - We move high or low so we show where is going to move
//2 - Once the binary search is finished, we found or not the target so we display found
//3 - Binary Search doesnt find the result
const explain = (low, mid, high, flag, target) => {
    explainContainer.style.display = "flex";
    if(flag == 1){
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
        `; 
    }else if(flag == 0){
        let txt = ((target > array[mid])  ? `${target} > ${array[mid]} Set low = ${mid + 1}` : `${target} < ${array[mid]} Set high = ${mid - 1}`); 
        explainContainer.innerHTML = `
            <p class ="search-key"> Search key: ${target} </p>
            <div class = "explain">
                <p> ${txt} </p>
            </div>
        `;
    }else{
        let found = (flag == 2) ? `Found key at index ${mid}` : `Key does not exist in the array`; 
        explainContainer.innerHTML = `
            <p class ="search-key"> Search key: ${target} </p>
            <div class = "explain">
                <p> ${found} </p>
            </div>
        `;
    }
    explainContainer.style.animation = "appear 1s ease-in-out";
};

//animateArrow returns a promise to the animation of every Arrow
const animateArrow = (arrow,pos) => {
    return new Promise(resolve => {
        const index = {
            element: document.querySelectorAll(".array-item")[pos],
            left: Math.round(document.querySelectorAll(".array-item")[pos].getBoundingClientRect().left),
            right: Math.round(document.querySelectorAll(".array-item")[pos].getBoundingClientRect().right),
            top: Math.round(document.querySelectorAll(".array-item")[pos].offsetTop),
            bottom: Math.round(document.querySelectorAll(".array-item")[pos].offsetTop + 52)
        };
        arrow.style.top = ((arrow == midArrow) ? index.bottom : index.top - 38) + "px";
        arrow.style.left = (index.left + index.right)/2 - 7 + "px";
        setTimeout(resolve,3000);
    });
};