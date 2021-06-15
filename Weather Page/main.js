const submitButton = document.querySelector("#submit-button");
const cityName = document.querySelector("#city");
const containerCities = document.querySelector(".list-cities");
const apiKey = "6dd3253206dcab49bba1473b973f9953";
const alertItem = document.querySelector("#alert");

const displayAlert = (message) => {
    alertItem.innerHTML = message;
    alertItem.style.display = "block";
};

const deleteCity = (e) => {
    containerCities.removeChild(e.currentTarget.parentElement.parentElement);
}

const createItem = (data) => {
    let newItem = document.createElement("div");
    newItem.classList.add("card-city");
    newItem.innerHTML = `
        <div id="info-city" data-name = "${data.city},${data.country}">
            <h4 id="name-city"> ${data.city}</h4>
            <span id="name-country"> ${data.country} </span>
            <a class = "delete-card"> <i class="fas fa-times"></i> </a>
        </div>
        <p id="temperature">${data.temp}</p>
        <img id="temp-icon" src=${data.icon}>
        <p id = "desc"> ${data.desc} </p>
    `;
    newItem.firstElementChild.lastElementChild.addEventListener("click",deleteCity);
    containerCities.appendChild(newItem);
};

const searchRepeated = (cityToFind) => {
    let flag = false;
    containerCities.querySelectorAll(".card-city").forEach(elem => {
        let infoAct = elem.firstElementChild.dataset.name;
        if(cityToFind.includes(",")){
            if(cityToFind == infoAct) flag = true;
        }else{
            if(infoAct.split(",")[0] == cityToFind) flag = true;
        }
    });
    return flag;
}

submitButton.addEventListener("click",(e) => {
    e.preventDefault();
    let inputVal = cityName.value;
    if(containerCities.querySelectorAll(".card-city").length > 0){
        if(searchRepeated(inputVal)){
            displayAlert(`You already know the weather for (${inputVal}), otherwise be more specific by providing the country code as well`);
            cityName.focus();
            return;
        }
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;
    async function peticion(){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }
    peticion().then(data => {
        let info = {
            city: data.name,
            country: data.sys.country,
            temp: Math.round(data.main.temp),
            icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
            desc: data.weather[0].description.split(" ").map(elem => elem.toUpperCase()).join(" ")
        }
        createItem(info);
    }).catch(() => {
        displayAlert("¡Please search for a valid city!");
        cityName.focus();
    });
    cityName.value = "";
    alertItem.style.display = "none";
});