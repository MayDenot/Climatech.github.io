const api = {
    key: 'f3193ac87d2ffc8a5fa9ee7008c873a4',
    url: 'https://api.openweathermap.org/data/2.5/weather'
}
const city = document.getElementById('city');
const date = document.getElementById('date');
const temp = document.getElementById('temp');
const weather = document.getElementById('weather');
const range = document.getElementById('range');
const icon = document.getElementById('icon');
const gust = document.getElementById('gust');
const speed = document.getElementById('speed');
const humidity = document.getElementById('humidity');
const pressure = document.getElementById('pressure');


async function search(query) {
    try {
        const response = await fetch(`${api.url}?q=${query}&appid=${api.key}&lang=es`);
        const data = await response.json();
        console.log(data);

        city.innerHTML = `${data.name}, ${data.sys.country}`;
        date.innerHTML = (new Date()).toLocaleDateString();
        temp.innerHTML = toCelcius(data.main.temp) + "<sup>°C<sup>";
        weather.innerHTML = data.weather[0].description;
        range.innerHTML = `${toCelcius(data.main.temp_min)}°C / ${toCelcius(data.main.temp_max)}°C`;
        icon.innerHTML = `<img src="http://openweathermap.org/img/wn//${data.weather[0].icon}@4x.png">`;
        gust.innerHTML = `Ráfaga: <span>${toKilometersPerHour(data.wind.gust)} Km/h</span>`;
        speed.innerHTML = `Velocidad: <span>${toKilometersPerHour(data.wind.speed)} Km/h</span>`;
        humidity.innerHTML = data.main.humidity + ` %`;
        pressure.innerHTML = data.main.pressure + ` hPa`;
    } catch (err) {
        console.log(err);
        alert('Hubo un error, revise si escribió bien su lugar');
    }
};

function toCelcius(kelvin) {
    return Math.round(kelvin - 273.15);
}

function toKilometersPerHour(km) {
    return Math.round(km * 3.6);
}

const wrapperCards = document.querySelectorAll(".wr-cards");
const form = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
form.addEventListener('submit', onSubmit, true);

function onSubmit(event) {
    event.preventDefault();
    search(searchBox.value);
    
    for (var i = 0; i < wrapperCards.length; i++) {
        wrapperCards[i].classList.add("init");
    }
}

const btnTheme = document.querySelector("#switch");
const sectionBg = document.querySelector("#s1");

btnTheme.addEventListener("click", () => {
    sectionBg.classList.toggle("darkmode");
})

