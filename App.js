const api = {
  key: "e0d47e0c05eeef3be42132797ddfe57c",
  base: "api.openweathermap.org/data/2.5/",
};

const searchbox = document.querySelector(".searchbox");
const submit = document.querySelector(".submit");
const error = document.querySelector(".error");

submit.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.type == "click") {
    getResults(searchbox.value);
  }
  setTimeout(() => {
    error.innerText = "";
  }, 2000);
});

const getResults = async (query) => {
  const error = document.querySelector(".error");

  try {
    let res = await fetch(`${api.base}weather?q=${query}&APPID=${api.key}`);
    let data = await res.json();
    displayResults(data);
  } catch (err) {
    if (err) return getError(err);
  }
};

const displayResults = (weather) => {
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBui;
  lder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `${Math.round(weather.main.temp_min)}°c / ${Math.round(
    weather.main.temp_max
  )}°c`;
};

function dateBuilder(d) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
const getError = (err) => {
  const error = document.querySelector(".error");
  error.innerText = err;
};
