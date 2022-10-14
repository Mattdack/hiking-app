// Begin of modification by Shreya M on Oct 10 2022 for adding Geocoding & NPS API ///
var totalSearch;
var mapFrameEl = document.getElementById("map-frame");
var newName = document.getElementById("search-bar");
var searchResultsEl = document.getElementById("search-results");
var directionsEl = document.getElementById("directions-div");
var hideMapEl = document.getElementById("hideMap");

function init() {
  var options = {
    types: ["(cities)"],
    componentRestrictions: { country: "us" },
  };
  var userEntry = document.getElementById("search-bar");

  new google.maps.places.Autocomplete(userEntry, options);
}

google.maps.event.addDomListener(window, "load", init);

function getData() {
  var latitude;
  var longitude;

  totalSearch = newName.value;
  console.log("new name::" + newName.value);

  fetch(
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
      newName.value +
      "&limit=1&appid=7fce6dca761e606465fe67951ea85095"
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      latitude = data[0].lat;
      longitude = data[0].lon;

      console.log("lat::" + latitude);
      console.log("Lon::" + longitude);

      NPScall();

      // Silvia Z add getWeatherApi function
      getWeatherApi(latitude, longitude);
    });
}

function NPScall() {
  var searchBardata = document.getElementById("search-bar");
  console.log("new name::" + searchBardata.value);
  // to get state code via google API///
  // var sampleLocation = "Boston, MA, USA";
  var resLocation = searchBardata.value.split(",");
  console.log(resLocation);
  console.log(resLocation[1].replace(/,/g, ""));
  var stateCode = resLocation[1].replace(/,/g, "");
  var stateCodeLower = stateCode.toLowerCase();
  var sc = stateCodeLower.trim();
  console.log("StateCode:" + sc);
  var apiKey1 = "rezSm4lpwSFY7eCcu9JiJaOp8bxxfzOsYTzKa742";
  // console.log("https://developer.nps.gov/api/v1/parks?stateCode=" + stateCodeLower + "&limit=10&api_key="+ apiKey1)
  var requestUrlNPS =
    "https://developer.nps.gov/api/v1/parks?stateCode=" +
    sc +
    "&limit=10&api_key=" +
    apiKey1;
  fetch(requestUrlNPS)
    //
    .then((response) => response.json())
    .then((parksData) => {
        console.log(parksData)
      const products = parksData.data;
      //Silvia Z added- clear the last search info
      let getPrincipalContainer = document.getElementById("search-results");
      getPrincipalContainer.textContent = "";
      // Silvia Z added - end

      for (let item in products) {
        /*Implementation - Card*/
        let createCard = document.createElement("div");
        createCard.className = "product-card";
        getPrincipalContainer.append(createCard);

        /*Implementing Names of the park and map */
        let createNameAndDirection = document.createElement("div");
        createNameAndDirection.className = "name-direction";

        let createName = document.createElement("a");
        createName.className = "card-title";
        createName.innerText = parksData.data[item].fullName;
        //  Sivlia Z- done - make the title is clickable
        createName.href = parksData.data[item].url;
        createName.target = "_blank";
        createNameAndDirection.appendChild(createName);

        //MD Link to directions and Map
        let linkToMap = document.createElement("a");
        linkToMap.textContent = "Directions";
        linkToMap.className = "linkToMap";
        linkToMap.setAttribute("href", "#directions-div");

        createNameAndDirection.appendChild(linkToMap);

        createCard.appendChild(createNameAndDirection);

        /*Implémentation de l'img - IMG*/

        let imgAndListSec = document.createElement("div");
        imgAndListSec.className = "img-list";

        let createImg = document.createElement("img");
        createImg.className = "card-img-top";
        createImg.src = parksData.data[item].images[0].url;
        imgAndListSec.appendChild(createImg);

        /*Implementing Activities Section*/

        var allAct = parksData.data[item].activities;
        console.log(allAct);
        let createActivitySec = document.createElement("div");
        createActivitySec.className = "park-activity-div";
        for (var i = 0; i < allAct.length; i++) {
          let createPrice = document.createElement("li");
          let currentAct = allAct[i].name;
          console.log(currentAct);
          createPrice.className = "park-activities";
          createPrice.innerHTML = currentAct;
          createActivitySec.appendChild(createPrice);
        }
        imgAndListSec.appendChild(createActivitySec);

        createCard.appendChild(imgAndListSec);

        /*Implementing Links- Link to National parks*/
        let createLink = document.createElement("a");
        createLink.className = "product-sheet-link";
        //Silvia Z  make the link ckiclkable
        createLink.innerHTML = parksData.data[item].url;
        createLink.href = parksData.data[item].url;
        createLink.target = "_blank";
        createCard.appendChild(createLink);
      }
    });
}

//Start of Modification by Silvia Z//

var APIKey = "0dfdd54d395928d4b417913dd112c602";

function getWeatherApi(latitude, longitude) {
  var requestUrlToday =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    latitude +
    "&lon=" +
    longitude +
    "&units=imperial&appid=" +
    APIKey;
  fetch(requestUrlToday)
    .then(function (response) {
      return response.json();
    })
    .then(function (todayData) {
      var todayInfo = {
        Date: moment().format("ll"),
        Icon: todayData.weather[0].icon,
        Temp: todayData.main.temp,
        Wind: todayData.wind.speed,
        Humidity: todayData.main.humidity,
      };

      var requestUrlNextDay =
        "https://api.openweathermap.org/data/2.5/forecast?lat=" +
        latitude +
        "&lon=" +
        latitude +
        "&units=imperial&appid=" +
        APIKey;
      fetch(requestUrlNextDay)
        .then(function (response) {
          return response.json();
        })
        .then(function (nextDayData) {
          var nextDayInfo = {
            Date: new Date(nextDayData.list[6].dt * 1000).toLocaleDateString(
              "en-US"
            ),
            Icon: nextDayData.list[6].weather[0].icon,
            Temp: nextDayData.list[6].main.temp,
            Wind: nextDayData.list[6].wind.speed,
            Humidity: nextDayData.list[6].main.humidity,
          };
          console.log(nextDayInfo);

          var weatherSection = document.querySelector("#weather");
          weatherSection.textContent = "";
          renderWeatherInfo(todayInfo);
          renderWeatherInfo(nextDayInfo);
        });
    });
}

function renderWeatherInfo(weatherInfo) {
  var weatherSection = document.querySelector("#weather");

  var weatherDiv = document.createElement("div");
  weatherDiv.textContent = "";
  weatherDiv.classList.add("weather-box");

  var date = document.createElement("div");
  var icon = document.createElement("img");
  var temp = document.createElement("div");
  var wind = document.createElement("div");
  var humidity = document.createElement("div");

  date.classList.add("weatherInfoDiv");
  icon.classList.add("weatherIconImg");
  temp.classList.add("weatherInfoDiv");
  wind.classList.add("weatherInfoDiv");
  humidity.classList.add("weatherInfoDiv");

  date.textContent = weatherInfo.Date;
  var a = weatherInfo.Icon;
  icon.src = "https://openweathermap.org/img/w/" + a + ".png";
  temp.textContent = "Temp: " + weatherInfo.Temp + "°F";
  wind.textContent = "Wind: " + weatherInfo.Wind + " MPH";
  humidity.textContent = "Humidity: " + weatherInfo.Humidity + " %";

  weatherDiv.append(date);
  weatherDiv.append(icon);
  weatherDiv.append(temp);
  weatherDiv.append(wind);
  weatherDiv.append(humidity);

  weatherSection.append(weatherDiv);
}

//End of Modification by Silvia Z//

//  MD updating map on click
searchResultsEl.addEventListener("click", function (event) {
  if (event.target.className === "linkToMap") {
    var startingLocationURL = totalSearch
      .replaceAll(",", "")
      .split(" ")
      .join("+");
    var destinationURL = event.target.parentNode.firstChild.innerText
      .split(" ")
      .join("+");
    mapFrameEl.setAttribute(
      "src",
      "https://www.google.com/maps/embed/v1/directions?key=AIzaSyB-W00dYSoIRqw5cgM-5x2sM42iO_LSBQo&origin=" +
        startingLocationURL +
        "&destination=" +
        destinationURL +
        "&avoid=tolls"
    );
    directionsEl.style.display = "block";
  }
});

hideMapEl.addEventListener('click', function (event) {
    directionsEl.style.display = "none";
})
