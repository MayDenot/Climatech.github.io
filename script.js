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
let iconoAnimado = document.getElementById('icono-animado');

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

        //Icons dinamics 
        /*
        switch (data.weather[0].main) {
            case 'Thunderstorm':
                iconoAnimado.src='animated/thunder.svg'
                console.log('TORMENTA');
                break;
            case 'Drizzle':
                iconoAnimado.src='animated/rainy-2.svg'
                console.log('LLOVIZNA');
                break;
            case 'Rain':
                iconoAnimado.src='animated/rainy-7.svg'
                console.log('LLUVIA');
                break;
            case 'Snow':
                iconoAnimado.src='animated/snowy-6.svg'
                console.log('NIEVE');
                break;                        
            case 'Clear':
                iconoAnimado.src='animated/day.svg'
                console.log('LIMPIO');
                break;
            case 'Atmosphere':
                iconoAnimado.src='animated/weather.svg'
                console.log('ATMOSFERA');
                break;  
            case 'Clouds':
                iconoAnimado.src='animated/cloudy-day-1.svg'
                console.log('NUBES');
                break;  
            default:
                iconoAnimado.src='animated/cloudy-day-1.svg'
                console.log('por defecto');
            } */
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

