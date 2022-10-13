// Begin of modification by Shreya M for adding Modal in local summary ///////
for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem("formData",i);
     console.log(city);
   
}

// Key count for local storage 
var keyCount = 0;

// To fetch the previous data into our table

if(localStorage.getItem("formData")){
   let tabelData = JSON.parse(window.localStorage.getItem('formData'));
   console.log(tabelData.nPark)
    
}



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


//  fetching values //

    

       if(localStorage.getItem("formData")){
            var contents = JSON.parse(window.localStorage.getItem('formData'));
       
            // console.log(contents.citySate);
            // console.log(contents.nPark);
            // console.log(contents.rating);
            // console.log(contents.discription);

            let myTableDiv = document.getElementById("myDynamicTable");
            // let getPrincipalContainer = document.getElementById("search-results");
                let createStorage = document.createElement("div")
                createStorage.className = 'product-card1';
                myTableDiv.append(createStorage)

            // let createCard = document.createElement("div")
            let createName = document.createElement("a")
            createName.className = "card-title1"
            // createName.innerText = "State:"+contents.citySate+ " Visited:"+contents.nPark + " ratings given:"+contents.rating+" Discription:"+contents.discription
            createName.innerText =`State: ${contents.citySate}, Visited:${contents.nPark}
            ratings given:${contents.rating}
             Discription:${contents.discription}`
            createStorage.appendChild(createName)
       
    

    // var myTableDiv = document.getElementById("myDynamicTable");

    // var table = document.createElement('TABLE');
    // table.border = '1';

    // var tableBody = document.createElement('TBODY');
    // table.appendChild(tableBody);

    // for (var i = 0; i < 3; i++) {
    //     var tr = document.createElement('TR');
    //     tableBody.appendChild(tr);

    //     for (var j = 0; j < 4; j++) {
    //         var td = document.createElement('TD');
    //         td.width = '75';
    //         td.appendChild(document.createTextNode("State"+contents.citySate+"" + i + "," + j));
    //         tr.appendChild(td);
    //     }
    // }
    // myTableDiv.appendChild(table);
}



//   

var myForm = document.querySelector("form#myForm");

  myForm.onsubmit = function(){
    const data = {};
    const dataToFetch = this.querySelectorAll("input, textarea, button, select");

    for(let element of dataToFetch){
  
      if( element && element.tagName && element.name )
        data[element.name] = element.value;

    }
    
    let jsonData = JSON.stringify( data );
    
    localStorage.setItem("formData", jsonData);
    // Just to test later will remove the below line.
    alert("Data stored to localStorage itemName:'formData'");
    
    return false;
  }
//   End of modification by Shreya M for adding Modal in local summary ///////