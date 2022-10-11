
// Begin of modification by Shreya M on Oct 10 2022 for adding Geocoding & NPS API ///    

function getData() {
    var latitude;
    var longitude;

    var newName = document.getElementById("search-bar");
    console.log("new name::"+newName)
    
    fetch('https://api.openweathermap.org/geo/1.0/direct?q=' + newName.value + '&limit=1&appid=7fce6dca761e606465fe67951ea85095')
        .then(response => response.json())
        .then(data => {
            console.log(data)
            var latitude = data[0].lat;
            var longitude = data[0].lon;

            console.log("lat::" + latitude)
            console.log("Lon::" + longitude)


            NPScall(latitude, longitude)

        })
}

async function NPScall(latitude, longitude) {
    // Await expressions make promise-returning functions behave as though they're 
    // synchronous by suspending execution until the returned promise 
    // is fulfilled or rejected. The resolved value of the promise is treated as the return
    //  value of the await expression. Use of async and await enables the use of ordinary try / catch blocks around asynchronous code.
    // As of now  fetch limit is set to 10 parks
      var response =await fetch('https://developer.nps.gov/api/v1/parks?latitude='+latitude+'&longitude='+longitude+'&limit=10&api_key=rezSm4lpwSFY7eCcu9JiJaOp8bxxfzOsYTzKa742')
    
        var parksData = await response.json();
        console.log(parksData.data);
    //    Here we need to grab data to display on page //
    
       
       
    } 

    
    function DefaultScreen() {
        document.getElementById("search-bar").defaultValue = "London";
        getData();
    }
    




//Start of Modification by Silvia Z//

var APIKey = "0dfdd54d395928d4b417913dd112c602";
console.log("hello");
// var formInput = document.querySelector('#search-bar');

// function handleFormClick(event) {
//     event.preventDefault();
    
//     getApi(formInput.value);
//     formInput.value="";
// }

getWeatherApi("44.34","10.99");
function getWeatherApi(latitude, longitude) {
            var requestUrlToday = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" +latitude + "&units=imperial&appid=" + APIKey;
            fetch(requestUrlToday)
                .then(function (response) {
                    return response.json();
                })
                .then(function(todayData) {
                    console.log(todayData);

                    var todayInfo = {
                        Date:moment().format('ll'),
                        Icon:todayData.weather[0].icon,
                        Temp:todayData.main.temp,
                        Wind:todayData.wind.speed,
                        Humidity:todayData.main.humidity
                    }
                    console.log(todayInfo);

                    var requestUrlNextDay ="https://api.openweathermap.org/data/2.5/forecast?lat=" + latitude + "&lon=" + latitude + "&units=imperial&appid=" + APIKey;
                    fetch(requestUrlNextDay)
                        .then(function (response) {
                        return response.json();
                    })
                    .then(function(nextDayData) {
                        console.log(nextDayData);

                    var nextDayInfo = {
                        Date : new Date(nextDayData.list[6].dt*1000).toLocaleDateString("en-US"),
                        Icon :nextDayData.list[6].weather[0].icon,
                        Temp : nextDayData.list[6].main.temp,
                        Wind : nextDayData.list[6].wind.speed,
                        Humidity : nextDayData.list[6].main.humidity,
                    }
                    console.log(nextDayInfo);
                    
                    renderWeatherInfo(todayInfo);
                    renderWeatherInfo(nextDayInfo);
                    })
                })
        };
            
function renderWeatherInfo(weatherInfo){
    var weatherSection = document.querySelector("#weather");
    var weatherDiv = document.createElement('div');

    weatherDiv.classList.add("weather-box");
    weatherDiv.textContent = "";

    var date = document.createElement('div');
    var icon = document.createElement('img');
    var temp = document.createElement('div');
    var wind = document.createElement('div');
    var humidity = document.createElement('div');

    date.classList.add("weatherInfoDiv"); 
    icon.classList.add("weatherIconImg")
    temp.classList.add("weatherInfoDiv");
    wind.classList.add("weatherInfoDiv");
    humidity.classList.add("weatherInfoDiv");

    date.textContent = weatherInfo.Date 
    var a = weatherInfo.Icon;
    icon.src = "https://openweathermap.org/img/w/"+ a + ".png";
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
=======

