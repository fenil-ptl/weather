require('dotenv').config();
const apiKey = process.env.API_KEY; // Replace with your actual API key
const cityInput = document.getElementById('city-input');
const getWeatherBtn = document.getElementById('get-weather-btn');
const weatherIcon = document.getElementById('weather-icon');
const temperature = document.getElementById('temperature');
const locationElement = document.getElementById('location');
const condition = document.getElementById('condition');
const windSpeed = document.getElementById('wind-speed');

const Key=process.env.apiKey;
getWeatherBtn.addEventListener('click', async () => {
  const cityName = cityInput.value.trim();
  if (!cityName) {
    alert('Please enter a city name');
    return;
  }

  const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}&aqi=yes`;
console.log(apiUrl)
  try {
    const response = await fetch(apiUrl);
    const weatherData = await response.json();

    if (weatherData.error) {
      alert(weatherData.error.message);
      return;
    }

    const location = weatherData.location.name;
    const temperatureC = weatherData.current.temp_c;
    const weatherCondition = weatherData.current.condition.text;
    const windSpeed = weatherData.current.wind_kph;
    const iconCode = weatherData.current.condition.icon.split('/')[1].split('.')[0]; // Extract icon code

    locationElement.textContent = `Location: ${location}`;
    temperature.textContent = `${temperatureC}°C`;
    condition.textContent = `Condition: ${weatherCondition}`;
    windSpeed.textContent = `Wind Speed: ${windSpeed} km/h`;

    // Set weather icon based on icon code
    weatherIcon.classList.add(`fa-${iconCode}`); 

  } catch (error) {
    console.error(error);
    alert('Error fetching weather data');
  }
});