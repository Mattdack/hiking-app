var myForm = document.getElementById('myForm');
var subBtn = document.getElementById('SuBtn');
var cityName = document.getElementById("cityState");
var parkName = document.getElementById("nPark");
var rating = document.getElementById("rating");
var description = document.getElementById("description");

renderSummaryInfo();

function showSummaryInfo(){
    var allHistory;
    if (localStorage.getItem("history") === null) {
        allHistory = [];
    } else {
        allHistory = JSON.parse(localStorage.getItem("history"));
    }
    var singleInfo = {
        "cityName":cityName.value,
        "parkName":parkName.value,
        "rating":rating.value,
        "description":description.value
    }
    allHistory.push(JSON.stringify(singleInfo));
    localStorage.setItem("history", JSON.stringify(allHistory));
    myForm.reset();
    renderSummaryInfo();
}

function renderSummaryInfo(){
    if (localStorage.getItem("history") === null) {
        return;
    } else {
        var inSummaryInfo = document.querySelector("#myDynamicTable");
        inSummaryInfo.textContent = "";
        var getHistoryOut = JSON.parse(localStorage.getItem("history"));
        for (var i = 0; i < getHistoryOut.length; i++) {
            var placeInfo = document.createElement('div');
            var hikingSummary = JSON.parse(getHistoryOut[i]);
            placeInfo.classList.add("placeList");

            placeInfo.textContent = 'City/State: ' + hikingSummary.cityName + 
            ', Park Name: ' + hikingSummary.parkName + ', Rating: ' +
            hikingSummary.rating + ', Notes: ' + hikingSummary.description +
            '.';
            inSummaryInfo.append(placeInfo);
        }
    }
}

subBtn.addEventListener("click", showSummaryInfo);

// //==============
// var taskArray = [];
// var myForm = document.querySelector("form#myForm");

// myForm.onsubmit = function () {
//     const data = {};
//     const dataToFetch = this.querySelectorAll("input, textarea, button, select");

//     for (let element of dataToFetch) {

//         if (element && element.tagName && element.name)
//             data[element.name] = element.value;

//     }
//     taskArray.push(data)
//     console.log(taskArray)
//     let jsonData = JSON.stringify(taskArray);
//     console.log(jsonData)

//     localStorage.setItem("formData", jsonData);
//     return false;
// }

// const btnSubmit = document.getElementById('SuBtn');

// btnSubmit.addEventListener('click', function handleClick(event) {
//     // 👇️ if you are submitting a form (prevents page reload)
//     event.preventDefault();

//     const firstNameInput = document.getElementById('citySate');
//     const firstNameInput2 = document.getElementById('nPark');
//     const firstNameInput3 = document.getElementById('rating');
//     const firstNameInput4 = document.getElementById('discription');

//     // Send value to server
//     console.log(firstNameInput.value);

//     // 👇️ clear input field
//     firstNameInput.value = '';
//     firstNameInput2.value = '';
//     firstNameInput3.value = '';
//     firstNameInput4.value = '';
// });


// $(document).ready(function () {
//         // Read and parse from localStorage
//         if (localStorage.getItem("formData")) {
//             var formDatap = JSON.parse(localStorage.getItem('formData'));

//             // Iterate through array, and set HTML of matching <span> element
//             $.each(formDatap, function (i, datum) {
//                 //   $('#myDynamicTable' + datum.name).html(datum.value);
//                 console.log(datum.nPark)

//                 let myTableDiv = document.getElementById("myDynamicTable");
//                 // let getPrincipalContainer = document.getElementById("search-results");
//                 let createStorage = document.createElement("div")
//                 createStorage.className = 'product-card1';
//                 myTableDiv.append(createStorage)

//                 let createCard = document.createElement("div")
//                 let createName = document.createElement("a")
//                 createName.className = "card-title1"
//                 // createName.innerText = "State:"+contents.citySate+ " Visited:"+contents.nPark + " ratings given:"+contents.rating+" Discription:"+contents.discription
//                 createName.innerText = `City: ${datum.citySate}, Visited:${datum.nPark}
//         ratings given:${datum.rating}
//         Discription:${datum.discription}`
//                 createStorage.appendChild(createName)
//             });
//         }
// });
