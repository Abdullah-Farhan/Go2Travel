import fetch from 'node-fetch';

const apiKey = '6c909dbf06ab4a9392baf56ee1023ef4'; // Replace with your OpenCage API key

function getCityCode(cityName) {
  fetch(`https://api.opencagedata.com/geocode/v1/json?q=${cityName}&key=${apiKey}`)
    .then(response => response.json())  // Ensure you parse the JSON response correctly
    .then(data => {
      if (data.results && data.results[0]) {
        const city = data.results[0].components['ISO_3166-1_alpha-3']; // Extract the city name
        if (city) {
          const cityCode = city.slice(0, 3).toUpperCase(); // Create a 3-char city code
          console.log(`City Code for ${city}: ${cityCode}`);
        } else {
          console.log('City name not found in the results!');
        }
      } else {
        console.log('City not found!');
      }
    })
    .catch(error => console.log(error));
}

// Example usage
getCityCode('New York');
