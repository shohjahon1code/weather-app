const elForm = document.querySelector("form");
const elInput = document.querySelector("input");
const elWeatherInfos = document.querySelector(".wrapper");

const api = {
  key: "df8a12877daf7b1135753032e7b3a859",
  base: "https://api.openweathermap.org/data/2.5/",
};

//first fetch
fetch(`${api.base}weather?q=samarkand&appid=${api.key}`)
  .then((res) => res.json())
  .then((data) => {
    const div = document.createElement("div");
    div.innerHTML = `
      <div class="weather-infos">
        <div class="div-info">
          <h3>${data.name}, </h3>
          <span>${data.sys.country}</span>
        </div>
        <div class="week">
          ${getDate(new Date())}
        </div>
      </div>
      <div class="temp">
        ${Math.round(data.main.temp - 273)}c
      </div>
      <p class="type">${data.weather[0].main}</p>
      `;
    elWeatherInfos.appendChild(div);
  });

function getResults() {
  elWeatherInfos.innerHTML = "";
  fetch(`${api.base}weather?q=${elInput.value}&appid=${api.key}`)
    .then((res) => res.json())
    .then((data) => {
      const div = document.createElement("div");
      div.innerHTML = `
      <div class="weather-infos">
        <div class="div-info">
          <h3>${data.name}, </h3>
          <span>${data.sys.country}</span>
        </div>
        <div class="week">
        ${getDate(new Date())}
        </div>
      </div>
      <div class="temp">
        ${Math.round(data.main.temp - 273)}c
      </div>
      <p class="type">${data.weather[0].main}</p>
      `;
      elWeatherInfos.appendChild(div);
      elInput.value = "";
      if (Math.round(data.main.temp - 273) < 0) {
        document.body.style.background =
          "url(https://thumbs.dreamstime.com/b/first-snow-ground-white-snow-background-word-cold-written-snow-cold-weather-weather-forecast-autumn-winter-spring-159439376.jpg)";
          document.body.style.backgroundRepeat = 'no-repeat'
          document.body.style.backgroundSize = 'cover'
      }else if(Math.round(data.main.temp - 273) > 20){
        document.body.style.background =
          "url(https://cdn.travelsafe-abroad.com/wp-content/uploads/%D0%BF%D1%80%D0%B5%D1%83%D0%B7%D0%B8%D0%BC%D0%B0%D1%9A%D0%B5.jpg)";
          document.body.style.backgroundRepeat = 'no-repeat'
          document.body.style.backgroundSize = 'cover'
      }

      if(data.weather[0].main == 'Rain'){
        document.body.style.background =
        "url(https://wallpaperaccess.com/full/555313.jpg)";
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundSize = 'cover'
      }

      if(data.name == 'Tashkent'){
        document.body.style.background =
        "url(https://www.flydubai.com/en/media/Tashkent-2-2560x960_tcm8-148116.jpg)";
      document.body.style.backgroundRepeat = 'no-repeat'
      document.body.style.backgroundSize = 'cover'
      }
    });
}

/// get date
function getDate(d) {
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

elForm.addEventListener("submit", (e) => {
  e.preventDefault();
  getResults();
});
