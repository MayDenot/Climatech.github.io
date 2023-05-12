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
const deg = document.getElementById('deg');
const gust = document.getElementById('gust');
const speed = document.getElementById('speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');
let icon = document.getElementById('icon');

// NOTAS PARA MEJORAR LA PAGINA
// HACER QUE ANTES DE QUE PONGAN EL LUGAR A BUSCAR, HAYA VISTA PREVIA DE ALGO EN LAS GRILLAS O QUE LA GRILLA
// SE RESPONDA AUTOMATICAMENTE SEGUN DONDE ESTE EL USUARIO CON EL IP, Y PONER DIRECTAMENTE EL CLIMA DE ESA CIUDAD.
// CONDICION EN EL QUE SI APARECE ALGUN DATO COMO INDEFINIDO O NAN, DIRECTAMENTE NO APAREZCA

// Extracts the information from the api and returns it where it belongs
async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);

        // General forecast grid
        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelcius(data.main.temp) +"<sup>°C<sup>";
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelcius(data.main.temp_min)}°C / ${toCelcius(data.main.temp_max)}°C`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn//${data.weather[0].icon}@4x.png">`;
        // Daily forecast grid

        // Wind, Pressure and Humidity forecast grid
        deg.innerHTML = `Grado: <span>${toKilometersPerHour(data.wind.deg)} Km/h</span>`;
        gust.innerHTML = `Ráfaga: <span>${toKilometersPerHour(data.wind.gust)} Km/h</span>`;
        speed.innerHTML = `Velocidad: <span>${toKilometersPerHour(data.wind.speed)} Km/h</span>`;
        humidity.innerHTML = data.main.humidity + ` %`;
        pressure.innerHTML = data.main.pressure + ` hPa`;
    } catch (err) {
        console.log(err);
        alert('Hubo un error');
    }
}

// Convert Kelvin to Celsius
function toCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
}

// Convert m/s to Km/h
function toKilometersPerHour(km) {
    return Math.round(km * 3.6);
}

// Functions and variables to search for the city
function onSubmit(event) {
    event.preventDefault();
    search(searchBox.value);
}
const form = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
form.addEventListener('submit', onSubmit, true);

// Function for the carousel, its size, quantity and buttons
var swiper = new Swiper(".swiper", {
    slidesPerView: 3,
    spaceBetween: 30,
    spacePerGroup: 3,
    loop: true,
    loopFillGroupWithBlank: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true,
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    //Breakpoints for the carousel
    breakpoints: {
        0: {
            slidesPerView: 1,
        },
        700: {
            slidesPerView: 1,
        },
        850: {
            slidesPerView: 1,
        },
        1000: {
            slidesPerView: 2,
        },
        1250: {
            slidesPerView: 3,
        }
    }
});