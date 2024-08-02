const showWeatherBtn = document.getElementById("show-weather");
const showForecastBtn = document.getElementById("show-forecast");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");
const forecastContainer = document.getElementById("forecast-container");
// const container = document.querySelector(".container");

showWeatherBtn.addEventListener("click", showWeather);
showForecastBtn.addEventListener("click", showForecast);

const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";
const URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showWeather() {
  // try {
  const city = cityInput.value;
  const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
  // if (response.ok === false) {
  //   console.log("AJUNGE AICI!");
  //   throw new Error("Serverul este picat");
  //   show404Image();
  //   return;
  // }
  const weather = await response.json();
  console.log(weather);

  const iconCode = weather.weather[0].icon;
  const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weatherContainer.innerHTML = `
    <div class="weather-card">
      <h2>${city}</h2>
      <div class="weather-details">
        <div>
          <img src="${iconImageUrl}" alt="Weather Icon" />
          <p class="weather-desc">${weather.weather[0].description}</p>
        </div>
        <div class="weather-temp">${weather.main.temp} °C</div>
      </div>
      <div class="weather-extra">
        <p>Humidity: ${weather.main.humidity}%</p>
        <p>Pressure: ${weather.main.pressure} hPa</p>
        <p>Maximum temperature of the day: ${weather.main.temp_max} °C</p>
        <p>Minimum temperature of the day: ${weather.main.temp_min} °C</p>
      </div>
    </div>
  `;
  // } catch (error) {
  //   show404Image();
  // }
}

// // Obținerea datelor de prognoză. Se face o cerere la API-ul de prognoză și se stochează datele în variabila 'forecast'
async function showForecast() {
  // try {
  const city = cityInput.value;
  const response = await fetch(`${URL_FORECAST_WEATHER}${city}`);

  // if (response.ok === false) {
  //   throw new Error("Serverul este picat");
  // }
  const forecast = await response.json(); //forecast este obiectul JSON primit ca răspuns de la API-ul de prognoză meteo
  console.log(forecast);

  //forecast.list este o proprietate  obiectului forecast care conține o listă de prognoze,
  //   //   fiecare reprezentând datele meteo pentru un interval specific de timp (în acest caz, din 3 în 3 ore).

  //   // funcție arrow care este apelată pentru fiecare element (item) din forecast.list

  let forecastHTML = "<h2>Forecast for the next few days</h2>";

  forecast.list.forEach((item) => {
    const iconCode = item.weather[0].icon;
    const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    forecastHTML += `
      <div class="forecast-card">
        <div class="forecast-date">${new Date(
          item.dt_txt
        ).toLocaleString()}</div>
        <div class="forecast-details">
          <img src="${iconImageUrl}" alt="Weather Icon" />
          <div>
            <p>Temperature: ${item.main.temp} °C</p>
            <p>Description: ${item.weather[0].description}</p>
          </div>
        </div>
      </div>
    `;
  });

  forecastContainer.innerHTML = forecastHTML;
  // } catch (error) {
  //   show404Image();
  // }
}

// function show404Image() {
//   container.innerHTML = `
//    <img src="https://freefrontend.com/assets/img/html-funny-404-pages/HTML-404-Page-No-Life.png" />
//    `;
// }
