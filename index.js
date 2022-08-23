const form = document.querySelector('.search');    
const search = document.querySelector('.search-bar');
const city = document.querySelector('.city');
const iconSky = document.querySelector('.icon');
const describe = document.querySelector('.description');
const temperature = document.querySelector('.temp');
const feels = document.querySelector('.feels');
const humid = document.querySelector('.humidity');
const wind = document.querySelector('.wind');
const weather = document.querySelector('.weather');
const body = document.querySelector('body');

const fetchWeather = async (city) => {
    const apiKey = '3be589838614012e021a46e45cc3ed0c';
    const baseUrl = 'https://api.openweathermap.org/data/2.5/weather?';

    return await axios.get(`${baseUrl}q=${city}&units=metric&appid=${apiKey}`).then(response => response.data);

    if(!response.ok) {
        // Notify.warning('No weather found');
        throw new Error ('No weather found');
    };
};

async function onSearchForm (e) {
    e.preventDefault();
    const query = search.value;
    // if (query === '') {
    //     Notiflix.Notify.warning('No weather found');
    //     return;
    // };

    const data = await fetchWeather(query);

    const {name} = data;
    const { icon, description } = data.weather[0];
    const { temp, feels_like, humidity} = data.main;
    const {speed} = data.wind;

    city.textContent = `Weather in ${name}`;
    iconSky.src = 'https://openweathermap.org/img/wn/' + icon + '.png';
    describe.textContent = description;
    temperature.textContent = Math.round(temp) + "°C";
    feels.textContent ='Feels like: ' + Math.round(feels_like) + "°C";
    humid.textContent = 'Humidity: ' + humidity + '%';
    wind.textContent = 'Wind speed: ' + speed + ' km/h';
    weather.classList.remove('loading');
    body.style.backgroundImage = `url('https://source.unsplash.com/1600x900/?${name}'`;
};

form.addEventListener('submit', onSearchForm);
document.querySelector('.search button').addEventListener('click', onSearchForm);

