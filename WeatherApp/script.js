const searchBar = document.querySelector(".searchBar");
const cityInput = document.getElementById("cityInput");
const card = document.querySelector(".card");
const apiKey = "f28ef6a0f5726de59138d28703f8f961";

searchBar.addEventListener("submit", async event => {
    event.preventDefault();

    let city = cityInput.value;

    if(city) {
        try {
            const weatherData = await getWeatherData(city);
            displayWeatherData(weatherData);
        }
        catch(error) {
            displayError(error);
        }
    }
    else {
        displayError("Please enter a city!");
    }
});

async function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
        displayError("Could not fetch weather data!");
    }

    return await response.json();
}

function displayWeatherData(data) {
    const cityLbl = document.createElement("h1");
    const tempLbl = document.createElement("h1");
    const humidityLbl = document.createElement("p");
    const descLbl = document.createElement("p");
    const emojiLbl = document.createElement("img");

    cityLbl.id = "cityLbl";
    tempLbl.id = "tempLbl";
    humidityLbl.id = "humidityLbl";
    descLbl.id = "descLbl";
    emojiLbl.id = "emojiLbl";

    cityLbl.textContent = `${data.name}`;
    tempLbl.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
    humidityLbl.textContent = `Humidity: ${data.main.humidity}%`;
    descLbl.textContent = `${(data.weather[0].description)}`;
    descLbl.style.textTransform = "Capitalize";
    emojiLbl.src = `./Resources/${getWeatherEmoji(data.weather[0].id)}`;
    emojiLbl.alt = `${descLbl.textContent} image`;

    card.textContent = "";
    card.style.display = "flex";
    card.appendChild(cityLbl);
    card.appendChild(tempLbl);
    card.appendChild(humidityLbl);
    card.appendChild(descLbl);
    card.appendChild(emojiLbl);
}

function getWeatherEmoji(id) {
    switch (true) {
        case (id >= 200  && id <= 232):
            return '11d.png';
        case (id >= 300  && id <= 321):
            return '09d.png';
        case (id >= 500 && id <= 504):
            return '10d.png';
        case (id == 511):
            return '13d.png';
        case (id >= 520 && id <= 531):
            return '09d.png';
        case (id >= 600 && id <= 622):
            return '13d.png';
        case (id >= 701 && id <= 781):
            return '50d.png';
        case (id == 800):
            return '01d.png';
        case (id == 801):
            return '02d.png';
        case (id == 802):
            return '03d.png';
        case (id == 803 || id == 804):
            return '04d.png';
    }
}   

function displayError(msg) {
    const errorLbl = document.createElement("h1");
    errorLbl.id = "errorLbl";
    errorLbl.textContent = msg;
    card.style.display = "flex";
    card.textContent = "";
    card.appendChild(errorLbl);
}