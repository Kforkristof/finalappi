const mainTable = document.getElementById("mainTable");
let currentPage = 1;
let nextButton = document.getElementById("nextButton");
let prevButton = document.getElementById("prevButton");
let resiButtons = document.getElementsByClassName('btn btn-warning');
let residentsTable = document.getElementById('resident-table');

const mainHeaders = `<tr>
                        <th>Name</th>
                        <th>Diameter</th>
                        <th>Climate</th>
                        <th>Terrain</th>
                        <th>Surface Water</th>
                        <th>Population</th>
                        <th>Residents</th>
                   </tr>`;


const resiHeaders = `<tr>
                <th>Name</th>
                <th>Height</th>
                <th>Mass</th>
                <th>Hair Color</th>
                <th>Skin Color</th>
                <th>Eye Color</th>
                <th>Birth Year</th>
                <th>Gender</th>
                </tr>`;

function listenAll() {
    nextButton.addEventListener("click", nextPage);
    prevButton.addEventListener("click", prevPage);

}

function createModal() {
    residentsTable.innerHTML = resiHeaders;
    let residents = this.dataset["residents"].split(',');
    for (let url of residents) {

        fetch(url)
            .then((response) => response.json())
            .then((

                function (data) {
                    residentsTable.insertAdjacentHTML('beforeend',
                        `<tr>
                    <td>${data.name}</td>
                    <td>${data.height}</td>
                    <td>${data.mass}</td>
                    <td>${data.hair_color}</td>
                    <td>${data.skin_color}</td>
                    <td>${data.eye_color}</td>
                    <td>${data.birth_year}</td>
                    <td>${data.gender}</td>
               </tr>`);
                }))
    }

}

function nextPage() {
    if (currentPage < 7) {
        currentPage += 1;
        getPlanetsPage(currentPage)
    }
}


function prevPage() {
    if (currentPage > 1) {
        currentPage -= 1;
        getPlanetsPage(currentPage)
    }
}


function getPlanetsPage(currentPage) {
    mainTable.innerHTML = mainHeaders;
    fetch('https://swapi.co/api/planets/?page=' + currentPage)
        .then((response) => response.json())
        .then((data) => {
                let planets = data.results;
                createPage(planets);
            }
        );
}


function createPage(planetsToShow) {
    const nf = new Intl.NumberFormat();
    for (let planet of planetsToShow) {

        mainTable.insertAdjacentHTML('beforeend',
            `<tr><td>${planet.name}</td>
            <td>${nf.format(planet.diameter)} km</td>
            <td>${planet.climate} </td>
            <td>${planet.terrain}</td>
            <td>${(planet.surface_water !== 'unknown') ? `${planet.surface_water}%` : 'Unknown'}</td> 
            <td>${(planet.population === 'unknown') ? 'Unkown' : `${nf.format(planet.population)} people`}</td>           
            <td>${(planet.residents.length > 0) ?
                `<button type='button' class="btn btn-warning" class="btn btn-primary" 
data-toggle="modal" data-target="#residents-modal"   
data-residents=${planet.residents}>${planet.residents.length} resident(s)</button>` : 'No residents'}</td>
                                                                </tr>`);}


        for (let but of resiButtons) {
            but.addEventListener("click", createModal);
        }
    }

    listenAll();
    getPlanetsPage(currentPage);