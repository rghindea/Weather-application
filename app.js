const showWeatherBtn = document.getElementById("show-weather");
const showForecastBtn = document.getElementById("show-forecast");
const cityInput = document.getElementById("city");
const weatherContainer = document.getElementById("weather-container");
const forecastContainer = document.getElementById("forecast-container");

showWeatherBtn.addEventListener("click", showWeather);
showForecastBtn.addEventListener("click", showForecast);

const URL_CURRENT_WEATHER =
  "https://api.openweathermap.org/data/2.5/weather?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

const URL_FORECAST_WEATHER =
  "https://api.openweathermap.org/data/2.5/forecast?appid=69518b1f8f16c35f8705550dc4161056&units=metric&q=";

async function showWeather() {
  const city = cityInput.value;
  const response = await fetch(`${URL_CURRENT_WEATHER}${city}`);
  const weather = await response.json();
  console.log(weather);

  const iconCode = weather.weather[0].icon;
  const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

  weatherContainer.innerHTML = `
  <div>
<img src = ${iconImageUrl} />
<p> Descriere: ${weather.weather[0].description} </p>
<p> Umiditate: ${weather.main.humidity} </p>
<p> Presiune: ${weather.main.pressure} </p>
<p> Temperatura curenta: ${weather.main.temp} </p>
<p> Maxima zilei: ${weather.main.temp_max} </p>
<p> Minima zilei: ${weather.main.temp_min} </p>


  </div>
  `;
}

// Obținerea datelor de prognoză. Se face o cerere la API-ul de prognoză și se stochează datele în variabila 'forecast'
async function showForecast() {
  const city = cityInput.value;
  const response = await fetch(`${URL_FORECAST_WEATHER}${city}`);
  const forecast = await response.json(); //forecast este obiectul JSON primit ca răspuns de la API-ul de prognoză meteo
  console.log(forecast);

  //   // Afisarea prognozei pe 6 zile din 3 in 3 ore

  //forecast.list este o proprietate a acestui obiect (forecast) care conține o listă de prognoze,
  //   fiecare reprezentând datele meteo pentru un interval specific de timp (în acest caz, din 3 în 3 ore).

  // funcție arrow care este apelată pentru fiecare element (item) din forecast.list

  let forecastHTML = "<h2>Prognoza pe următoarele zile (din 3 în 3 ore)</h2>";

  forecast.list.forEach((item) => {
    const iconCode = item.weather[0].icon;
    const iconImageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;
    forecastHTML += `
        <div>
          <h4>${new Date(item.dt_txt).toLocaleString()}</h4>
          <img src=${iconImageUrl} />
          <p> Temperatura: ${item.main.temp} °C </p>
          <p> Descriere: ${item.weather[0].description} </p>
          
        </div>
      `;
  });
  forecastContainer.innerHTML = forecastHTML;
}
