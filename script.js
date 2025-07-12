async function getWeather() {
  const city = document.getElementById('cityInput').value.trim();
  const output = document.getElementById('weatherOutput');

  if (!city) {
    output.innerHTML = "<p>Please enter a city name.</p>";
    return;
  }

  const apiKey = '62b27f79848d4cae8b673437251207'; // Make sure this key is active!
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

  output.innerHTML = "<p>Loading weather data...</p>";

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('City not found');

    const data = await response.json();
    const { location, current } = data;

    output.innerHTML = `
      <h2>${location.name}, ${location.country}</h2>
      <p><strong>Temperature:</strong> ${current.temp_c}°C</p>
      <p><strong>Condition:</strong> ${current.condition.text}</p>
      <img src="${current.condition.icon}" alt="${current.condition.text}" />
    `;
  } catch (error) {
    output.innerHTML = `<p>Error: ${error.message}</p>`;
  }
}
