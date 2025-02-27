// Function to fetch weather information based on user input city
function GetInfo() {
  // Get the user input city name
  let newName = document.getElementById("cityInput");
  // Get the element to display city name
  let cityName = document.getElementById("cityName");
  // Update the city name display

  cityName.innerHTML = "--" + newName.value + "'s Weather Forecast for 14 Days--";

  // Fetch weather forecast data from OpenWeatherMap API
  fetch('https://api.openweathermap.org/data/2.5/forecast?q=' + newName.value + '&appid=f3bccd92614e286c8bc5cf00d57d1618')
      .then(response => response.json())
      .then(data => {
          // Extract data for day one
          let dayOneData = data.list[0];

          // Populate today_weather div with day one data
          let todayWeatherDiv = document.getElementById("today_weather");
          todayWeatherDiv.innerHTML = `
              <div class="weatherSpecialToday">
                  <center>
                  <h3>Today's Weather</h3>
                  <div class="minValues">Min: ${Number(dayOneData.main.temp_min - 273.15).toFixed(1)}°</div>
                  <div class="maxValues">Max: ${Number(dayOneData.main.temp_max - 273.15).toFixed(2)}°</div>
                  <div class="precipitationValue">Precipitation: ${Math.ceil(Number(dayOneData.pop) * 100)}%</div>
                  <div class="windVelocity">Wind Velocity: ${Number(dayOneData.wind.speed)} meter per second</div>
                  <img class="imgClass" src="http://openweathermap.org/img/wn/${dayOneData.weather[0].icon}.png">
                  </center>
              </div>
          `;

          // Populate weather forecast for the upcoming days
          for (let i = 0; i < 14; i++) {
              document.getElementById("day" + (i + 1) + "Min").innerHTML = "Min: " + Number(data.list[i].main.temp_min - 273.15).toFixed(1) + "°";
              document.getElementById("day" + (i + 1) + "Max").innerHTML = "Max: " + Number(data.list[i].main.temp_max - 273.15).toFixed(2) + "°";
              document.getElementById("day" + (i + 1) + "Precip").innerHTML = "Precipitation: " + Math.ceil(Number(data.list[i].pop) * 100) + "%";
              document.getElementById("day" + (i + 1) + "Wind").innerHTML = "Wind Velocity: " + Number(data.list[i].wind.speed) + "meter per second";
              document.getElementById("img" + (i + 1)).src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
          }
      })
      .catch(err => alert("Something Went Wrong: Try Checking Your Internet Connection"));
}

// Function to set default city and fetch weather info on page load
function DefaultScreen() {
  document.getElementById("cityInput").defaultValue = "";
  GetInfo();
}

// Array to store names of days of the week
let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Function to get the correct index of the days array
function CheckDay(day) {
  return (day + d.getDay()) % 7;
}

// Populate forecast dates for the upcoming days
for (let i = 0; i < 14; i++) {
  let forecastDate = new Date();
  forecastDate.setDate(forecastDate.getDate() + i); // Increment the date by i days
  let fullDate = forecastDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }); // Get the full date
  document.getElementById("day" + (i + 1)).innerHTML = fullDate;
}
