document.addEventListener("DOMContentLoaded", () => {
fetchDogs();
});


const dogBar = document.getElementById("dog-bar");
const dogInfo = document.getElementById("dog-info");
const filterBtn = document.getElementById("good-dog-filter");
const baseURL = "http://localhost:3000/pups";

let allDogs = [];
let filterOn = false;

filterBtn.addEventListener("click", () => {
    filterOn = !filterOn;
    filterBtn.textContent = `Filter good dogs: ${filterOn ? "ON" : "OFF"}`
    renderDogBar();

});


function renderDogBar() {
    dogBar.innerHTML ="";
    const dogsToShow = filterOn ? allDogs.filter(dog => dog.isGoodDog) : allDogs;
 
    dogsToShow.forEach(dog => {
        const span = document.createElement("span");
        span.textContent = dog.name;
        span.addEventListener("click", () => showDogInfo(dog));
        dogBar.appendChild(span);
    });
}

function showDogInfo(dog) {
    dog.innerHTML =`
    <img src="${dog.image}" />
    <h2>${dog.name}</h2>
    <button id="toggle-dog">${dog.isGoodDog ? "Good Dog!" : "Bad Dog!"}</button>`;
    const toggleBtn = document.getElementById("toggle-dog");
    toggleBtn.addEventListener("click", () => toggleGoodDog(dog));
}

function toggleGoodDog(dog) {
    const updateDog = { ...dog, isGoodDog: !dog.isGoodDog };

    fetch(`${baseURL}/${dog.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "applicatipn/json" },
        body: JSON.stringify({ isGoodDog: updateDog.isGoodDog })
    })
    .then(resp => resp.json())
    .then(data => {
        const index = allDogs.findIndex(d => d.id === dog.id);
        allDogs[index] =data;
        showDogInfo(data);
        renderDogBar();
    });
}