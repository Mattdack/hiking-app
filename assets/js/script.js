
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
    
// End of Modification by Shreya M///////