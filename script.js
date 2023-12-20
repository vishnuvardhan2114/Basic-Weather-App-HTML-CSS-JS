const apiKey = "f03eddeeba23570a2018ff70af8cb073";

const weatherEl = document.getElementById("weather-data");
const cityInputEl = document.getElementById("city-input");

const formEl = document.querySelector("form");

if (formEl) {
    formEl.addEventListener('submit' , (event) => {
        event.preventDefault();
        const cityValue = cityInputEl.value;
        getWeatherData(cityValue);
    });
}else{
    console.log("element not found")
}

async function getWeatherData(cityValue) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${apiKey}&units=metric`)

        if (!response.ok) {
            throw new Error("Network response was poor")
        }
        const data = await response.json()
        
        const temperature = Math.round(data.main.temp)
        const description =data.weather[0].description
        const icon = data.weather[0].icon
        
        const details = [
            `Feels Like: ${Math.round(data.main.feels_like)} °C`,
            `Humidity: ${data.main.humidity} %`,
            `Wind Speed: ${data.wind.speed} m/s`,
        ]

        weatherEl.querySelector(".icon").innerHTML = ` <img src="http://openweathermap.org/img/wn/${icon}.png " alt="Weather Icon">`

        weatherEl.querySelector(".temperature").textContent = `${temperature}°C`
        weatherEl.querySelector(".description").textContent = `${description}`
        weatherEl.querySelector(".details").innerHTML = 
           details.map((detail) =>  `<div>${detail}</div>`).join("");
    } catch (error) {
        weatherEl.querySelector(".icon").innerHTML = ""

        weatherEl.querySelector(".temperature").textContent = ""
        weatherEl.querySelector(".description").textContent = " Please,Check your city name !!"
        weatherEl.querySelector(".details").innerHTML = 
          "";
    }
}

