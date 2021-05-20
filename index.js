//Div principal contenido clima
function divWeatherInfo(json) {
  //Titulo
  const titleEl = document.querySelector(".weather-title-city");
  titleEl.textContent = json.city.name;

  //Imagen
  const logoEl = document.querySelector(".logo-weather");
  const cloud = json.list[0].clouds.all;
  if (cloud < 50) {
    logoEl.src = "src/sol1.png";
  } else {
    logoEl.src = "src/cloud1.png";
  }

  //Grados
  const degreeEl = document.querySelector(".wather-degrees");
  const round = Math.round(json.list[0].main.temp);
  degreeEl.textContent = round + "°C";
}

//Divs abajo items
function itemWeather(json, item) {
  const template = document.querySelector(".template-day-after");
  const container = document.querySelector(".content-days-after");
  //Grados
  const round = Math.round(json[item].main.temp);
  template.content.querySelector(".day-degrees").textContent = round + "°C";

  //Imagen
  const clouds = json[item].clouds.all;
  if (clouds < 50) {
    template.content.querySelector(".logo-day").src = "src/sol1.png";
  } else {
    template.content.querySelector(".logo-day").src = "src/cloud1.png";
  }

  //Fecha
  const arrayCortado = json[item].dt_txt.split(" ")[0];
  const resuArray = arrayCortado.split("-").reverse();
  const day = resuArray[0] + "/" + resuArray[1];
  template.content.querySelector(".day-date").textContent = day;

  //Clonar
  var clone = document.importNode(template.content, true);
  container.appendChild(clone);
}

function getDataWeather(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=30d058d11c526c857ca0474cca542f93`
  )
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      divWeatherInfo(json);
      const arrayDays = [5, 13, 21];
      document.querySelector(".content-days-after").innerHTML = "";
      arrayDays.forEach((item) => {
        itemWeather(json.list, item);
      });
    });
}

function main() {
  const searchElement = document.querySelector(".search-form");
  const buttonElement = document.querySelector(".search-button");

  searchElement.addEventListener("submit", (event) => {
    event.preventDefault();
    const citySearch = event.target.search.value;
    getDataWeather(citySearch);
  });
}

main();
