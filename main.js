let city = 'London';

document.getElementById('searchbtn').addEventListener('click', function() {
    let userSearch = document.getElementById('searchbar').value;
    document.getElementById('cityname').innerText = userSearch;
    city = userSearch.replace(/ /g, ",");
    weather(city);
})

async function weather(city) {
    let apiSearch = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=0df9ff5b6529430a248d9eafbfc8d1a4`
    try {
        const response = await fetch(apiSearch, {mode: 'cors'});
        const weatherJson = await response.json();
        console.log(weatherJson);
        usefulData(weatherJson);
    } catch (err) {
        console.log(err);
    }
}

function usefulData(obj) {
    let forecast = {};
    forecast.temp = kelvinToC(obj.main.temp);
    forecast.timeZone = obj.timezone;
    forecast.weather = obj.weather[0].main;
    forecast.description = capitalise(obj.weather[0].description);
    forecast.wind = obj.wind.speed;
    displayWeather(forecast);
    console.log(forecast);
}

function kelvinToC(kelvin) {
    let celcius = Math.round(kelvin - 273.15);
    return celcius;
}

function capitalise(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayWeather(data) {
    document.getElementById('description').innerText = data.description;
    document.getElementById('temperature').innerText = 'Temperature: ' + data.temp + '°c';
    document.getElementById('wind').innerText = 'Wind speed: ' + data.wind + 'm/s';
}

weather(city);