async function getWeather(city) {
  const cityName = document.getElementById("city-name");
  const temperature = document.getElementById("temperature");
  const description = document.getElementById("description");
  const errorMessage = document.getElementById("error-message");

  cityName.textContent = "Loading.....";
  errorMessage.textContent = "";

  try {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const data = await response.json();

    const current = data.current_condition?.[0];
    if (!current) throw new Error("City not found");

    cityName.textContent = city;
    temperature.textContent = `${current.temp_C} °C`;
    description.textContent = current.weatherDesc?.[0]?.value || "Weather data available";
  } catch (error) {
    console.error(error);
    cityName.textContent = "Error";
    errorMessage.textContent = error.message;
  }
}

document.querySelector("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const city = document.getElementById("city-input").value.trim();
  if (city) {
    getWeather(city);
  }
});

getWeather("London");

