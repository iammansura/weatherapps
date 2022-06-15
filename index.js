// Day and time
function dayAndtime(date) {
  let days = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  let day = days[now.getDay()];
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "oct",
    "Nov",
    "Dec",
  ];
  let month = months[now.getMonth()];
  let dates = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  minutes = minutes <= 9 ? "0" + minutes : minutes;

  return `${day}, ${month} ${dates} ${hours}:${minutes}`;
}

let Dates = document.querySelector("#dates");
let now = new Date();
Dates.innerHTML = dayAndtime(now);

// change Temparature

function weatherChange(response) {
  document.querySelector("#cityName").innerHTML = response.data.name;

  let temparature = Math.round(response.data.main.temp);
  let Tamparature = document.querySelector("#Temp");
  Tamparature.innerHTML = `${temparature}°C`;

  let max = Math.round(response.data.main.temp_max);
  let maxTemaparature = document.querySelector("#max");
  maxTemaparature.innerHTML = `${max}°C`;

  let min = Math.round(response.data.main.temp_min);
  let minTemaparature = document.querySelector("#min");
  minTemaparature.innerHTML = `${min}°C`;

  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#weather-descreption").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#country").innerHTML = response.data.sys.country;
}
//search city api
function searchCity(city) {
  let apiKey = "857fbe973ad9987d54d0a62fd2b80055";
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiUrl}?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(weatherChange);
}

// search input city
function searchInputCity(event) {
  event.preventDefault();
  let city = document.getElementById("input").value;
  console.log(city);
  searchCity(city);
}

let searchForm = document.getElementById("form");
searchForm.addEventListener("submit", searchInputCity);

searchCity("Hannover");

// GeoLocation

function searchLocation(position) {
  let apiKey = "857fbe973ad9987d54d0a62fd2b80055";
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let units = "metric";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather";
  let url = `${apiUrl}?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(url).then(weatherChange);
}
//current LOcation

// function currentLocation(event) {
//   event.preventDefault();
//   navigator.geolocation.getCurrentPosition(searchLocation);
// }
let currentinput = document.getElementById("current");
currentinput.addEventListener("click", function handle(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
  this.removeEventListener("click", handle);
});
