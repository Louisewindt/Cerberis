// Define your Weather API key and URL
const apiKey = '26de0553398d4f2095c90949240512';
const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=auto:ip`;

// Function to fetch weather data
async function fetchWeather() {
  try {
    // Make the API call
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Error fetching weather data: ${response.status}`);
    }

    // Parse the JSON response
    const data = await response.json();

    // Log the full data to console for debugging
    console.log(data);

    // Extract temperature and round it to the nearest integer
    const temperature = Math.round(data.current.temp_c);
    const iconUrl = data.current.condition.icon;

    // Update the DOM
    document.querySelector(".header__weather-temperature").textContent = `${temperature}°`;
    document.querySelector(".header__weather-icon").src = `https:${iconUrl}`; // Use `https:` for icon URL
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

// Call the function to fetch and display the weather
fetchWeather();
