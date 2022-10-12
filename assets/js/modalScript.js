// Begin of modification by Shreya M for adding Modal in local summary ///////


// Key count for local storage 
var keyCount = 0;



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


//  creating table //
function addTable() {
    var myTableDiv = document.getElementById("myDynamicTable");

    var table = document.createElement('TABLE');
    table.border = '1';

    var tableBody = document.createElement('TBODY');
    table.appendChild(tableBody);

    for (var i = 0; i < 3; i++) {
        var tr = document.createElement('TR');
        tableBody.appendChild(tr);

        for (var j = 0; j < 4; j++) {
            var td = document.createElement('TD');
            td.width = '75';
            td.appendChild(document.createTextNode("Cell " + i + "," + j));
            tr.appendChild(td);
        }
    }
    myTableDiv.appendChild(table);
}
addTable();



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
  // End of modification by Shreya M for adding Modal in local summary ///////