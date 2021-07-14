const projectsContainer = document.querySelector(".projects_container");

window.addEventListener("DOMContentLoaded", () => {
    console.log(projectsContainer);
    displayMenu();
});

const displayMenu = () => {
    const getDataProjects = async () => {
        let response = await fetch("./Projects.json");
        let data = await response.json();
        return data;
    }
    getDataProjects().then(projects => {
        projects.forEach(elem => {
            createCard(elem);
        });
    });
}

const createCard = (project) => {
    let newCard = document.createElement("div");
    newCard.classList += "project_card";
    newCard.innerHTML = `
        <img src = "${project.img}">
        <p> ${project.name} </p>
    `;
    newCard.addEventListener("click",() => location.href = project.src);
    projectsContainer.appendChild(newCard);
}
