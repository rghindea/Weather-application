const showWeatherBtn = document.getElementById("show-weather");
const cityInput = document.getElementById("city");

showWeatherBtn.addEventListener("click", showWeather);

async function showWeather() {
  const city = cityInput.value;
  console.log(city);
}
