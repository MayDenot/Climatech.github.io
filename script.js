// Variables
const api = {
    key: 'f3193ac87d2ffc8a5fa9ee7008c873a4',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}
const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
//const icons = document.getElementById('icon');


// Extracts the information from the api and returns it where it belongs
async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelcius(data.main.temp);
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelcius(data.main.temp_min)} / ${toCelcius(data.main.temp_max)}`;
    } catch (err) {
        console.log(err);
        alert('Hubo un error');
    }
}

// Convert kelvin to celsius
function toCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
}


function onSubmit(event) {
    event.preventDefault();
    search(searchBox.value);
}

const form = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
form.addEventListener('submit', onSubmit, true);

