// Begin of modification by Shreya M for adding Modal in local summary ///////

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function () {
    modal.style.display = "block";

    // 
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// End of Modal work

// Local Storage ///Starts here//

// Saving it in local storage
var taskArray = [];
var myForm = document.querySelector("form#myForm");

myForm.onsubmit = function () {
    const data = {};
    const dataToFetch = this.querySelectorAll("input, textarea, button, select");

    for (let element of dataToFetch) {

        if (element && element.tagName && element.name)
            data[element.name] = element.value;

    }
    taskArray.push(data)
    console.log(taskArray)
    let jsonData = JSON.stringify(taskArray);
    console.log(jsonData)

    localStorage.setItem("formData", jsonData);
    // Just to test later will remove the below line.
    // alert("Data stored to localStorage itemName:'formData'");

    return false;
}

const btnSubmit = document.getElementById('SuBtn');

btnSubmit.addEventListener('click', function handleClick(event) {
    // 👇️ if you are submitting a form (prevents page reload)
    event.preventDefault();

    const firstNameInput = document.getElementById('citySate');
    const firstNameInput2 = document.getElementById('nPark');
    const firstNameInput3 = document.getElementById('rating');
    const firstNameInput4 = document.getElementById('discription');

    // Send value to server
    console.log(firstNameInput.value);

    // 👇️ clear input field
    firstNameInput.value = '';
    firstNameInput2.value = '';
    firstNameInput3.value = '';
    firstNameInput4.value = '';
});


    $(document).ready(function () {

        // Read and parse from localStorage
        if (localStorage.getItem("formData")) {
            var formDatap = JSON.parse(localStorage.getItem('formData'));

            // Iterate through array, and set HTML of matching <span> element
            $.each(formDatap, function (i, datum) {
                //   $('#myDynamicTable' + datum.name).html(datum.value);
                console.log(datum.nPark)

                let myTableDiv = document.getElementById("myDynamicTable");
                // let getPrincipalContainer = document.getElementById("search-results");
                let createStorage = document.createElement("div")
                createStorage.className = 'product-card1';
                myTableDiv.append(createStorage)

                let createCard = document.createElement("div")
                let createName = document.createElement("a")
                createName.className = "card-title1"
                // createName.innerText = "State:"+contents.citySate+ " Visited:"+contents.nPark + " ratings given:"+contents.rating+" Discription:"+contents.discription
                createName.innerText = `City: ${datum.citySate}, Visited:${datum.nPark}
        ratings given:${datum.rating}
         Discription:${datum.discription}`
                createStorage.appendChild(createName)
            });
        }
    });

